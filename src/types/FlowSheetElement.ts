import type { EdgeData } from '@/schemas/EdgeDataSchema';
import type { NodeData } from '@/schemas/NodeDataSchema';

export type FlowSheetElement =
  | { type: 'node'; id: string; data: NodeData }
  | { type: 'edge'; id: string; data: EdgeData | undefined }
  | null;
