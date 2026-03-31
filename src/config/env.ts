import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

interface EnvConfig{
    PORT: number
    DATABASE_URL: string
    BETTER_AUTH_SECRET: string
    APP_URL: string
    BETTER_AUTH_URL: string
    TRUSTED_ORIGINS: string
    GOOGLE_CLIENT_ID: string
    GOOGLE_CLIENT_SECRET: string
    APP_USER: string
    APP_PASS: string
    stripe_secret_key: string
     
}

const envVariableLoader = (): EnvConfig => {
    const requiredEnv = ["PORT", "DATABASE_URL", "BETTER_AUTH_SECRET", "APP_URL", "BETTER_AUTH_URL", "TRUSTED_ORIGINS", "GOOGLE_CLIENT_ID", "GOOGLE_CLIENT_SECRET", "APP_USER", "APP_PASS", "stripe_secret_key"];   

    requiredEnv.forEach((env) => {
        if (!process.env[env]) {
            throw new Error(`Missing environment variable: ${env}`);
        }
    });
    return {
        PORT: parseInt(process.env.PORT as string, 10),
        DATABASE_URL: process.env.DATABASE_URL as string,
        BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET as string,
        APP_URL: process.env.APP_URL as string,
        BETTER_AUTH_URL: process.env.BETTER_AUTH_URL as string,
        TRUSTED_ORIGINS: process.env.TRUSTED_ORIGINS as string,
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
        APP_USER: process.env.APP_USER as string,
        APP_PASS: process.env.APP_PASS as string,
        stripe_secret_key: process.env.stripe_secret_key as string,
    };
};

export const env: EnvConfig =envVariableLoader();
