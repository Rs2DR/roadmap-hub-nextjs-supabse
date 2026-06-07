'use client';

import { useMutation } from '@tanstack/react-query';

import { signInWithGitHub } from '@/actions/auth/signInWithGitHub'


export const useSignInWithGitHub = () =>
  useMutation({
    mutationFn: () => signInWithGitHub(),
  });
