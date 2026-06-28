import { Bookmark, Folder, House, Rotate3DIcon } from 'lucide-react';

import { APP_ROUTES, DASHBOARD_ROUTES } from '@/constants/routes';

import type { NavItem } from '@/types/navigation';

export const NAV_ITEMS: NavItem[] = [
  {
    type: 'link',
    title: 'Главная',
    url: APP_ROUTES.DASHBOARD,
    icon: House,
  },
  {
    type: 'group',
    title: 'Мои Roadmaps',
    icon: Rotate3DIcon,
    items: [
      {
        title: 'Проекты',
        url: DASHBOARD_ROUTES.MY_ROADMAPS,
        icon: Folder,
      },
      {
        title: 'Избранное',
        url: DASHBOARD_ROUTES.BOOKMARKS,
        icon: Bookmark,
      },
    ],
  },
];
