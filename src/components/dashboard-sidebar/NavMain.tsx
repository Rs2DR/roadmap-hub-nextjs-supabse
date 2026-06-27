'use client';

import {
  Bookmark,
  ChevronRight,
  Folder,
  House,
  Rotate3DIcon,
} from 'lucide-react';
import Link from 'next/link';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/Collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/Sidebar';
import { APP_ROUTES, DASHBOARD_ROUTES } from '@/constants/routes';

import type { NavItem } from '@/types/navigation/NavItem';

export const navItems: NavItem[] = [
  {
    type: 'link',
    title: 'Главная',
    url: APP_ROUTES.DASHBOARD,
    icon: House,
  },
  {
    type: 'group',
    title: 'Мои Roadmaps',
    icon: Rotate3DIcon,
    items: [
      {
        title: 'Проекты',
        url: DASHBOARD_ROUTES.MY_ROADMAPS,
        icon: Folder,
      },
      {
        title: 'Избранное',
        url: DASHBOARD_ROUTES.BOOKMARKS,
        icon: Bookmark,
      },
    ],
  },
];

export function NavMain() {
  const { setOpenMobile } = useSidebar();

  const handleCloseOnMobile = () => setOpenMobile(false);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Основное</SidebarGroupLabel>

      {navItems.map((item) => {
        if (item.type === 'link') {
          const { title, url, icon: Icon } = item;

          return (
            <SidebarMenuItem key={title}>
              <SidebarMenuButton
                asChild
                onClick={handleCloseOnMobile}
                tooltip={title}
              >
                <Link href={url}>
                  <Icon />
                  <span>{title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          );
        }

        const { icon: GroupIcon, title, items } = item;

        return (
          <Collapsible key={title} className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={title}>
                  <GroupIcon />
                  <span>{title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>

              <CollapsibleContent>
                <SidebarMenuSub>
                  {items.map(({ title, url, icon: SubIcon }) => (
                    <SidebarMenuSubItem key={title}>
                      <SidebarMenuSubButton
                        asChild
                        onClick={handleCloseOnMobile}
                      >
                        <Link href={url}>
                          <SubIcon />
                          <span>{title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        );
      })}
    </SidebarGroup>
  );
}
