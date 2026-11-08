export const ROUTES = {
  home: '/',
  country: '/country/:code',
};

export function getCountryPath(code) {
  return `/country/${encodeURIComponent(code)}`;
}
