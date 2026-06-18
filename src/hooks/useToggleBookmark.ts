import { useEffect, useMemo } from 'react';

import { useQueryClient } from '@tanstack/react-query';
import { debounce } from 'lodash-es';

import { ROADMAPS } from '@/constants/queries';
import { useBookmarkRoadmap } from '@/hooks/useBookmarkRoadmap';
import { useUnbookmarkRoadmap } from '@/hooks/useUnbookmarkRoadmap';

import type { PublicRoadmap } from '@/shcemas/PublicRoadmapSchema';

interface UseToggleBookmarkParams {
  id: string;
}

export const useToggleBookmark = ({ id }: UseToggleBookmarkParams) => {
  const queryClient = useQueryClient();

  const bookmarkMutation = useBookmarkRoadmap();
  const unbookmarkMutation = useUnbookmarkRoadmap();

  const debouncedToggle = useMemo(
    () =>
      debounce((currentStatus: boolean) => {
        if (currentStatus) {
          unbookmarkMutation.mutate({ id });
        } else {
          bookmarkMutation.mutate({ id });
        }
      }, 300),
    [id, bookmarkMutation, unbookmarkMutation],
  );

  useEffect(() => {
    return () => {
      debouncedToggle.cancel();
    };
  }, [debouncedToggle]);

  const toggleBookmark = (isBookmarked: boolean) => {
    queryClient.setQueryData<PublicRoadmap>([ROADMAPS, id], (oldRoadmap) => {
      if (!oldRoadmap) return oldRoadmap;
      return { ...oldRoadmap, isBookmarked: !isBookmarked };
    });

    debouncedToggle(isBookmarked);
  };

  return {
    toggleBookmark,
    isPending: bookmarkMutation.isPending || unbookmarkMutation.isPending,
  };
};
