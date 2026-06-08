import { Settings } from 'lucide-react';
import Link from 'next/link';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/Sidebar';

export function NavSystem() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Система</SidebarGroupLabel>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href="/dashboard/settings">
            <Settings /> <span>Настройки</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarGroup>
  );
}
