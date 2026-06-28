import type { ComponentProps } from 'react';
import { Suspense } from 'react';

import { NavUser } from '@/components/dashboard-sidebar';
import { SidebarFooter } from '@/components/ui/Sidebar';

export function DashboardSidebarFooter({
  ...props
}: ComponentProps<typeof SidebarFooter>) {
  return (
    <SidebarFooter {...props}>
      <Suspense>
        <NavUser />
      </Suspense>
    </SidebarFooter>
  );
}
