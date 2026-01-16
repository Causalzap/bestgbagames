// src/lib/verdictConfig.ts
export const verdictConfig = {
    thresholds: {
      // |diff| >= clearWinner => clear winner
      // splitDecision <= |diff| < clearWinner => split / slight edge
      // |diff| < splitDecision => tie
      clearWinner: 0.25,
      splitDecision: 0.10,
    },
  
    // 统一风险映射（护城河）
    saveRisk: {
      Flash: { level: "low", score: 1.0, label: "Permanent Save", icon: "🛡️" },
      SRAM: { level: "high", score: 0.4, label: "Battery-Backed Save", icon: "🔋" },
      Unknown: { level: "medium", score: 0.7, label: "Save Type Unknown", icon: "💾" },
    } as const,
  
    // 意图权重：决定不同用户的 winner（避免模板化）
    intents: {
      // 玩家：更看重口碑 + 游玩体验
      player: { save: 0.2, rating: 0.55, playtime: 0.2, price: 0.05 },
  
      // 收藏：存档可靠性 + 价格（持有成本）优先，口碑权重低
      collector: { save: 0.65, rating: 0.1, playtime: 0.0, price: 0.25 },
  
      // 价值：价格权重更高，同时要考虑风险（别买了就丢档）
      value: { save: 0.3, rating: 0.2, playtime: 0.1, price: 0.4 },
    } as const,
  
    // 文案词库：随机组合，避免每页一样（但语义稳定）
    copy: {
      // 句子开头的“立场”表达，后面可以拼接不同结论
      premise: [
        "If long-term ownership is the priority",
        "For collectors who want hassle-free saves",
        "When you care about keeping saves intact for years",
        "If you’re buying to keep, not just to finish once",
      ],
  
      // 当出现 Flash vs SRAM 差异时，强调 Flash 的好处
      flashWin: [
        "Flash saves are non-volatile and reduce long-term maintenance risk",
        "battery-free saving avoids the “eventual battery swap” problem",
        "Flash-based save memory is generally safer over decades",
        "maintenance-free saves matter more the longer you plan to keep the cart",
      ],
  
      // 当 winner 反而是 SRAM（少见，但如果你引擎允许），给可解释话术
      // （注意：你现在 saveRisk SRAM 分数较低，通常不会赢；留着作为多样性/扩展）
      sramWin: [
        "battery-backed SRAM can be fine if you’re comfortable replacing the battery later",
        "SRAM saves are maintainable with a battery swap if needed",
        "for shorter play sessions, SRAM risk is usually manageable",
      ],
  
      // 当 save 类型差异不显著时，用“把决定权交还给用户”的表达
      noDiff: [
        "save hardware isn’t the deciding factor — gameplay feel and value matter more",
        "hardware risk is comparable here, so preference should lead",
        "save tech doesn’t separate these two — the experience does",
        "both are similar on ownership risk; pick based on what you actually enjoy",
      ],
  
      // 结尾的“但书”，避免绝对化，让语气更像编辑
      exceptions: [
        "This matters less if you only plan a single casual playthrough.",
        "If you’re okay with a future battery swap, the risk is manageable.",
        "Market prices move — double-check current listings for the best deal.",
        "Condition and authenticity can outweigh small differences on paper.",
      ],
  
      // ✅ 新增：Tie 的标题（按 intent 区分）
      tieTitles: {
        collector: [
          "Collector Tie: Both Are Safe Picks",
          "Safe Either Way (Collector Tie)",
          "No Clear Collector Winner",
        ],
        player: [
          "Player Tie: Choose by Taste",
          "Both Great — Pick the Style You Prefer",
          "No Clear Gameplay Winner",
        ],
        value: [
          "Value Tie: Let Today’s Price Decide",
          "No Clear Value Edge",
          "Value Tie: Buy the Better Deal",
        ],
      },
  
      // ✅ 新增：Tie 的摘要（给“下一步怎么选”）
      tieSummaries: {
        collector: [
          "Save reliability is close. Prioritize authenticity, label condition, and the cleaner cart.",
          "Neither has a decisive ownership advantage — buy the best condition copy you can verify.",
          "Collector-wise it’s a wash. Condition and legitimacy matter more than specs here.",
        ],
        player: [
          "Gameplay quality is close. Pick based on vibe, pacing, and what you’re in the mood for.",
          "Both are worth playing — start with the one that matches your preferred style.",
          "No obvious gameplay edge. Your taste matters more than the numbers here.",
        ],
        value: [
          "Prices are close. The smarter buy is whichever listing is cheaper in better condition.",
          "Value is too tight to call — track listings and pounce on the better deal.",
          "No clear price advantage today. Let condition + price decide.",
        ],
      },
  
      // ✅ 新增：Split（轻微优势）的标题/摘要，让“Split”更权威
      splitTitles: {
        collector: ["Slight Collector Edge", "Leaning Safer Long-Term", "Collector Pick (Small Margin)"],
        player: ["Slight Player Edge", "Leaning Better to Play", "Player Pick (Close Call)"],
        value: ["Slight Value Edge", "Leaning Smarter Buy", "Value Pick (Close Call)"],
      },
  
      splitSummaries: {
        collector: [
          "It’s close, but one option edges out on long-term ownership factors.",
          "Small margin decision — save reliability and price nudges the pick.",
        ],
        player: [
          "A close call — one title has a small advantage for immediate play.",
          "If you can only start one first, there’s a slight edge here.",
        ],
        value: [
          "Value is close — but pricing and ownership risk give a small advantage.",
          "Not a landslide; a small pricing gap can flip the decision.",
        ],
      },
  
      // ✅ 新增：Clear（明显胜出）标题/摘要，让“clear winner”更像结论而不是口号
      clearTitles: {
        collector: ["Clear Safer Long-Term Choice", "Best for Collectors", "Collector Winner"],
        player: ["Clear Pick for Players", "Best to Play First", "Player Winner"],
        value: ["Clear Best Value", "Smarter Buy Right Now", "Value Winner"],
      },
  
      clearSummaries: {
        collector: [
          "One title clearly reduces long-term maintenance risk and is the safer cart to keep.",
          "Ownership-wise there’s a clearer winner once save hardware and price are weighed.",
        ],
        player: [
          "Players tend to favor one experience more strongly — the edge is meaningful.",
          "If you want the better moment-to-moment pick, this one is the clearer start.",
        ],
        value: [
          "The price/value gap is meaningful enough to justify a clear recommendation.",
          "If you’re optimizing for cost vs experience, the value winner is more obvious here.",
        ],
      },
    },
  
    // 统一标签样式（可视化系统）
    badges: {
      PERMANENT_SAVE: {
        text: "Permanent Save",
        color: "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30",
        icon: "🛡️",
      },
      BATTERY_SAVE: {
        text: "Battery Save Risk",
        color: "bg-red-500/10 text-red-300 border border-red-500/30",
        icon: "🔋",
      },
  
      BEST_VALUE: {
        text: "Best Value",
        color: "bg-blue-500/20 text-blue-300 border border-blue-500/30",
        icon: "💰",
      },
      FAN_FAVORITE: {
        text: "Fan Favorite",
        color: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
        icon: "🔥",
      },
  
      NO_CLEAR: {
        text: "No Clear Winner",
        color: "bg-slate-800 text-slate-300 border border-slate-700",
        icon: "🤝",
      },
      SPLIT: {
        text: "Depends on Goal",
        color: "bg-slate-800 text-slate-200 border border-slate-700",
        icon: "🎯",
      },
  
      // ✅ 新增：可选的“强度标签”（你想卷就上）
      SLIGHT_EDGE: {
        text: "Slight Edge",
        color: "bg-slate-800 text-slate-200 border border-slate-700",
        icon: "📌",
      },
      CLEAR_WINNER: {
        text: "Clear Winner",
        color: "bg-slate-800 text-slate-200 border border-slate-700",
        icon: "✅",
      },
    },
  } as const;
  