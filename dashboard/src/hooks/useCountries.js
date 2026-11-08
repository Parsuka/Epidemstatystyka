import { useMemo } from 'react';
import { useFetch } from './useFetch';
import { getCountriesUrl, mapCountries } from '../api/diseaseApi';
import { filterCountries } from '../utils/filter';

const NO_COUNTRIES = [];

export function useCountries(filters) {
  const { data, loading, error, reload } = useFetch(getCountriesUrl(filters.period), mapCountries);
  const allCountries = data ?? NO_COUNTRIES;

  const countries = useMemo(
    () => filterCountries(allCountries, filters),
    [allCountries, filters],
  );

  return { data: countries, allCountries, loading, error, reload };
}
