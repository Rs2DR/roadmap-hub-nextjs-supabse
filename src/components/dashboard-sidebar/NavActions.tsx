import { PlusIcon, Search } from 'lucide-react';

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
        <SidebarMenuButton>
          <Search /> <span>Поиск </span>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton>
          <PlusIcon /> <span>Создать </span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarGroup>
  );
}
