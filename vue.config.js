const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: "Pace Converter",
    short_name: "Pace Calc",
    themeColor: "#06b6d4",
    msTileColor: "#000000",
    appleMobileWebAppCapable: true,
    appleMobileWebAppStatusBarColor: "black",
    display: "standalone",
  },
});
