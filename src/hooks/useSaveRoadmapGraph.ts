import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { saveRoadmapGraph } from '@/actions/roadmap/saveRoadmapGraph';
import { unwrapAction } from '@/lib/next-safe-actions/unwrapAction';

import type { SaveRoadmapGraphInput } from '@/shcemas/SaveRoadmapGraphSchema';

export const useSaveRoadmapGraph = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SaveRoadmapGraphInput) =>
      unwrapAction(saveRoadmapGraph(data)),
    onSuccess: (updatedFullRoadmap) => {
      toast.success('Изменения на холсте сохранены');

      queryClient.setQueryData(
        ['roadmap', updatedFullRoadmap.id],
        updatedFullRoadmap,
      );
    },
  });
};
