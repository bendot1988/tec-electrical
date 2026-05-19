export const CONTACT_TO_EMAIL = "info@tecservicesltd.com";
export const CONTACT_BCC_EMAIL = "ben@dotwall.co.uk";

export const SERVICE_OPTIONS = [
  "Domestic rewire",
  "Fault finding",
  "Inspection / EICR",
  "Commercial maintenance",
  "Other",
] as const;

export type ServiceOption = (typeof SERVICE_OPTIONS)[number];

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  website?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function parseContactPayload(body: unknown): { data?: ContactPayload; error?: string } {
  if (!body || typeof body !== "object") {
    return { error: "Invalid request body." };
  }

  const record = body as Record<string, unknown>;
  const name = typeof record.name === "string" ? record.name.trim() : "";
  const email = typeof record.email === "string" ? record.email.trim().toLowerCase() : "";
  const phone = typeof record.phone === "string" ? record.phone.trim() : "";
  const service = typeof record.service === "string" ? record.service.trim() : "";
  const message = typeof record.message === "string" ? record.message.trim() : "";
  const website = typeof record.website === "string" ? record.website.trim() : "";

  if (website) {
    return { error: "Unable to send your message." };
  }

  if (!name || name.length < 2) {
    return { error: "Please enter your full name." };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { error: "Please enter a valid email address." };
  }

  if (!message || message.length < 10) {
    return { error: "Please enter a message of at least 10 characters." };
  }

  if (message.length > 5000) {
    return { error: "Message is too long. Please shorten it and try again." };
  }

  return {
    data: {
      name,
      email,
      phone: phone || undefined,
      service: service || undefined,
      message,
    },
  };
}

export function formatSubmittedAt(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/London",
  }).format(date);
}
