import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const { NODE_ENV, PORT, SERVER_URL } = process.env;
export const { ARCJET_KEY, ARCJET_ENV } = process.env;
export const { DB_URI } = process.env;
export const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;
export const {
  QSTASH_URL,
  QSTASH_TOKEN,
  QSTASH_CURRENT_SIGNING_KEY,
  QSTASH_NEXT_SIGNING_KEY,
} = process.env;
export const { EMAIL_PASSWORD } = process.env;
