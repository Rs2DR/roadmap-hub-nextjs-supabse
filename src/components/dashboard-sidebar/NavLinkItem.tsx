import { Link } from 'lucide-react';

import {
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/Sidebar';

import type { NavItemLink } from '@/types/navigation';

type NavLinkItemProps = {
  item: NavItemLink;
};

export function NavLinkItem({ item }: NavLinkItemProps) {
  const { setOpenMobile } = useSidebar();
  const handleClose = () => setOpenMobile(false);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild onClick={handleClose} tooltip={item.title}>
        <Link href={item.url}>
          <item.icon />
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
