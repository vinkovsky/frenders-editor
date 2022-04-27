/* eslint-disable
    @typescript-eslint/no-var-requires,
    @typescript-eslint/explicit-function-return-type
*/
// const withTM = require('next-transpile-modules')(
//   [
//     '@react-three/postprocessing',
//     '@react-three/drei',
//     'react-three-fiber',
//     'three',
//   ],
//   { unstable_webpack5: true }
// )

require('dotenv').config()
const withOffline = require('next-offline')

const nextConfig = {
  webpack5: false,
  webpack: (config) => {
    config.node = {
      // dns: "mock",
      fs: "empty",
      // path: true,
      // url: false,
    };
    return config;
  },
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/signin': { page: '/signin' },
      '/signup': { page: '/signup' },
      '/dashboard': { page: '/dashboard' },
      '/reset': { page: '/reset' },
      '/auth/google': {
        page: '/auth/[provider]',
        query: { slug: 'google' },
      },
      '/auth/vk': {
        page: '/auth/[provider]',
        query: { slug: 'vk' },
      },
      '/scene/60d95de16c692a0017105e54': {
        page: '/scene/[id]',
        query: { slug: '60d95de16c692a0017105e54' },
      },
    }
  },
  env: {
    STRAPI_API_URL: process.env.STRAPI_API_URL,
    NEXT_PUBLIC_CAPTCHA_SECRET_KEY: process.env.NEXT_PUBLIC_CAPTCHA_SECRET_KEY,
    ALGOLIA_APPLICATION_ID: process.env.ALGOLIA_APPLICATION_ID,
    ALGOLIA_API_KEY: process.env.ALGOLIA_API_KEY,
    ALGOLIA_INDEX: process.env.ALGOLIA_INDEX,
  },
  workboxOpts: {
    swDest: process.env.NEXT_EXPORT
      ? 'service-worker.js'
      : 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'offlineCache',
          expiration: {
            maxEntries: 200,
          },
        },
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/service-worker.js',
        destination: '/_next/static/service-worker.js',
      },
    ]
  },
}

module.exports = withOffline(nextConfig)
