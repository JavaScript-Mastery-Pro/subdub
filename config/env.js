import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const { NODE_ENV, PORT } = process.env;
export const { ARCJET_KEY, ARCJET_ENV } = process.env;
