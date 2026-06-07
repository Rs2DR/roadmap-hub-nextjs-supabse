'use client';

import { useMutation } from '@tanstack/react-query';

import { updatePassword } from '@/actions/auth/updatePassword';

import type { ResetPasswordInput } from '@/shcemas/resetPasswordSchema';

export const useUpdatePassword = () =>
  useMutation({
    mutationFn: (data: ResetPasswordInput) => updatePassword(data),
  });
