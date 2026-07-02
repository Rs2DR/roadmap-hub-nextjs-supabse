import { z } from 'zod';

import { EmailSchema } from '@/schemas/share';

export const RequestResetPasswordSchema = z.object({
  email: EmailSchema,
});

export type RequestResetPasswordInput = z.infer<
  typeof RequestResetPasswordSchema
>;
