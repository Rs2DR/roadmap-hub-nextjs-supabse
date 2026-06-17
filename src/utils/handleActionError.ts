import {
  isActionMutationError,
  hasServerError,
  hasValidationErrors,
} from '@next-safe-action/adapter-tanstack-query';

import type { ActionMutationError } from '@next-safe-action/adapter-tanstack-query';

import type { DefaultValidationErrors } from '@/types/DefaultValidationErrors';

const getValidationErrorMessage = (
  error: ActionMutationError<unknown, unknown>,
): string | null => {
  if (!hasValidationErrors(error)) return null;

  const vErrors = error.validationErrors as DefaultValidationErrors;
  const fieldKeys = Object.keys(vErrors.fieldErrors ?? {});

  if (fieldKeys.length > 0) {
    const firstField = fieldKeys[0];
    const messages = vErrors.fieldErrors?.[firstField];
    if (messages?.[0]) {
      return `Ошибка в поле "${firstField}": ${messages[0]}`;
    }
  }

  if (vErrors.formErrors?.[0]) {
    return vErrors.formErrors[0];
  }

  return 'Ошибка валидации данных';
};

const getServerErrorMessage = (
  error: ActionMutationError<unknown, unknown>,
): string | null => {
  if (!hasServerError(error)) return null;
  return String(error.serverError);
};

const getNativeErrorMessage = (error: unknown): string | null => {
  if (error instanceof Error) {
    return error.message;
  }
  return null;
};

export const handleActionError = (error: unknown) => {
  if (isActionMutationError(error)) {
    const validationError = getValidationErrorMessage(error);
    if (validationError) return validationError;

    const serverError = getServerErrorMessage(error);
    if (serverError) return serverError;
  }

  const nativeError = getNativeErrorMessage(error);
  if (nativeError) return nativeError;

  return 'Произошла непредвиденная ошибка';
};
