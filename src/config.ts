import { config } from "dotenv";
import { cleanEnv, port, str } from "envalid";

config();

const env = cleanEnv(process.env, {
    SERVER_PORT: port(),
    JWT_SECRET_KEY: str()
});

export const SERVER_PORT: number = env.SERVER_PORT;
export const JWT_SECRET_KEY: string = env.JWT_SECRET_KEY;
export const NODE_ENV: string = process.env.NODE_ENV || 'development';