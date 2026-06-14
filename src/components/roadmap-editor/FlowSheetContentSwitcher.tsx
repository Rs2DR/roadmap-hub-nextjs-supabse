import { FLOW_MODE } from '@/constants/flow';
import { useFlowStore } from '@/store/useFlowStore';

import { EdgeEditorForm } from '../roadmap-edge/EdgeEditorForm';
import { NodeEditorForm } from '../roadmap-node/NodeEditorForm';

import type { EdgeData } from '@/shcemas/EdgeDataSchema';
import type { NodeData } from '@/shcemas/NodeDataSchema';

const NodeViewDetails = ({ data }: { data: NodeData }) => (
  <div className="p-4">
    <h3>Просмотр узла</h3>
    <p>{data.label}</p>
  </div>
);

export const FlowSheetContentSwitcher = () => {
  const activeElement = useFlowStore((state) => state.activeElement);
  const mode = useFlowStore((state) => state.mode);
  const closeSidebar = useFlowStore((state) => state.closeSidebar);

  if (!activeElement) return null;

  const isEdit = mode === FLOW_MODE.EDIT;

  if (activeElement.type === 'node') {
    return isEdit ? (
      <NodeEditorForm
        nodeId={activeElement.id}
        defaultValues={activeElement.data}
        onClose={closeSidebar}
      />
    ) : (
      <NodeViewDetails data={activeElement.data} />
    );
  }

  if (activeElement.type === 'edge') {
    return (
      isEdit && (
        <EdgeEditorForm
          edgeId={activeElement.id}
          defaultValues={activeElement.data}
          onClose={closeSidebar}
        />
      )
    );
  }

  return null;
};
