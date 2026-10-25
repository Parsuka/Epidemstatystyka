import { useMemo, useState } from 'react';
import { sortBy } from '../utils/sort';

export function useSort(items, initialKey, initialDirection = 'desc') {
  const [sortConfig, setSortConfig] = useState({ key: initialKey, direction: initialDirection });

  const sortedItems = useMemo(
    () => sortBy(items, sortConfig.key, sortConfig.direction),
    [items, sortConfig],
  );

  const requestSort = (key, defaultDirection = 'desc') =>
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key ? toggle(prev.direction) : defaultDirection,
    }));

  return { sortedItems, sortConfig, requestSort };
}

function toggle(direction) {
  return direction === 'asc' ? 'desc' : 'asc';
}
