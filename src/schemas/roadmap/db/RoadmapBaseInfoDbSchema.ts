import z from 'zod';

import { TimestampSchema, UuidSchema } from '@/schemas/common';

export const RoadmapBaseInfoDbSchema = z.object({
  id: UuidSchema,
  title: z
    .string('Некорректный формат заголовка')
    .nonempty('Заголовок не может быть пустым'),
  description: z
    .string('Некорректный формат описания')
    .nonempty('Описание не может быть пустым'),
  created_at: TimestampSchema,
  updated_at: TimestampSchema,
  likes_count: z.number('Некорректный формат количества лайков'),
  roadmap_comments: z.array(
    z.object({ count: z.number('Некорректный формат значение count') }),
    'Некорректный формат количества комментариев',
  ),
});

export type RoadmapBaseInfoDb = z.infer<typeof RoadmapBaseInfoDbSchema>;
