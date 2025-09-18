// src/lib/mail.ts
import nodemailer, { Transporter } from "nodemailer";

const {
  SMTP_HOST,
  SMTP_PORT,
  SMTP_SECURE,
  SMTP_USER,
  SMTP_PASS,
  MAIL_FROM,
  MAIL_TO,
} = process.env;

if (!SMTP_HOST || !SMTP_PORT || !MAIL_FROM || !MAIL_TO) {
  console.warn("SMTP env vars faltantes: revisa .env");
}

export const mailTo = MAIL_TO!;
export const mailFrom = MAIL_FROM!;

export function createTransport(): Transporter {
  const port = Number(SMTP_PORT ?? 587);
  const secure = (SMTP_SECURE ?? "false") === "true"; // 465 => true

  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure,
    auth:
      SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  });

  return transport;
}
