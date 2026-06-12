import { z } from 'zod';

export const NodeFormSchema = z.object({
  label: z.string().min(1, 'Название обязательно'),
  description: z.string(),
  color: z
    .string()
    .regex(/^#([\dA-Fa-f]{6}|[\dA-Fa-f]{3})$/, 'Неверный HEX формат'),
  timeToLearn: z.string(),
  links: z.array(z.object({ url: z.string().url('Введите корректный URL') })),
});

export type NodeFormInput = z.infer<typeof NodeFormSchema>;
