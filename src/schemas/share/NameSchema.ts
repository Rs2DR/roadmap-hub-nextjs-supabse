import z from 'zod';

export const NameSchema = z
  .string()
  .min(2, 'Имя должно содержать минимум 2 символа');

export type Name = z.infer<typeof NameSchema>;
