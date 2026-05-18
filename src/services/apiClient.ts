import { authHeader } from './authService';

let onUnauthorized: (() => void) | null = null;

export function setUnauthorizedHandler(fn: () => void) {
  onUnauthorized = fn;
}

export async function apiFetch<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...authHeader(),
      ...(options.headers as Record<string, string>),
    },
  });

  if (response.status === 401) {
    onUnauthorized?.();
    throw new Error('Sesión expirada');
  }

  if (!response.ok) {
    let message = 'Error del servidor';

    try {
      const err = await response.json();
      message = err?.detail || message;
    } catch {}

    throw new Error(message);
  }

  return response.json();
}