import { memo } from 'react';

import {
  Handle,
  Position,
  NodeToolbar,
  useReactFlow,
  useStore,
} from '@xyflow/react';
import { Copy, Pencil, Trash } from 'lucide-react';
import { lighten, darken } from 'polished';

import { NODE_COPY_OFFSET, NODE_PLACEHOLDERS } from '@/constants/node';
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

  const styles = {
    border: darken(0.2, data.color),
    background: lighten(0.3, data.color),
    iconBg: lighten(0.2, data.color),
  };

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
          x: node.position.x + NODE_COPY_OFFSET.x,
          y: node.position.y + NODE_COPY_OFFSET.y,
        },
        selected: false,
      },
    ]);
  };

  const handleEdit = () => {
    openSidebar({ type: 'node', id, data });
  };

  return (
    <div
      className="border rounded-md px-4 py-2"
      style={{ borderColor: styles.border, backgroundColor: styles.background }}
    >
      {/* Тулбар действий над нодой */}
      <NodeToolbar
        isVisible={selected && selectedNodesCount === 1}
        position={Position.Right}
      >
        <ButtonGroup orientation="vertical">
          <Button variant="outline" size="icon" onClick={handleEdit}>
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

      {/* Входной порт для связей (у Root его нет) */}
      {!isRootNode && (
        <Handle
          style={{
            borderColor: styles.border,
            backgroundColor: styles.background,
          }}
          type="target"
          position={Position.Top}
        />
      )}

      {/* Контентная часть карточки */}
      <div className="flex items-center justify-between gap-4 text-left w-full max-w-80">
        {/* Иконка / Эмодзи */}
        <div
          className="border flex justify-center items-center size-10 text-2xl rounded-full shrink-0"
          style={{ borderColor: styles.border, backgroundColor: styles.iconBg }}
        >
          {data.emoji}
        </div>

        {/* Текстовый блок */}
        <div className="flex flex-col overflow-hidden">
          <div className="inline-flex items-center gap-2">
            <span className="font-semibold text-md">
              {data.label || NODE_PLACEHOLDERS.fallbackLabel}
            </span>
          </div>

          {data.description && data.description.length > 0 && (
            <span className="text-xs text-muted-foreground line-clamp-3 mt-1">
              {data.description}
            </span>
          )}
        </div>
      </div>

      {/* Выходной порт для связей */}
      <Handle
        style={{
          borderColor: styles.border,
          backgroundColor: styles.background,
        }}
        type="source"
        position={Position.Bottom}
      />
    </div>
  );
};

export default memo(RoadmapNode);
