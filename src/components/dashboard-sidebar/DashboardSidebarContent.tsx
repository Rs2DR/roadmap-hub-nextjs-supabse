import { NavActions } from '@/components/dashboard-sidebar';
import { NavMain } from '@/components/dashboard-sidebar';
import { SidebarContent } from '@/components/ui/Sidebar';

export function DashboardSidebarContent() {
  return (
    <SidebarContent>
      <NavMain />
      <NavActions />
    </SidebarContent>
  );
}
