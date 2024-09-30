/** @type {import('next').NextConfig} */
module.exports = {
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
  },
  async rewrites() {
    return [
      {
        source: "/experiments",
        destination: `https://experiments.ivanlewin.com/experiments`,
      },
      {
        source: "/experiments/:path+",
        destination: `https://experiments.ivanlewin.com/experiments/:path+`,
      },
    ];
  },
};