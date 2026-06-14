import { z } from 'zod';

import { HexSchema } from './HexSchema';

export const EdgeDataSchema = z.object({
  routingType: z.enum(['bezier', 'smoothstep', 'straight']),
  lineStyle: z.enum(['solid', 'dashed']),
  color: HexSchema,
  animated: z.boolean(),
});

export type EdgeData = z.infer<typeof EdgeDataSchema>;
