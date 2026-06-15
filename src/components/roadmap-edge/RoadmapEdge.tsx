import { memo } from 'react';

import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  getSmoothStepPath,
  getStraightPath,
  useReactFlow,
  useStore,
} from '@xyflow/react';
import { Pencil, Trash } from 'lucide-react';
import { darken } from 'polished';

import { useEdgeStyles } from '@/hooks/useEdgeStyles';
import { cn } from '@/lib/utils';
import { useFlowStore } from '@/store/useFlowStore';

import { Button } from '../ui/Button';
import { ButtonGroup } from '../ui/ButtonGroup';

import type { Edge, EdgeProps } from '@xyflow/react';

import type { EdgeData } from '@/shcemas/EdgeDataSchema';

type RoadmapEdgeData = Edge<EdgeData>;

const RoadmapEdge = (props: EdgeProps<RoadmapEdgeData>) => {
  const { id, selected, data } = props;
  const { deleteElements } = useReactFlow();
  const openSidebar = useFlowStore((s) => s.openSidebar);
  const selectedEdgesCount = useStore(
    (state) => state.edges.filter((e) => e.selected).length,
  );

  const { edgePath, labelX, labelY, edgeClassName, edgeStyle } =
    useEdgeStyles(props);

  return (
    <>
      {/* Основная линия */}
      <BaseEdge
        id={id}
        path={edgePath}
        style={edgeStyle}
        className={edgeClassName}
      />

      {/* Интерактивная зона для кликов */}
      <path
        d={edgePath}
        fill="none"
        stroke="transparent"
        className="stroke-2 cursor-pointer"
      />

      {/* Тулбар управления */}
      {selected && selectedEdgesCount === 1 && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
            }}
            className="flex flex-col items-center gap-1 pointer-events-all"
          >
            <ButtonGroup>
              <Button
                variant="outline"
                size="icon-xs"
                onClick={() => openSidebar({ type: 'edge', id, data })}
              >
                <Pencil size={12} />
              </Button>
              <Button
                variant="destructive"
                className="border-border"
                size="icon-xs"
                onClick={() => deleteElements({ edges: [{ id }] })}
              >
                <Trash size={12} />
              </Button>
            </ButtonGroup>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};

export default memo(RoadmapEdge);
