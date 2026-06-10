import z from 'zod';

export const RoadmapSchema = z.object({
  id: z.uuid(),
  title: z.string().nonempty(),
  description: z.string(),
  is_public: z.boolean(),
  created_at: z.string(),
  updated_at: z.string(),
});

export type Roadmap = z.infer<typeof RoadmapSchema>;
