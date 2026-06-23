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
  ...props
}: ToggleBookmarkButtonProps) {
  const { toggle } = useToggleBookmark();

  const handleToggle = () => toggle(id);

  return (
    <Button
      className={cn(className)}
      variant="outline"
      size="icon"
      onClick={handleToggle}
      {...props}
    >
      <Bookmark
        className={cn('stroke-purple-500', isBookmarked && 'fill-purple-500')}
      />
    </Button>
  );
}
