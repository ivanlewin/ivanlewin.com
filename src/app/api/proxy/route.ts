import { PROXY_ALLOWED_ORIGINS } from "config/server";
import { RouteHandler } from "types/next";
import { APIError } from "utils/errors/api-error";
import { buildErrorResponse, jsonResponse } from "utils/response";
import { isValidURL } from "utils/types";

export const GET: RouteHandler = async (request) => {
  try {
    if (!PROXY_ALLOWED_ORIGINS) {
      console.error("The environment variable `PROXY_ALLOWED_ORIGINS` is not set.");
      throw new APIError({
        code: "MISSING_CONFIGURATIONS",
        message: "There are some environment variables missing.",
      });
    }

    const urlParam = request.nextUrl.searchParams.get("url");
    if (!isValidURL(urlParam)) {
      throw new APIError({
        code: "INVALID_URL",
        message: "Invalid `url` search param.",
        status: 400,
      });
    }

    const url = new URL(urlParam);
    const allowedOrigins = PROXY_ALLOWED_ORIGINS.split(",");
    if (!allowedOrigins.includes(url.origin)) {
      throw new APIError({
        code: "UNSUPPORTED_ORIGIN",
        message: "The origin of the URL is not supported.",
        status: 400,
      });
    }

    try {
      const response = await fetch(urlParam);
      const contentType = response.headers.get("Content-Type");
      if (!contentType) {
        throw new APIError({
          code: "MISSING_CONTENT_TYPE",
          message: "The response does not have a `Content-Type` header.",
        });
      }

      if (contentType.toLowerCase().includes("application/json")) {
        const body = await response.json();
        return jsonResponse(body, { status: response.status });
      }
      const body = await response.text();
      return new Response(body, {
        headers: response.headers,
        status: response.status,
        statusText: response.statusText,
      });
    } catch (error) {
      console.error(error);
      throw new APIError({
        code: "FETCH_ERROR",
        message: "An error occurred while fetching the URL.",
      });
    }
  } catch (error) {
    console.error(error);
    return buildErrorResponse(error);
  }
};
