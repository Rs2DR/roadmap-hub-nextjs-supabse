'use client';

import { NodeEditorForm } from '@/components/node-editor-form';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/Sheet';
import { useFlowStore } from '@/store/useFlowStore';

import { EdgeEditorForm } from '../edge-editor-form/EdgeEditorForm';

export function FlowSheetEditor() {
  const activeElement = useFlowStore((s) => s.activeElement);
  const closeSidebar = useFlowStore((s) => s.closeSidebar);

  const isOpen = !!activeElement;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeSidebar()}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Редактирование</SheetTitle>
          <SheetDescription>
            {activeElement?.type === 'node'
              ? 'Параметры узла карты'
              : 'Параметры связи'}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-4 h-full">
          {activeElement?.type === 'node' && (
            <NodeEditorForm
              nodeId={activeElement.id}
              defaultValues={activeElement.data}
              onClose={closeSidebar}
            />
          )}

          {activeElement?.type === 'edge' && (
            <EdgeEditorForm
              edgeId={activeElement.id}
              defaultValues={activeElement.data}
              onClose={closeSidebar}
            />
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
