export function filterCountries(countries, { search, continent, minCases }) {
  const query = search.trim().toLowerCase();
  const threshold = Math.max(0, Number(minCases) || 0);

  return countries.filter(
    (item) =>
      (query === '' || item.country.toLowerCase().includes(query)) &&
      (continent === 'all' || item.continent === continent) &&
      item.cases >= threshold,
  );
}
