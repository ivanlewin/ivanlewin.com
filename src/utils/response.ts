export function baseResponse(body?: BodyInit | undefined, status?: number) {
  if (body === undefined) {
    return new Response(undefined, {
      status: status ?? 204,
    });
  } else {
    return new Response(body, {
      status: status ?? 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
      },
    });
  }
}

export function jsonResponse(body: unknown, status?: number) {
  return baseResponse(JSON.stringify(body), status);
}
