import type { MouseEvent } from 'react';
import { useCallback } from 'react';

import {
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  reconnectEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from '@xyflow/react';

import {
  DEFAULT_EDGE_DATA,
  DEFAULT_NODE_DATA,
  INITIAL_EDGES,
  INITIAL_NODES,
  ROADMAP_TYPES,
} from '@/constants/roadmap';
import { useFlowStore } from '@/store/useFlowStore';
import { useReconnectStore } from '@/store/useReconnectStore';

import type {
  Edge,
  EdgeMouseHandler,
  Node,
  NodeMouseHandler,
  OnConnect,
  OnConnectEnd,
  OnConnectStart,
  OnEdgesChange,
  OnNodesChange,
  OnNodesDelete,
  OnReconnect,
} from '@xyflow/react';

import type { EdgeData } from '@/shcemas/EdgeDataSchema';
import type { NodeData } from '@/shcemas/NodeDataSchema';

export function useRoadmap() {
  const [nodes, setNodes] = useNodesState(INITIAL_NODES);
  const [edges, setEdges] = useEdgesState(INITIAL_EDGES);
  const { screenToFlowPosition } = useReactFlow<
    Node<NodeData>,
    Edge<EdgeData>
  >();

  const openSidebar = useFlowStore((s) => s.openSidebar);

  const setReconnectingEdgeId = useReconnectStore(
    (s) => s.setReconnectingEdgeId,
  );

  const onNodesChange: OnNodesChange<Node<NodeData>> = useCallback(
    (changes) => {
      const filteredChanges = changes.filter((change) =>
        change.type === 'remove' && change.id === 'root' ? false : true,
      );

      setNodes((nds) => applyNodeChanges(filteredChanges, nds));
    },
    [setNodes],
  );

  const onEdgesChange: OnEdgesChange<Edge<EdgeData>> = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges],
  );

  const onConnect: OnConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onConnectStart: OnConnectStart = useCallback(() => {
    setNodes((nds) => nds.map((n) => ({ ...n, selected: false })));
  }, [setNodes]);

  const onReconnectStart = useCallback(
    (_: MouseEvent, edge: Edge<EdgeData>) => {
      setReconnectingEdgeId(edge.id);
    },
    [setReconnectingEdgeId],
  );

  const onReconnect: OnReconnect<Edge<EdgeData>> = useCallback(
    (oldEdge, newConnection) =>
      setEdges((els) => reconnectEdge(oldEdge, newConnection, els)),
    [setEdges],
  );

  const onReconnectEnd = useCallback(() => {
    setReconnectingEdgeId(null);
  }, [setReconnectingEdgeId]);

  const onConnectEnd: OnConnectEnd = useCallback(
    (event, connectionState) => {
      if (connectionState.isValid) return;

      const id = crypto.randomUUID();
      const { clientX, clientY } =
        'changedTouches' in event ? event.changedTouches[0] : event;

      const newNode: Node<NodeData> = {
        id,
        type: ROADMAP_TYPES.node,
        position: screenToFlowPosition({ x: clientX, y: clientY }),
        data: { ...DEFAULT_NODE_DATA, label: `Node ${id}` },
        origin: [0.5, 0.0],
      };

      const newEdge: Edge<EdgeData> = {
        id,
        source: connectionState.fromNode!.id,
        target: id,
        data: { ...DEFAULT_EDGE_DATA },
      };

      setNodes((nds) => nds.concat(newNode));
      setEdges((eds) => eds.concat(newEdge));
    },
    [screenToFlowPosition, setNodes, setEdges],
  );

  const onNodesDelete: OnNodesDelete = useCallback(
    (deleted) =>
      setEdges((eds) =>
        eds.filter(
          (edge) =>
            !deleted.some(
              (node) => node.id === edge.source || node.id === edge.target,
            ),
        ),
      ),
    [setEdges],
  );

  const onNodeDoubleClick: NodeMouseHandler<Node<NodeData>> = useCallback(
    (_, { id, data }) => openSidebar({ type: 'node', id, data }),
    [openSidebar],
  );

  const onEdgeDoubleClick: EdgeMouseHandler<Edge<EdgeData>> = useCallback(
    (_, { id, data }) => openSidebar({ type: 'edge', id, data }),
    [openSidebar],
  );

  return {
    edges,
    nodes,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onConnectStart,
    onReconnect,
    onConnectEnd,
    onNodesDelete,
    onReconnectStart,
    onReconnectEnd,
    onNodeDoubleClick,
    onEdgeDoubleClick,
  };
}
