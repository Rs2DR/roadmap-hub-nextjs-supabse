'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { createRoadmap } from '@/actions/roadmap/createRoadmap';

import type { ManageMyRoadmapInput } from '@/shcemas/manageMyRoadmapSchema';

export const useCreateRoadmap = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: ManageMyRoadmapInput) => createRoadmap(data),
    onSuccess: ({ success, data }) => {
      if (success) {
        toast.info('Roadmap успешно создана');
      }
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });
};
