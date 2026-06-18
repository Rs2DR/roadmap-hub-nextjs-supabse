'use client';

import { GalleryVerticalEnd } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { APP_ROUTES } from '@/constants/routes';
import { cn } from '@/lib/utils';

import {
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '../ui/Sidebar';

export function DashboardSidebarHeader() {
  const router = useRouter();
  const { open } = useSidebar();

  const handleNavigateToRoot = () => router.push(APP_ROUTES.ROOT);

  return (
    <SidebarHeader>
      <SidebarMenu>
        <SidebarMenuItem className="inline-flex justify-end items-center gap-2">
          <SidebarMenuButton
            onClick={handleNavigateToRoot}
            size="lg"
            className={cn(
              'transition-all duration-200 ease-in-out',
              !open && 'w-0 h-0 opacity-0 pointer-events-none',
            )}
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground truncate">
              <GalleryVerticalEnd />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">RoadmapHub</span>
            </div>
          </SidebarMenuButton>
          <SidebarTrigger className="-ml-1" />
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarHeader>
  );
}
