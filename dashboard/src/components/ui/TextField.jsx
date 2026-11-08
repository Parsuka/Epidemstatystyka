function TextField({ id, label, value, onChange, type = 'text', placeholder, min, error }) {
  return (
    <label className="field" htmlFor={id}>
      <span className="field__label">{label}</span>
      <input
        id={id}
        className={`field__input ${error ? 'field__input--invalid' : ''}`}
        type={type}
        value={value}
        placeholder={placeholder}
        min={min}
        onChange={(event) => onChange(event.target.value)}
      />
      {error && <span className="field__error">{error}</span>}
    </label>
  );
}

export default TextField;
