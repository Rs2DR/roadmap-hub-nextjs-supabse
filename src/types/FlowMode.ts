import type { FLOW_MODE } from '@/constants/flow';

export type FlowMode = (typeof FLOW_MODE)[keyof typeof FLOW_MODE];
