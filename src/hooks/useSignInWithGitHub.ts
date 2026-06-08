'use client';

import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

import { signInWithGitHub } from '@/actions/auth/signInWithGitHub';

export const useSignInWithGitHub = () =>
  useMutation({
    mutationFn: () => signInWithGitHub(),
    onError: ({ message }) => {
      toast.error(message);
    },
  });
