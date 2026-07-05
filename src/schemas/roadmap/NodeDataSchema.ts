import { NodeDataDbSchema } from '@/schemas/roadmap/db';

import type z from 'zod';

export const NodeDataSchema = NodeDataDbSchema;

export type NodeData = z.infer<typeof NodeDataSchema>;
