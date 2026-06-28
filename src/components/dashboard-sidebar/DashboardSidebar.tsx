import type { ComponentProps } from 'react';

import {
  DashboardSidebarContent,
  DashboardSidebarFooter,
  DashboardSidebarHeader,
} from '@/components/dashboard-sidebar';
import { Sidebar, SidebarRail } from '@/components/ui/Sidebar';

export function DashboardSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <DashboardSidebarHeader />
      <DashboardSidebarContent />
      <DashboardSidebarFooter />
      <SidebarRail />
    </Sidebar>
  );
}
