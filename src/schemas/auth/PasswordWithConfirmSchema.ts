import z from 'zod';

import { PasswordSchema } from '@/schemas/share';

export const PasswordWithConfirmSchema = z
  .object({
    password: PasswordSchema,
    confirmPassword: z.string().min(8, 'Подтвердите пароль'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Пароли не совпадают',
    path: ['confirmPassword'],
  });

export type PasswordWithConfirmInput = z.infer<
  typeof PasswordWithConfirmSchema
>;
