import { useEffect, useState } from 'react';
import { fetchJson } from '../api/diseaseApi';

const INITIAL_RESULT = { key: null, data: null, error: null };

export function useFetch(url, transform) {
  const [reloadCount, setReloadCount] = useState(0);
  const [result, setResult] = useState(INITIAL_RESULT);
  const requestKey = `${url}#${reloadCount}`;

  useEffect(() => {
    const controller = new AbortController();
    fetchJson(url, controller.signal)
      .then((json) => setResult({ key: requestKey, data: transform(json), error: null }))
      .catch((error) => {
        if (error.name === 'AbortError') return;
        setResult({ key: requestKey, data: null, error });
      });
    return () => controller.abort();
  }, [url, requestKey, transform]);

  const isLoading = result.key !== requestKey;
  const reload = () => setReloadCount((count) => count + 1);

  return {
    data: isLoading ? null : result.data,
    error: isLoading ? null : result.error,
    isLoading,
    reload,
  };
}
