/**
 * API Client
 * Replaces the disabled xano-client.ts.
 * All requests are routed to the Node.js/Express backend via VITE_API_BASE_URL.
 * Auth is handled via HttpOnly JWT cookie (credentials: 'include').
 */

const BASE_URL = (import.meta.env.VITE_API_BASE_URL as string) || "http://localhost:3001";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

interface ApiRequestOptions extends Omit<RequestInit, "body"> {
  params?: Record<string, string | number | boolean | undefined>;
  body?: unknown;
}

async function apiRequest<T>(endpoint: string, options: ApiRequestOptions = {}): Promise<T> {
  const { params, body, ...fetchOptions } = options;

  let url = `${BASE_URL}${endpoint}`;

  if (params) {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.set(key, String(value));
      }
    });
    const qs = searchParams.toString();
    if (qs) url = `${url}?${qs}`;
  }

  const response = await fetch(url, {
    ...fetchOptions,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(fetchOptions.headers || {}),
    },
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  if (!response.ok) {
    let message = `HTTP ${response.status}`;
    try {
      const errJson = await response.json();
      message = errJson.message || errJson.error || message;
    } catch {
      // ignore json parse errors on error responses
    }
    throw new ApiError(response.status, message);
  }

  // 204 No Content
  if (response.status === 204) {
    return undefined as unknown as T;
  }

  return response.json() as Promise<T>;
}

export async function apiGet<T>(
  endpoint: string,
  params?: Record<string, string | number | boolean | undefined>,
): Promise<T> {
  return apiRequest<T>(endpoint, { method: "GET", params });
}

export async function apiPost<T>(endpoint: string, data: unknown): Promise<T> {
  return apiRequest<T>(endpoint, { method: "POST", body: data });
}

export async function apiPatch<T>(endpoint: string, data: unknown): Promise<T> {
  return apiRequest<T>(endpoint, { method: "PATCH", body: data });
}

export async function apiPut<T>(endpoint: string, data: unknown): Promise<T> {
  return apiRequest<T>(endpoint, { method: "PUT", body: data });
}

export async function apiDelete(endpoint: string): Promise<void> {
  return apiRequest<void>(endpoint, { method: "DELETE" });
}

// Legacy-compatible aliases (used by older service files)
export const xanoRequest = apiRequest;
export const xanoGet = apiGet;
export const xanoPost = apiPost;
export const xanoPatch = apiPatch;
export const xanoDelete = apiDelete;
