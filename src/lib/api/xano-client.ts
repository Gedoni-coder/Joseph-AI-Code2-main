/**
 * Xano API Client
 * Central configuration and utilities for communicating with the Xano backend
 */

const XANO_BASE_URL = import.meta.env.VITE_XANO_API_BASE || "https://x8ki-letl-twmt.n7.xano.io/api:MdDKI7Xp";

interface XanoRequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

/**
 * Make a request to the Xano API
 */
export async function xanoRequest<T>(
  endpoint: string,
  options: XanoRequestOptions = {},
): Promise<T> {
  const { params, ...fetchOptions } = options;
  
  let url = `${XANO_BASE_URL}${endpoint}`;
  
  // Add query parameters if provided
  if (params) {
    const queryString = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      queryString.append(key, String(value));
    });
    url += `?${queryString.toString()}`;
  }

  // Default headers
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...fetchOptions.headers,
  };

  const response = await fetch(url, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({
      message: response.statusText,
    }));
    throw new Error(error.message || `API request failed: ${response.status}`);
  }

  return response.json();
}

/**
 * GET request to Xano API
 */
export async function xanoGet<T>(endpoint: string, params?: Record<string, string | number | boolean>): Promise<T> {
  return xanoRequest<T>(endpoint, {
    method: "GET",
    params,
  });
}

/**
 * POST request to Xano API
 */
export async function xanoPost<T>(endpoint: string, data: unknown): Promise<T> {
  return xanoRequest<T>(endpoint, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

/**
 * PATCH request to Xano API
 */
export async function xanoPatch<T>(endpoint: string, data: unknown): Promise<T> {
  return xanoRequest<T>(endpoint, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

/**
 * DELETE request to Xano API
 */
export async function xanoDelete(endpoint: string): Promise<void> {
  return xanoRequest(endpoint, {
    method: "DELETE",
  });
}
