import { EdgeLabelRenderer, useReactFlow, useStore } from '@xyflow/react';
import { Pencil, Trash } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { useFlowStore } from '@/store/useFlowStore';

import type { EdgeData } from '@/shcemas/EdgeDataSchema';

interface RoadmapEdgeToolbarProps {
  id: string;
  data?: EdgeData;
  selected?: boolean;
  labelX: number;
  labelY: number;
}

export function RoadmapEdgeToolbar({
  id,
  data,
  selected,
  labelX,
  labelY,
}: RoadmapEdgeToolbarProps) {
  const { deleteElements } = useReactFlow();
  const openSidebar = useFlowStore((s) => s.openSidebar);
  const selectedEdgesCount = useStore(
    (state) => state.edges.filter((e) => e.selected).length,
  );

  if (selected && selectedEdgesCount === 1) return null;

  return (
    <EdgeLabelRenderer>
      <div
        style={{
          position: 'absolute',
          transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
        }}
        className="flex flex-col items-center gap-1 pointer-events-auto"
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
  );
}
