import { NextConfig } from "next";

const config: NextConfig = {
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
  },
  rewrites() {
    return [
      {
        source: "/experiments",
        destination: `https://experiments.ivanlewin.com/experiments`,
      },
      {
        source: "/experiments/:path+",
        destination: `https://experiments.ivanlewin.com/experiments/:path+`,
      },
      {
        source: "/resume",
        destination: `https://resume.ivanlewin.com`,
      },
      {
        source: "/resume/:path+",
        destination: `https://resume.ivanlewin.com/:path+`,
      },
    ];
  },
};

export default config;
