import type { LucideIcon } from 'lucide-react';

export type NavItemLink = {
  type: 'link';
  title: string;
  url: string;
  icon: LucideIcon;
};
