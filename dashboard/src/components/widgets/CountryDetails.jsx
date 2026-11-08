import { CONTINENT_LABELS } from '../../constants/continents';

function CountryDetails({ country, sections, periodLabel }) {
  return (
    <article className="country">
      <header className="country__hero">
        {country.flag && <img className="country__flag" src={country.flag} alt={`Прапор: ${country.country}`} />}
        <div>
          <h1 className="country__name">{country.country}</h1>
          <p className="country__meta">
            {CONTINENT_LABELS[country.continent] ?? 'Континент невідомий'} · дані: {periodLabel}
          </p>
        </div>
      </header>
      <div className="country__sections">
        {sections.map((section) => (
          <section key={section.title} className="widget">
            <h2 className="widget__title">{section.title}</h2>
            <dl className="stat-list">
              {section.items.map((item) => (
                <div key={item.label} className="stat-list__item">
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </article>
  );
}

export default CountryDetails;
