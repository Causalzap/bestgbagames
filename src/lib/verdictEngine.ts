// src/lib/verdictEngine.ts
import { GameData } from "@/app/versus/versus-index-client";
import { verdictConfig } from "./verdictConfig";

type Badge = { text: string; color: string; icon: string };
type IntentKey = "player" | "collector" | "value";
type VerdictConfig = typeof verdictConfig;
type CopyConfig = VerdictConfig["copy"];


export type VerdictOutput = {
  winnerId: string | "tie";
  title: string;
  shortSummary: string;
  intent: IntentKey;
  badges: Badge[];
};

export type Verdict = {
  winnerId: string | "tie"; // 顶部总展示 winner（默认用 collector）
  title: string; // 顶部主标题（collector 优先）
  shortSummary: string; // 顶部主摘要（collector 优先）
  primaryBadges: Badge[]; // Index 卡片显示 1~2 个
  badges: Badge[]; // 详情页显示全部
  riskAlert?: { level: "high" | "medium" | "low"; message: string };
  marketAdvice: string;
  verdicts: Record<IntentKey, VerdictOutput>; // 三分支
};

function clamp01(n: number) {
  return Math.max(0, Math.min(1, n));
}

function pick<T>(arr: readonly T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
}
  
function getSaveKey(saveType?: string) {
  if (saveType === "Flash") return "Flash";
  if (saveType === "SRAM") return "SRAM";
  return "Unknown";
}

function normalizedRating(g: GameData) {
  // user 0-10 => 0..1
  return clamp01((g.scores.user ?? 0) / 10);
}

function normalizedPlaytimeShorterBetter(g: GameData) {
  // 目标：越短越“轻量”，player 往往更偏好可快速上手的选择
  // main <= 50h 映射到 1..0（越短越高）
  const h = g.playtime.main ?? 0;
  const t = clamp01(h / 50);
  return 1 - t;
}

function normalizedPriceCheaperBetter(g: GameData, other: GameData) {
  const p = g.market.price_loose ?? 0;
  const o = other.market.price_loose ?? 0;
  if (p <= 0 || o <= 0) return 0.5;

  // 用相对差值归一化：(-1..1) => (0..1)
  // g 更便宜 => score 更高
  const rel = (o - p) / Math.max(o, p); // >0 表示 g 更便宜
  return clamp01(0.5 + rel * 0.5);
}

function scoreForIntent(intent: IntentKey, g: GameData, other: GameData) {
  const w = verdictConfig.intents[intent];

  const saveKey = getSaveKey(g.tech_specs.save_type);
  const saveScore = verdictConfig.saveRisk[saveKey].score; // 0..1

  const ratingScore = normalizedRating(g);
  const playtimeScore = normalizedPlaytimeShorterBetter(g);
  const priceScore = normalizedPriceCheaperBetter(g, other);

  const total =
    w.save * saveScore +
    w.rating * ratingScore +
    w.playtime * playtimeScore +
    w.price * priceScore;

  return clamp01(total);
}

function decisionStrength(diff: number) {
  const abs = Math.abs(diff);
  if (abs < verdictConfig.thresholds.splitDecision) return "tie" as const;
  if (abs < verdictConfig.thresholds.clearWinner) return "split" as const;
  return "clear" as const;
}

function decideWinner(diff: number, g1: GameData, g2: GameData) {
  const strength = decisionStrength(diff);
  if (strength === "tie") return "tie" as const;
  return diff > 0 ? g1.id : g2.id;
}

function buildRiskAlert(g1: GameData, g2: GameData) {
  const k1 = getSaveKey(g1.tech_specs.save_type);
  const k2 = getSaveKey(g2.tech_specs.save_type);

  // 只要一方 SRAM、一方 Flash，就提示高风险差异（护城河）
  if (k1 === "SRAM" && k2 === "Flash") {
    return {
      level: "high" as const,
      message: `${g1.title} uses battery-backed SRAM (eventual maintenance). ${g2.title} uses Flash (maintenance-free saves).`,
    };
  }
  if (k2 === "SRAM" && k1 === "Flash") {
    return {
      level: "high" as const,
      message: `${g2.title} uses battery-backed SRAM (eventual maintenance). ${g1.title} uses Flash (maintenance-free saves).`,
    };
  }

  return undefined;
}

function buildMarketAdvice(g1: GameData, g2: GameData) {
  const p1 = g1.market.price_loose ?? 0;
  const p2 = g2.market.price_loose ?? 0;
  if (p1 <= 0 || p2 <= 0) return "Market pricing data is limited for one or both titles.";

  const diff = p1 - p2;
  if (Math.abs(diff) >= 30) {
    const cheaper = diff < 0 ? g1 : g2;
    const expensive = diff < 0 ? g2 : g1;
    return `Budget Alert: ${cheaper.title} is about $${Math.abs(diff)} cheaper. Unless you’re collecting a specific variant, the premium on ${expensive.title} may not be justified right now.`;
  }
  return "Both titles hold similar value in the current collectors' market.";
}

function hasFlashVsSramDiff(g1: GameData, g2: GameData) {
  const k1 = getSaveKey(g1.tech_specs.save_type);
  const k2 = getSaveKey(g2.tech_specs.save_type);
  return (
    k1 !== k2 &&
    ((k1 === "Flash" && k2 === "SRAM") || (k2 === "Flash" && k1 === "SRAM"))
  );
}

function intentCopyByStrength(
    intent: IntentKey,
    strength: "tie" | "split" | "clear"
  ) {
    const copy: CopyConfig = verdictConfig.copy;
  
    if (strength === "tie") {
      return {
        title: pick(copy.tieTitles[intent]),
        summary: pick(copy.tieSummaries[intent]),
      };
    }
  
    if (strength === "split") {
      return {
        title: pick(copy.splitTitles[intent]),
        summary: pick(copy.splitSummaries[intent]),
      };
    }
  
    return {
      title: pick(copy.clearTitles[intent]),
      summary: pick(copy.clearSummaries[intent]),
    };
}
  
function intentSummary(
  intent: IntentKey,
  winnerId: string | "tie",
  g1: GameData,
  g2: GameData,
  strength: "tie" | "split" | "clear"
) {
  const premise = pick(verdictConfig.copy.premise);
  const exception = pick(verdictConfig.copy.exceptions);

  const winner = winnerId === g1.id ? g1 : winnerId === g2.id ? g2 : null;

  const hasSaveDiff = hasFlashVsSramDiff(g1, g2);

  // 你也可以在未来让 SRAM winner 用 sramWin（目前 saveRisk 分数低，一般不会赢）
  const core =
    hasSaveDiff ? pick(verdictConfig.copy.flashWin) : pick(verdictConfig.copy.noDiff);

  // tie：用专属 tie 文案（给行动建议）
  if (!winner || strength === "tie") {
    const tie = intentCopyByStrength(intent, "tie");
    return {
      title: tie.title,
      summary: `${premise}, ${tie.summary}. ${exception}`,
    };
  }

  // split/clear：标题先用配置库（更像人工编辑），摘要拼上 “winner + 理由”
  const tuned = intentCopyByStrength(intent, strength);

  // split 语气更保守，clear 更果断
  const verb = strength === "clear" ? "stands out" : "edges out";

  return {
    title: tuned.title,
    summary: `${premise}, ${winner.title} ${verb} because ${core}. ${exception}`,
  };
}

function buildBadges(
  g1: GameData,
  g2: GameData,
  verdicts: Verdict["verdicts"],
  strengths: Record<IntentKey, "tie" | "split" | "clear">
) {
  const badges: Badge[] = [];

  // 风险类：稳定锚点（SEO 视觉）
  const k1 = getSaveKey(g1.tech_specs.save_type);
  const k2 = getSaveKey(g2.tech_specs.save_type);
  if (k1 === "Flash" || k2 === "Flash") badges.push(verdictConfig.badges.PERMANENT_SAVE);
  if (k1 === "SRAM" || k2 === "SRAM") badges.push(verdictConfig.badges.BATTERY_SAVE);

  // 结果类：分歧/无结论
  const winners = [verdicts.collector.winnerId, verdicts.player.winnerId, verdicts.value.winnerId];
  const nonTie = winners.filter((x) => x !== "tie");
  const unique = new Set(nonTie);

  if (unique.size === 0) {
    badges.push(verdictConfig.badges.NO_CLEAR);
  } else if (unique.size >= 2) {
    badges.push(verdictConfig.badges.SPLIT);
  }

  // 强度标签（可选：你 config 里有就加）
  const anyClear = Object.values(strengths).some((s) => s === "clear");
  const anySplit = Object.values(strengths).some((s) => s === "split");
  if (anyClear && (verdictConfig.badges as any).CLEAR_WINNER) {
    badges.push((verdictConfig.badges as any).CLEAR_WINNER);
  } else if (anySplit && (verdictConfig.badges as any).SLIGHT_EDGE) {
    badges.push((verdictConfig.badges as any).SLIGHT_EDGE);
  }

  // Fan Favorite：只有 player 有明确赢家才加
  const scoreDiff = (g1.scores.user ?? 0) - (g2.scores.user ?? 0);
  if (Math.abs(scoreDiff) >= 1.0 && verdicts.player.winnerId !== "tie") {
    badges.push(verdictConfig.badges.FAN_FAVORITE);
  }

  // Best Value：只有 value 有明确赢家才加
  const priceDiff = (g1.market.price_loose ?? 0) - (g2.market.price_loose ?? 0);
  if (Math.abs(priceDiff) >= 20 && verdicts.value.winnerId !== "tie") {
    badges.push(verdictConfig.badges.BEST_VALUE);
  }

  // 去重（按 text）
  const seen = new Set<string>();
  return badges.filter((b) => (seen.has(b.text) ? false : (seen.add(b.text), true)));
}

export function generateVerdict(g1: GameData, g2: GameData): Verdict {
  const intents: IntentKey[] = ["collector", "player", "value"];

  // 记录每个 intent 的强度（tie/split/clear）
  const strengths = {} as Record<IntentKey, "tie" | "split" | "clear">;

  const verdicts = intents.reduce((acc, intent) => {
    const s1 = scoreForIntent(intent, g1, g2);
    const s2 = scoreForIntent(intent, g2, g1);
    const diff = s1 - s2;

    const strength = decisionStrength(diff);
    strengths[intent] = strength;

    const winnerId = decideWinner(diff, g1, g2);

    const { title, summary } = intentSummary(intent, winnerId, g1, g2, strength);

    acc[intent] = {
      intent,
      winnerId,
      title,
      shortSummary: summary,
      badges: [],
    };
    return acc;
  }, {} as Verdict["verdicts"]);

  // 顶部主展示：collector（符合你站的“收藏/持有”定位）
  const top = verdicts.collector;

  const riskAlert = buildRiskAlert(g1, g2);
  const marketAdvice = buildMarketAdvice(g1, g2);

  const allBadges = buildBadges(g1, g2, verdicts, strengths);

  // Index 只显示 1-2 个“主标签”
  const primaryBadges = allBadges.slice(0, 2);

  return {
    winnerId: top.winnerId,
    title: top.title,
    shortSummary: top.shortSummary,
    primaryBadges,
    badges: allBadges,
    riskAlert,
    marketAdvice,
    verdicts,
  };
}
