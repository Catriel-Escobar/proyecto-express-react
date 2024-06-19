import nodemailer from "nodemailer";
import { envs } from "./env.config";

const config = () => {
  return {
    host: envs.SMTP_HOST,
    port: envs.SMTP_PORT,
    auth: {
      user: envs.SMTP_USER,
      pass: envs.SMTP_PASS,
    },
  };
};

export const transport = nodemailer.createTransport(config());
