import z from 'zod';

export const RoadmapBaseSchema = z.object({
  id: z.uuid(),
  title: z.string().nonempty(),
  description: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
  likes_count: z.number(),
  roadmap_comments: z.array(z.object({ count: z.number() })),
});

export type RoadmapBase = z.infer<typeof RoadmapBaseSchema>;
