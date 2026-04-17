import * as OTPAuth from "otpauth";

const MASTER_SALT =
  import.meta.env.VITE_MASTER_SALT || "DDS_FALLBACK_SALT_32_CHARS";

/**
 * Derives a deterministic Base32 secret from a username + salt.
 * This ensures the same user always gets the same secret.
 */
export function deriveSecret(username: string): string {
  const cleanUsername = username.toLowerCase().trim();
  const seed = `${cleanUsername}-${MASTER_SALT}`;

  // Simple deterministic hash to create a seed for Base32
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }

  // Base32 characters: A-Z and 2-7
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
  let result = "";
  for (let i = 0; i < 16; i++) {
    // We use the hash to pick characters deterministically
    const index = Math.abs((hash ^ (i * 997)) % 32);
    result += chars.charAt(index);
  }
  return result;
}

/**
 * Verifies a 6-digit TOTP code.
 */
export function verifyTOTP(token: string, secret: string): boolean {
  try {
    const totp = new OTPAuth.TOTP({
      issuer: "Dons Du Son",
      label: "Admin",
      algorithm: "SHA1",
      digits: 6,
      period: 30,
      secret: secret, // Already in Base32
    });

    const delta = totp.validate({
      token: token,
      window: 1, // Allow 30s drift
    });

    return delta !== null;
  } catch (e) {
    console.error("TOTP verification error:", e);
    return false;
  }
}
