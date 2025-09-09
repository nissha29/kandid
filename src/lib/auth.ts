import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/drizzle";

export const auth = betterAuth({
    baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",
    trustedOrigins: ["https://kandid-ten.vercel.app"],
    database: drizzleAdapter(db, {
        provider: "pg",
    }),

    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
        minPasswordLength: 5,
        maxPasswordLength: 64
    },

    emailVerification: {
        enabled: false,
        sendOnSignUp: true,
    },

    session: {
        enabled: true,
        expiresIn: 60 * 60 * 24 * 7,
    },

    credentials: {
        email: true,
        username: true,
    },

    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            redirectURI: process.env.NODE_ENV === "production"
                ? "https://kandid-ten.vercel.app"
                : "http://localhost:3000",
        },
    },
});
