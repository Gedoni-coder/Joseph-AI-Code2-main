/**
 * Xano API Client
 * Central configuration and utilities for communicating with the Xano backend
 */

const XANO_BASE_URL =
  import.meta.env.VITE_XANO_API_BASE ||
  "https://x8ki-letl-twmt.n7.xano.io/api:MdDKI7Xp";

interface XanoRequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

/**
 * Make a request to the Xano API with enhanced error handling
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

  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    if (!response.ok) {
      // API error - return fallback data silently
      console.debug(
        `Xano API returned ${response.status} for ${endpoint}. Using fallback data.`
      );
      // Return empty array for most endpoints
      return [] as unknown as T;
    }

    try {
      // Check if response is JSON before parsing
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        return await response.json();
      }

      // Try to parse as JSON anyway, it might just be missing the header
      const text = await response.text();
      if (text.trim().startsWith("{") || text.trim().startsWith("[")) {
        return JSON.parse(text);
      }

      // Return empty array/object as fallback
      return (Array.isArray([]) ? [] : {}) as T;
    } catch (parseError) {
      console.debug(`Failed to parse response from ${endpoint}:`, parseError);
      // Return empty array/object as fallback
      return [] as unknown as T;
    }
  } catch (fetchError) {
    // Handle network errors and unavailable API - return fallback silently
    console.debug(
      `Xano API unavailable for ${endpoint}. Network error:`,
      fetchError instanceof Error ? fetchError.message : String(fetchError)
    );

    // Return empty array as fallback for all cases
    return [] as unknown as T;
  }
}

/**
 * GET request to Xano API
 */
export async function xanoGet<T>(
  endpoint: string,
  params?: Record<string, string | number | boolean>,
): Promise<T> {
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
export async function xanoPatch<T>(
  endpoint: string,
  data: unknown,
): Promise<T> {
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
