import * as OTPAuth from "otpauth";

// This secret stays in your .env file and is NOT displayed on the UI
const TOTP_SECRET =
  import.meta.env.VITE_TOTP_SECRET || "DDS_DEFAULT_SECRET_DO_NOT_USE_IN_PROD";

/**
 * Verifies a 6-digit TOTP code against the secret in .env.
 */
export function verifyTOTP(token: string): boolean {
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
