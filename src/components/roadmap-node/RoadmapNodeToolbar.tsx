import { NodeToolbar, Position, useReactFlow, useStore } from '@xyflow/react';
import { Copy, Pencil, Trash } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { NODE_COPY_OFFSET } from '@/constants/node';
import { useFlowStore } from '@/store/useFlowStore';

import type { NodeData } from '@/schemas/NodeDataSchema';

interface RoadmapNodeToolbarProps {
  id: string;
  data: NodeData;
  selected: boolean;
  isRootNode: boolean;
}

export function RoadmapNodeToolbar({
  id,
  data,
  selected,
  isRootNode,
}: RoadmapNodeToolbarProps) {
  const { deleteElements, getNode, setNodes } = useReactFlow();
  const openSidebar = useFlowStore((store) => store.openSidebar);

  const selectedNodesCount = useStore(
    (state) => state.nodes.filter((n) => n.selected).length,
  );

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
  );
}
