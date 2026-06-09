import { ChartAreaIcon, House, Rotate3DIcon } from 'lucide-react';
import Link from 'next/link';

import { APP_ROUTES, DASHBOARD_ROUTES } from '@/constants/routes';

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
          <Link href={APP_ROUTES.DASHBOARD}>
            <House /> <span>Главная</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href={DASHBOARD_ROUTES.MY_ROADMAPS}>
            <Rotate3DIcon /> <span>Мои Roudmap</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton asChild>
          <Link href={DASHBOARD_ROUTES.MY_STATISTICS}>
            <ChartAreaIcon /> <span>Статистика</span>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarGroup>
  );
}
