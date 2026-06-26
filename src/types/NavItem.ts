import type { LucideIcon } from 'lucide-react';

export type NavSubItem = {
  title: string;
  url: string;
  icon: LucideIcon;
};

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
