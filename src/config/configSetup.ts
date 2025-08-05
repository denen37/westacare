import * as dotenv from 'dotenv';
dotenv.config();

type Config = {
    PORT: number | undefined;
    NODE_ENV: string | undefined;
    TOKEN_SECRET: string;
    //JWT_EXPIRY_TIME: string | undefined;
    DBNAME: string | undefined;
    DBUSERNAME: string | undefined;
    DBPASSWORD: string | undefined;
    DBHOST: string | undefined;
    DBPORT: number | undefined;
    DBDIALECT: string | undefined;
    PUBLIC_ROUTES: string[] | [];
    EMAIL_SERVICE: string | undefined;
    EMAIL_HOST: string | undefined;
    EMAIL_PORT: number;
    EMAIL_USER: string | undefined;
    EMAIL_PASS: string | undefined;
    OTP_EXPIRY_TIME: number;
    PAYSTACK_SECRET_KEY: string | undefined;
    CRYPTO_SECRET_KEY: string | undefined;
    CRYPTO_IV: string | undefined;
    AZURE_STORAGE_CONNECTION_STRING: string | undefined;
    // FIREBASE_ADMIN_CREDENTIALS: string | undefined;
};

const getConfig = (): Config => {
    return {
        PORT: Number(process.env.PORT),
        NODE_ENV: process.env.NODE_ENV,
        //JWT_EXPIRY_TIME: process.env.JWT_EXPIRY_TIME,
        DBNAME: process.env.DBNAME,
        DBUSERNAME: process.env.DBUSERNAME,
        DBPASSWORD: process.env.DBPASSWORD,
        DBHOST: process.env.DBHOST,
        DBPORT: Number(process.env.DBPORT),
        DBDIALECT: process.env.DBDIALECT,
        TOKEN_SECRET: process.env.TOKEN_SECRET || 'supersecret',
        EMAIL_HOST: process.env.EMAIL_HOST,
        EMAIL_PASS: process.env.EMAIL_PASS,
        EMAIL_PORT: Number(process.env.EMAIL_PORT),
        EMAIL_SERVICE: process.env.EMAIL_SERVICE,
        EMAIL_USER: process.env.EMAIL_USER,
        OTP_EXPIRY_TIME: Number(process.env.OTP_EXPIRY_TIME),
        PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY,
        AZURE_STORAGE_CONNECTION_STRING: process.env.AZURE_STORAGE_CONNECTION_STRING,
        CRYPTO_SECRET_KEY: process.env.CRYPTO_SECRET_KEY,
        CRYPTO_IV: process.env.CRYPTO_IV,
        // FIREBASE_ADMIN_CREDENTIALS: process.env.FIREBASE_ADMIN_CREDENTIALS,
        PUBLIC_ROUTES: [
            '/',
            '/api',
            '/api/auth/login',
            '/api/auth/seeker/register',
            '/api/auth/provider/register',
            '/api/auth/refresh-token',
            '/api/auth/logout',
            '/api/auth/send-otp',
            '/api/auth/verify-otp',
            '/api/auth/forgot-password',
            '/api/auth/reset-password',
            '/api/auth/verify-token',
        ]
    };
};

const getSanitzedConfig = (config: Config) => {
    for (const [key, value] of Object.entries(config)) {
        if (value === undefined) {
            throw new Error(`Missing key ${key} in .env`);
        }
    }
    return config as Config;
};

const config = getConfig();
const sanitizedConfig = getSanitzedConfig(config);

export default sanitizedConfig;
