/**
 * Google Sheets submission utility via Google Apps Script Web App.
 *
 * HOW TO SET UP:
 * 1. Open your Google Sheet → Extensions → Apps Script
 * 2. Paste the Apps Script code below, deploy as Web App (Execute as: Me, Access: Anyone)
 * 3. Copy the deployment URL and set it as NEXT_PUBLIC_SHEETS_SCRIPT_URL in your .env.local
 *
 * ──────────── Apps Script code ────────────
 * function doPost(e) {
 *   const data = JSON.parse(e.postData.contents);
 *   const ss = SpreadsheetApp.getActiveSpreadsheet();
 *   const sheet = ss.getSheetByName(data.tab) || ss.insertSheet(data.tab);
 *   const row = data.fields;
 *   if (sheet.getLastRow() === 0) sheet.appendRow(Object.keys(row));
 *   sheet.appendRow(Object.values(row));
 *   return ContentService.createTextOutput(JSON.stringify({ ok: true }))
 *     .setMimeType(ContentService.MimeType.JSON);
 * }
 * ──────────────────────────────────────────
 */

const SCRIPT_URL = process.env.NEXT_PUBLIC_SHEETS_SCRIPT_URL ?? "";

export async function submitToSheet(
  tab: string,
  fields: Record<string, string | number>
): Promise<{ ok: boolean; error?: string }> {
  if (!SCRIPT_URL) {
    console.warn("NEXT_PUBLIC_SHEETS_SCRIPT_URL is not set.");
    return { ok: false, error: "Script URL not configured." };
  }

  try {
    const res = await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tab, fields }),
      mode: "no-cors", // Apps Script requires no-cors
    });
    // no-cors means we can't read the response body — assume success if no throw
    return { ok: true };
  } catch (err) {
    return { ok: false, error: String(err) };
  }
}

/** Fetch the visitor's public IP from a free API */
export async function getClientIP(): Promise<string> {
  try {
    const res = await fetch("https://api.ipify.org?format=json");
    const data = await res.json();
    return data.ip ?? "unknown";
  } catch {
    return "unknown";
  }
}
