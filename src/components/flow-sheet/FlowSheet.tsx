'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/Sheet';
import { FLOW_MODE } from '@/constants/flow';
import { useFlowStore } from '@/store/useFlowStore';

import { FlowSheetContentSwitcher } from './FlowSheetContentSwitcher';

export function FlowSheet() {
  const activeElement = useFlowStore((s) => s.activeElement);
  const mode = useFlowStore((s) => s.mode);
  const closeSidebar = useFlowStore((s) => s.closeSidebar);

  const isOpen = !!activeElement;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeSidebar()}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            {mode === FLOW_MODE.EDIT ? 'Редактирование' : 'Информация'}
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
  );
}
