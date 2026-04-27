import { email, uuidv4 } from "zod";

export const isNonEmptyString = (value: unknown): value is string =>
  typeof value === "string" && value !== "";

export const isValidURL = (value: unknown): value is string => {
  if (typeof value !== "string") {
    return false;
  }

  try {
    return Boolean(new URL(value));
  } catch {
    return false;
  }
};

export const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const isArray = (value: unknown): value is Array<unknown> => Array.isArray(value);

export const isNonNullOrUndefined = (value: unknown): value is NonNullable<unknown> =>
  value !== null && value !== undefined;

export function isUUIDv4(value: unknown): value is string {
  return typeof value === "string" && uuidv4().safeParse(value).success;
}

export function isValidEmail(value: unknown): value is string {
  return typeof value === "string" && email().safeParse(value).success;
}

export function isValidNumber(number: unknown): number is number {
  return typeof number === "number" && !isNaN(number);
}
