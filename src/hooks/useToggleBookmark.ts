import { useRef } from 'react';

import { mutationOptions } from '@next-safe-action/adapter-tanstack-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { toggleBookmarkAction } from '@/actions/roadmap/toggleBookmark';
import { ROADMAPS, BOOKMARKED_ROADMAPS } from '@/constants/queries';
import { handleActionError } from '@/utils/handleActionError';

import type { PublicRoadmap } from '@/shcemas/PublicRoadmapSchema';

const DEBOUNCE_TIME = 500;

export const useToggleBookmark = () => {
  const queryClient = useQueryClient();

  const timeouts = useRef<Record<string, NodeJS.Timeout>>({});
  const initialState = useRef<Record<string, boolean>>({});

  const mutation = useMutation(
    mutationOptions(toggleBookmarkAction, {
      onError: (error, { id }) => {
        updateCache(id);
        toast.error(handleActionError(error));
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: [BOOKMARKED_ROADMAPS],
        });
      },
    }),
  );

  const getState = (id: string) => {
    const data = queryClient
      .getQueriesData<PublicRoadmap[]>({ queryKey: [ROADMAPS] })
      .flatMap(([, d]) => d ?? []);

    return data.find((i) => i.id === id)?.isBookmarked;
  };

  const updateCache = (id: string) => {
    queryClient.setQueriesData<PublicRoadmap[]>(
      { queryKey: [ROADMAPS] },
      (old) =>
        old?.map((item) =>
          item.id === id ? { ...item, isBookmarked: !item.isBookmarked } : item,
        ),
    );

    queryClient.setQueriesData<PublicRoadmap[]>(
      { queryKey: [BOOKMARKED_ROADMAPS] },
      (old) => {
        if (!old) return old;

        const exists = old.find((i) => i.id === id);

        if (exists) {
          return old.filter((i) => i.id !== id);
        }

        const roadmap = queryClient
          .getQueriesData<PublicRoadmap[]>({ queryKey: [ROADMAPS] })
          .flatMap(([, d]) => d ?? [])
          .find((i) => i.id === id);

        return roadmap ? [...old, { ...roadmap, isBookmarked: true }] : old;
      },
    );
  };

  const toggle = (id: string) => {
    const current = getState(id);
    if (current === undefined) return;

    // фиксируем initial state
    if (!(id in initialState.current)) {
      initialState.current[id] = current;
    }

    // оптимистичный апдейт
    updateCache(id);

    // debounce
    if (timeouts.current[id]) {
      clearTimeout(timeouts.current[id]);
    }

    timeouts.current[id] = setTimeout(() => {
      const initial = initialState.current[id];
      const final = getState(id);

      delete timeouts.current[id];
      delete initialState.current[id];

      // если вернулся к исходному — не стреляем
      if (initial === final) return;

      mutation.mutate({ id });
    }, DEBOUNCE_TIME);
  };

  return {
    toggle,
    isPending: mutation.isPending,
  };
};
