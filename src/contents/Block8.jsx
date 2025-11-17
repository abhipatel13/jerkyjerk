"use client";

import { useEffect, useMemo, useState } from "react";
import { filterItemsBySearch } from "../utils/filterItems";

const columns = [
  [
    "Hennessey",
    "Strawberry",
    "Orange",
    "Triple Sec",
    "Maker's Mark",
    "1800 Blanco",
    "Capitan Morgan",
    "Teramana",
  ],
  [
    "Don Julio Repo",
    "Patron",
    "Grenadine",
    "Bar Syrup",
    "Jameson",
    "1800 Repo",
    "Remy",
    "Jack Daniel",
  ],
  [
    "Don Julio Anheo",
    "Mango",
    "Sweet + Sour",
    "Don Q Gold",
    "Midori",
    "Sauza",
    "Dusse",
    "Lime syrup",
  ],
  [
    "Margarita",
    "Lemon",
    "Wild Berry",
    "Don Q Silver",
    "Ketel One",
    "Amsterdam Gin",
    "Titos",
    "Lemon syrup",
  ],
  [
    "Margarita Salt",
    "Lime",
    "Blue Curacao",
    "Don Q Coconut",
    "Bacardi",
    "Amsterdam Vodka",
    "Cosamigoes",
  ],
];

export default function Block8({
  searchTerm = "",
  onVisibilityChange = () => {},
}) {
  const allItems = columns.flat();
  const [selected, setSelected] = useState(
    allItems.reduce((acc, item) => ({ ...acc, [item]: false }), {})
  );

  const toggleItem = (item) =>
    setSelected((prev) => ({ ...prev, [item]: !prev[item] }));

  const filteredColumns = useMemo(
    () =>
      columns
        .map((column) => filterItemsBySearch(column, searchTerm))
        .filter((column) => column.length > 0),
    [searchTerm]
  );
  const hasMatches = filteredColumns.length > 0;

  useEffect(() => {
    onVisibilityChange(hasMatches);
  }, [hasMatches, onVisibilityChange]);

  if (!hasMatches) {
    return null;
  }

  return (
    <section className="px-4 pb-10 sm:px-12 lg:px-25">
      <ul className="mx-auto grid max-w-[1220px] list-none gap-x-1 gap-y-6 bg-white py-6 sm:grid-cols-2 lg:grid-cols-5">
        {filteredColumns.map((column, idx) => (
          <li key={`bar-col-${idx}`} className="flex flex-col gap-6">
            {column.map((item) => (
              <label
                key={item}
                className="flex items-center gap-3 text-[16px] text-[#111] tracking-[0.6px] leading-normal"
              >
                <input
                  type="checkbox"
                  className="h-5 w-5 rounded border border-[#c9c9c9] text-[#0d6dff] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#0d6dff]"
                  checked={Boolean(selected[item])}
                  onChange={() => toggleItem(item)}
                />
                <span className="flex flex-1 items-center text-[16px] font-normal text-black tracking-[0.6px]">
                  {item}
                </span>
              </label>
            ))}
          </li>
        ))}
      </ul>
    </section>
  );
}

