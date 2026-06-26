'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { ReactFlow, Background, MiniMap } from '@xyflow/react';

import { FlowSheetViewer } from '@/components/flow-sheet-viewer';
import { RoadmapConnectionLine } from '@/components/roadmap-connection-line';
import { RoadmapEdge } from '@/components/roadmap-edge';
import { RoadmapNode } from '@/components/roadmap-node';
import { DEFAULT_EDGE_DATA, ROADMAP_TYPES } from '@/constants/roadmap';
import { useRoadmap } from '@/hooks/useRoadmap';
import { getRoadmapForViewQueryOptions } from '@/queries/getRoadmapForViewQueryOptions';

import '@xyflow/react/dist/style.css';

const nodeTypes = { RoadmapNode };
const edgeTypes = { RoadmapEdge };

interface RoadmapViewerProps {
  id: string;
}

export function RoadmapViewer({ id }: RoadmapViewerProps) {
  const { data } = useSuspenseQuery(getRoadmapForViewQueryOptions({ id }));

  const { nodes, edges, onNodeDoubleClick } = useRoadmap({
    initialNodes: data.nodes,
    initialEdges: data.edges,
  });

  return (
    <div className="relative w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodeDoubleClick={onNodeDoubleClick}
        connectionLineComponent={RoadmapConnectionLine}
        defaultEdgeOptions={{
          type: ROADMAP_TYPES.edge,
          data: { ...DEFAULT_EDGE_DATA },
        }}
        edgesFocusable={false}
        deleteKeyCode={null}
        fitView
      >
        <Background />
        <MiniMap nodeStrokeWidth={3} />
      </ReactFlow>

      <FlowSheetViewer />
    </div>
  );
}
