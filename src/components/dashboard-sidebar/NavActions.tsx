import type { ComponentProps } from 'react';

import { PlusIcon } from 'lucide-react';

import { ManageMyRoadmapDialog } from '@/components/manage-my-roadmap-dialog';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/Sidebar';

export function NavActions({ ...props }: ComponentProps<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupLabel>Взаимодействия</SidebarGroupLabel>
      <SidebarMenuItem>
        <ManageMyRoadmapDialog
          title="Создать roadmap"
          description="Тут вы можете создать свой Roadmap"
        >
          <SidebarMenuButton tooltip="Создать">
            <PlusIcon /> <span>Создать </span>
          </SidebarMenuButton>
        </ManageMyRoadmapDialog>
      </SidebarMenuItem>
    </SidebarGroup>
  );
}
