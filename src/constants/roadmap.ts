import { EDGE_LINE_STYLES, EDGE_ROUTING_TYPES } from '@/constants/edge';

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
  color: '#3b82f6',
  lineStyle: 'solid',
  animated: false,
};
