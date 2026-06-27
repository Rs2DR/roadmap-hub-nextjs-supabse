import { useSuspenseQuery } from '@tanstack/react-query';
import { MessageSquare } from 'lucide-react';

import { EmptyState } from '@/components/empty-state';
import { PublicCommentCard } from '@/components/public-comment-card';
import { getRoadmapCommentsQueryOptions } from '@/queries/roadmap/makeRoadmapCommentsOptions';

interface PublicCommentsListProps {
  id: string;
}

export function PublicCommentsList({ id }: PublicCommentsListProps) {
  const { data } = useSuspenseQuery(getRoadmapCommentsQueryOptions({ id }));

  const isEmpty = data.length === 0;

  if (isEmpty)
    return (
      <EmptyState
        icon={MessageSquare}
        title="Здесь пока нет комментариев"
        description="Станьте первым, кто поделится своим мнением или задаст вопрос!"
      />
    );

  return (
    <div className="flex flex-col gap-4">
      {data.map((comment) => (
        <PublicCommentCard key={comment.id} comment={comment} roadmapId={id} />
      ))}
    </div>
  );
}
