import { formatNumber, formatPercent } from './format';
import { sortBy } from './sort';

function sumBy(items, field) {
  return items.reduce((sum, item) => sum + (item[field] ?? 0), 0);
}

export function calcKpis(countries) {
  const cases = sumBy(countries, 'cases');
  const deaths = sumBy(countries, 'deaths');
  const recovered = sumBy(countries, 'recovered');
  const active = sumBy(countries, 'active');
  const todayCases = sumBy(countries, 'todayCases');

  return [
    { id: 'cases', title: 'Усього випадків', value: cases, caption: `+${formatNumber(todayCases)} за добу` },
    { id: 'deaths', title: 'Летальні випадки', value: deaths, caption: `${formatPercent(deaths / cases)} від усіх випадків` },
    { id: 'recovered', title: 'Одужали', value: recovered, caption: `${formatPercent(recovered / cases)} від усіх випадків` },
    { id: 'active', title: 'Активні випадки', value: active, caption: `${formatPercent(active / cases)} від усіх випадків` },
  ];
}

export function getTopCountries(countries, limit = 5) {
  return sortBy(countries, 'cases', 'desc').slice(0, limit);
}

export function getContinents(countries) {
  const unique = new Set(countries.map((item) => item.continent).filter(Boolean));
  return [...unique].toSorted();
}

export function getLatestUpdate(countries) {
  if (countries.length === 0) return null;
  return Math.max(...countries.map((item) => item.updated ?? 0));
}
