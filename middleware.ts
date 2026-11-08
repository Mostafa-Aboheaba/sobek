import { NextResponse } from "next/server";

// Production (including Vercel) serves the holding page.
// Delete this file, or change SITE_DOWN to false, then redeploy to bring the site back.
const SITE_DOWN = process.env.NODE_ENV === "production";

const downPage = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow" />
    <title>Sobek Shipping Agency — Temporarily unavailable</title>
    <style>
      :root { color-scheme: light; }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 24px;
        background: #012C4E;
        color: #fff;
        font-family: Georgia, "Times New Roman", serif;
      }
      main {
        width: min(560px, 100%);
        text-align: center;
      }
      p.label {
        margin: 0 0 12px;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 12px;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: #EAD292;
      }
      h1 {
        margin: 0;
        font-size: clamp(32px, 6vw, 48px);
        font-weight: 500;
        line-height: 1.15;
      }
      p.message {
        margin: 20px auto 0;
        max-width: 42ch;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 16px;
        line-height: 1.6;
        color: rgba(255, 255, 255, 0.86);
      }
      p.contact {
        margin: 28px 0 0;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 15px;
        line-height: 1.7;
      }
      a { color: #EAD292; text-decoration: none; }
      a:hover { text-decoration: underline; }
    </style>
  </head>
  <body>
    <main>
      <p class="label">Sobek Shipping Agency</p>
      <h1>We’ll be back shortly</h1>
      <p class="message">The website is temporarily unavailable while we resolve an urgent issue. Thank you for your patience.</p>
      <p class="contact">
        <a href="tel:+201016078688">+20 101 607 8688</a><br />
        <a href="mailto:info@sobek-egy.com">info@sobek-egy.com</a>
      </p>
    </main>
  </body>
</html>`;

export function middleware() {
  if (!SITE_DOWN) {
    return NextResponse.next();
  }

  return new NextResponse(downPage, {
    status: 503,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store, max-age=0",
      "Retry-After": "86400",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
