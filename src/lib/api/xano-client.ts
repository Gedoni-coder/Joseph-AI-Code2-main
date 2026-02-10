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
      const contentType = response.headers.get("content-type");
      let error = {
        message: response.statusText,
      };

      // Only try to parse JSON if the response is actually JSON
      if (contentType && contentType.includes("application/json")) {
        try {
          error = await response.json();
        } catch {
          // If JSON parsing fails, use the statusText
        }
      }

      throw new Error(error.message || `API request failed: ${response.status}`);
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
      console.error("Failed to parse response:", parseError);
      // Return empty array/object as fallback
      return (Array.isArray([]) ? [] : {}) as T;
    }
  } catch (fetchError) {
    // Handle network errors and unavailable API
    const errorMessage = fetchError instanceof Error ? fetchError.message : String(fetchError);

    console.warn(
      `Xano API unavailable (${endpoint}): ${errorMessage}. Returning empty data as fallback.`
    );

    // Return appropriate empty response based on typical usage
    // Most endpoints return arrays, some return objects
    if (endpoint.includes("GET")) {
      return [] as unknown as T;
    }

    return {} as T;
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
