'use client';

import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';

import { RoadmapEdge } from '@/components/roadmap-edge';
import { FlowSheetContentSwitcher } from '@/components/roadmap-editor/FlowSheetContentSwitcher';
import { RoadmapNode } from '@/components/roadmap-node';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/Sheet';
import {
  INITIAL_EDGES,
  INITIAL_NODES,
  ROADMAP_TYPES,
} from '@/constants/roadmap';
import { useFlowClipboard } from '@/hooks/useFlowClipboard';
import { useMousePosition } from '@/hooks/useMousePosition';
import { useRoadmap } from '@/hooks/useRoadmap';
import { useFlowStore } from '@/store/useFlowStore';

import '@xyflow/react/dist/style.css';

const nodeTypes = { RoadmapNode };
const edgeTypes = { RoadmapEdge };

export function RoadmapEditor() {
  const activeElement = useFlowStore((s) => s.activeElement);
  const mode = useFlowStore((s) => s.mode);
  const openSidebar = useFlowStore((s) => s.openSidebar);
  const closeSidebar = useFlowStore((s) => s.closeSidebar);

  const mousePosRef = useMousePosition();

  const {
    edges,
    nodes,
    onConnect,
    onConnectEnd,
    onConnectStart,
    onEdgesChange,
    onNodesChange,
    onNodesDelete,
    onReconnect,
  } = useRoadmap();

  useFlowClipboard({ mousePosRef });

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onConnect={onConnect}
        onConnectEnd={onConnectEnd}
        onConnectStart={onConnectStart}
        onEdgesChange={onEdgesChange}
        onNodesChange={onNodesChange}
        onNodesDelete={onNodesDelete}
        onReconnect={onReconnect}
        onNodeDoubleClick={(_, node) =>
          openSidebar({ type: 'node', id: node.id, data: node.data })
        }
        onEdgeDoubleClick={(_, edge) =>
          openSidebar({ type: 'edge', id: edge.id, data: edge.data })
        }
        defaultEdgeOptions={{ type: ROADMAP_TYPES.edge }}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap nodeStrokeWidth={3} />
      </ReactFlow>

      <Sheet
        open={!!activeElement}
        onOpenChange={(isOpen) => !isOpen && closeSidebar()}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle>
              {mode === 'edit' ? 'Редактирование' : 'Информация'}
            </SheetTitle>
            <SheetDescription>
              {activeElement?.type === 'node'
                ? 'Параметры узла карты'
                : 'Параметры связи'}
            </SheetDescription>
          </SheetHeader>

          <div className="mt-4 h-full">
            <FlowSheetContentSwitcher />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
