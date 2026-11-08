import { useContext } from 'react';
import { FiltersContext } from '../context/FiltersContext';

export function useFilters() {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error('useFilters потрібно викликати всередині FiltersProvider');
  }
  return context;
}
