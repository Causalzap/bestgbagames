// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */

const fs = require("fs");
const path = require("path");

function loadVersusSlugs() {
  try {
    const p = path.join(__dirname, "public", "versus_slugs.json");
    if (!fs.existsSync(p)) {
      console.warn("[sitemap] versus_slugs.json missing:", p);
      return [];
    }
    const slugs = JSON.parse(fs.readFileSync(p, "utf8"));
    const valid = (Array.isArray(slugs) ? slugs : []).filter(
      (s) => typeof s === "string" && s.includes("-vs-") && s.length > 5
    );
    console.log(`[sitemap] Loaded ${valid.length} versus slugs from versus_slugs.json`);
    return valid;
  } catch (e) {
    console.warn("[sitemap] Failed to load versus slugs:", e?.message);
    return [];
  }
}

module.exports = {
  siteUrl: "https://www.bestgbagames.com",
  outDir: "public",
  generateRobotsTxt: true,

  additionalPaths: async () => {
    const now = new Date().toISOString();
    const paths = [];

    // A) 固定核心入口页（建议显式加）
    paths.push(
      { loc: `/versus`, changefreq: "daily", priority: 0.9, lastmod: now },
      { loc: `/versus/collections/rpg-strategy-titans`, changefreq: "weekly", priority: 0.7, lastmod: now },
      { loc: `/versus/collections/action-platforming`, changefreq: "weekly", priority: 0.7, lastmod: now },
      { loc: `/versus/collections/budget-gems-under-50`, changefreq: "weekly", priority: 0.7, lastmod: now }
    );

    // B) /versus/[slug]（从“已生成的合法列表”注入，避免 404）
    const versusSlugs = loadVersusSlugs();
    versusSlugs.forEach((slug) => {
      paths.push({
        loc: `/versus/${slug}`,
        changefreq: "weekly",
        priority: 0.6,
        lastmod: now,
      });
    });

    console.log(`[sitemap] Injected ${versusSlugs.length} versus urls`);
    return paths;
  },

  robotsTxtOptions: {
    policies: [
      { userAgent: "*", allow: "/", disallow: ["/cdn-cgi/", "/_next/"] },

      { userAgent: "GPTBot", disallow: "/" },
      { userAgent: "CCBot", disallow: "/" },
      { userAgent: "Amazonbot", disallow: "/" },
      { userAgent: "Applebot-Extended", disallow: "/" },
      { userAgent: "Bytespider", disallow: "/" },
      { userAgent: "ClaudeBot", disallow: "/" },
    ],
  },
};
