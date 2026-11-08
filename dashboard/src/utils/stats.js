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

export function buildCountrySections(country) {
  const n = (value) => formatNumber(value);
  return [
    {
      title: 'Загальна статистика',
      items: [
        { label: 'Усього випадків', value: n(country.cases) },
        { label: 'Смерті', value: n(country.deaths) },
        { label: 'Одужали', value: n(country.recovered) },
        { label: 'Активні випадки', value: n(country.active) },
        { label: 'У критичному стані', value: n(country.critical) },
        { label: 'Летальність', value: formatPercent(country.deaths / country.cases) },
      ],
    },
    {
      title: 'За добу',
      items: [
        { label: 'Нові випадки', value: `+${n(country.todayCases)}` },
        { label: 'Нові смерті', value: `+${n(country.todayDeaths)}` },
        { label: 'Одужали', value: `+${n(country.todayRecovered)}` },
      ],
    },
    {
      title: 'На 1 млн населення',
      items: [
        { label: 'Випадків', value: n(country.casesPerOneMillion) },
        { label: 'Смертей', value: n(country.deathsPerOneMillion) },
        { label: 'Тестів', value: n(country.testsPerOneMillion) },
        { label: 'Один випадок на', value: `${n(country.oneCasePerPeople)} осіб` },
        { label: 'Одна смерть на', value: `${n(country.oneDeathPerPeople)} осіб` },
      ],
    },
    {
      title: 'Про країну',
      items: [
        { label: 'Населення', value: n(country.population) },
        { label: 'Проведено тестів', value: n(country.tests) },
        { label: 'Коди ISO', value: `${country.iso2} / ${country.iso3}` },
        { label: 'Координати', value: formatCoords(country.lat, country.long) },
      ],
    },
  ];
}

function formatCoords(lat, long) {
  if (lat == null || long == null) return '—';
  return `${lat.toFixed(2)}°, ${long.toFixed(2)}°`;
}
