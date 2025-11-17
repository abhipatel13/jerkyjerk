"use server";

import { NextResponse } from "next/server";

const API_KEY = process.env.BREVO_API_KEY;
const SENDER_EMAIL = process.env.BREVO_FROM_EMAIL || "orders@jerkyjerk.com";

export async function POST(request) {
  try {
    const body = await request.json();
    const { locationName, recipientEmail, selections } = body || {};

    if (!locationName || !recipientEmail) {
      return NextResponse.json(
        { error: "locationName and recipientEmail are required." },
        { status: 400 }
      );
    }

    // Format selections
    const itemsHTML = selections?.length
      ? selections
          .map(
            (s) =>
              `<li>${s.item}${s.quantity ? ` (Qty: ${s.quantity})` : ""}</li>`
          )
          .join("")
      : "<li>None provided</li>";

    const itemsText = selections?.length
      ? selections
          .map(
            (s) => `- ${s.item}${s.quantity ? ` (Qty: ${s.quantity})` : ""}`
          )
          .join("\n")
      : "- None provided";

    // Build email content
    const payload = {
      sender: { email: SENDER_EMAIL },
      to: [{ email: recipientEmail }],
      subject: `${locationName} Order Request`,
      textContent: `Location: ${locationName}\nRequested Items:\n${itemsText}`,
      htmlContent: `
        <div>
          <p><strong>Location:</strong> ${locationName}</p>
          <p><strong>Requested Items:</strong></p>
          <ul>${itemsHTML}</ul>
        </div>
      `,
    };

    // SEND EMAIL using Sendinblue API
    const res = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "api-key": API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const error = await res.text();
      console.log("BREVO ERROR:", error);
      return NextResponse.json(
        { error: "Failed to send email.", details: error },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("send-order error:", err);
    return NextResponse.json(
      { error: "Unexpected server error." },
      { status: 500 }
    );
  }
}
