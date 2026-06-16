type SafeActionResult<T> = {
  data?: T;
  serverError?: string;
  validationErrors?: unknown;
};

export async function unwrapAction<T>(
  actionPromise: Promise<SafeActionResult<T>>,
): Promise<T> {
  const result = await actionPromise;

  if (result.serverError) {
    throw new Error(result.serverError);
  }

  if (result.validationErrors) {
    throw new Error('Ошибка валидации');
  }

  if (!result.data) {
    throw new Error('Нет данных от action');
  }

  return result.data;
}
