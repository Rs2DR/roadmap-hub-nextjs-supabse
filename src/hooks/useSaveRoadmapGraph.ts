import { mutationOptions } from '@next-safe-action/adapter-tanstack-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { saveRoadmapGraph } from '@/actions/roadmap/saveRoadmapGraph';

export const useSaveRoadmapGraph = () => {
  const queryClient = useQueryClient();

  return useMutation(
    mutationOptions(saveRoadmapGraph, {
      onSuccess: (updatedFullRoadmap) => {
        toast.success('Изменения на холсте сохранены');

        queryClient.setQueryData(
          ['roadmap', updatedFullRoadmap.id],
          updatedFullRoadmap,
        );
      },
    }),
  );
};
