import { createHmac, timingSafeEqual } from "crypto";

/** Uses HMAC to normalize lengths, avoiding a timing side-channel on string length. */
export function constantTimeCompare(a: string, b: string): boolean {
  const key = "constant-time-compare";
  const hmacA = createHmac("sha256", key).update(a).digest();
  const hmacB = createHmac("sha256", key).update(b).digest();
  const bytesA = Uint8Array.from(hmacA);
  const bytesB = Uint8Array.from(hmacB);
  return timingSafeEqual(bytesA, bytesB);
}
