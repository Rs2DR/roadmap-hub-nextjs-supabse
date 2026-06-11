import {
  Award,
  ChartAreaIcon,
  ChevronRight,
  FolderBookmark,
  GitCompareArrows,
  Heart,
  House,
  Rotate3DIcon,
} from 'lucide-react';
import Link from 'next/link';

import { APP_ROUTES, DASHBOARD_ROUTES } from '@/constants/routes';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/Collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '../ui/Sidebar';

const items = [
  {
    title: 'Проекты',
    url: DASHBOARD_ROUTES.MY_ROADMAPS,
    icon: FolderBookmark,
  },
  {
    title: 'Активные треки',
    url: DASHBOARD_ROUTES.IN_PROCESS,
    icon: Award,
  },
  {
    title: 'Избранное',
    url: DASHBOARD_ROUTES.FAVORITES,
    icon: Heart,
  },
];

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
      <Collapsible>
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton tooltip="Мои Roudmap">
              <Rotate3DIcon /> <span>Мои Roudmap</span>
              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {items.map((subItem) => (
                <SidebarMenuSubItem key={subItem.title}>
                  <SidebarMenuSubButton asChild>
                    <Link href={subItem.url}>
                      <subItem.icon /> <span>{subItem.title}</span>
                    </Link>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
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
