/**
 * One-time seed for vessel schedules (from Google Sheet data).
 * Requires: dev server running, ADMIN_SECRET in env.
 * Usage: ADMIN_SECRET=your_secret node scripts/seed-schedules.js
 * Optional: BASE_URL=http://localhost:3000 (default)
 */

const fs = require("fs");
const path = require("path");

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const ADMIN_SECRET = process.env.ADMIN_SECRET;

if (!ADMIN_SECRET) {
  console.error("Missing ADMIN_SECRET. Usage: ADMIN_SECRET=your_secret node scripts/seed-schedules.js");
  process.exit(1);
}

const seedPath = path.join(__dirname, "schedules-seed.json");
const data = JSON.parse(fs.readFileSync(seedPath, "utf8"));

async function run() {
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    try {
      const res = await fetch(`${BASE_URL}/api/schedules`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": ADMIN_SECRET,
        },
        body: JSON.stringify(row),
      });
      if (!res.ok) {
        const err = await res.text();
        console.error(`Row ${i + 1} failed:`, res.status, err);
      } else {
        console.log(`Row ${i + 1} created:`, row.vesselName, row.polCode, "->", row.podCode);
      }
    } catch (e) {
      console.error(`Row ${i + 1} error:`, e.message);
    }
  }
}

run();
