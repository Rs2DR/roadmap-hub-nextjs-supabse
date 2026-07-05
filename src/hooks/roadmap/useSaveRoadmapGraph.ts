import { mutationOptions } from '@next-safe-action/adapter-tanstack-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { saveRoadmapGraph } from '@/actions/roadmap';
import { MY_ROADMAPS_KEY } from '@/constants/queries';
import { handleActionError } from '@/utils/error';

import type { RoadmapGraphBase } from '@/schemas/roadmap';

export const useSaveRoadmapGraph = () => {
  const queryClient = useQueryClient();

  return useMutation(
    mutationOptions(saveRoadmapGraph, {
      onSuccess: (updatedFullRoadmap) => {
        toast.success('Изменения сохранены');

        queryClient.setQueryData<RoadmapGraphBase>(
          [MY_ROADMAPS_KEY, updatedFullRoadmap.id],
          updatedFullRoadmap,
        );
      },

      onError: (error) => {
        toast.error(handleActionError(error));
      },
    }),
  );
};
