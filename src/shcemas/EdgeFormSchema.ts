import { z } from 'zod';

export const EdgeDataSchema = z.object({
  label: z.string().optional(),
  routingType: z.enum(['bezier', 'smoothstep', 'straight']),
  lineStyle: z.enum(['solid', 'dashed']),
  color: z
    .string()
    .regex(/^#([\dA-Fa-f]{6}|[\dA-Fa-f]{3})$/, 'Неверный HEX формат'),
  animated: z.boolean(),
});

export type EdgeData = z.infer<typeof EdgeDataSchema>;
