import type { CSSProperties } from 'react';

import {
  getBezierPath,
  getSmoothStepPath,
  getStraightPath,
} from '@xyflow/react';
import { darken } from 'polished';

import { cn } from '@/lib/utils';

import type { Position } from '@xyflow/react';

import type { EdgeData } from '@/schemas/roadmap';

interface UseEdgeStylesParams {
  sourceX: number;
  sourceY: number;
  targetX: number;
  targetY: number;
  sourcePosition?: Position;
  targetPosition?: Position;
  data?: EdgeData;
  selected?: boolean;
}

export const useEdgeStyles = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  selected = false,
}: UseEdgeStylesParams) => {
  const routingType = data?.routingType || 'bezier';
  const pathParams = {
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  };

  let edgePath = '';
  let labelX = 0;
  let labelY = 0;

  switch (routingType) {
    case 'smoothstep':
      [edgePath, labelX, labelY] = getSmoothStepPath(pathParams);
      break;
    case 'straight':
      [edgePath, labelX, labelY] = getStraightPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
      });
      break;
    case 'bezier':
    default:
      [edgePath, labelX, labelY] = getBezierPath(pathParams);
      break;
  }

  const isDashed = data?.lineStyle === 'dashed';
  const isAnimated = data?.animated;

  const edgeClassName = cn(
    'transition-[stroke,stroke-width] duration-200',
    selected ? 'stroke-2' : 'stroke-[1.2]',
    isDashed ? 'stroke-dash-custom' : 'stroke-none',
    isAnimated && 'animate-roadmap-dash',
  );

  const defaultColor = data?.color || '#999999';
  const edgeStyle: CSSProperties = {
    stroke: selected ? darken(0.2, defaultColor) : defaultColor,
  };

  return {
    edgePath,
    labelX,
    labelY,
    edgeClassName,
    edgeStyle,
  };
};
