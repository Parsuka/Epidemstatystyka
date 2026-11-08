import { Link, useNavigate } from 'react-router';
import SortableHeader from '../ui/SortableHeader';
import { formatNumber } from '../../utils/format';
import { getCountryPath } from '../../utils/routes';

const COLUMNS = [
  { key: 'country', label: 'Країна', isNumeric: false, defaultDirection: 'asc' },
  { key: 'continent', label: 'Континент', isNumeric: false, defaultDirection: 'asc' },
  { key: 'cases', label: 'Випадки', isNumeric: true, defaultDirection: 'desc' },
  { key: 'deaths', label: 'Смерті', isNumeric: true, defaultDirection: 'desc' },
  { key: 'recovered', label: 'Одужали', isNumeric: true, defaultDirection: 'desc' },
  { key: 'active', label: 'Активні', isNumeric: true, defaultDirection: 'desc' },
  { key: 'population', label: 'Населення', isNumeric: true, defaultDirection: 'desc' },
];

function CountriesTable({ rows, sortConfig, onSort, continentLabels }) {
  const navigate = useNavigate();

  return (
    <div className="table-scroll">
      <table className="table table--sticky">
        <thead>
          <tr>
            {COLUMNS.map((column) => (
              <SortableHeader key={column.key} column={column} sortConfig={sortConfig} onSort={onSort} />
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className="table__row--link"
              onClick={() => navigate(getCountryPath(row.code))}
            >
              <td>
                <span className="country-cell">
                  {row.flag && <img className="country-cell__flag" src={row.flag} alt="" loading="lazy" />}
                  <Link to={getCountryPath(row.code)} onClick={(event) => event.stopPropagation()}>
                    {row.country}
                  </Link>
                </span>
              </td>
              <td>{continentLabels[row.continent] ?? '—'}</td>
              <td className="table__num">{formatNumber(row.cases)}</td>
              <td className="table__num">{formatNumber(row.deaths)}</td>
              <td className="table__num">{formatNumber(row.recovered)}</td>
              <td className="table__num">{formatNumber(row.active)}</td>
              <td className="table__num">{formatNumber(row.population)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CountriesTable;
