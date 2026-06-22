import { PlusIcon, Search } from 'lucide-react';

import { ManageMyRoadmapDialog } from '@/components/manage-my-roadmap-dialog';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/Sidebar';

export function NavActions() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Взаимодействия</SidebarGroupLabel>
      <SidebarMenuItem>
        <ManageMyRoadmapDialog
          title="Создать roadmap"
          description="Тут вы можете создать свой Roadmap"
        >
          <SidebarMenuButton>
            <PlusIcon /> <span>Создать </span>
          </SidebarMenuButton>
        </ManageMyRoadmapDialog>
      </SidebarMenuItem>
    </SidebarGroup>
  );
}
