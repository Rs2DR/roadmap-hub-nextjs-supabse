'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import {
  ReactFlow,
  Background,
  Controls,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  MiniMap,
  useNodesState,
  useEdgesState,
  useReactFlow,
  reconnectEdge,
} from '@xyflow/react';

import CustomRoadmapNode from '../custom-roadmap-node/CustomRoadmapNode';

import MyRoadmapEdge from './MyRoadmapEdge';

import type {
  Edge,
  EdgeTypes,
  Node,
  NodeTypes,
  OnConnect,
  OnConnectEnd,
  OnConnectStart,
  OnEdgesChange,
  OnNodesChange,
  OnNodesDelete,
  OnReconnect,
} from '@xyflow/react';

import type { NodeData } from '@/shcemas/NodeDataSchema';

import '@xyflow/react/dist/style.css';

const initialNodes: Node[] = [
  {
    id: 'root',
    position: { x: 700, y: 1000 },
    data: {
      label: 'Node 1',
      color: '#3b82f6',
      description: '',
      links: [],
      timeToLearn: '',
    },

    type: 'CustomRoadmapNode',
  },
  {
    id: 'n2',
    position: { x: 800, y: 1100 },
    data: {
      label: 'Node 2',
      color: '#3b82f6',
      description: '',
      links: [],
      timeToLearn: '',
    },
    type: 'CustomRoadmapNode',
  },
];

const initialEdges: Edge[] = [
  {
    id: 'n1-n2',
    source: 'root',
    target: 'n2',
    type: 'MyRoadmapEdge',
  },
];

const nodeTypes: NodeTypes = {
  CustomRoadmapNode,
};

const edgeTypes: EdgeTypes = {
  MyRoadmapEdge,
};

export function MyRoadmapsEditor() {
  const reactFlowWrapper = useRef(null);
  const mousePosRef = useRef({ x: 0, y: 0 });

  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);

  const [clipboard, setClipboard] = useState<{
    nodes: Node[];
    edges: Edge[];
  } | null>(null);

  const { screenToFlowPosition, getNodes, getEdges } = useReactFlow();

  const onConnectStart: OnConnectStart = () => {
    setNodes((nds) => nds.map((n) => ({ ...n, selected: false })));
  };

  const onReconnect: OnReconnect = useCallback(
    (oldEdge, newConnection) =>
      setEdges((els) => reconnectEdge(oldEdge, newConnection, els)),
    [],
  );

  const onNodesChange: OnNodesChange = useCallback(
    (changes) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    [],
  );
  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    [],
  );

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    [],
  );

  const onConnectEnd: OnConnectEnd = useCallback(
    (event, connectionState) => {
      if (!connectionState.isValid) {
        const id = crypto.randomUUID();
        const { clientX, clientY } =
          'changedTouches' in event ? event.changedTouches[0] : event;

        const newNode: Node<NodeData> = {
          id,
          type: 'CustomRoadmapNode',
          position: screenToFlowPosition({
            x: clientX,
            y: clientY,
          }),
          data: {
            label: `Node ${id}`,
            color: '#3b82f6',
            description: '',
            links: [],
            timeToLearn: '',
          },
          origin: [0.5, 0.0],
        };

        const newEdge: Edge = {
          id,
          source: connectionState.fromNode!.id,
          target: id,
        };

        setNodes((nds) => nds.concat(newNode));
        setEdges((eds) => eds.concat(newEdge));
      }
    },
    [screenToFlowPosition],
  );

  const onNodesDelete: OnNodesDelete = useCallback((deleted) => {
    const hasRoot = deleted.some((node) => node.id === 'root');

    if (hasRoot) {
      console.warn('Root node нельзя удалить');
      return;
    }

    setEdges((eds) =>
      eds.filter(
        (edge) =>
          !deleted.some(
            (node) => node.id === edge.source || node.id === edge.target,
          ),
      ),
    );
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      mousePosRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    window.addEventListener('mousemove', handler, { passive: true });

    return () => window.removeEventListener('mousemove', handler);
  }, []);

  useHotkeys('ctrl+c', () => {
    const selectedNodes = getNodes().filter((n) => n.selected);
    const selectedIds = new Set(selectedNodes.map((n) => n.id));

    const selectedEdges = getEdges().filter(
      (e) => selectedIds.has(e.source) && selectedIds.has(e.target),
    );

    setClipboard({
      nodes: selectedNodes,
      edges: selectedEdges,
    });
  });

  useHotkeys('ctrl+v', () => {
    if (!clipboard) return;

    const cursorFlow = screenToFlowPosition(mousePosRef.current);

    const minX = Math.min(...clipboard.nodes.map((n) => n.position.x));
    const minY = Math.min(...clipboard.nodes.map((n) => n.position.y));

    const idMap = new Map<string, string>();

    const newNodes = clipboard.nodes.map((node) => {
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

    const newEdges = clipboard.edges.map((edge) => ({
      ...edge,
      id: crypto.randomUUID(),
      source: idMap.get(edge.source)!,
      target: idMap.get(edge.target)!,
    }));

    setNodes((nds) => [
      ...nds.map((n) => ({ ...n, selected: false })),
      ...newNodes.map((n) => ({ ...n, selected: true })),
    ]);
    setEdges((eds) => [...eds, ...newEdges]);
  });

  return (
    <div style={{ height: '100%', width: '100%' }} ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onConnectEnd={onConnectEnd}
        onReconnect={onReconnect}
        onNodesDelete={onNodesDelete}
        onConnectStart={onConnectStart}
        defaultEdgeOptions={{ type: 'MyRoadmapEdge' }}
        fitView
      >
        <Background />
        <Controls />
        <MiniMap nodeStrokeWidth={3} />
      </ReactFlow>
    </div>
  );
}
