import { z } from 'zod';

export const NodeDataSchema = z.object({
  label: z.string().min(1, 'Название обязательно'),
  description: z.string(),
  color: z
    .string()
    .regex(/^#([\dA-Fa-f]{6}|[\dA-Fa-f]{3})$/, 'Неверный HEX формат'),
  timeToLearn: z.string(),
  links: z.array(z.object({ url: z.url('Введите корректный URL') })),
});

export type NodeData = z.infer<typeof NodeDataSchema>;
