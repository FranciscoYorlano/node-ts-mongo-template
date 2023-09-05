declare global {
    interface Window {
        MyNamespace: any;
    }
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: string;
            PORT: string;
            MONGODB_URL: string;
            KEY_JWT: string;
            EXPIRATION_JWT: string;
            MAILER_HOST: string;
            MAILER_PORT: string;
            MAILER_SECURE: string;
            MAILER_USER: string;
            MAILER_PASSWORD: string;
        }
    }
}

export {};
