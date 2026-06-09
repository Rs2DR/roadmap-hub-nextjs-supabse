import { Suspense } from 'react';

import { SidebarFooter } from '../ui/Sidebar';

import { NavUser } from './NavUser';

export function DashboardSidebarFooter() {
  return (
    <SidebarFooter>
      <Suspense>
        <NavUser />
      </Suspense>
    </SidebarFooter>
  );
}
