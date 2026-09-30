function Select({ id, label, value, options, onChange }) {
  return (
    <label className="select" htmlFor={id}>
      <span className="select__label">{label}</span>
      <select id={id} value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default Select;
