import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

const path = require("path");
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "/favicon.ico",
        "/img/icons/apple-touch-icon.png",
        "/img/icons/favicon.svg",
      ],
      manifest: {
        name: "Pace Converter",
        short_name: "PaceConverter",
        description: "Convert time and pace for runners and swimmers",
        theme_color: "#06b6d4",
        start_url: "/",
        scope: "/",
        display: "standalone",
        lang: "en",
        categories: ["sports", "health", "tools"], // Optional categories
        icons: [
          {
            src: "/img/icons/web-app-manifest-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/img/icons/web-app-manifest-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: { "@": path.resolve(__dirname, "./src") },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"],
  },
});
