import { Sidebar, SidebarRail } from '@/components/ui/Sidebar';

import { DashboardSidebarContent } from './DashboardSidebarContent';
import { DashboardSidebarFooter } from './DashboardSidebarFooter';
import { DashboardSidebarHeader } from './DashboardSidebarHeader';

export function DashboardSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <DashboardSidebarHeader />
      <DashboardSidebarContent />
      <DashboardSidebarFooter />
      <SidebarRail />
    </Sidebar>
  );
}
