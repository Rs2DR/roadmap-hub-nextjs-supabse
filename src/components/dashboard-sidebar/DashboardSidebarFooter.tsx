import { Suspense } from 'react';

import { NavUser } from '@/components/dashboard-sidebar/NavUser';
import { SidebarFooter } from '@/components/ui/Sidebar';

export function DashboardSidebarFooter() {
  return (
    <SidebarFooter>
      <Suspense>
        <NavUser />
      </Suspense>
    </SidebarFooter>
  );
}
