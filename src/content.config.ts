// Content collections: the site's words and data, kept apart from page markup.
// "work" = one Markdown file per project in src/content/work/.
// To add a project, add a file there; the Work page and home page pick it up.
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    tags: z.array(z.string()),
    when: z.string(),
    kind: z.string(),
    order: z.number(),
    featured: z.boolean().default(false),
    // Where the card links. Leave out for no link (a "coming soon" note shows instead).
    link: z.string().optional(),
    linkLabel: z.string().optional(),
    note: z.string().optional(),
  }),
});

export const collections = { work };
