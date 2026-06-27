import type { EdgeData } from '@/schemas/EdgeDataSchema';
import type { NodeData } from '@/schemas/NodeDataSchema';

export type FlowNodeElement = { type: 'node'; id: string; data: NodeData };

export type FlowEdgeElement = {
  type: 'edge';
  id: string;
  data: EdgeData | undefined;
};

export type FlowElement = FlowNodeElement | FlowEdgeElement | null;
