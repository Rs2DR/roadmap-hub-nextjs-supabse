import { EdgeEditorForm } from '@/components/edge-editor-form';
import { NodeEditorForm } from '@/components/node-editor-form';
import { useFlowStore } from '@/store/roadmap/useFlowStore';

import type { FlowElement } from '@/types/react-flow/FlowSheetElement';

interface FlowDrawerEditorContentProps {
  activeElement: FlowElement;
}

export function FlowDrawerEditorContent({
  activeElement,
}: FlowDrawerEditorContentProps) {
  const closeSidebar = useFlowStore((s) => s.closeSidebar);

  if (!activeElement) return null;

  const { id, type, data } = activeElement;

  return (
    <div className="mt-4 h-full no-scrollbar overflow-y-auto">
      {type === 'node' && (
        <NodeEditorForm
          nodeId={id}
          defaultValues={data}
          onClose={closeSidebar}
        />
      )}

      {type === 'edge' && (
        <EdgeEditorForm
          edgeId={id}
          defaultValues={data}
          onClose={closeSidebar}
        />
      )}
    </div>
  );
}
