function baseHrefRuntimeVitePlugin(options) {
  const fallbackBaseHref = options?.fallbackBaseHref || "";
  const publicPaths = options?.publicPaths || [];

  if (publicPaths.length === 0 && !fallbackBaseHref) {
    return;
  }

  const scriptTemplateFunction = `(function () {
        var publicPaths = [${publicPaths.map(
          (path) => "'" + path + "'"
        )}] || [];
        var fallbackBaseHref = '${fallbackBaseHref}' ? '${fallbackBaseHref}' : 'undefined';

        const base = document.createElement("base")
        document.getElementById("myScript").after(base)

        base.href = publicPaths.find(
            (path) => window.location.pathname.includes(path.replace(/\\/$/,""))
        ) || fallbackBaseHref || document.baseURI})();`;

  return {
    name: "base-href-runtime-vite-plugin",

    transformIndexHtml(html) {
      const resTags = [
        {
          tag: "script",
          voidTag: false,
          injectTo: "head-prepend",
          meta: { plugin: "base-href-runtime-webpack-plugin" },
          attrs: {
            id: "myScript",
            type: "text/javascript",
            "data-name": "base-href-runtime-webpack-plugin",
          },
          children: scriptTemplateFunction,
        },
      ];

      if (html.includes("<base")) {
        resTags.push({
          tag: "base",
          voidTag: false,
          injectTo: "head-prepend",
          attrs: {
            href: fallbackBaseHref,
          },
        });
      }

      return {
        html: html.replace(/<base [^>]*/, `<base href='${fallbackBaseHref}'`),
        tags: resTags,
      };
    },
  };
}

module.exports = baseHrefRuntimeVitePlugin;
