import { SidebarContent } from '../ui/Sidebar';

import { NavActions } from './NavActions';
import { NavMain } from './NavMain';

export function DashboardSidebarContent() {
  return (
    <SidebarContent>
      <NavMain />
      <NavActions />
    </SidebarContent>
  );
}
