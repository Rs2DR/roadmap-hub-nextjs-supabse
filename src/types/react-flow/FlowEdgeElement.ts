import type { EdgeData } from '@/schemas/roadmap/EdgeDataSchema';

export type FlowEdgeElement = {
  type: 'edge';
  id: string;
  data: EdgeData | undefined;
};
