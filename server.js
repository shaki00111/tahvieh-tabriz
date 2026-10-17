/**
 * سرور توسعه و پیش‌نمایش زنده وب‌سایت تهویه تبریز
 * Local Dev Server & Cloudflare Functions Mock
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0';

// In local test, read from environment variable or fallback to env for testing preview
const PHONE_NUMBER = process.env.PHONE_NUMBER || "09901784358";

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  // CORS & Security Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  let pathname = parsedUrl.pathname;

  // Mock Cloudflare Pages Function: /api/contact
  if (pathname === '/api/contact') {
    const contactData = {
      storeName: "تهویه تبریز",
      brandTitle: "کانال تهویه تبریز",
      tagline: "تجهیزات تخصصی تهویه و کانال‌سازی",
      phone: PHONE_NUMBER, // supplied via environment variable
      telegram: "https://t.me/shaki0030",
      instagram: "https://www.instagram.com/thvia_tabriz/",
      city: "تبریز",
      deliveryInfo: "هماهنگی جهت تحویل حضوری در تبریز و ارسال باربری به سراسر کشور",
      workingHours: "۹ صبح الی ۱۲ شب (با هماهنگی قبلی فروشگاه)",
      status: "active"
    };

    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
    return res.end(JSON.stringify(contactData));
  }

  // Static File Serving
  if (pathname === '/' || pathname === '') {
    pathname = '/index.html';
  }

  const safePath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(__dirname, safePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('404 Not Found');
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, HOST, () => {
  console.log(`[Tahvieh Tabriz] Live Server running at http://${HOST}:${PORT}`);
});
