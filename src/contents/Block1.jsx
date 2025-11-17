"use client";

import { useEffect, useMemo, useState } from "react";
import { filterItemsBySearch } from "../utils/filterItems";

const meats = [
  "Chicken Whole",
  "Oxtail",
  "Goat Leg",
  "Chicken Thigh",
  "Leg Quarters",
  "Wings",
];

export default function Block1({
  searchTerm = "",
  onVisibilityChange = () => {},
}) {
  const [selected, setSelected] = useState(
    meats.reduce((acc, meat) => ({ ...acc, [meat]: false }), {})
  );

  const toggleMeat = (meat) =>
    setSelected((prev) => ({ ...prev, [meat]: !prev[meat] }));
  const filteredMeats = useMemo(
    () => filterItemsBySearch(meats, searchTerm),
    [searchTerm]
  );
  const hasMatches = filteredMeats.length > 0;

  useEffect(() => {
    onVisibilityChange(hasMatches);
  }, [hasMatches, onVisibilityChange]);

  if (!hasMatches) {
    return null;
  }

  return (
    <section className="px-4 py-8 sm:px-12 lg:px-60">
      <ul className="list-none bg-white px-4 pb-8 sm:px-6">
        {filteredMeats.map((item) => {
          const enabled = selected[item];
          return (
            <li
              key={item}
              className="flex w-full flex-col items-start justify-between gap-4 py-3 tracking-wide sm:flex-row sm:items-center lg:gap-8"
            >
              <label className="flex w-full flex-wrap items-center gap-4 text-base text-[#111] tracking-[0.6px] leading-normal sm:flex-nowrap sm:text-[16px]">
                <input
                  type="checkbox"
                  className="h-6 w-6 rounded border border-[#c9c9c9] text-[#0d6dff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0d6dff]"
                  checked={Boolean(enabled)}
                  onChange={() => toggleMeat(item)}
                />
                <span className="flex min-w-0 flex-1 items-center gap-2 text-base font-normal text-black sm:text-[16px]">
                  {item}
                </span>
              </label>
              <input
                type="text"
                disabled={!enabled}
                aria-label={`${item} quantity`}
                className={`w-full max-w-full rounded border border-[#cccccc] px-4 py-1.5 text-base font-normal text-black outline-none focus-visible:border-[#0d6dff] sm:max-w-sm lg:w-60 ${
                  enabled ? "" : "bg-[#f5f5f5] text-[#a3a3a3]"
                }`}
              />
            </li>
          );
        })}
      </ul>
    </section>
  );
}

