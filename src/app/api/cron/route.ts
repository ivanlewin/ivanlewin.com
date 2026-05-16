import { CRON_SECRET, ENVIRONMENT, SUPABASE_PROJECT_IDS } from "config/server";
import { RouteHandler } from "types/next";
import { constantTimeCompare } from "utils/crypto";
import { APIError } from "utils/errors/api-error";
import { buildErrorResponse } from "utils/response";
import { isNonEmptyString } from "utils/types";

export const GET: RouteHandler = async (request) => {
  try {
    console.log("cron started");

    if (ENVIRONMENT !== "production") {
      throw new APIError({
        code: "INVALID_ENVIRONMENT",
        message: "Cron jobs are only available in production.",
        status: 400,
      });
    }
    console.log("ENVIRONMENT = production");

    if (!isNonEmptyString(CRON_SECRET)) {
      throw new APIError({
        code: "MISSING_CRON_SECRET",
        message: "Missing or invalid 'CRON_SECRET' environment variable.",
      });
    }
    console.log("CRON_SECRET non empty");

    const token = request.headers.get("Authorization");
    if (!token) {
      throw new APIError({
        code: "UNAUTHORIZED",
        message: "Unauthorized.",
        status: 401,
      });
    }
    console.log("token non empty");

    const rawToken = token.startsWith("Bearer ") ? token.slice(7) : token;
    if (!constantTimeCompare(rawToken, CRON_SECRET)) {
      throw new APIError({
        code: "UNAUTHORIZED",
        status: 401,
        message: "Unauthorized.",
        description: "The Bearer token is invalid.",
      });
    }
    console.log("token authorized");

    if (!SUPABASE_PROJECT_IDS) {
      console.error("The environment variable `SUPABASE_PROJECT_IDS` is not set.");
      throw new APIError({
        code: "MISSING_CONFIGURATIONS",
        message: "There are some environment variables missing.",
      });
    }
    console.log("SUPABASE_PROJECT_IDS non empty");

    const projectIds = SUPABASE_PROJECT_IDS.split(",");
    for (const projectId of projectIds) {
      try {
        console.log(`fetching https://${projectId}.supabase.co/rest/v1`);
        await fetch(`https://${projectId}.supabase.co/rest/v1`);
      } catch (error) {
        console.error(
          `An error occurred while fetching the Supabase project \`${projectId}\`.`,
          error,
        );
      }
    }

    return new Response();
  } catch (error) {
    console.error(error);
    return buildErrorResponse(error);
  }
};
