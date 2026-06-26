'use client';

import { Suspense } from 'react';

import { MessageSquare } from 'lucide-react';

import { PublicCommentsList } from '@/components/public-comments-list';
import { RoadmapCommentForm } from '@/components/roadmap-comment-form';
import { SpinnerFallback } from '@/components/spinner-fallback';
import { Button } from '@/components/ui/Button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/Sheet';

interface RoadmapCommentsSheetProps {
  roadmapId: string;
}

export function RoadmapCommentsSheet({ roadmapId }: RoadmapCommentsSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="gap-2 text-muted-foreground hover:text-foreground"
        >
          <MessageSquare className="size-4" />
        </Button>
      </SheetTrigger>

      <SheetContent className="w-full sm:max-w-md flex flex-col h-full">
        <SheetHeader className="p-6 border-b">
          <SheetTitle>Комментарии</SheetTitle>
          <SheetDescription>
            Обсуждение этой дорожной карты. Будьте вежливы.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
          <Suspense fallback={<SpinnerFallback />}>
            <PublicCommentsList id={roadmapId} />
          </Suspense>
        </div>

        <RoadmapCommentForm roadmapId={roadmapId} />
      </SheetContent>
    </Sheet>
  );
}
