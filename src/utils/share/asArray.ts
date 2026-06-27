export const asArray = <T>(data: T[] | undefined | null) =>
  Array.isArray(data) ? data : [];
