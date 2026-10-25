function SortableHeader({ column, sortConfig, onSort }) {
  const isActive = sortConfig.key === column.key;
  const isAsc = sortConfig.direction === 'asc';
  const arrow = isActive ? (isAsc ? '▲' : '▼') : '↕';

  return (
    <th
      className={column.isNumeric ? 'table__num' : undefined}
      aria-sort={isActive ? (isAsc ? 'ascending' : 'descending') : 'none'}
    >
      <button
        type="button"
        className={`sort-btn ${isActive ? 'sort-btn--active' : ''}`}
        onClick={() => onSort(column.key, column.defaultDirection)}
      >
        {column.label} <span className="sort-btn__arrow" aria-hidden="true">{arrow}</span>
      </button>
    </th>
  );
}

export default SortableHeader;
