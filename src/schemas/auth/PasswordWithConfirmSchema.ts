import z from 'zod';

import { PasswordSchema } from '@/schemas/common';

export const PasswordWithConfirmSchema = z
  .object({
    password: PasswordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export type PasswordWithConfirmInput = z.infer<
  typeof PasswordWithConfirmSchema
>;
