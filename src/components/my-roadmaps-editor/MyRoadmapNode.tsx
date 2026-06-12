import { memo } from 'react';

import { Handle, Position, NodeResizer } from '@xyflow/react';

import type { NodeProps } from '@xyflow/react';

const MyRoadmapNode = ({ data, selected, width, height }: NodeProps) => {
  const { label } = data;

  return (
    <div
      className="react-flow__node-default"
      style={{
        width,
        height,
      }}
    >
      <NodeResizer
        color="#ff0071"
        isVisible={selected}
        minWidth={130}
        minHeight={40}
      />

      <Handle type="target" position={Position.Left} />

      <div>{data.label as string}</div>

      <Handle type="source" position={Position.Right} />
    </div>
  );
};

export default memo(MyRoadmapNode);
