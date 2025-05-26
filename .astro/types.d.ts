declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}
declare module 'astro:content' {
	interface Render {
		'.md': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	export { z } from 'astro/zod';
	export type CollectionEntry<C extends keyof typeof entryMap> =
		(typeof entryMap)[C][keyof (typeof entryMap)[C]];

	// This needs to be in sync with ImageMetadata
	export const image: () => import('astro/zod').ZodObject<{
		src: import('astro/zod').ZodString;
		width: import('astro/zod').ZodNumber;
		height: import('astro/zod').ZodNumber;
		format: import('astro/zod').ZodUnion<
			[
				import('astro/zod').ZodLiteral<'png'>,
				import('astro/zod').ZodLiteral<'jpg'>,
				import('astro/zod').ZodLiteral<'jpeg'>,
				import('astro/zod').ZodLiteral<'tiff'>,
				import('astro/zod').ZodLiteral<'webp'>,
				import('astro/zod').ZodLiteral<'gif'>,
				import('astro/zod').ZodLiteral<'svg'>
			]
		>;
	}>;

	type BaseSchemaWithoutEffects =
		| import('astro/zod').AnyZodObject
		| import('astro/zod').ZodUnion<import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodDiscriminatedUnion<string, import('astro/zod').AnyZodObject[]>
		| import('astro/zod').ZodIntersection<
				import('astro/zod').AnyZodObject,
				import('astro/zod').AnyZodObject
		  >;

	type BaseSchema =
		| BaseSchemaWithoutEffects
		| import('astro/zod').ZodEffects<BaseSchemaWithoutEffects>;

	type BaseCollectionConfig<S extends BaseSchema> = {
		schema?: S;
		slug?: (entry: {
			id: CollectionEntry<keyof typeof entryMap>['id'];
			defaultSlug: string;
			collection: string;
			body: string;
			data: import('astro/zod').infer<S>;
		}) => string | Promise<string>;
	};
	export function defineCollection<S extends BaseSchema>(
		input: BaseCollectionConfig<S>
	): BaseCollectionConfig<S>;

	type EntryMapKeys = keyof typeof entryMap;
	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidEntrySlug<C extends EntryMapKeys> = AllValuesOf<(typeof entryMap)[C]>['slug'];

	export function getEntryBySlug<
		C extends keyof typeof entryMap,
		E extends ValidEntrySlug<C> | (string & {})
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E
	): E extends ValidEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getCollection<C extends keyof typeof entryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E
	): Promise<E[]>;
	export function getCollection<C extends keyof typeof entryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown
	): Promise<CollectionEntry<C>[]>;

	type InferEntrySchema<C extends keyof typeof entryMap> = import('astro/zod').infer<
		Required<ContentConfig['collections'][C]>['schema']
	>;

	const entryMap: {
		"blog": {
"building-a-chat-application-with-socketio.mdx": {
  id: "building-a-chat-application-with-socketio.mdx",
  slug: "building-a-chat-application-with-socketio",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"building-a-powerful-neovim-configuration.mdx": {
  id: "building-a-powerful-neovim-configuration.mdx",
  slug: "building-a-powerful-neovim-configuration",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"building-asynchronous-microservices-with-rabbitmq.mdx": {
  id: "building-asynchronous-microservices-with-rabbitmq.mdx",
  slug: "building-asynchronous-microservices-with-rabbitmq",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"building-gitlab-nvim.mdx": {
  id: "building-gitlab-nvim.mdx",
  slug: "building-a-gitlab-client-for-neovim",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"contract-first-api-design.mdx": {
  id: "contract-first-api-design.mdx",
  slug: "contract-first-api-design",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"creating-a-cli-in-javascript.mdx": {
  id: "creating-a-cli-in-javascript.mdx",
  slug: "creating-a-cli-in-javascript",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"debugging-in-neovim.mdx": {
  id: "debugging-in-neovim.mdx",
  slug: "debugging-in-neovim",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"deploying-a-nodejs-api-on-eks.mdx": {
  id: "deploying-a-nodejs-api-on-eks.mdx",
  slug: "deploying-a-nodejs-api-on-eks",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"embracing-incrementalism.mdx": {
  id: "embracing-incrementalism.mdx",
  slug: "embracing-incrementalism",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"migrating-from-gatsby-to-astro.mdx": {
  id: "migrating-from-gatsby-to-astro.mdx",
  slug: "migrating-from-gatsby-to-astro",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"mocking-interfaces-in-go.mdx": {
  id: "mocking-interfaces-in-go.mdx",
  slug: "mocking-interfaces-in-go",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"my-first-post.mdx": {
  id: "my-first-post.mdx",
  slug: "my-first-post",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"optimizing-your-docker-containers.mdx": {
  id: "optimizing-your-docker-containers.mdx",
  slug: "optimizing-your-docker-images-for-production",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"optimizing-your-webpack-bundle.mdx": {
  id: "optimizing-your-webpack-bundle.mdx",
  slug: "optimizing-your-webpack-bundle",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"protecting-your-production-branch-with-circleci.mdx": {
  id: "protecting-your-production-branch-with-circleci.mdx",
  slug: "protecting-your-production-branch-with-circleci",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"real-time-web-scraping-with-firebase-and-twilio.mdx": {
  id: "real-time-web-scraping-with-firebase-and-twilio.mdx",
  slug: "real-time-web-scraping-with-firebase-and-twilio",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"scraping-data-with-puppeteer-and-docker.mdx": {
  id: "scraping-data-with-puppeteer-and-docker.mdx",
  slug: "scraping-data-with-puppeteer-and-docker",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"setting-up-docker-with-terraform-and-ec2.mdx": {
  id: "setting-up-docker-with-terraform-and-ec2.mdx",
  slug: "setting-up-docker-with-terraform-and-ec2",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"speeding-up-circleci-builds-with-caching.mdx": {
  id: "speeding-up-circleci-builds-with-caching.mdx",
  slug: "speeding-up-circleci-builds-with-caching",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
"terminal-applications-in-go.mdx": {
  id: "terminal-applications-in-go.mdx",
  slug: "terminal-applications-in-go",
  body: string,
  collection: "blog",
  data: InferEntrySchema<"blog">
} & { render(): Render[".mdx"] },
},

	};

	type ContentConfig = typeof import("../src/content/config");
}
