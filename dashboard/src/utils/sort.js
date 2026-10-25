export function compareValues(a, b) {
  if (typeof a === 'string' && typeof b === 'string') {
    return a.localeCompare(b, 'uk');
  }
  return (a ?? 0) - (b ?? 0);
}

export function sortBy(items, key, direction) {
  const factor = direction === 'asc' ? 1 : -1;
  return items.toSorted((a, b) => compareValues(a[key], b[key]) * factor);
}
