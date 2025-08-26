/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/best-games/:slug',
        destination: '/games/:slug',
        permanent: true,
      },
      
      // ✅ 新增：把老的分类路径回流到 RPG Hub 下的新路径
      // 例如：/games/categories/turn-based  ->  /rpg-hub/turn-based
      {
        source: '/games/categories/:slug',
        destination: '/rpg-hub/:slug',
        permanent: true,
      },

      // ✅ 新增：把老的 Pokémon 文章路由回流到 RPG Hub 路径
      // 例如：/games/is-pokemon-an-rpg  ->  /rpg-hub/is-pokemon-an-rpg
      {
        source: '/games/is-pokemon-an-rpg',
        destination: '/rpg-hub/is-pokemon-an-rpg',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;