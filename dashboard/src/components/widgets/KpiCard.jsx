import { formatChange, formatNumber } from '../../utils/format';

function KpiCard({ title, value, change }) {
  const trend = change >= 0 ? 'up' : 'down';

  return (
    <article className="kpi-card">
      <h3 className="kpi-card__title">{title}</h3>
      <p className="kpi-card__value">{formatNumber(value)}</p>
      <p className={`kpi-card__change kpi-card__change--${trend}`}>
        {trend === 'up' ? '▲' : '▼'} {formatChange(change)}
        <span className="kpi-card__period"> за тиждень</span>
      </p>
    </article>
  );
}

export default KpiCard;
