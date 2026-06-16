import type { Edge, Node } from '@xyflow/react';

import type { EdgeData } from '@/shcemas/EdgeDataSchema';
import type { NodeData } from '@/shcemas/NodeDataSchema';

export const ROADMAP_TYPES = {
  node: 'RoadmapNode',
  edge: 'RoadmapEdge',
} as const;

export const DEFAULT_NODE_DATA: NodeData = {
  label: 'Без названия',
  color: '#3b82f6',
  description: '',
  links: [],
  timeToLearn: '',
  emoji: '😃',
};

export const DEFAULT_EDGE_DATA: EdgeData = {
  routingType: 'bezier',
  color: '#999999',
  lineStyle: 'solid',
  animated: false,
};

export const INITIAL_NODES: Node<NodeData>[] = [
  {
    id: 'root',
    position: { x: 700, y: 1000 },
    data: { ...DEFAULT_NODE_DATA, label: 'Node 1' },
    type: ROADMAP_TYPES.node,
  },
  {
    id: 'n2',
    position: { x: 800, y: 1100 },
    data: { ...DEFAULT_NODE_DATA, label: 'Node 2' },
    type: ROADMAP_TYPES.node,
  },
];

export const INITIAL_EDGES: Edge<EdgeData>[] = [
  {
    id: 'n1-n2',
    source: 'root',
    target: 'n2',
    data: DEFAULT_EDGE_DATA,
    type: ROADMAP_TYPES.edge,
  },
];
