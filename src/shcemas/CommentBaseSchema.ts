import z from 'zod';

export const CommentBaseSchema = z.object({
  id: z.uuid(),
  roadmap_id: z.uuid(),
  user_id: z.uuid(),
  content: z.string(),
  created_at: z.string(),
  first_name: z
    .string()
    .nullable()
    .transform((val) => val ?? 'Аноним'),
  avatar: z
    .string()
    .nullable()
    .transform((val) => val ?? ''),
});
