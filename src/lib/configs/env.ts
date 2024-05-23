export function getEnv<T>(key: string, required = false, errorMessage?: string, defaultValue?: any) {
  if (typeof process.env[key] === 'undefined') {
    if (typeof defaultValue !== 'undefined') return defaultValue as T;
    if (required) throw new Error(errorMessage || `Variable [${key}] needs to be configured`);
    return defaultValue as T;
  } else {
    return process.env[key] as T;
  }
}

export const appEnv = {
  base: {
    mongoUri: getEnv<string>('MONGO_URI', false, 'Database is not configured'),
  },
  security: {
    google: {
      enabled: getEnv<boolean>('GOOGLE_ENABLED', false, '', false),
      clientId: getEnv<string>('NEXT_PUBLIC_GOOGLE_CLIENT_ID'),
      clientSecret: getEnv<string>('GOOGLE_CLIENT_SECRET'),
      redirectURI: getEnv<string>('GOOGLE_REDIRECT_URI'),
    }
  }
}

export const MONGO_URI = process.env.MONGO_URI;
export const DEFAULT_ACCOUNT_USERNAME = "admin";
export const DEFAULT_ACCOUNT_EMAIL = "admin@gmail.com";
export const DEFAULT_ACCOUNT_PASSWORD = "M@sterPwd1";
export const NODE_ENV = process.env.NODE_ENV || "development";
