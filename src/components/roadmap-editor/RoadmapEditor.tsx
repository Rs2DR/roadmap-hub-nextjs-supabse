'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useReactFlow,
} from '@xyflow/react';
import { notFound } from 'next/navigation';

import { FlowSheet } from '@/components/flow-sheet';
import { RoadmapConnectionLine } from '@/components/roadmap-connection-line';
import { RoadmapEdge } from '@/components/roadmap-edge';
import { RoadmapNode } from '@/components/roadmap-node';
import { Button } from '@/components/ui/Button';
import { DEFAULT_EDGE_DATA, ROADMAP_TYPES } from '@/constants/roadmap';
import { useFlowClipboard } from '@/hooks/useFlowClipboard';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useRoadmap } from '@/hooks/useRoadmap';
import { useSaveRoadmapGraph } from '@/hooks/useSaveRoadmapGraph';
import { getRoadmapForEditQueryOptions } from '@/queries/getRoadmapForEditQueryOptions';

import '@xyflow/react/dist/style.css';

const nodeTypes = { RoadmapNode };
const edgeTypes = { RoadmapEdge };

interface RoadmapEditorProps {
  id: string;
}

export function RoadmapEditor({ id }: RoadmapEditorProps) {
  const { data } = useSuspenseQuery(getRoadmapForEditQueryOptions({ id }));
  const { mutate, isPending } = useSaveRoadmapGraph();
  const { getViewport } = useReactFlow();

  const { nodes, edges, ...handlers } = useRoadmap({
    initialNodes: data.nodes,
    initialEdges: data.edges,
  });
  const mousePosRef = useMousePosition();

  useFlowClipboard({ mousePosRef });

  const handleSave = () => {
    mutate({
      id,
      nodes,
      edges,
      viewport: getViewport(),
    });
  };

  return (
    <div className="relative w-full h-full">
      <Button
        className="absolute z-50 right-2 top-2"
        onClick={handleSave}
        disabled={isPending}
        loading={isPending}
      >
        Сохранить
      </Button>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        {...handlers}
        connectionLineComponent={RoadmapConnectionLine}
        defaultEdgeOptions={{
          type: ROADMAP_TYPES.edge,
          data: { ...DEFAULT_EDGE_DATA },
        }}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap nodeStrokeWidth={3} />
      </ReactFlow>

      <FlowSheet />
    </div>
  );
}
