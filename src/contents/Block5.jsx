"use client";

import { useEffect, useMemo, useState } from "react";
import { filterItemsBySearch } from "../utils/filterItems";

const spices = [
  "All Spices Ground",
  "All Spices Whole",
  "Salt Seasoning",
  "Garlic Powder",
  "Onion Powder",
  "Black Pepper",
  "Salt",
  "White Sugar",
  "Brown Sugar",
  "Flour",
  "Walker Wood",
  "Jamaican Curry Powder",
  "Baking Powder",
  "Ground Ginger",
  "Cinnamon",
  "Nutmeg",
];

export default function Block5({
  searchTerm = "",
  onVisibilityChange = () => {},
}) {
  const [selected, setSelected] = useState(
    spices.reduce((acc, item) => ({ ...acc, [item]: false }), {})
  );

  const toggleItem = (item) =>
    setSelected((prev) => ({ ...prev, [item]: !prev[item] }));

  const filteredItems = useMemo(
    () => filterItemsBySearch(spices, searchTerm),
    [searchTerm]
  );
  const hasMatches = filteredItems.length > 0;

  useEffect(() => {
    onVisibilityChange(hasMatches);
  }, [hasMatches, onVisibilityChange]);

  if (!hasMatches) {
    return null;
  }

  return (
    <section className="px-4 pb-10 sm:px-12 lg:px-25">
      <ul className="mx-auto grid max-w-[1220px] list-none gap-x-1 gap-y-6 bg-white py-6 sm:grid-cols-2 lg:grid-cols-5">
        {filteredItems.map((item) => (
          <li key={item} className="flex justify-start">
            <label className="flex items-center gap-3 text-[16px] text-[#111] tracking-[0.6px] leading-normal">
              <input
                type="checkbox"
                className="h-5 w-5 rounded border border-[#c9c9c9] text-[#0d6dff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0d6dff]"
                checked={Boolean(selected[item])}
                onChange={() => toggleItem(item)}
              />
              <span className="flex flex-1 items-center text-[16px] font-normal text-black">
                {item}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}

