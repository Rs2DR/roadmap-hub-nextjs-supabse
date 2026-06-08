import { ChartAreaIcon, House, Rotate3DIcon } from 'lucide-react';
import Link from 'next/link';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
} from '../ui/Sidebar';

export function NavMain() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Основное</SidebarGroupLabel>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href="/dashboard">
            <House /> <span>Главная</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href="/dashboard/my-roadmaps">
            <Rotate3DIcon /> <span>Мои Roudmap</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href="/dashboard/my-statistics">
            <ChartAreaIcon /> <span>Статистика</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarGroup>
  );
}
