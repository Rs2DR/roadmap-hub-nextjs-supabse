import type { ComponentProps } from 'react';

import { NavActions } from '@/components/dashboard-sidebar';
import { NavMain } from '@/components/dashboard-sidebar';
import { SidebarContent } from '@/components/ui/Sidebar';

export function DashboardSidebarContent({
  ...props
}: ComponentProps<typeof SidebarContent>) {
  return (
    <SidebarContent {...props}>
      <NavMain />
      <NavActions />
    </SidebarContent>
  );
}
