import type { EdgeData } from '@/schemas/EdgeDataSchema';
import type { NodeData } from '@/schemas/roadmap/NodeDataSchema';

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
  color: '#3b82f6',
  lineStyle: 'solid',
  animated: false,
};
