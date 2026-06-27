import { z } from 'zod';

import { EDGE_LINE_STYLES, EDGE_ROUTING_TYPES } from '@/constants/edge';

import { HexSchema } from './HexSchema';

import type { EdgeLineStyle } from '@/types/EdgeLineStyle';
import type { EdgeRoutingType } from '@/types/EdgeRoutingType';

export const EdgeDataSchema = z.object({
  routingType: z.enum(Object.keys(EDGE_ROUTING_TYPES) as EdgeRoutingType[]),
  lineStyle: z.enum(Object.keys(EDGE_LINE_STYLES) as EdgeLineStyle[]),
  color: HexSchema,
  animated: z.boolean(),
});

export type EdgeData = z.infer<typeof EdgeDataSchema>;
