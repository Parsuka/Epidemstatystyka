import { useMemo, useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import Widget from '../components/layout/Widget';
import RequestState from '../components/ui/RequestState';
import KpiCard from '../components/widgets/KpiCard';
import CountriesTable from '../components/widgets/CountriesTable';
import Counter from '../components/widgets/Counter';
import TrendSummary from '../components/widgets/TrendSummary';
import Toggle from '../components/widgets/Toggle';
import FilteredList from '../components/widgets/FilteredList';
import { useFetch } from '../hooks/useFetch';
import { useSort } from '../hooks/useSort';
import { COUNTRIES_URL, getHistoricalUrl, mapCountries, mapHistorical } from '../api/diseaseApi';
import { calcKpis, getContinents, getLatestUpdate, getTopCountries } from '../utils/stats';
import { CONTINENT_LABELS } from '../constants/continents';

const DEFAULT_DAYS = 7;
const NO_COUNTRIES = [];

function DashboardContainer() {
  const countriesRequest = useFetch(COUNTRIES_URL, mapCountries);
  const countries = countriesRequest.data ?? NO_COUNTRIES;

  const [days, setDays] = useState(DEFAULT_DAYS);
  const trendRequest = useFetch(getHistoricalUrl(days), mapHistorical);

  const { sortedItems, sortConfig, requestSort } = useSort(countries, 'cases', 'desc');

  const kpis = useMemo(() => calcKpis(countries), [countries]);
  const topCountries = useMemo(() => getTopCountries(countries, 5), [countries]);
  const continents = useMemo(() => getContinents(countries), [countries]);

  const countriesState = {
    isLoading: countriesRequest.isLoading,
    error: countriesRequest.error,
    isEmpty: countries.length === 0,
    onRetry: countriesRequest.reload,
  };

  return (
    <DashboardLayout title="Епідемстатистика" updatedAt={getLatestUpdate(countries)} isLoading={countriesRequest.isLoading}>
      <Widget title="Ключові показники" subtitle="COVID-19, сума по всіх країнах" className="widget--wide">
        <RequestState {...countriesState}>
          <div className="kpi-grid">
            {kpis.map((card) => (
              <KpiCard key={card.id} title={card.title} value={card.value} caption={card.caption} />
            ))}
          </div>
        </RequestState>
      </Widget>

      <Widget title="Країни світу" subtitle="Клікніть заголовок колонки, щоб сортувати" className="widget--wide">
        <RequestState {...countriesState} emptyText="API не повернуло жодної країни">
          <CountriesTable rows={sortedItems} sortConfig={sortConfig} onSort={requestSort} continentLabels={CONTINENT_LABELS} />
        </RequestState>
      </Widget>

      <Widget title="Горизонт аналізу" subtitle="Приріст у світі за вибраний період">
        <Counter label="Кількість днів" value={days} onChange={setDays} defaultValue={DEFAULT_DAYS} min={1} max={30} unit="дн." />
        <RequestState
          isLoading={trendRequest.isLoading}
          error={trendRequest.error}
          isEmpty={!trendRequest.data}
          onRetry={trendRequest.reload}
        >
          <TrendSummary trend={trendRequest.data} days={days} />
        </RequestState>
      </Widget>

      <Widget title="Топ-5 країн" subtitle="Перемикання одиниць виміру">
        <RequestState {...countriesState}>
          <Toggle countries={topCountries} />
        </RequestState>
      </Widget>

      <Widget title="Країни за континентом" subtitle="Фільтрований список">
        <RequestState {...countriesState}>
          <FilteredList items={countries} categories={continents} categoryLabels={CONTINENT_LABELS} />
        </RequestState>
      </Widget>
    </DashboardLayout>
  );
}

export default DashboardContainer;
