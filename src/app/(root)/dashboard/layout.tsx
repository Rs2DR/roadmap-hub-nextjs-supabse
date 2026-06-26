import type { PropsWithChildren } from 'react';

import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { DashboardSidebar } from '@/components/dashboard-sidebar';
import { Separator } from '@/components/ui/Separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/Sidebar';
import { USER_QUERY_KEY } from '@/constants/queries';
import { getQueryClient } from '@/lib/tanstack-query/getQueryClient';
import { getUserServer } from '@/services/user/getUserServer';

export default async function DashboardLayout({
  children,
}: PropsWithChildren<unknown>) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: [USER_QUERY_KEY],
    queryFn: () => getUserServer(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SidebarProvider>
        <DashboardSidebar />
        <SidebarInset>
          <header className="flex h-12 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-8"
              />
            </div>
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </HydrationBoundary>
  );
}
