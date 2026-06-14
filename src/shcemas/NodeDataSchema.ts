import { z } from 'zod';

import { HexSchema } from './HexSchema';

export const NodeDataSchema = z.object({
  label: z.string().min(1, 'Название обязательно'),
  description: z.string(),
  emoji: z.emoji(),
  color: HexSchema,
  timeToLearn: z.string(),
  links: z.array(z.object({ url: z.url('Введите корректный URL') })),
});

export type NodeData = z.infer<typeof NodeDataSchema>;
