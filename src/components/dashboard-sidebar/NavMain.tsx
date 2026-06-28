import type { ComponentProps } from 'react';

import { ChevronRight } from 'lucide-react';
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
import { NAV_ITEMS } from '@/constants/navigation';
import { cn } from '@/lib/utils';

import type { NavItemGroup, NavItemLink } from '@/types/navigation';

export function NavMain({ ...props }: ComponentProps<typeof SidebarGroup>) {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupLabel>Основное</SidebarGroupLabel>

      {NAV_ITEMS.map((item) =>
        item.type === 'link' ? (
          <NavLinkItem key={item.title} item={item} />
        ) : (
          <NavGroupItem key={item.title} item={item} />
        ),
      )}
    </SidebarGroup>
  );
}

type NavLinkItemProps = {
  item: NavItemLink;
} & ComponentProps<typeof SidebarMenuItem>;

export function NavLinkItem({ item, ...props }: NavLinkItemProps) {
  const { setOpenMobile } = useSidebar();
  const handleClose = () => setOpenMobile(false);

  return (
    <SidebarMenuItem {...props}>
      <SidebarMenuButton asChild onClick={handleClose} tooltip={item.title}>
        <Link href={item.url}>
          <item.icon />
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

type NavGroupItemProps = {
  item: NavItemGroup;
} & ComponentProps<typeof Collapsible>;

export function NavGroupItem({ item, className, ...props }: NavGroupItemProps) {
  const { setOpenMobile } = useSidebar();
  const handleClose = () => setOpenMobile(false);

  return (
    <Collapsible className={cn('group/collapsible', className)} {...props}>
      <SidebarMenuItem>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton tooltip={item.title}>
            <item.icon />
            <span>{item.title}</span>
            <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
          </SidebarMenuButton>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <SidebarMenuSub>
            {item.items.map((subItem) => (
              <SidebarMenuSubItem key={subItem.title}>
                <SidebarMenuSubButton asChild onClick={handleClose}>
                  <Link href={subItem.url}>
                    <subItem.icon />
                    <span>{subItem.title}</span>
                  </Link>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </SidebarMenuItem>
    </Collapsible>
  );
}
