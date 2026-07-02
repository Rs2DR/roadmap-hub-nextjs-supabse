import z from 'zod';

export const PasswordSchema = z
  .string()
  .min(8, 'Пароль должен быть минимум 8 символов')
  .max(30, 'Пароль должен быть менее 30 символов');

export type Password = z.infer<typeof PasswordSchema>;
