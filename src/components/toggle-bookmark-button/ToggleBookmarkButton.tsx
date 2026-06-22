import { Bookmark } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { useToggleBookmark } from '@/hooks/useToggleBookmark';
import { cn } from '@/lib/utils';

interface ToggleBookmarkButtonProps {
  id: string;
  isBookmarked: boolean;
}

export function ToggleBookmarkButton({
  id,
  isBookmarked,
}: ToggleBookmarkButtonProps) {
  const { toggle } = useToggleBookmark();

  const handleToggle = () => toggle(id);

  return (
    <Button variant="outline" size="icon" onClick={handleToggle}>
      <Bookmark
        className={cn('stroke-purple-500', isBookmarked && 'fill-purple-500')}
      />
    </Button>
  );
}
