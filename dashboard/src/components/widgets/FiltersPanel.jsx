import { Controller } from 'react-hook-form';
import TextField from '../ui/TextField';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { useFilters } from '../../hooks/useFilters';

function FiltersPanel({ continentOptions, periodOptions, statusText }) {
  const { control, canReset, resetFilters } = useFilters();

  return (
    <form className="filters" onSubmit={(event) => event.preventDefault()}>
      <div className="filters__fields">
        <Controller
          name="search"
          control={control}
          render={({ field }) => (
            <TextField id="filter-search" label="Пошук країни" placeholder="Напр. Ukraine" value={field.value} onChange={field.onChange} />
          )}
        />
        <Controller
          name="continent"
          control={control}
          render={({ field }) => (
            <Select id="filter-continent" label="Континент" value={field.value} options={continentOptions} onChange={field.onChange} />
          )}
        />
        <Controller
          name="period"
          control={control}
          render={({ field }) => (
            <Select id="filter-period" label="Період" value={field.value} options={periodOptions} onChange={field.onChange} />
          )}
        />
        <Controller
          name="minCases"
          control={control}
          rules={{ min: { value: 0, message: "Значення не може бути від'ємним" } }}
          render={({ field, fieldState }) => (
            <TextField
              id="filter-min-cases"
              label="Мінімум випадків"
              type="number"
              min={0}
              placeholder="0"
              value={field.value}
              onChange={field.onChange}
              error={fieldState.error?.message}
            />
          )}
        />
      </div>
      <div className="filters__footer">
        <p className="filters__status">{statusText}</p>
        <Button variant="ghost" onClick={resetFilters} disabled={!canReset}>
          Скинути фільтри
        </Button>
      </div>
    </form>
  );
}

export default FiltersPanel;
