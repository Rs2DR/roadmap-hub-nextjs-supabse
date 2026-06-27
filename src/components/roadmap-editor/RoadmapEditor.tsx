'use client';

import { useState } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useReactFlow,
} from '@xyflow/react';

import { CustomAlertDialog } from '@/components/custom-alert-dialog';
import { FlowDrawerEditor } from '@/components/flow-drawer-editor';
import { RoadmapConnectionLine } from '@/components/roadmap-connection-line';
import { RoadmapEdge } from '@/components/roadmap-edge';
import { RoadmapNode } from '@/components/roadmap-node';
import { Button } from '@/components/ui/Button';
import { ButtonGroup } from '@/components/ui/ButtonGroup';
import { DEFAULT_EDGE_DATA, ROADMAP_TYPES } from '@/constants/roadmap';
import { useFlowClipboard } from '@/hooks/useFlowClipboard';
import { useMousePosition } from '@/hooks/useMousePosition';
import { usePublishRoadmap } from '@/hooks/usePublishRoadmap';
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
  const { mutate: saveRoadmapGraph, isPending: isSaving } =
    useSaveRoadmapGraph();
  const { mutate: publishRoadmap, isPending: isPublishing } =
    usePublishRoadmap();

  const { getViewport } = useReactFlow();
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const { nodes, edges, ...handlers } = useRoadmap({
    initialNodes: data.nodes,
    initialEdges: data.edges,
  });
  const mousePosRef = useMousePosition();

  useFlowClipboard({ mousePosRef });

  const handleSave = () => {
    saveRoadmapGraph({
      id,
      nodes,
      edges,
      viewport: getViewport(),
    });
  };

  const handlePublish = () => {
    publishRoadmap({ id });
  };

  return (
    <div className="relative w-full h-full">
      <ButtonGroup className="absolute z-50 right-2 top-2">
        <Button variant="outline" onClick={() => setIsOpenDialog(true)}>
          Опубликовать
        </Button>
        <Button
          onClick={handleSave}
          disabled={isSaving || isPublishing}
          loading={isSaving}
        >
          Сохранить
        </Button>
      </ButtonGroup>
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

      <FlowDrawerEditor />
      <CustomAlertDialog
        open={isOpenDialog}
        onOpenChange={setIsOpenDialog}
        title="Вы уверены, что хотите опубликовать Roadmap?"
        description="Последняя сохраненная версия станет доступна всем!"
        onConfirm={handlePublish}
      />
    </div>
  );
}
