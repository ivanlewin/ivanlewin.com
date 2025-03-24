import { NextRequest } from "next/server";

export type RouteHandler<
  RouteSegments extends
    | Record<string, string | string[]>
    | undefined = undefined
> = RouteSegments extends undefined
  ? (request: NextRequest, ctx: { params: any }) => Promise<Response>
  : (request: NextRequest, ctx: { params: RouteSegments }) => Promise<Response>;
