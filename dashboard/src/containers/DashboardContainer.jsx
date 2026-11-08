import { useMemo, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import DashboardLayout from '../components/layout/DashboardLayout';
import Widget from '../components/layout/Widget';
import RequestState from '../components/ui/RequestState';
import FiltersPanel from '../components/widgets/FiltersPanel';
import KpiCard from '../components/widgets/KpiCard';
import CountriesTable from '../components/widgets/CountriesTable';
import Counter from '../components/widgets/Counter';
import TrendSummary from '../components/widgets/TrendSummary';
import Toggle from '../components/widgets/Toggle';
import FilteredList from '../components/widgets/FilteredList';
import { useDebounce } from '../hooks/useDebounce';
import { useFetch } from '../hooks/useFetch';
import { useCountries } from '../hooks/useCountries';
import { useSort } from '../hooks/useSort';
import { getHistoricalUrl, mapHistorical } from '../api/diseaseApi';
import { calcKpis, getContinents, getLatestUpdate, getTopCountries } from '../utils/stats';
import { CONTINENT_LABELS } from '../constants/continents';
import { DEBOUNCE_DELAY, DEFAULT_FILTERS, PERIOD_OPTIONS } from '../constants/filters';

const DEFAULT_DAYS = 7;
const FILTER_NAMES = ['search', 'continent', 'period', 'minCases'];

function DashboardContainer() {
  const { control, reset } = useForm({ defaultValues: DEFAULT_FILTERS, mode: 'onChange' });
  const [search, continent, period, minCases] = useWatch({ control, name: FILTER_NAMES });
  const filters = useMemo(
    () => ({ search, continent, period, minCases }),
    [search, continent, period, minCases],
  );
  const debouncedFilters = useDebounce(filters, DEBOUNCE_DELAY);
  const isPending = filters !== debouncedFilters;
  const canReset = FILTER_NAMES.some((name) => filters[name] !== DEFAULT_FILTERS[name]);
  const resetFilters = () => reset(DEFAULT_FILTERS);

  const countriesRequest = useCountries(debouncedFilters);
  const countries = countriesRequest.data;
  const allCountries = countriesRequest.allCountries;

  const [days, setDays] = useState(DEFAULT_DAYS);
  const trendRequest = useFetch(getHistoricalUrl(days), mapHistorical);

  const { sortedItems, sortConfig, requestSort } = useSort(countries, 'cases', 'desc');

  const kpis = useMemo(() => calcKpis(countries), [countries]);
  const topCountries = useMemo(() => getTopCountries(countries, 5), [countries]);
  const continents = useMemo(() => getContinents(allCountries), [allCountries]);
  const continentOptions = useMemo(
    () => ['all', ...continents].map((value) => ({ value, label: CONTINENT_LABELS[value] ?? value })),
    [continents],
  );

  const statusText = countriesRequest.loading || isPending
    ? 'Оновлення даних…'
    : `Показано країн: ${countries.length} з ${allCountries.length}`;

  const countriesState = {
    loading: countriesRequest.loading,
    error: countriesRequest.error,
    isEmpty: countries.length === 0,
    onRetry: countriesRequest.reload,
    emptyText: 'Жодна країна не відповідає фільтрам',
  };

  return (
    <DashboardLayout title="Епідемстатистика" updatedAt={getLatestUpdate(allCountries)} isLoading={countriesRequest.loading}>
      <Widget title="Фільтри" subtitle="Пошук і вибірка країн" className="widget--wide">
        <FiltersPanel
          control={control}
          continentOptions={continentOptions}
          periodOptions={PERIOD_OPTIONS}
          statusText={statusText}
          onReset={resetFilters}
          canReset={canReset}
        />
      </Widget>

      <Widget title="Ключові показники" subtitle="COVID-19, сума по вибраних країнах" className="widget--wide">
        <RequestState {...countriesState}>
          <div className="kpi-grid">
            {kpis.map((card) => (
              <KpiCard key={card.id} title={card.title} value={card.value} caption={card.caption} />
            ))}
          </div>
        </RequestState>
      </Widget>

      <Widget title="Країни світу" subtitle="Клікніть заголовок колонки, щоб сортувати" className="widget--wide">
        <RequestState {...countriesState}>
          <CountriesTable rows={sortedItems} sortConfig={sortConfig} onSort={requestSort} continentLabels={CONTINENT_LABELS} />
        </RequestState>
      </Widget>

      <Widget title="Горизонт аналізу" subtitle="Приріст у світі за вибраний період">
        <Counter label="Кількість днів" value={days} onChange={setDays} defaultValue={DEFAULT_DAYS} min={1} max={30} unit="дн." />
        <RequestState
          loading={trendRequest.loading}
          error={trendRequest.error}
          isEmpty={!trendRequest.data}
          onRetry={trendRequest.reload}
        >
          <TrendSummary trend={trendRequest.data} days={days} />
        </RequestState>
      </Widget>

      <Widget title="Топ-5 країн" subtitle="Серед вибраних, перемикання одиниць">
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
