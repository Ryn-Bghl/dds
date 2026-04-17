import * as OTPAuth from "otpauth";

// For production: The secret MUST be in the .env file.
// No fallback is provided to ensure security.
const TOTP_SECRET = import.meta.env.VITE_TOTP_SECRET;

/**
 * Verifies a 6-digit TOTP code against the secret in .env.
 */
export function verifyTOTP(token: string): boolean {
  if (!TOTP_SECRET) {
    console.error("CRITICAL: VITE_TOTP_SECRET is missing in .env");
    return false;
  }

  try {
    const totp = new OTPAuth.TOTP({
      issuer: "Dons Du Son",
      label: "Admin",
      algorithm: "SHA1",
      digits: 6,
      period: 30,
      secret: TOTP_SECRET,
    });

    const delta = totp.validate({
      token: token,
      window: 1,
    });

    return delta !== null;
  } catch (e) {
    console.error("TOTP verification error:", e);
    return false;
  }
}
