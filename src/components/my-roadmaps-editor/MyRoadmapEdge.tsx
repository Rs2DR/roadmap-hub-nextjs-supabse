import { memo, useState } from 'react';

import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  useReactFlow,
} from '@xyflow/react';
import { Pencil, Trash } from 'lucide-react';

import { Button } from '../ui/Button';
import { ButtonGroup } from '../ui/ButtonGroup';
import { Input } from '../ui/Input';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetTrigger,
} from '../ui/Sheet';

import type { Edge, EdgeProps } from '@xyflow/react';

type EdgeLabel = Edge<{ label: string }, 'text'>;

const MyRoadmapEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  selected,
  data,
}: EdgeProps<EdgeLabel>) => {
  const [open, setOpen] = useState(false);
  const [label, setLabel] = useState(data?.label || '');

  const { deleteElements } = useReactFlow();

  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  const handleDelete = () => {
    deleteElements({ edges: [{ id }] });
  };

  return (
    <>
      {/* сама линия */}
      <BaseEdge
        path={edgePath}
        style={{ stroke: selected ? '#333' : '#999', strokeWidth: 1 }}
      />

      {/* кликабельная зона */}
      <path
        d={edgePath}
        fill="none"
        stroke="transparent"
        strokeWidth={10}
        onDoubleClick={() => setOpen(true)}
        style={{ cursor: 'pointer' }}
      />

      {/* label + sheet */}
      {selected && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(25%, -50%) translate(${labelX}px, ${labelY}px)`,
              pointerEvents: 'all',
            }}
          >
            <ButtonGroup>
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon-xs">
                    <Pencil />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Редактор связи</SheetTitle>
                    <SheetDescription>
                      Настрой параметры связи между узлами
                    </SheetDescription>
                  </SheetHeader>

                  <div className="px-4">
                    <Input
                      value={label}
                      onChange={(e) => setLabel(e.target.value)}
                      placeholder="Название связи"
                    />
                  </div>
                  <SheetFooter>
                    <Button>Сохранить</Button>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
              <Button
                variant="destructive"
                className="border-border"
                size="icon-xs"
                onClick={handleDelete}
              >
                <Trash />
              </Button>
            </ButtonGroup>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};

export default memo(MyRoadmapEdge);
