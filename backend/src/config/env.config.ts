import "dotenv/config";
import { get } from "env-var";

export const envs = {
  DATABASE_URL: get("DATABASE_URL").required().asString(),
  FRONTEND_URL: get("FRONTEND_URL").required().asString(),
  SMTP_HOST: get("SMTP_HOST").required().asString(),
  SMTP_PORT: get("SMTP_PORT").required().asPortNumber(),
  SMTP_USER: get("SMTP_USER").required().asString(),
  SMTP_PASS: get("SMTP_PASS").required().asString(),
};
