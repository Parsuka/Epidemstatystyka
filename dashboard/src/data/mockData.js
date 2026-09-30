
export const globalStats = {
  updated: 1759334400000,
  cases: 704753890,
  todayCases: 12450,
  deaths: 7010681,
  todayDeaths: 87,
  recovered: 675619811,
  active: 22123398,
  critical: 34794,
};

export const kpiCards = [
  { id: 'cases', title: 'Усього випадків', value: 704753890, change: 3.2 },
  { id: 'deaths', title: 'Летальні випадки', value: 7010681, change: -1.4 },
  { id: 'recovered', title: 'Одужали', value: 675619811, change: 2.7 },
  { id: 'active', title: 'Активні випадки', value: 22123398, change: -0.8 },
];

export const continents = ['Europe', 'Asia', 'North America', 'South America', 'Africa'];

export const continentLabels = {
  all: 'Усі континенти',
  Europe: 'Європа',
  Asia: 'Азія',
  'North America': 'Північна Америка',
  'South America': 'Південна Америка',
  Africa: 'Африка',
};

export const countries = [
  { id: 'UA', country: 'Україна', continent: 'Europe', cases: 5541305, deaths: 109923, population: 43192122 },
  { id: 'PL', country: 'Польща', continent: 'Europe', cases: 6660622, deaths: 120392, population: 37739785 },
  { id: 'DE', country: 'Німеччина', continent: 'Europe', cases: 38828995, deaths: 183027, population: 83883596 },
  { id: 'IT', country: 'Італія', continent: 'Europe', cases: 26826486, deaths: 196487, population: 60262770 },
  { id: 'JP', country: 'Японія', continent: 'Asia', cases: 33803572, deaths: 74694, population: 125584838 },
  { id: 'IN', country: 'Індія', continent: 'Asia', cases: 45035393, deaths: 533570, population: 1406631776 },
  { id: 'US', country: 'США', continent: 'North America', cases: 111820082, deaths: 1219487, population: 334805269 },
  { id: 'CA', country: 'Канада', continent: 'North America', cases: 4946090, deaths: 55282, population: 38388419 },
  { id: 'BR', country: 'Бразилія', continent: 'South America', cases: 38743918, deaths: 711380, population: 215353593 },
  { id: 'AR', country: 'Аргентина', continent: 'South America', cases: 10101218, deaths: 130685, population: 45510318 },
  { id: 'ZA', country: 'ПАР', continent: 'Africa', cases: 4076463, deaths: 102595, population: 60756135 },
  { id: 'EG', country: 'Єгипет', continent: 'Africa', cases: 516023, deaths: 24830, population: 106156692 },
];

export const topCountries = countries
  .toSorted((a, b) => b.cases - a.cases)
  .slice(0, 5);
