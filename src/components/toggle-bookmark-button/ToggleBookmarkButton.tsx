'use client';

import type { ComponentProps } from 'react';

import { Bookmark } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { useToggleBookmark } from '@/hooks/useToggleBookmark';
import { cn } from '@/lib/utils';

interface ToggleBookmarkButtonProps extends ComponentProps<typeof Button> {
  id: string;
  isBookmarked: boolean;
}

export function ToggleBookmarkButton({
  id,
  isBookmarked,
  className,
  variant = 'outline',
  size = 'icon',
  ...props
}: ToggleBookmarkButtonProps) {
  const { mutate } = useToggleBookmark();

  const handleToggle = () => mutate({ id });

  return (
    <Button
      className={cn(className)}
      variant={variant}
      size={size}
      onClick={handleToggle}
      {...props}
    >
      <Bookmark
        className="text-purple-500 transition-all duration-200"
        fill={isBookmarked ? 'currentColor' : 'none'}
      />
    </Button>
  );
}
