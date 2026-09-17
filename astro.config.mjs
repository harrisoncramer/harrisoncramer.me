import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import rehypePrettyCode from "rehype-pretty-code";
import { createReadStream, existsSync, statSync } from "node:fs";
import { extname } from "node:path";

const prettyCodeOptions = {
  theme: "dark-plus",
  onVisitLine(node) {
    if (node.children.length === 0) {
      node.children = [
        {
          type: "text",
          value: " ",
        },
      ];
    }
  },
  onVisitHighlightedLine(node) {
    node.properties.className.push("highlighted");
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ["word"];
  },
  tokensMap: {},
};

import image from "@astrojs/image";

const pagefindDir = new URL("./dist/pagefind/", import.meta.url);

const pagefindTypes = {
  ".js": "application/javascript",
  ".json": "application/json",
  ".css": "text/css",
  ".pagefind": "application/wasm",
};

const pagefind = {
  name: "pagefind",
  resolveId(id) {
    if (id === "/pagefind/pagefind.js") {
      return { id, external: true };
    }
  },
  configureServer(server) {
    server.middlewares.use("/pagefind", (req, res, next) => {
      const requested = new URL("." + req.url.split("?")[0], pagefindDir);
      if (!requested.href.startsWith(pagefindDir.href)) return next();
      if (!existsSync(requested) || !statSync(requested).isFile()) return next();
      const type = pagefindTypes[extname(requested.pathname)];
      if (type) res.setHeader("Content-Type", type);
      createReadStream(requested).pipe(res);
    });
  },
};

// https://astro.build/config
export default defineConfig({
  site: 'https://harrisoncramer.me',
  integrations: [mdx(), sitemap(), react(), tailwind(), image({
    serviceEntryPoint: '@astrojs/image/sharp'
  })],
  vite: {
    plugins: [pagefind],
  },
  markdown: {
    extendDefaultPlugins: true,
    syntaxHighlight: false,
    rehypePlugins: [[rehypePrettyCode, prettyCodeOptions]],
  },
});
