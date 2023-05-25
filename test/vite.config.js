import { defineConfig } from "vite";
import baseHrefRuntimeVitePlugin from "base-href-runtime-vite-plugin";

export default defineConfig({
  plugins: [
    baseHrefRuntimeVitePlugin({
      fallbackBaseHref: "/", // in case when we didn't match location.pathname
      publicPaths: [
        // availabled prefixes. Order is important!
        "/ui/app/log/", // <base href="/ui/app/log">
        "/ui/app/", // <base href="/ui/app/">
        "/ui/test/entrypoint/", // <base href="/ui/test/entrypoint/">
        "/a/b/c/d/e/", // <base href="/a/b/c/d/e/">
      ],
    }),
  ],
});
