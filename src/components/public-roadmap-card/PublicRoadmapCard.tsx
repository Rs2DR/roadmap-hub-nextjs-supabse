'use client';

import { Heart, MessageSquare } from 'lucide-react';
import Link from 'next/link';

import { ToggleBookmarkButton } from '@/components/toggle-bookmark-button';
import { Avatar, AvatarFallback } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/Card';
import { DASHBOARD_ROUTES } from '@/constants/routes';

import type { PublicRoadmap } from '@/shcemas/PublicRoadmapSchema';

interface PublicRoadmapCardProps {
  roadmap: PublicRoadmap;
}

export function PublicRoadmapCard({ roadmap }: PublicRoadmapCardProps) {
  const {
    id,
    title,
    description,
    likesCount,
    commentsCount,
    isLiked,
    isBookmarked,
  } = roadmap;

  return (
    <Card className="flex w-full">
      <CardHeader className="flex flex-col grow">
        <div className="inline-flex justify-between w-full">
          <div className="inline-flex items-center gap-4">
            <Avatar>
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <CardTitle>{title}</CardTitle>
          </div>
          <CardAction>
            <ToggleBookmarkButton id={id} isBookmarked={isBookmarked} />
          </CardAction>
        </div>
        <CardDescription className="mt-2 line-clamp-3 mb-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="inline-flex items-center justify-between py-2">
        <div className="inline-flex gap-2 text-muted-foreground">
          <div className="inline-flex items-center gap-1.5">
            <MessageSquare size={18} />
            <span>{commentsCount}</span>
          </div>
          <div className="inline-flex items-center gap-1.5">
            <Heart
              className="text-red-500"
              fill={isLiked ? 'currentColor' : 'none'}
              size={18}
            />
            <span>{likesCount}</span>
          </div>
        </div>
        <div className="inline-flex items-center gap-4">
          <Button asChild>
            <Link href={`${DASHBOARD_ROUTES.VIEW(id)}`}>Просмотреть</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
