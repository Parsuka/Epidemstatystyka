import { formatNumber } from '../../utils/format';

function KpiCard({ title, value, caption }) {
  return (
    <article className="kpi-card">
      <h3 className="kpi-card__title">{title}</h3>
      <p className="kpi-card__value">{formatNumber(value)}</p>
      <p className="kpi-card__caption">{caption}</p>
    </article>
  );
}

export default KpiCard;
