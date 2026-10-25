import { formatApiDate, formatNumber } from '../../utils/format';

function TrendSummary({ trend, days }) {
  return (
    <div className="trend">
      <p className="trend__period">
        Період: {formatApiDate(trend.from)} – {formatApiDate(trend.to)}
      </p>
      <dl className="trend__list">
        <div className="trend__item">
          <dt>Нові випадки за {days} дн.</dt>
          <dd>+{formatNumber(trend.newCases)}</dd>
        </div>
        <div className="trend__item">
          <dt>Нові смерті за {days} дн.</dt>
          <dd>+{formatNumber(trend.newDeaths)}</dd>
        </div>
      </dl>
    </div>
  );
}

export default TrendSummary;
