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

import { useFlowStore } from '@/store/useFlowStore';

import { Button } from '../ui/Button';
import { ButtonGroup } from '../ui/ButtonGroup';

import type { Node, NodeProps } from '@xyflow/react';

import type { NodeData } from '@/shcemas/NodeDataSchema';

type RoadmapNodeData = Node<NodeData>;

const RoadmapNode = ({ id, data, selected }: NodeProps<RoadmapNodeData>) => {
  const { deleteElements, getNode, setNodes } = useReactFlow();
  const openSidebar = useFlowStore((store) => store.openSidebar);

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
            onClick={() => openSidebar({ type: 'node', id, data })}
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

      {!isRootNode && <Handle type="target" position={Position.Top} />}
      <div className="flex items-center justify-between gap-4 text-left w-full max-w-80">
        <div
          className="border flex justify-center items-center size-10 text-2xl rounded-full shrink-0"
          style={{ borderColor: border, backgroundColor: icon }}
        >
          {data.emoji}
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

export default memo(RoadmapNode);
