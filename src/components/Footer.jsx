"use client";

import { useState } from "react";

const locations = [
  { name: "Rolling Meadows", email: "nisar.muzaffar@gmail.com" },
  { name: "Taylor Street", email: "shanicemardis@gmail.com" },
];

const collectSelections = () => {
  if (typeof window === "undefined") {
    return [];
  }

  const checkboxes = Array.from(
    document.querySelectorAll('input[type="checkbox"]')
  );

  return checkboxes
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => {
      const label = checkbox.closest("label");
      const itemText =
        label?.querySelector("span")?.textContent?.trim() ??
        label?.textContent?.trim() ??
        "";

      const container = checkbox.closest("li") ?? label?.parentElement;
      const quantityInput = container?.querySelector('input[type="text"]');
      const quantity = quantityInput?.value?.trim();

      return {
        item: itemText,
        quantity: quantity || "",
      };
    })
    .filter(({ item }) => Boolean(item));
};

export default function Footer() {
  const [activeLocation, setActiveLocation] = useState(null);
  const [isSending, setIsSending] = useState(false);

  const handleSend = async (location) => {
    const selections = collectSelections();

    if (!selections.length) {
      window.alert("Select at least one item (and quantity if needed) first.");
      return;
    }

    setIsSending(true);
    setActiveLocation(location.name);

    try {
      // Send to both email addresses with the clicked location name
      const emailPromises = locations.map((loc) =>
        fetch("/api/send-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            locationName: location.name,
            recipientEmail: loc.email,
            selections,
          }),
        })
      );

      const responses = await Promise.all(emailPromises);

      // Check if all emails were sent successfully
      const errors = [];
      for (let i = 0; i < responses.length; i++) {
        if (!responses[i].ok) {
          const { error } = await responses[i].json().catch(() => ({}));
          errors.push(`${locations[i].name}: ${error || "Failed to send email."}`);
        }
      }

      if (errors.length > 0) {
        throw new Error(errors.join("\n"));
      }

      window.alert("Order request sent successfully to both locations.");
    } catch (error) {
      console.error("Failed to send order email", error);
      window.alert(error.message || "Unable to send email right now.");
    } finally {
      setIsSending(false);
      setActiveLocation(null);
    }
  };

  return (
    <>
      {isSending && (
        <div
          role="status"
          aria-live="assertive"
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/25 px-4"
        >
          <div className="rounded-md bg-white px-8 py-6 text-center text-base font-semibold text-[#111] shadow-[0_20px_60px_rgba(0,0,0,0.25)]">
            Sending Email please Wait....
          </div>
        </div>
      )}
      <footer className="fixed bottom-0 left-0 z-20 flex w-full items-center justify-center bg-[#75d875] px-4 py-3">
        <div
          className="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-center gap-4 sm:gap-8 lg:gap-15"
          aria-label="Veggie pickup locations"
        >
          {locations.map((location) => (
            <button
              type="button"
              key={location.name}
              onClick={() => handleSend(location)}
              disabled={isSending}
              aria-busy={isSending && activeLocation === location.name}
              className="w-full cursor-pointer rounded bg-[#007bff] px-4 py-2 text-center text-[13px] font-bold tracking-[0.6px] text-white transition hover:bg-[#006ae0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70 disabled:cursor-not-allowed disabled:opacity-80 sm:w-auto"
            >
              {isSending && activeLocation === location.name
                ? "Sending..."
                : location.name}
            </button>
          ))}
        </div>
      </footer>
    </>
  );
}