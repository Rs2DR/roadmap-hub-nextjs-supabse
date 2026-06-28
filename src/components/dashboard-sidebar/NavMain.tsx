import { NavGroupItem, NavLinkItem } from '@/components/dashboard-sidebar';
import { SidebarGroup, SidebarGroupLabel } from '@/components/ui/Sidebar';
import { NAV_ITEMS } from '@/constants/navigation';

export function NavMain() {
  return (
    <SidebarGroup>
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
