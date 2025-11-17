"use client";

import { useEffect, useMemo, useState } from "react";
import { filterItemsBySearch } from "../utils/filterItems";

const nonFoodItems = [
  "One Compartment",
  "Three Compartment",
  "Side Compartment",
  "2 oz Container",
  "2 oz Lids",
  "Latex Glove-M",
  "Latex Glove-XL",
  "Latex Glove-L",
  "Wax Paper",
  "Saran Wrap",
  "Aluminium Foil",
  "Delivery Form Pad",
  "Napkin / Fork Set",
  "Bleach Case",
  "To-go Bags",
  "Beef Pattie Bags",
  "Pine-Sol",
  "Mop Head",
  "Garbage Bags",
  "Dish Soap",
  "Plastic Wrap",
  "1/2 Pan Foil",
  "Rubber Gloves",
  "Degreaser",
  "Sanitizer",
  "Hand Soap",
  "Toilet Paper",
  "Printer Paper POS",
  "Staples",
  "Tape",
  "Napkin 1 Ply",
  "Paper Towel Dispenser",
  "Stainless Steel Pot Scrubber",
  "Fry Boil Out",
  "Portion bags",
  "Grill Brush",
  "Bus Pan/Lid",
  "Full Pan Foil",
  "1/2 Pan Foil",
  "Full Pan Foil lids",
  "1/2 Pan Foil lids",
  "Plastic Cups 16oz",
  "16oz Cups Lids",
  "Straws",
  "Charcoal",
  "Receipt paper roll",
  "Pam Spray",
];

export default function Block7({
  searchTerm = "",
  onVisibilityChange = () => {},
}) {
  const [selected, setSelected] = useState(
    nonFoodItems.reduce((acc, item) => ({ ...acc, [item]: false }), {})
  );

  const toggleItem = (item) =>
    setSelected((prev) => ({ ...prev, [item]: !prev[item] }));

  const filteredItems = useMemo(
    () => filterItemsBySearch(nonFoodItems, searchTerm),
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
      <ul className="mx-auto grid max-w-[1280px] list-none gap-x-4 gap-y-5 bg-white px-4 py-6 sm:grid-cols-2 sm:px-6 lg:ml-12 lg:grid-cols-5 lg:gap-x-1 lg:px-0">
        {filteredItems.map((item) => (
          <li key={item} className="flex justify-start">
            <label className="flex w-full flex-wrap items-center gap-3 text-base text-[#111] tracking-[0.5px] leading-normal sm:flex-nowrap sm:text-[16px]">
              <input
                type="checkbox"
                className="h-5 w-5 rounded border border-[#c9c9c9] text-[#0d6dff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0d6dff]"
                checked={Boolean(selected[item])}
                onChange={() => toggleItem(item)}
              />
              <span className="flex min-w-0 flex-1 items-center text-base font-normal text-black sm:text-[16px]">
                {item}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}

