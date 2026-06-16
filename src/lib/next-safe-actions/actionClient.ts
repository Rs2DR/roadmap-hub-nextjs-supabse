'use server';

import { createSafeActionClient } from 'next-safe-action';

export const actionClient = createSafeActionClient({
  handleServerError: (error) => {
    if (error instanceof Error) {
      return error.message;
    }

    console.error('Критическая ошибка:', error);
    return 'Произошла внутренняя ошибка сервера. Попробуйте позже.';
  },
});
