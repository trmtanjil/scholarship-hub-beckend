import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
// If your Prisma file is located elsewhere, you can change the path

// Support multiple trusted origins via TRUSTED_ORIGINS env var (comma-separated)
// Fallback to APP_URL for compatibility
const trustedOriginsEnv =
  process.env.TRUSTED_ORIGINS || process.env.APP_URL || "";
const trustedOrigins = trustedOriginsEnv
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

if (trustedOrigins.length === 0) {
  throw new Error(
    "No trusted origins configured. Set TRUSTED_ORIGINS or APP_URL",
  );
}

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),

  trustedOrigins: ["http://localhost:3000", ...trustedOrigins],
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "USER",
        required: false,
      },
      status: {
        type: "string",
        defaultValue: "ACTIVE",
        required: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },

  socialProviders: {
    google: {
      accessType: "offline",
      prompt: "select_account consent",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  advanced: {
    defaultCookieAttributes: {
      sameSite: "lax",
      secure: false,
      httpOnly: true,
      //extra
      path: "/",
    },
    trustProxy: true,
    cookies: {
      state: {
        attributes: {
          sameSite: "lax",
          secure: false,
          // extra
          path: "/",
        },
      },
    },
  },
});
