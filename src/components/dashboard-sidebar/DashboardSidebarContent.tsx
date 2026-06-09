import { SidebarContent } from '../ui/Sidebar';

import { NavActions } from './NavActions';
import { NavMain } from './NavMain';
import { NavSystem } from './NavSystem';

export function DashboardSidebarContent() {
  return (
    <SidebarContent>
      <NavMain />
      <NavActions />
      <NavSystem />
    </SidebarContent>
  );
}
