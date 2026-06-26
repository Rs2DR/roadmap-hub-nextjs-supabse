import type { EdgeData } from '@/shcemas/EdgeDataSchema';
import type { NodeData } from '@/shcemas/NodeDataSchema';

export type FlowSheetElement =
  | { type: 'node'; id: string; data: NodeData }
  | { type: 'edge'; id: string; data: EdgeData | undefined }
  | null;
