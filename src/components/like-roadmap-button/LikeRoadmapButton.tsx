'use client';

import type { ComponentProps } from 'react';

import { Heart } from 'lucide-react';

import { Button } from '@/components/ui/Button';
import { useLikeRoadmap } from '@/hooks/useLikeRoadmap';
import { cn } from '@/lib/utils';

interface LikeRoadmapButtonProps extends ComponentProps<typeof Button> {
  id: string;
  isLiked: boolean;
}

export function LikeRoadmapButton({
  id,
  isLiked,
  className,
  variant = 'outline',
  size = 'icon',
  ...props
}: LikeRoadmapButtonProps) {
  const { mutate } = useLikeRoadmap();

  const handleLike = () => mutate({ id });

  return (
    <Button
      className={cn(className)}
      variant={variant}
      size={size}
      onClick={handleLike}
      {...props}
    >
      <Heart
        className="text-red-500 transition-all duration-200"
        fill={isLiked ? 'currentColor' : 'none'}
      />
    </Button>
  );
}
