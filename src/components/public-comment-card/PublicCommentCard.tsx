'use client';

import { useMemo } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';
import { Trash2 } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
} from '@/components/ui/Card';
import { useDeleteCommentOnRoadmap } from '@/hooks/roadmap/useDeleteCommentOnRoadmap';
import { getUserQueryOptions } from '@/queries/user/makeUserOptions';

import type { PublicComment } from '@/schemas/roadmap/PublicCommentSchema';

interface PublicCommentCardProps {
  comment: PublicComment;
  roadmapId: string;
}

export function PublicCommentCard({
  comment,
  roadmapId,
}: PublicCommentCardProps) {
  const { id, content, createdAt, firstName, avatar, userId } = comment;

  const { data: user } = useSuspenseQuery(getUserQueryOptions());
  const { mutate: deleteComment, isPending } = useDeleteCommentOnRoadmap({
    roadmapId,
  });

  const isAuthor = user.id === userId;

  const handleDelete = () => deleteComment({ id });

  const formattedDate = useMemo(() => {
    const date = new Date(createdAt);
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  }, [createdAt]);

  const initials = firstName.slice(0, 2).toUpperCase();

  return (
    <Card size="sm" className="w-full transition-colors hover:bg-muted/10">
      <CardHeader className="flex flex-row items-center gap-3">
        <Avatar className="h-8 w-8 rounded-full">
          <AvatarImage src={avatar} alt={firstName} />
          <AvatarFallback className="rounded-full text-xs font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col flex-1 min-w-0">
          <CardTitle className="truncate font-medium text-foreground">
            {firstName}
          </CardTitle>
          <CardDescription className="text-xs">{formattedDate}</CardDescription>
        </div>

        {isAuthor && (
          <CardAction>
            <Button
              variant="destructive"
              size="icon"
              onClick={handleDelete}
              disabled={isPending}
              className="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              aria-label="Удалить комментарий"
            >
              <Trash2 className="size-4 text-red-500" />
            </Button>
          </CardAction>
        )}
      </CardHeader>

      <CardContent className="text-sm text-foreground/90 whitespace-pre-wrap break-words pl-[52px] -mt-2">
        <p>{content}</p>
      </CardContent>
    </Card>
  );
}
