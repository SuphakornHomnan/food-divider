const withPWA = require("next-pwa");
/** @type {import('next').NextConfig} */

module.exports = withPWA({
  reactStrictMode: true,
  pwa: {
    dest: "public/sw",
    sw: "/sw/sw.js",
    scope: "/sw",
  },
  devIndicators: {
    autoPrerender: false,
  },
});
