import { useMemo } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { FiltersContext } from './FiltersContext';
import { useDebounce } from '../hooks/useDebounce';
import { DEBOUNCE_DELAY, DEFAULT_FILTERS, FILTER_NAMES } from '../constants/filters';

function FiltersProvider({ children }) {
  const { control, reset } = useForm({ defaultValues: DEFAULT_FILTERS, mode: 'onChange' });
  const [search, continent, period, minCases] = useWatch({ control, name: FILTER_NAMES });
  const filters = useMemo(
    () => ({ search, continent, period, minCases }),
    [search, continent, period, minCases],
  );
  const debouncedFilters = useDebounce(filters, DEBOUNCE_DELAY);

  const value = useMemo(
    () => ({
      control,
      filters,
      debouncedFilters,
      isPending: filters !== debouncedFilters,
      canReset: FILTER_NAMES.some((name) => filters[name] !== DEFAULT_FILTERS[name]),
      resetFilters: () => reset(DEFAULT_FILTERS),
    }),
    [control, filters, debouncedFilters, reset],
  );

  return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>;
}

export default FiltersProvider;
