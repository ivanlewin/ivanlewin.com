import { APIError } from "./errors/api-error";
import { isNonEmptyString, isObject, isValidNumber } from "./types";

const HTTP_ERROR_CODES = new Set([
  400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 410, 411, 412, 413, 414, 415, 416, 417, 418,
  421, 422, 423, 424, 425, 426, 428, 429, 431, 451, 500, 501, 502, 503, 504, 505, 506, 507, 508,
  510, 511,
]);

export function buildErrorResponse(error: unknown) {
  const body: {
    code: APIError["code"];
    details?: APIError["details"];
    message: APIError["message"];
    status: number;
  } = {
    message: "An error occurred",
    code: "INTERNAL_SERVER_ERROR",
    status: 500,
  };

  let obj = error;
  if (isNonEmptyString(obj)) {
    try {
      obj = JSON.parse(obj);
    } catch {
      //
    }
  }

  if (isObject(obj)) {
    if (isNonEmptyString(obj.message)) {
      body.message = obj.message;
    }

    if (isObject(obj.details)) {
      body.details = obj.details;
      // } else if (Array.isArray(obj.details)) {
      //   const d = [];
      //   for (const detail of obj.details) {
      //     if (isNonEmptyString(detail)) {
      //       d.push(detail);
      //     } else if (isObject(detail)) {
      //       d.push(detail);
      //     }
      //   }
      //   if (d.length > 0) {
      //     body.details = d;
      //   }
    }

    if (isValidNumber(obj.status) && HTTP_ERROR_CODES.has(obj.status)) {
      body.status = obj.status;
    }

    if (isNonEmptyString(obj.code)) {
      body.code = obj.code;
    }
  } else if (isNonEmptyString(obj)) {
    body.message = obj;
  }

  const { code, details, message, status } = body;
  return jsonResponse({ code, details, message }, { status });
}

function buildResponse(body?: BodyInit | undefined | null, responseInit?: ResponseInit) {
  if (body === undefined || body === null) {
    return new Response(undefined, {
      headers: responseInit?.headers,
      status: responseInit?.status ?? 204,
      statusText: responseInit?.statusText,
    });
  } else {
    return new Response(body, {
      headers: responseInit?.headers,
      status: responseInit?.status ?? 200,
      statusText: responseInit?.statusText,
    });
  }
}

export function jsonResponse(body: unknown, responseInit?: ResponseInit) {
  const response = buildResponse(JSON.stringify(body), responseInit);
  response.headers.set("Content-Type", "application/json; charset=utf-8");
  return response;
}
