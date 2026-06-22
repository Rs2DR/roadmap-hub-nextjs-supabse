import { Settings } from 'lucide-react';
import Link from 'next/link';

import { DASHBOARD_ROUTES } from '@/constants/routes';

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
        <SidebarMenuButton asChild tooltip="Настройки">
          <Link href={DASHBOARD_ROUTES.SETTINGS}>
            <Settings /> <span>Настройки</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarGroup>
  );
}
