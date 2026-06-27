import type { EdgeData } from '@/schemas/roadmap';
import type { NodeData } from '@/schemas/roadmap/NodeDataSchema';

export type FlowNodeElement = { type: 'node'; id: string; data: NodeData };

export type FlowEdgeElement = {
  type: 'edge';
  id: string;
  data: EdgeData | undefined;
};

export type FlowElement = FlowNodeElement | FlowEdgeElement | null;
