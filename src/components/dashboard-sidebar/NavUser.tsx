'use client';

import type { ComponentProps } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';
import { ChevronsUpDown, LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/Sidebar';
import { APP_ROUTES } from '@/constants/routes';
import { useSignOut } from '@/hooks/auth';
import { cn } from '@/lib/utils';
import { makeUserOptions } from '@/queries/user';

export function NavUser({ ...props }: ComponentProps<typeof SidebarMenu>) {
  return (
    <SidebarMenu {...props}>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <UserMenuTrigger />
          </DropdownMenuTrigger>
          <UserDropdownContent />
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

type UserAvatarProps = {
  image: string;
  alt: string;
} & ComponentProps<typeof Avatar>;

export function UserAvatar({
  image,
  alt,
  className,
  ...props
}: UserAvatarProps) {
  const fallback = alt.slice(0, 2).toUpperCase();

  return (
    <Avatar className={cn('size-8 rounded-lg', className)} {...props}>
      <AvatarImage src={image} alt={alt} />
      <AvatarFallback className="rounded-lg">{fallback}</AvatarFallback>
    </Avatar>
  );
}

type UserInfoProps = {
  name: string;
  email: string;
} & ComponentProps<'div'>;

export function UserInfo({ name, email, className, ...props }: UserInfoProps) {
  return (
    <div
      className={cn('grid flex-1 text-left text-sm leading-tight', className)}
      {...props}
    >
      <span className="truncate font-medium">{name}</span>
      <span className="truncate text-xs">{email}</span>
    </div>
  );
}

export function UserMenuTrigger({
  className,
  size = 'lg',
  ...props
}: ComponentProps<typeof SidebarMenuButton>) {
  const {
    data: { user_metadata },
  } = useSuspenseQuery(makeUserOptions());

  const { firstName, email } = user_metadata;

  return (
    <SidebarMenuButton
      size={size}
      className={cn(
        'data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground',
        className,
      )}
      {...props}
    >
      <UserAvatar image="" alt={firstName} />
      <UserInfo name={firstName} email={email} />
      <ChevronsUpDown className="ml-auto size-4" />
    </SidebarMenuButton>
  );
}

export function UserDropdownContent({
  className,
  side,
  align = 'end',
  ...props
}: ComponentProps<typeof DropdownMenuContent>) {
  const router = useRouter();
  const { isMobile } = useSidebar();
  const { mutate: signOut } = useSignOut();
  const {
    data: { user_metadata },
  } = useSuspenseQuery(makeUserOptions());

  const handleSignOut = () =>
    signOut(undefined, {
      onSuccess: () => {
        router.push(APP_ROUTES.ROOT);
      },
    });

  const { firstName, email } = user_metadata;
  const currentSide = side ? side : isMobile ? 'bottom' : 'right';

  return (
    <DropdownMenuContent
      className={cn(
        'w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg',
        className,
      )}
      align={align}
      side={currentSide}
      {...props}
    >
      <DropdownMenuLabel className="p-0 font-normal">
        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
          <UserAvatar image="" alt={firstName} />
          <UserInfo name={firstName} email={email} />
        </div>
      </DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={handleSignOut}>
        <LogOut />
        Выйти
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
