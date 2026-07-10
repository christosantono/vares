export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

export function assertFound<T>(value: T, message = "Not found"): NonNullable<T> {
  if (value == null) throw new HttpError(404, message);
  return value as NonNullable<T>;
}
