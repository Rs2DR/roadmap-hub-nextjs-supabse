'use client';

import { ReactFlow, Background, Controls, MiniMap } from '@xyflow/react';

import { FlowSheet } from '@/components/flow-sheet';
import { RoadmapConnectionLine } from '@/components/roadmap-connection-line';
import { RoadmapEdge } from '@/components/roadmap-edge';
import { RoadmapNode } from '@/components/roadmap-node';
import { ROADMAP_TYPES } from '@/constants/roadmap';
import { useFlowClipboard } from '@/hooks/useFlowClipboard';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useRoadmap } from '@/hooks/useRoadmap';

import '@xyflow/react/dist/style.css';

const nodeTypes = { RoadmapNode };
const edgeTypes = { RoadmapEdge };

export function RoadmapEditor() {
  const roadmap = useRoadmap();
  const mousePosRef = useMousePosition();

  useFlowClipboard({ mousePosRef });

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <ReactFlow
        {...roadmap}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        connectionLineComponent={RoadmapConnectionLine}
        defaultEdgeOptions={{ type: ROADMAP_TYPES.edge }}
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
