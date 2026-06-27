import type { LucideIcon } from 'lucide-react';

import type { NavSubItem } from '@/types/navigation';

export type NavItem =
  | {
      type: 'link';
      title: string;
      url: string;
      icon: LucideIcon;
    }
  | {
      type: 'group';
      title: string;
      icon: LucideIcon;
      items: NavSubItem[];
    };
