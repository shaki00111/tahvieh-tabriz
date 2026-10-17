/**
 * Cloudflare Pages Function - Contact API Endpoint
 * Handles /api/contact requests dynamically
 *
 * NOTE: The phone number is NOT hardcoded here.
 * It is securely read from Cloudflare Pages Environment Variables: context.env.PHONE_NUMBER
 */

export async function onRequest(context) {
  // Read PHONE_NUMBER from Cloudflare Pages Environment Variables
  const envPhone = (context.env && context.env.PHONE_NUMBER) ? context.env.PHONE_NUMBER.trim() : "";

  const payload = {
    storeName: "تهویه تبریز",
    brandTitle: "کانال تهویه تبریز",
    tagline: "تجهیزات تخصصی تهویه و کانال‌سازی",
    phone: envPhone, // Dynamically supplied at runtime by serverless host
    telegram: "https://t.me/shaki0030",
    instagram: "https://www.instagram.com/thvia_tabriz/",
    city: "تبریز",
    deliveryInfo: "هماهنگی جهت تحویل حضوری در تبریز و ارسال باربری به سراسر کشور",
    workingHours: "۹ صبح الی ۱۲ شب (با هماهنگی قبلی فروشگاه)",
    status: "active"
  };

  return new Response(JSON.stringify(payload), {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=60, s-maxage=120",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "X-Content-Type-Options": "nosniff"
    }
  });
}
