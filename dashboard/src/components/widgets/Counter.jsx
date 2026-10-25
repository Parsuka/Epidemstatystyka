import Button from '../ui/Button';

function Counter({ label, value, onChange, defaultValue, min = 1, max = 30, step = 1, unit = '' }) {
  const decrement = () => onChange(Math.max(min, value - step));
  const increment = () => onChange(Math.min(max, value + step));
  const reset = () => onChange(defaultValue);

  return (
    <div className="counter">
      <p className="counter__label">{label}</p>
      <div className="counter__controls">
        <Button variant="round" onClick={decrement} disabled={value <= min} ariaLabel="Зменшити">
          −
        </Button>
        <span className="counter__value">
          {value} <small>{unit}</small>
        </span>
        <Button variant="round" onClick={increment} disabled={value >= max} ariaLabel="Збільшити">
          +
        </Button>
      </div>
      <Button variant="ghost" onClick={reset} disabled={value === defaultValue}>
        Скинути
      </Button>
      <p className="counter__hint">
        Діапазон: {min}–{max} {unit}
      </p>
    </div>
  );
}

export default Counter;
