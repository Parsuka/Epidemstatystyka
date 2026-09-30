const numberFormatter = new Intl.NumberFormat('uk-UA');

export function formatNumber(value) {
  return numberFormatter.format(Math.round(value));
}

export function formatChange(change) {
  const sign = change > 0 ? '+' : '';
  return `${sign}${change.toFixed(1)}%`;
}

export function perHundredThousand(value, population) {
  return (value / population) * 100000;
}
