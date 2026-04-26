import { NextRequest } from "next/server";

export type RouteSegments = Record<string, undefined | string | string[]>;

export type RouteHandlerParams<TSegments extends RouteSegments | undefined = undefined> = {
  params: Promise<TSegments extends undefined ? any : TSegments>;
};
export type RouteHandler<TSegments extends RouteSegments | undefined = undefined> = (
  request: NextRequest,
  context: RouteHandlerParams<TSegments>,
) => Promise<Response>;

export type LayoutProps<TSegments extends RouteSegments | undefined = undefined> =
  TSegments extends undefined
    ? { children: React.ReactNode }
    : { children: React.ReactNode; params: Promise<TSegments> };

type SearchParams = { [key: string]: string | string[] | undefined };

export type PageProps<TSegments extends RouteSegments | undefined = undefined> =
  TSegments extends undefined
    ? { searchParams?: Promise<SearchParams> }
    : { params: Promise<TSegments>; searchParams?: Promise<SearchParams> };

export type Page<TSegments extends RouteSegments | undefined = undefined> =
  TSegments extends undefined
    ? (props: PageProps<TSegments>) => React.ReactNode | Promise<React.ReactNode>
    : (props: PageProps<TSegments>) => React.ReactNode | Promise<React.ReactNode>;

export type GenerateMetadataProps<TSegments extends RouteSegments | undefined = undefined> = {
  params: Promise<TSegments extends undefined ? any : TSegments>;
  searchParams?: Record<string, string | string[] | undefined>;
};
