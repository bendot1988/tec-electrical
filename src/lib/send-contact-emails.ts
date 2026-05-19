import { Resend } from "resend";
import ContactConfirmation from "../../emails/ContactConfirmation";
import ContactNotification from "../../emails/ContactNotification";
import {
  CONTACT_BCC_EMAIL,
  CONTACT_TO_EMAIL,
  formatSubmittedAt,
  type ContactPayload,
} from "./contact";

function getResendConfig() {
  const apiKey = import.meta.env.RESEND_API_KEY;
  const from = import.meta.env.RESEND_FROM_EMAIL;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  if (!from) {
    throw new Error("RESEND_FROM_EMAIL is not configured.");
  }

  return { apiKey, from };
}

export async function sendContactEmails(payload: ContactPayload, submissionId: string) {
  const { apiKey, from } = getResendConfig();
  const resend = new Resend(apiKey);
  const submittedAt = formatSubmittedAt(new Date());

  const notification = await resend.emails.send(
    {
      from,
      to: [CONTACT_TO_EMAIL],
      bcc: [CONTACT_BCC_EMAIL],
      replyTo: payload.email,
      subject: `New enquiry from ${payload.name}`,
      react: ContactNotification({
        ...payload,
        submittedAt,
      }),
    },
    { idempotencyKey: `contact-notification/${submissionId}` },
  );

  if (notification.error) {
    return { ok: false as const, error: notification.error.message };
  }

  const confirmation = await resend.emails.send(
    {
      from,
      to: [payload.email],
      subject: "We received your enquiry — Tec Electrical",
      react: ContactConfirmation({
        name: payload.name,
        service: payload.service,
        message: payload.message,
      }),
    },
    { idempotencyKey: `contact-confirmation/${submissionId}` },
  );

  if (confirmation.error) {
    return { ok: false as const, error: confirmation.error.message };
  }

  return { ok: true as const };
}
