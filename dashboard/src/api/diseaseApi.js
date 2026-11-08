const BASE_URL = 'https://disease.sh/v3/covid-19';

function periodParams(period) {
  if (period === 'yesterday') return { yesterday: 'true' };
  if (period === 'twoDaysAgo') return { twoDaysAgo: 'true' };
  return {};
}

function buildUrl(path, params) {
  const query = new URLSearchParams(params).toString();
  return query ? `${BASE_URL}${path}?${query}` : `${BASE_URL}${path}`;
}

export function getCountriesUrl(period = 'today') {
  return buildUrl('/countries', periodParams(period));
}

export function getCountryUrl(code, period = 'today') {
  return buildUrl(`/countries/${encodeURIComponent(code)}`, { strict: 'true', ...periodParams(period) });
}

export function getHistoricalUrl(days) {
  return `${BASE_URL}/historical/all?lastdays=${days + 1}`;
}

export async function fetchJson(url, signal) {
  let response;
  try {
    response = await fetch(url, { signal });
  } catch (error) {
    if (error.name === 'AbortError') throw error;
    throw new Error("Немає з'єднання з сервером", { cause: error });
  }
  if (!response.ok) {
    const message = response.status === 404 ? 'Дані не знайдено' : `Сервер повернув помилку ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }
  return response.json();
}

export function mapCountries(rawCountries) {
  return rawCountries.map((item) => ({
    id: item.country,
    code: item.countryInfo?.iso3 ?? item.country,
    country: item.country,
    flag: item.countryInfo?.flag ?? '',
    continent: item.continent ?? '',
    cases: item.cases ?? 0,
    todayCases: item.todayCases ?? 0,
    deaths: item.deaths ?? 0,
    recovered: item.recovered ?? 0,
    active: item.active ?? 0,
    population: item.population ?? 0,
    updated: item.updated,
  }));
}

export function mapCountryDetails(item) {
  return {
    country: item.country,
    flag: item.countryInfo?.flag ?? '',
    iso2: item.countryInfo?.iso2 ?? '—',
    iso3: item.countryInfo?.iso3 ?? '—',
    lat: item.countryInfo?.lat,
    long: item.countryInfo?.long,
    continent: item.continent ?? '',
    population: item.population ?? 0,
    cases: item.cases ?? 0,
    deaths: item.deaths ?? 0,
    recovered: item.recovered ?? 0,
    active: item.active ?? 0,
    critical: item.critical ?? 0,
    todayCases: item.todayCases ?? 0,
    todayDeaths: item.todayDeaths ?? 0,
    todayRecovered: item.todayRecovered ?? 0,
    tests: item.tests ?? 0,
    casesPerOneMillion: item.casesPerOneMillion ?? 0,
    deathsPerOneMillion: item.deathsPerOneMillion ?? 0,
    testsPerOneMillion: item.testsPerOneMillion ?? 0,
    oneCasePerPeople: item.oneCasePerPeople ?? 0,
    oneDeathPerPeople: item.oneDeathPerPeople ?? 0,
    updated: item.updated,
  };
}

export function mapHistorical(raw) {
  const dates = Object.keys(raw.cases ?? {});
  if (dates.length < 2) return null;
  const from = dates[0];
  const to = dates.at(-1);
  return {
    from,
    to,
    newCases: raw.cases[to] - raw.cases[from],
    newDeaths: raw.deaths[to] - raw.deaths[from],
  };
}
