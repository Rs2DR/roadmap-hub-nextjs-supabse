import { memo, useState } from 'react';

import {
  Handle,
  Position,
  NodeToolbar,
  useReactFlow,
  useStore,
} from '@xyflow/react';
import { BookOpen, Copy, Pencil, Trash } from 'lucide-react';
import { lighten, darken } from 'polished';

import { Button } from '../ui/Button';
import { ButtonGroup } from '../ui/ButtonGroup';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '../ui/Sheet';

import { NodeEditorForm } from './NodeEditorForm';

import type { Node, NodeProps } from '@xyflow/react';

import type { NodeData } from '@/shcemas/NodeDataSchema';

type RoadmapNodeData = Node<NodeData, 'custom'>;

const CustomRoadmapNode = ({
  id,
  data,
  selected,
}: NodeProps<RoadmapNodeData>) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { deleteElements, getNode, setNodes } = useReactFlow();

  const selectedNodesCount = useStore(
    (state) => state.nodes.filter((n) => n.selected).length,
  );

  const isRootNode = id === 'root';

  const border = darken(0.2, data.color);
  const background = lighten(0.3, data.color);
  const icon = lighten(0.2, data.color);

  const handleDelete = () => {
    if (isRootNode) return;
    deleteElements({ nodes: [{ id }] });
  };

  const handleCopy = () => {
    const node = getNode(id);
    if (!node) return;

    const newId = crypto.randomUUID();

    setNodes((nds) => [
      ...nds,
      {
        ...node,
        id: newId,
        position: {
          x: node.position.x,
          y: node.position.y + 100,
        },
        selected: false,
      },
    ]);
  };

  return (
    <div
      className="border rounded-md px-4 py-2"
      onDoubleClick={() => setIsSheetOpen(true)}
      style={{ borderColor: border, backgroundColor: background }}
    >
      <NodeToolbar
        isVisible={selected && selectedNodesCount === 1}
        position={Position.Right}
      >
        <ButtonGroup orientation="vertical">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsSheetOpen(true)}
          >
            <Pencil />
          </Button>

          <Button variant="outline" size="icon" onClick={handleCopy}>
            <Copy />
          </Button>

          {!isRootNode && (
            <Button
              variant="destructive"
              className="border-border"
              size="icon"
              onClick={handleDelete}
            >
              <Trash />
            </Button>
          )}
        </ButtonGroup>
      </NodeToolbar>

      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Редактор узла</SheetTitle>
            <SheetDescription>
              Здесь вы можете оформить узел Roadmap и добавить нужную информацию
            </SheetDescription>
          </SheetHeader>

          <NodeEditorForm
            nodeId={id}
            defaultValues={data}
            onClose={() => setIsSheetOpen(false)}
          />
        </SheetContent>
      </Sheet>

      {!isRootNode && <Handle type="target" position={Position.Top} />}
      <div className="flex items-center justify-between gap-4 text-left w-full max-w-80">
        <div
          className="border p-2 rounded-full"
          style={{ borderColor: border, backgroundColor: icon }}
        >
          <BookOpen className="shrink-0" style={{ color: border }} size={20} />
        </div>
        <div className="flex flex-col overflow-hidden">
          <div className=" inline-flex items-center gap-2">
            <span className="font-semibold text-md">
              {data.label || 'Без названия'}
            </span>
          </div>

          {data.description.length > 0 && (
            <span className="text-xs text-muted-foreground line-clamp-3 mt-1">
              {data.description}
            </span>
          )}
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
};

export default memo(CustomRoadmapNode);
