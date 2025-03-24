import { RouteHandler } from "types/api";
import { jsonResponse } from "utils/response";

export const GET: RouteHandler = async (request) => {
  const allowedOrigins = process.env.PROXY_ORIGINS_WHITELIST?.split("\n");

  const url = request.nextUrl.searchParams.get("url");
  if (!url) {
    return jsonResponse({ message: "Missing 'url' param" }, 400);
  }

  if (typeof url !== "string") {
    return jsonResponse({ message: "Invalid 'url' param" }, 400);
  }

  let origin = "";
  try {
    origin = new URL(url).origin;
  } catch (error) {
    return jsonResponse({ message: "Invalid 'url' param" }, 400);
  }
  if (!allowedOrigins?.includes(origin)) {
    return jsonResponse(
      { message: "The origin of the url is not supported" },
      400
    );
  }

  try {
    const response = await fetch(url);
    const body = await response.json();
    return new Response(JSON.stringify(body), {
      status: response.status,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  } catch (error) {
    return jsonResponse({ message: "Error fetching URL" }, 500);
  }
};
