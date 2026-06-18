import { memo } from 'react';

import { useReactFlow } from '@xyflow/react';

import { DEFAULT_EDGE_DATA } from '@/constants/roadmap';
import { useEdgeStyles } from '@/hooks/useEdgeStyles';
import { useReconnectStore } from '@/store/useReconnectStore';

import type { ConnectionLineComponentProps, Edge, Node } from '@xyflow/react';

import type { EdgeData } from '@/shcemas/EdgeDataSchema';
import type { NodeData } from '@/shcemas/NodeDataSchema';

const RoadmapConnectionLine = (props: ConnectionLineComponentProps) => {
  const { fromX, fromY, toX, toY, fromPosition, toPosition } = props;
  const { getEdge } = useReactFlow<Node<NodeData>, Edge<EdgeData>>();
  const edgeId = useReconnectStore((s) => s.reconnectingEdgeId);

  const data = edgeId ? getEdge(edgeId)?.data : { ...DEFAULT_EDGE_DATA };

  const { edgePath, edgeClassName, edgeStyle } = useEdgeStyles({
    sourceX: fromX,
    sourceY: fromY,
    targetX: toX,
    targetY: toY,
    sourcePosition: fromPosition,
    targetPosition: toPosition,
    data,
    selected: false,
  });

  return (
    <g>
      <path
        d={edgePath}
        fill="none"
        stroke={data?.color}
        className={edgeClassName}
        style={edgeStyle}
      />
      <circle
        cx={toX}
        cy={toY}
        fill="#fff"
        r={3}
        stroke={data?.color}
        strokeWidth={1.2}
      />
    </g>
  );
};

export default memo(RoadmapConnectionLine);
