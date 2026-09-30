function Switch({ checked, onChange, leftLabel, rightLabel }) {
  return (
    <div className="switch">
      <span className={checked ? '' : 'switch__label--active'}>{leftLabel}</span>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        className={`switch__track ${checked ? 'switch__track--on' : ''}`}
        onClick={() => onChange(!checked)}
      >
        <span className="switch__thumb" />
      </button>
      <span className={checked ? 'switch__label--active' : ''}>{rightLabel}</span>
    </div>
  );
}

export default Switch;
