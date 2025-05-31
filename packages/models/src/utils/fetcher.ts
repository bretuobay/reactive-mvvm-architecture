// src/utils/nativeFetcher.ts

import { Fetcher } from "mvvm-core"; // Assuming RestfulApiModel.ts defines Fetcher type

/**
 * Custom error class for API responses that are not OK (status 2xx).
 * This allows for specific error handling based on HTTP status codes.
 */
export class HttpError extends Error {
  public readonly status: number;
  public readonly statusText: string;
  public readonly responseBody: any; // Can be JSON object, string, or undefined

  constructor(
    message: string,
    status: number,
    statusText: string,
    responseBody?: any
  ) {
    super(message);
    this.name = "HttpError"; // Set the name for easier identification
    this.status = status;
    this.statusText = statusText;
    this.responseBody = responseBody;
    // Set the prototype explicitly to ensure instanceof works correctly
    Object.setPrototypeOf(this, HttpError.prototype);
  }
}

/**
 * A comprehensive fetcher function using the native `fetch` API.
 * It handles:
 * - Default JSON `Content-Type` and `Accept` headers.
 * - Merging of custom headers.
 * - HTTP error responses (non-2xx status codes) by throwing `HttpError`.
 * - Parsing of error bodies (JSON or text).
 * - Network errors and other unexpected `fetch` rejections.
 * - Optional request timeout using `AbortController`.
 *
 * @param url The URL to fetch.
 * @param options Standard `RequestInit` options for `fetch`.
 * @param timeoutMs Optional timeout in milliseconds. If the request takes longer, it will throw an `AbortError`. Default is 30 seconds.
 * @returns A Promise that resolves to the `Response` object. The `RestfulApiModel` will then handle parsing the successful response body.
 * @throws `HttpError` for non-2xx HTTP responses, containing status and parsed body.
 * @throws `Error` with `name: 'AbortError'` if the request times out.
 * @throws other `Error` types for network issues or unexpected problems.
 */
export const nativeFetcher: Fetcher = async (
  url: string,
  options?: RequestInit,
  timeoutMs: number = 30000 // Default timeout of 30 seconds
): Promise<Response> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs); // Set up the timeout

  // Default headers for JSON communication
  const defaultHeaders = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  // Merge provided headers with defaults.
  // If a 'Content-Type' is explicitly set in options.headers, it will override the default.
  const mergedHeaders = {
    ...defaultHeaders,
    ...options?.headers,
  };

  try {
    const response = await fetch(url, {
      ...options,
      headers: mergedHeaders,
      signal: controller.signal, // Attach the abort signal to the fetch request
    });

    clearTimeout(timeoutId); // Clear the timeout if the fetch completes in time

    // Check if the HTTP response status is not in the 2xx range
    if (!response.ok) {
      let errorBody: any;
      const contentType = response.headers.get("content-type");

      // Attempt to parse the response body, prioritizing JSON
      if (contentType && contentType.includes("application/json")) {
        try {
          errorBody = await response.json();
        } catch (e) {
          // If JSON parsing fails, fall back to text
          errorBody = await response.text();
        }
      } else {
        // If not JSON, get the body as text
        errorBody = await response.text();
      }

      // Throw a custom HttpError for easier handling upstream
      throw new HttpError(
        `HTTP error: ${response.status} ${response.statusText || "Unknown"}`,
        response.status,
        response.statusText || "Unknown",
        errorBody
      );
    }

    // Return the raw Response object. The RestfulApiModel's `executeApiRequest`
    // method is responsible for parsing the successful response body (e.g., `response.json()`)
    // and then validating it with Zod.
    return response;
  } catch (error: any) {
    clearTimeout(timeoutId); // Ensure timeout is cleared even if fetch itself throws (e.g., network error)

    // Handle specific error types
    if (error.name === "AbortError") {
      // This error occurs if `controller.abort()` was called (due to timeout or explicit cancellation)
      throw new Error(
        `Request to ${url} timed out after ${timeoutMs}ms or was explicitly aborted.`
      );
    } else if (error instanceof HttpError) {
      // Re-throw our custom HttpError, as it already contains detailed information
      throw error;
    } else {
      // Catch any other unexpected errors (e.g., network issues, DNS resolution failures)
      throw new Error(
        `Network or unexpected error for ${url}: ${error.message || "An unknown error occurred."}`
      );
    }
  }
};
