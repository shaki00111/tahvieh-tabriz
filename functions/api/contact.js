export async function onRequestGet(context) {
  const phone = context.env.PHONE_NUMBER;
  if (typeof phone !== "string" || !phone.trim()) {
    return new Response(JSON.stringify({ error: "Contact not configured" }), {
      status: 503,
      headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" }
    });
  }
  // This is public contact information by design: visitors can see it when requesting contact details.
  return new Response(JSON.stringify({ phone: phone.trim() }), {
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "public, max-age=300",
      "x-content-type-options": "nosniff"
    }
  });
}
