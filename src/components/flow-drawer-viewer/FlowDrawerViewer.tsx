'use client';

import { FlowDrawerViewerContent } from '@/components/flow-drawer-viewer';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/Drawer';
import { useIsMobile } from '@/hooks/useMobile';
import { useFlowStore } from '@/store/useFlowStore';

export function FlowDrawerViewer() {
  const isMobile = useIsMobile();
  const activeElement = useFlowStore((s) => s.activeElement);
  const closeSidebar = useFlowStore((s) => s.closeSidebar);

  const isOpen = !!activeElement && activeElement.type === 'node';
  const nodeElemet = activeElement?.type === 'node' ? activeElement : null;
  const direction = isMobile ? 'bottom' : 'right';

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open) => !open && closeSidebar()}
      direction={direction}
    >
      <DrawerContent>
        <DrawerHeader className="p-6 border-b">
          <DrawerTitle className="truncate text-xl font-semibold"></DrawerTitle>
          <DrawerDescription>Детальная информация шага карты</DrawerDescription>
        </DrawerHeader>
        <FlowDrawerViewerContent nodeElement={nodeElemet} />
      </DrawerContent>
    </Drawer>
  );
}
