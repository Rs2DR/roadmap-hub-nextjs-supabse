'use client';

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/Sheet';
import { useFlowStore } from '@/store/useFlowStore';

export function FlowSheetViewer() {
  const activeElement = useFlowStore((s) => s.activeElement);
  const closeSidebar = useFlowStore((s) => s.closeSidebar);

  const isOpen = !!activeElement && activeElement.type === 'node';

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeSidebar()}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Информация</SheetTitle>
          <SheetDescription>Параметры и описание шага карты</SheetDescription>
        </SheetHeader>

        <div className="mt-4 h-full">
          {activeElement?.type === 'node' && (
            <div className="space-y-4 p-2">
              <h3 className="font-semibold text-lg">
                {activeElement.data?.label || 'Без названия'}
              </h3>
              <p className="text-sm text-gray-600">
                {activeElement.data?.description || 'Описание отсутствует.'}
              </p>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
