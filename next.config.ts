import { NextConfig } from "next";

const config: NextConfig = {
  i18n: {
    locales: ["en", "es"],
    defaultLocale: "en",
  },
  redirects: () => {
    return [
      {
        source: "/curriculum",
        destination: `https://ivanlewin.com/resume/es`,
        statusCode: 307,
      },
      {
        source: "/curriculum/:path+",
        destination: `https://ivanlewin.com/resume/es/:path+`,
        statusCode: 307,
      },
    ];
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
        destination: `https://resume.ivanlewin.com/resume`,
      },
      {
        source: "/resume/:path+",
        destination: `https://resume.ivanlewin.com/resume/:path+`,
      }
    ];
  },
};

export default config;
