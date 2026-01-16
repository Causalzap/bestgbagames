const fs = require("fs");
const path = require("path");

const dbPath = path.join(__dirname, "..", "src", "data", "articles", "games_database.json");

function getScore(g) {
  return g?.scores?.user || (g?.scores?.metacritic ? g.scores.metacritic / 10 : 0);
}
function pairKey(a, b) {
  const ids = [a.id, b.id].sort();
  return `${ids[0]}-vs-${ids[1]}`;
}
function buildCuratedPairs(games, limit = 600) {
  const sorted = [...games].sort((a, b) => getScore(b) - getScore(a));
  const target = sorted.slice(0, 60);
  const slugs = [];
  const seen = new Set();
  for (let i = 0; i < target.length; i++) {
    for (let j = i + 1; j < target.length; j++) {
      const slug = pairKey(target[i], target[j]);
      if (!seen.has(slug)) {
        seen.add(slug);
        slugs.push(slug);
      }
      if (slugs.length >= limit) return slugs;
    }
  }
  return slugs.slice(0, limit);
}

const games = JSON.parse(fs.readFileSync(dbPath, "utf8"));
const valid = games.filter((g) => g && typeof g.id === "string" && g.id);

const slugs = buildCuratedPairs(valid, 600);

const outPath = path.join(__dirname, "..", "public", "versus_slugs.json");
fs.writeFileSync(outPath, JSON.stringify(slugs, null, 2));
console.log(`[build-versus-slugs] wrote ${slugs.length} slugs to ${outPath}`);
