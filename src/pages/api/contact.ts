import type { APIRoute } from "astro";
import { parseContactPayload } from "../../lib/contact";
import { sendContactEmails } from "../../lib/send-contact-emails";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const parsed = parseContactPayload(body);

    if (!parsed.data) {
      return new Response(JSON.stringify({ error: parsed.error }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const submissionId = crypto.randomUUID();
    const result = await sendContactEmails(parsed.data, submissionId);

    if (!result.ok) {
      console.error("Resend error:", result.error);
      return new Response(
        JSON.stringify({
          error: "We could not send your message right now. Please try again or email us directly.",
        }),
        { status: 502, headers: { "Content-Type": "application/json" } },
      );
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return new Response(
      JSON.stringify({
        error: "Something went wrong. Please try again or email us directly.",
      }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
