import z from 'zod';

export const PasswordSchema = z
  .string()
  .min(8, {
    error: ({ minimum }) => `Пароль должен быть минимум ${minimum} символов`,
  })
  .max(30, {
    error: ({ maximum }) => `Пароль должен быть менее ${maximum} символов`,
  });

export type Password = z.infer<typeof PasswordSchema>;
