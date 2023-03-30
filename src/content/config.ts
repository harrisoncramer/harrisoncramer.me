import { defineCollection, z } from 'astro:content';
import { TAGS } from '../consts';

const blog = defineCollection({
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z
			.string()
			.or(z.date())
			.transform((val) => new Date(val)),
		updatedDate: z
			.string()
			.optional()
			.transform((str) => (str ? new Date(str) : undefined)),
    imageDescription: z.string(),
		heroImage: z.string().optional(),
    tags: z.array(z.enum(TAGS)).optional()
	}),
});

export const collections = { blog };
