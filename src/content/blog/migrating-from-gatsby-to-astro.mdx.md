---
title: Migrating From Gastby to Astro
pubDate: 2023-01-30
description: I recently migrated a simple blog site from Gatsby to Astro, and was glad I did. Here are my takeaways.
imageDescription: An image of an astronaut floating through space
heroImage: astronaut
tags: ["astro", "javascript", "typescript"]
---

This blog is built with Gatsby. I've been relatively happy with the tool so far, because it let's me do what I need to do: write posts in markdown files, drop images into a content folder, and build the site quickly and easily in develop and production.

That being said, I'm also well aware that my production bundle is bigger than it needs to be. The DX could also be better. The amount of configuration and code required to spin up the application locally is non-trivial.

That's why recently, when my partner expressed interest in revamping her cooking blog, I decided to rewrite it in Astro.

## Smaller Build

The first and most obvious benefit was that the production bundle was significantly smaller with Astro. 

All told, the site compiled down to about 250KB with Astro. With Gatsby it was about 1.7MB. That's roughly 7x smaller.

The main reason for the difference is that I was using React to render the pages with Gatsby, and several React libraries, which I just replaced with vanilla Javascript with Astro. Using React is overkill when there are only a handful of elements that require client-side Javascript. With Astro, I needed interactivity only a handful of times, and I used custom elements, which Astro encourages. For instance, here's what I did for a toggle component:

```html:title=Toggle.astro
<wrapper-element>
  <slot name="trigger" />
</wrapper-element>
<slot />

<script>
  customElements.define(
    "wrapper-element",
    class extends HTMLElement {
      constructor() {
        super();
        const self = document.querySelector("wrapper-element");
        let visible = false;
        self?.addEventListener("click", () => {
          visible = !visible;
          const node = document.querySelector(
            ".toggle-content"
          ) as HTMLElement;
          if (node) node.style.display = visible ? "block" : "none";
        });
      }
    }
  );
</script>
```

As you can see, Astro encourages you to make use of browser-native APIs if all you need is a tiny bit of interactivity. You _can_ use React, Vue, or whatever language you want to write up your components, but you don't have to, and they'll be compiled down to HTML by default on the client anyway. Astro doesn't ship any Javascript to the client by default, which is awesome.

Here's another example, this time taking advantage of a fuller array of Astro APIs:

```html:title=HeaderLink.astro
---
interface Props {
  displayName: string;
  path: string;
}
const { pathname } = Astro.url;
const { path, displayName } = Astro.props;
---

<header-link data-message={path}>
  <li
    class:list={{
      "px-4 pt-2 font-display text-2xl cursor-pointer header-link": true,
      underline: pathname.endsWith(path),
    }}
  >
    {displayName}
  </li>
</header-link>

<script>
  class HeaderLink extends HTMLElement {
    constructor() {
      super();

      // Read the message from the data attribute.
      const path = this.dataset.message;
      this.addEventListener("click", () => {
        if (path) window.location.replace(`/${path}`);
      });
    }
  }
  customElements.define("header-link", HeaderLink);
</script>
```

In this case, I'm grabbing the path and displayName passed into the component as props, and passing them into the custom component via the `data-*` syntax that Astro provides. Those pieces of state are then available inside the constructor function for the custom element that I define inside the script block, which let's me create a dynamic linking component that will behave and be styled according to where the user is on the site.

## Better Developer Experience

Astro has a better developer experience, and it's not close.

For starters, the amount of configuration required is minimal. Here's what my project root looked like with Gastby. All of the configuration files are highlighted:

```bash{2,5-7,10-11,14}
$ ls -la
.babelrc
.env
README.md
app.json
gatsby-config.js
gatsby-node.js
infrastructure
node_modules
package-lock.json
package.json
src
static
static.json
```

I'm not even using Typescript with this Gatsby setup, but you can already start to see that there is more configuration than I'd like. This is Astro, which has Typescript already configured for me:

```bash{2,3,6-7,9}
.eslintrc.js
astro.config.mjs
infrastructure
node_modules
package-lock.json
package.json
public
src
tsconfig.json
```

Astro has an excellent CLI utility, too. When I wanted to add Tailwind to my project, all I had to do was run a single terminal command: `npx astro add tailwind` which set up the CSS imports and installed the dependencies for me.

I've also found Astro is _faster_ to rebuild locally than Gatsby is. It's built on top of Vite, which is my preferred bundler. This is also nice because the APIs are very familiar. The total configuration for Astro is just 15 lines of pure, readable Typescript:

```typescript
import { defineConfig } from 'astro/config';
import image from '@astrojs/image';
import sitemap from '@astrojs/sitemap';

import tailwind from "@astrojs/tailwind";

export default defineConfig({
    site: 'https://www.masamicooks.com',
    integrations: [
      tailwind(), 
      sitemap(),
      image({
        serviceEntryPoint: '@astrojs/image/sharp'
      }),
    ],
});
```

Compare this with Gatsby, which requires you to interface with a GraphQL API in order to fetch your content during build time. This always felt clunky, when all you wanted to do was render static content. The APIs are just _cleaner_ in Astro and the abstractions simpler.

## Rough Edges

Astro is still a relatively young project compared to Gatsby and some other static site tools, so some of the tooling is not quite there yet. For me, working in Neovim, it took a minute to set up the LSP and syntax highlighting. From that perspective, I'm not sure that I love the idea of having three separate syntax blocks in a single file, plus JSX (even if I can understand the logic of colocating all these different parts).

The tool also doesn't quite have the plugin ecosystem that Gastby has at this point. I'm not going to migrate this blog immediately because I rely too heavily on certain plugins that aren't there yet for Astro. But in time, I'm sure it'll catch up.

## Closing Thoughts

Astro was purpose built for building content-driven sites, and you can tell. It's designed to get you what you need, and then get out of yoru way. It also seems to encourage browser native APIs and deliberately push you away from heavier frameworks like React or Vue, which you probably don't need.

This is a pretty sharp contrast to Gatsby, which feels like it's forcing you to use tools (GraphQL) which weren't really designed with this use-case in mind. -- which weren't really designed with this use-case in mind. I'm not convinced that most people really need a GraphQL API to pull in data for markdown pages, or even data from a headless CMS like Contentful. In my experience it's just not the right abstraction.

This is of course just scratching the surface of Astro, the whole tool seems really promising and I'm excited to see where it goes.
