'use client';

import { FlowDrawerEditorContent } from '@/components/flow-drawer-editor';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/Drawer';
import { useIsMobile } from '@/hooks/useMobile';
import { useFlowStore } from '@/store/useFlowStore';

export function FlowDrawerEditor() {
  const isMobile = useIsMobile();
  const activeElement = useFlowStore((s) => s.activeElement);
  const closeSidebar = useFlowStore((s) => s.closeSidebar);

  const isOpen = !!activeElement;
  const direction = isMobile ? 'bottom' : 'right';
  const description =
    activeElement?.type === 'node' ? 'Параметры узла карты' : 'Параметры связи';

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => !open && closeSidebar()}
      direction={direction}
    >
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Редактирование</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <FlowDrawerEditorContent activeElement={activeElement} />
      </DrawerContent>
    </Drawer>
  );
}
