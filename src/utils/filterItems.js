export const normalizeSearchTerm = (value = "") =>
  value.trim().toLowerCase();

export const hasSearchTerm = (value = "") =>
  normalizeSearchTerm(value).length > 0;

export const filterItemsBySearch = (items = [], searchTerm = "") => {
  if (!Array.isArray(items)) {
    return [];
  }

  const normalized = normalizeSearchTerm(searchTerm);

  if (!normalized) {
    return items;
  }

  return items.filter((item) =>
    String(item).toLowerCase().includes(normalized)
  );
};


