export type ApiEnvelope<T> = {
  data: T | null;
  message: string;
  status: number;
  success: boolean;
};

export function ok<T>(data: T, message = "OK", status = 200): ApiEnvelope<T> {
  return { data, message, status, success: true };
}

export function fail(message: string, status = 400): ApiEnvelope<null> {
  return { data: null, message, status, success: false };
}

export function error(message: string, status = 500): ApiEnvelope<null> {
  return { data: null, message, status, success: false };
}