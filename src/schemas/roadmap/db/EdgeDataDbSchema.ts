import { z } from 'zod';

import { EDGE_LINE_STYLES, EDGE_ROUTING_TYPES } from '@/constants/edge';
import { HexSchema } from '@/schemas/common';

import type { EdgeLineStyle, EdgeRoutingType } from '@/types/roadmap';

export const EdgeDataDbSchema = z.object({
  routingType: z.enum(Object.keys(EDGE_ROUTING_TYPES) as EdgeRoutingType[]),
  lineStyle: z.enum(Object.keys(EDGE_LINE_STYLES) as EdgeLineStyle[]),
  color: HexSchema,
  animated: z.boolean(),
});

export type EdgeDataDb = z.infer<typeof EdgeDataDbSchema>;
