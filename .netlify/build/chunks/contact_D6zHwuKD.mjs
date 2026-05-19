import { Resend } from 'resend';
import { jsxs, jsx } from 'react/jsx-runtime';
import { Section, Text, Html, Tailwind, pixelBasedPreset, Head, Preview, Body, Container, Hr, Heading, Link } from '@react-email/components';

const CONTACT_TO_EMAIL = "info@tecservicesltd.com";
const CONTACT_BCC_EMAIL = "ben@dotwall.co.uk";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function parseContactPayload(body) {
  if (!body || typeof body !== "object") {
    return { error: "Invalid request body." };
  }
  const record = body;
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
  if (message.length > 5e3) {
    return { error: "Message is too long. Please shorten it and try again." };
  }
  return {
    data: {
      name,
      email,
      phone: phone || void 0,
      service: service || void 0,
      message
    }
  };
}
function formatSubmittedAt(date) {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Europe/London"
  }).format(date);
}

function DetailRow({ label, value }) {
  return /* @__PURE__ */ jsxs(Section, { className: "mb-4 border border-solid border-slate-200 bg-slate-50 px-4 py-3", children: [
    /* @__PURE__ */ jsx(Text, { className: "m-0 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500", children: label }),
    /* @__PURE__ */ jsx(Text, { className: "m-0 mt-1 text-sm leading-6 text-slate-900", children: value })
  ] });
}

function EmailLayout({ preview, children }) {
  return /* @__PURE__ */ jsx(Html, { lang: "en", children: /* @__PURE__ */ jsxs(
    Tailwind,
    {
      config: {
        presets: [pixelBasedPreset],
        theme: {
          extend: {
            colors: {
              brand: {
                navy: "#020617",
                slate: "#0f172a",
                blue: "#1d4ed8",
                amber: "#fbbf24",
                muted: "#64748b",
                surface: "#f8fafc"
              }
            }
          }
        }
      },
      children: [
        /* @__PURE__ */ jsx(Head, {}),
        /* @__PURE__ */ jsx(Preview, { children: preview }),
        /* @__PURE__ */ jsx(Body, { className: "m-0 bg-brand-surface font-sans", children: /* @__PURE__ */ jsxs(Container, { className: "mx-auto my-8 max-w-[600px] border border-solid border-slate-200 bg-white", children: [
          /* @__PURE__ */ jsxs(Section, { className: "border-none border-b border-solid border-slate-800 bg-brand-navy px-8 py-7", children: [
            /* @__PURE__ */ jsx(Text, { className: "m-0 text-xs font-bold uppercase tracking-[0.2em] text-blue-300", children: "Tec Electrical" }),
            /* @__PURE__ */ jsx(Text, { className: "m-0 mt-2 text-2xl font-black uppercase leading-tight text-white", children: "Precision electrical services" }),
            /* @__PURE__ */ jsx(Text, { className: "m-0 mt-3 text-sm text-slate-300", children: "Leicester and surrounding areas" })
          ] }),
          /* @__PURE__ */ jsx(Section, { className: "px-8 py-8", children }),
          /* @__PURE__ */ jsx(Hr, { className: "mx-8 w-auto border-none border-t border-solid border-slate-200" }),
          /* @__PURE__ */ jsxs(Section, { className: "px-8 pb-8 pt-4", children: [
            /* @__PURE__ */ jsx(Text, { className: "m-0 text-xs leading-5 text-brand-muted", children: "Tec Electrical · Domestic and commercial electrical services" }),
            /* @__PURE__ */ jsxs(Text, { className: "m-0 mt-2 text-xs leading-5 text-brand-muted", children: [
              /* @__PURE__ */ jsx("a", { href: "mailto:info@tecservicesltd.com", className: "text-brand-blue no-underline", children: "info@tecservicesltd.com" }),
              " · ",
              /* @__PURE__ */ jsx("a", { href: "https://tec.dotwall.co.uk", className: "text-brand-blue no-underline", children: "tec.dotwall.co.uk" })
            ] })
          ] })
        ] }) })
      ]
    }
  ) });
}

function ContactConfirmation({ name, service, message }) {
  const firstName = name.trim().split(/\s+/)[0] || name;
  return /* @__PURE__ */ jsxs(EmailLayout, { preview: "Thanks for contacting Tec Electrical", children: [
    /* @__PURE__ */ jsx(Text, { className: "m-0 text-xs font-bold uppercase tracking-[0.16em] text-amber-600", children: "Enquiry received" }),
    /* @__PURE__ */ jsxs(Heading, { className: "m-0 mt-3 text-2xl font-black uppercase leading-tight text-slate-900", children: [
      "Thanks, ",
      firstName
    ] }),
    /* @__PURE__ */ jsx(Text, { className: "m-0 mt-4 text-sm leading-6 text-slate-600", children: "We have received your message and will review it shortly. A member of the Tec Electrical team will get back to you, usually within one working day." }),
    /* @__PURE__ */ jsx(Text, { className: "m-0 mt-4 text-sm leading-6 text-slate-600", children: "If your enquiry is urgent, call us and mention your website submission." }),
    /* @__PURE__ */ jsx(Text, { className: "m-0 mb-2 mt-8 text-xs font-bold uppercase tracking-[0.14em] text-slate-500", children: "Your submission" }),
    service ? /* @__PURE__ */ jsx(DetailRow, { label: "Service", value: service }) : null,
    /* @__PURE__ */ jsx(DetailRow, { label: "Message", value: message }),
    /* @__PURE__ */ jsx(Text, { className: "m-0 mt-6 text-sm leading-6 text-slate-600", children: "Tec Electrical · Leicester and surrounding areas" })
  ] });
}
ContactConfirmation.PreviewProps = {
  name: "Alex Morgan",
  service: "Fault finding",
  message: "We have intermittent power loss in the kitchen circuit. Looking for diagnosis and repair this week if possible."
};

function ContactNotification({
  name,
  email,
  phone,
  service,
  message,
  submittedAt
}) {
  return /* @__PURE__ */ jsxs(EmailLayout, { preview: `New enquiry from ${name}`, children: [
    /* @__PURE__ */ jsx(Text, { className: "m-0 text-xs font-bold uppercase tracking-[0.16em] text-blue-700", children: "New website enquiry" }),
    /* @__PURE__ */ jsxs(Heading, { className: "m-0 mt-3 text-2xl font-black uppercase leading-tight text-slate-900", children: [
      name,
      " requested a quote"
    ] }),
    /* @__PURE__ */ jsxs(Text, { className: "m-0 mt-3 text-sm leading-6 text-slate-600", children: [
      "Submitted ",
      submittedAt,
      ". Reply directly to this email to reach the customer at",
      " ",
      /* @__PURE__ */ jsx(Link, { href: `mailto:${email}`, className: "text-blue-700 no-underline", children: email }),
      "."
    ] }),
    /* @__PURE__ */ jsx(DetailRow, { label: "Name", value: name }),
    /* @__PURE__ */ jsx(DetailRow, { label: "Email", value: email }),
    phone ? /* @__PURE__ */ jsx(DetailRow, { label: "Phone", value: phone }) : null,
    service ? /* @__PURE__ */ jsx(DetailRow, { label: "Service", value: service }) : null,
    /* @__PURE__ */ jsx(DetailRow, { label: "Message", value: message })
  ] });
}
ContactNotification.PreviewProps = {
  name: "Alex Morgan",
  email: "alex@example.com",
  phone: "+44 7700 900123",
  service: "Fault finding",
  message: "We have intermittent power loss in the kitchen circuit. Looking for diagnosis and repair this week if possible.",
  submittedAt: "Tuesday 19 May 2026, 10:30"
};

function getResendConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }
  if (!from) {
    throw new Error("RESEND_FROM_EMAIL is not configured.");
  }
  return { apiKey, from };
}
async function sendContactEmails(payload, submissionId) {
  const { apiKey, from } = getResendConfig();
  const resend = new Resend(apiKey);
  const submittedAt = formatSubmittedAt(/* @__PURE__ */ new Date());
  const notification = await resend.emails.send(
    {
      from,
      to: [CONTACT_TO_EMAIL],
      bcc: [CONTACT_BCC_EMAIL],
      replyTo: payload.email,
      subject: `New enquiry from ${payload.name}`,
      react: ContactNotification({
        ...payload,
        submittedAt
      })
    },
    { idempotencyKey: `contact-notification/${submissionId}` }
  );
  if (notification.error) {
    return { ok: false, error: notification.error.message };
  }
  const confirmation = await resend.emails.send(
    {
      from,
      to: [payload.email],
      subject: "We received your enquiry — Tec Electrical",
      react: ContactConfirmation({
        name: payload.name,
        service: payload.service,
        message: payload.message
      })
    },
    { idempotencyKey: `contact-confirmation/${submissionId}` }
  );
  if (confirmation.error) {
    return { ok: false, error: confirmation.error.message };
  }
  return { ok: true };
}

const prerender = false;
const POST = async ({ request }) => {
  try {
    const body = await request.json();
    const parsed = parseContactPayload(body);
    if (!parsed.data) {
      return new Response(JSON.stringify({ error: parsed.error }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const submissionId = crypto.randomUUID();
    const result = await sendContactEmails(parsed.data, submissionId);
    if (!result.ok) {
      console.error("Resend error:", result.error);
      return new Response(
        JSON.stringify({
          error: "We could not send your message right now. Please try again or email us directly."
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return new Response(
      JSON.stringify({
        error: "Something went wrong. Please try again or email us directly."
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
