import type { LucideIcon } from 'lucide-react';

import type { NavSubItem } from '@/types/navigation';

export type NavItemGroup = {
  type: 'group';
  title: string;
  icon: LucideIcon;
  items: NavSubItem[];
};
