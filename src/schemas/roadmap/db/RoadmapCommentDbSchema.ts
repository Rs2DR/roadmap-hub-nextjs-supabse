import z from 'zod';

import {
  AvatarSchema,
  NameSchema,
  TimestampSchema,
  UuidSchema,
} from '@/schemas/common';

export const RoadmapCommentDbSchema = z.object({
  id: UuidSchema,
  roadmap_id: UuidSchema,
  user_id: UuidSchema,
  content: z.string('Некорректный формат сообщения'),
  created_at: TimestampSchema,
  first_name: NameSchema,
  avatar: AvatarSchema,
});

export type RoadmapCommentDb = z.infer<typeof RoadmapCommentDbSchema>;
