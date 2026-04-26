//#region Environment
const VERCEL_TARGET_ENV = process.env.VERCEL_TARGET_ENV;
export const ENVIRONMENT =
  VERCEL_TARGET_ENV === "production"
    ? "production"
    : VERCEL_TARGET_ENV === "preview"
      ? "preview"
      : "development";
//#endregion

//#region other
export const CRON_SECRET = process.env.CRON_SECRET;
export const PROXY_ALLOWED_ORIGINS = process.env.PROXY_ALLOWED_ORIGINS;
export const SUPABASE_PROJECT_IDS = process.env.SUPABASE_PROJECT_IDS;
//#endregion

if (typeof window !== "undefined") {
  console.error(
    "DANGER: You're accessing the server config on the client. This may expose your secrets",
  );
}
//#endregion
