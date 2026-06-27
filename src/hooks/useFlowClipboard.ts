import type { RefObject } from 'react';
import { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import { useReactFlow } from '@xyflow/react';

import { DEFAULT_EDGE_DATA } from '@/constants/roadmap';

import type { Edge, Node } from '@xyflow/react';

import type { EdgeData } from '@/schemas/EdgeDataSchema';
import type { NodeData } from '@/schemas/NodeDataSchema';

interface UseFlowClipboardParams {
  mousePosRef: RefObject<{ x: number; y: number }>;
}

export const useFlowClipboard = ({ mousePosRef }: UseFlowClipboardParams) => {
  const { screenToFlowPosition, getNodes, getEdges, setNodes, setEdges } =
    useReactFlow<Node<NodeData>, Edge<EdgeData>>();

  const [clipboard, setClipboard] = useState<{
    nodes: Node<NodeData>[];
    edges: Edge<EdgeData>[];
  } | null>(null);

  useHotkeys('ctrl+c', () => {
    const selectedNodes = getNodes().filter((n) => n.selected);
    const selectedIds = new Set(selectedNodes.map((n) => n.id));
    const selectedEdges = getEdges().filter(
      (e) => selectedIds.has(e.source) && selectedIds.has(e.target),
    );

    setClipboard({ nodes: selectedNodes, edges: selectedEdges });
  });

  useHotkeys('ctrl+v', () => {
    if (!clipboard || !mousePosRef.current) return;

    const cursorFlow = screenToFlowPosition(mousePosRef.current);
    const minX = Math.min(...clipboard.nodes.map((n) => n.position.x));
    const minY = Math.min(...clipboard.nodes.map((n) => n.position.y));

    const idMap = new Map<string, string>();

    const newNodes: Node<NodeData>[] = clipboard.nodes.map((node) => {
      const newId = crypto.randomUUID();
      idMap.set(node.id, newId);

      return {
        ...node,
        id: newId,
        position: {
          x: node.position.x - minX + cursorFlow.x,
          y: node.position.y - minY + cursorFlow.y,
        },
        data: { ...node.data },
        selected: true,
      };
    });

    const newEdges: Edge<EdgeData>[] = clipboard.edges.map((edge) => ({
      ...edge,
      id: crypto.randomUUID(),
      source: idMap.get(edge.source)!,
      target: idMap.get(edge.target)!,
      data: { ...DEFAULT_EDGE_DATA },
    }));

    setNodes((nds) => [
      ...nds.map((n) => ({ ...n, selected: false })),
      ...newNodes,
    ]);
    setEdges((eds) => [...eds, ...newEdges]);
  });
};
