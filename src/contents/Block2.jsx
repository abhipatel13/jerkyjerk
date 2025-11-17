"use client";

import { useEffect, useMemo, useState } from "react";
import { filterItemsBySearch } from "../utils/filterItems";

const veggies = [
  "Red Onions",
  "Yellow Onions",
  "Potato",
  "Spring Mix",
  "Ginger",
  "Garlic",
  "Squash",
  "Broccoli",
  "Carrots",
  "Sweet Peppers",
  "Lettuce",
  "Thyme",
  "Cabbage",
  "Yams",
  "Tomato",
  "Green Peppers",
  "Scallions",
  "Bonnet Peppers",
  "Red Peppers",
  "Cilantro",
];

export default function Block2({
  searchTerm = "",
  onVisibilityChange = () => {},
}) {
  const [selected, setSelected] = useState(
    veggies.reduce((acc, veg) => ({ ...acc, [veg]: false }), {})
  );

  const toggleVeggie = (veg) =>
    setSelected((prev) => ({ ...prev, [veg]: !prev[veg] }));

  const filteredVeggies = useMemo(
    () => filterItemsBySearch(veggies, searchTerm),
    [searchTerm]
  );
  const hasMatches = filteredVeggies.length > 0;

  useEffect(() => {
    onVisibilityChange(hasMatches);
  }, [hasMatches, onVisibilityChange]);

  if (!hasMatches) {
    return null;
  }

  return (
    <section className="px-4 pb-10 sm:px-12 lg:px-25">
      <ul className="mx-auto grid max-w-[1220px] list-none gap-x-1 gap-y-6 bg-white py-6 sm:grid-cols-2 lg:grid-cols-5">
        {filteredVeggies.map((item) => (
          <li key={item} className="flex justify-start">
            <label className="flex items-center gap-3 text-[16px] text-[#111] tracking-[0.6px] leading-normal">
              <input
                type="checkbox"
                className="h-5 w-5 rounded border border-[#c9c9c9] text-[#0d6dff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0d6dff]"
                checked={Boolean(selected[item])}
                onChange={() => toggleVeggie(item)}
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

