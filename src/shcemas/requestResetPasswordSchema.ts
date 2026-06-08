import { z } from 'zod';

export const requestResetPasswordSchema = z.object({
  email: z.email('Некорректный формат email'),
});

export type RequestResetPasswordInput = z.infer<
  typeof requestResetPasswordSchema
>;
