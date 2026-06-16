import { memo } from 'react';

import {
  BaseEdge,
  EdgeLabelRenderer,
  useReactFlow,
  useStore,
} from '@xyflow/react';
import { Pencil, Trash } from 'lucide-react';

import { RoadmapEdgeToolbar } from '@/components/roadmap-edge/RoadmapEdgeToolbar';
import { useEdgeStyles } from '@/hooks/useEdgeStyles';

import type { Edge, EdgeProps } from '@xyflow/react';

import type { EdgeData } from '@/shcemas/EdgeDataSchema';

type RoadmapEdgeData = Edge<EdgeData>;

const RoadmapEdge = (props: EdgeProps<RoadmapEdgeData>) => {
  const { id, selected, data } = props;

  const { edgePath, labelX, labelY, edgeClassName, edgeStyle } =
    useEdgeStyles(props);

  return (
    <>
      <RoadmapEdgeToolbar
        id={id}
        data={data}
        selected={selected}
        labelX={labelX}
        labelY={labelY}
      />
      <BaseEdge
        id={id}
        path={edgePath}
        style={edgeStyle}
        className={edgeClassName}
      />
      <path
        d={edgePath}
        fill="none"
        stroke="transparent"
        className="stroke-2 cursor-pointer"
      />
    </>
  );
};

export default memo(RoadmapEdge);
