import { useState } from 'react';
import Select from '../ui/Select';
import { formatNumber } from '../../utils/format';

const ALL = 'all';

function FilteredList({ items, categories, categoryLabels }) {
  const [category, setCategory] = useState(ALL);

  const options = [ALL, ...categories].map((value) => ({
    value,
    label: categoryLabels[value] ?? value,
  }));

  const visibleItems =
    category === ALL ? items : items.filter((item) => item.continent === category);

  return (
    <div className="filtered-list">
      <Select
        id="continent-filter"
        label="Континент"
        value={category}
        options={options}
        onChange={setCategory}
      />

      <p className="filtered-list__count">Знайдено країн: {visibleItems.length}</p>

      {visibleItems.length === 0 ? (
        <p className="filtered-list__empty">Немає даних для вибраної категорії</p>
      ) : (
        <ul className="filtered-list__items">
          {visibleItems.map((item) => (
            <li key={item.id} className="filtered-list__item">
              <span>{item.country}</span>
              <span className="filtered-list__meta">
                {formatNumber(item.cases)} випадків · {formatNumber(item.deaths)} смертей
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FilteredList;
