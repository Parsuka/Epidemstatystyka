const numberFormatter = new Intl.NumberFormat('uk-UA');
const percentFormatter = new Intl.NumberFormat('uk-UA', { style: 'percent', maximumFractionDigits: 1 });

export function formatNumber(value) {
  return numberFormatter.format(Math.round(value));
}

export function formatPercent(share) {
  return percentFormatter.format(Number.isFinite(share) ? share : 0);
}

export function formatApiDate(apiDate) {
  return new Date(apiDate).toLocaleDateString('uk-UA');
}

export function perHundredThousand(value, population) {
  return population ? (value / population) * 100000 : 0;
}
