import type { CSSProperties } from 'react';
import { memo } from 'react';

import { Handle, Position } from '@xyflow/react';
import { lighten, darken } from 'polished';

import { RoadmapNodeContent } from '@/components/roadmap-node/RoadmapNodeContent';
import { RoadmapNodeToolbar } from '@/components/roadmap-node/RoadmapNodeToolbar';

import type { Node, NodeProps } from '@xyflow/react';

import type { NodeData } from '@/shcemas/NodeDataSchema';

type RoadmapNodeData = Node<NodeData>;

const RoadmapNode = ({ id, data, selected }: NodeProps<RoadmapNodeData>) => {
  const isRootNode = id === 'root';

  const nodeStyles: CSSProperties = {
    borderColor: darken(0.2, data.color),
    backgroundColor: lighten(0.3, data.color),
  };

  return (
    <div className="border rounded-md px-4 py-2" style={nodeStyles}>
      <RoadmapNodeToolbar
        id={id}
        data={data}
        selected={selected}
        isRootNode={isRootNode}
      />
      {!isRootNode && (
        <Handle style={nodeStyles} type="target" position={Position.Top} />
      )}
      <RoadmapNodeContent data={data} />
      <Handle style={nodeStyles} type="source" position={Position.Bottom} />
    </div>
  );
};

export default memo(RoadmapNode);
