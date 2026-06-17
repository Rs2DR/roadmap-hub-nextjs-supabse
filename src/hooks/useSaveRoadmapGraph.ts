import { mutationOptions } from '@next-safe-action/adapter-tanstack-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { saveRoadmapGraph } from '@/actions/roadmap/saveRoadmapGraph';
import { MY_ROADMAPS_KEY } from '@/constants/queries';
import { handleActionError } from '@/utils/handleActionError';

import type { RoadmapGraph } from '@/shcemas/RoadmapGrahpSchema';

export const useSaveRoadmapGraph = () => {
  const queryClient = useQueryClient();

  return useMutation(
    mutationOptions(saveRoadmapGraph, {
      onSuccess: (updatedFullRoadmap) => {
        toast.success('Изменения сохранены');

        queryClient.setQueryData<RoadmapGraph>(
          [MY_ROADMAPS_KEY, updatedFullRoadmap.id],
          updatedFullRoadmap,
        );
      },

      onError: handleActionError,
    }),
  );
};
