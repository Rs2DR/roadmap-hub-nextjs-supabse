import { z } from 'zod';

import { PasswordWithConfirmSchema } from '@/schemas/auth';
import { EmailSchema, NameSchema } from '@/schemas/share';

export const SignUpSchema = z
  .object({
    name: NameSchema,
    email: EmailSchema,
  })
  .extend(PasswordWithConfirmSchema.shape);

export type SignUpInput = z.infer<typeof SignUpSchema>;
