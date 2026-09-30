import { useState } from 'react';
import Button from '../ui/Button';

function Counter({ label, initialValue = 7, min = 1, max = 30, step = 1, unit = '' }) {
  const [value, setValue] = useState(initialValue);

  const decrement = () => setValue((prev) => Math.max(min, prev - step));
  const increment = () => setValue((prev) => Math.min(max, prev + step));
  const reset = () => setValue(initialValue);

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
      <Button variant="ghost" onClick={reset} disabled={value === initialValue}>
        Скинути
      </Button>
      <p className="counter__hint">
        Діапазон: {min}–{max} {unit}
      </p>
    </div>
  );
}

export default Counter;
