import type { ROADMAP_FILTER_OPTIONS } from '@/constants/form';

export type RoadmapOrderBy =
  (typeof ROADMAP_FILTER_OPTIONS.ORDER_BY)[keyof typeof ROADMAP_FILTER_OPTIONS.ORDER_BY];
