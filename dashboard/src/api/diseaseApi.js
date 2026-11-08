const BASE_URL = 'https://disease.sh/v3/covid-19';

export function getCountriesUrl(period = 'today') {
  if (period === 'yesterday') return `${BASE_URL}/countries?yesterday=true`;
  if (period === 'twoDaysAgo') return `${BASE_URL}/countries?twoDaysAgo=true`;
  return `${BASE_URL}/countries`;
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
    throw new Error(`Сервер повернув помилку ${response.status}`);
  }
  return response.json();
}

export function mapCountries(rawCountries) {
  return rawCountries.map((item) => ({
    id: item.country,
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
