import { useMemo } from 'react';
import { Link } from 'react-router';
import RequestState from '../components/ui/RequestState';
import NotFoundMessage from '../components/ui/NotFoundMessage';
import CountryDetails from '../components/widgets/CountryDetails';
import { useFetch } from '../hooks/useFetch';
import { useFilters } from '../hooks/useFilters';
import { getCountryUrl, mapCountryDetails } from '../api/diseaseApi';
import { buildCountrySections } from '../utils/stats';
import { PERIOD_LABELS } from '../constants/filters';

function CountryContainer({ code }) {
  const { debouncedFilters } = useFilters();
  const { data: country, loading, error, reload } = useFetch(getCountryUrl(code, debouncedFilters.period), mapCountryDetails);
  const sections = useMemo(() => (country ? buildCountrySections(country) : []), [country]);

  if (error?.status === 404) {
    return <NotFoundMessage title="Країну не знайдено" text={`Немає даних для «${code}». Перевірте адресу або оберіть країну з таблиці.`} />;
  }

  return (
    <div className="country-page">
      <Link to="/" className="back-link">
        ← Назад до дашборду
      </Link>
      <RequestState loading={loading} error={error} isEmpty={!country} onRetry={reload}>
        <CountryDetails country={country} sections={sections} periodLabel={PERIOD_LABELS[debouncedFilters.period]} />
      </RequestState>
    </div>
  );
}

export default CountryContainer;
