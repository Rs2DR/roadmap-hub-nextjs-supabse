import { z } from 'zod';

import { HexSchema } from '@/schemas/common';

export const NodeDataDbSchema = z.object({
  label: z
    .string('Некорректный формат загаловка')
    .nonempty('Название обязательно'),
  description: z.string('Некорректный формат описания'),
  emoji: z.emoji('Некорректный формат Emoji'),
  color: HexSchema,
  timeToLearn: z.iso.time('Некорректный формат времени'),
  links: z.array(z.object({ url: z.url('Введите корректный URL') })),
});

export type NodeDataDb = z.infer<typeof NodeDataDbSchema>;
