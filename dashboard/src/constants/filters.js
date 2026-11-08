export const DEFAULT_FILTERS = {
  search: '',
  continent: 'all',
  period: 'today',
  minCases: '',
};

export const PERIOD_OPTIONS = [
  { value: 'today', label: 'Сьогодні' },
  { value: 'yesterday', label: 'Вчора' },
  { value: 'twoDaysAgo', label: 'Позавчора' },
];

export const FILTER_NAMES = ['search', 'continent', 'period', 'minCases'];

export const DEBOUNCE_DELAY = 400;

export const PERIOD_LABELS = Object.fromEntries(PERIOD_OPTIONS.map((option) => [option.value, option.label]));
