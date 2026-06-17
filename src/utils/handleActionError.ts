import { ActionMutationError } from '@next-safe-action/adapter-tanstack-query';
import { toast } from 'sonner';

import type { DefaultValidationErrors } from '@/types/DefaultValidationErrors';

type SafeActionError = ActionMutationError<string, DefaultValidationErrors>;

const handleValidationError = (validationErrors: DefaultValidationErrors) => {
  const { fieldErrors, formErrors } = validationErrors;
  if (fieldErrors && Object.keys(fieldErrors).length > 0) {
    const firstField = Object.keys(fieldErrors)[0];
    const firstMessage = fieldErrors[firstField]?.[0];

    if (firstMessage) {
      toast.error(`Ошибка в поле "${firstField}": ${firstMessage}`);
      return;
    }
  }

  if (formErrors && formErrors.length > 0) {
    toast.error(formErrors[0]);
    return;
  }

  toast.error('Ошибка валидации данных');
};

const handleSafeActionError = (error: SafeActionError) => {
  if (error.validationErrors) {
    handleValidationError(error.validationErrors);
    return;
  }

  if (error.serverError) {
    toast.error(error.serverError);
    return;
  }

  toast.error('Произошла ошибка при выполнении операции на сервере');
};

export const handleActionError = (error: unknown) => {
  if (error instanceof ActionMutationError) {
    handleSafeActionError(error as SafeActionError);
    return;
  }

  if (error instanceof Error) {
    toast.error(error.message);
    return;
  }

  toast.error('Произошла непредвиденная ошибка');
};
