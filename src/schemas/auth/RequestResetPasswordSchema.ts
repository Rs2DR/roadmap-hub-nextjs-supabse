import { z } from 'zod';

export const RequestResetPasswordSchema = z.object({
  email: z.email('Некорректный формат email'),
});

export type RequestResetPasswordInput = z.infer<
  typeof RequestResetPasswordSchema
>;
