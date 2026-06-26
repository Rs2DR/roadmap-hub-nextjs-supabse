'use client';

import { EdgeEditorForm } from '@/components/edge-editor-form';
import { NodeEditorForm } from '@/components/node-editor-form';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/Sheet';
import { useIsMobile } from '@/hooks/useMobile';
import { cn } from '@/lib/utils';
import { useFlowStore } from '@/store/useFlowStore';

export function FlowSheetEditor() {
  const isMobile = useIsMobile();
  const activeElement = useFlowStore((s) => s.activeElement);
  const closeSidebar = useFlowStore((s) => s.closeSidebar);

  const isOpen = !!activeElement;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeSidebar()}>
      <SheetContent className={cn(isMobile && '')}>
        <SheetHeader>
          <SheetTitle>Редактирование</SheetTitle>
          <SheetDescription>
            {activeElement?.type === 'node'
              ? 'Параметры узла карты'
              : 'Параметры связи'}
          </SheetDescription>
        </SheetHeader>

        <div className="mt-4 h-full no-scrollbar overflow-y-auto">
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
