import z from 'zod';

export const RoadmapBaseSchema = z.object({
  id: z.uuid(),
  title: z.string().nonempty(),
  description: z.string(),
  is_public: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
  roadmap_likes: z.array(z.object({ count: z.number() })),
  roadmap_comments: z.array(z.object({ count: z.number() })),
});
