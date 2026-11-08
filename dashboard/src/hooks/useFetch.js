import { useEffect, useState } from 'react';
import { fetchJson } from '../api/diseaseApi';

const INITIAL_RESULT = { key: null, data: null, error: null };
const identity = (data) => data;

export function useFetch(url, transform = identity) {
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

  const loading = result.key !== requestKey;
  const reload = () => setReloadCount((count) => count + 1);

  return {
    data: loading ? null : result.data,
    loading,
    error: loading ? null : result.error,
    reload,
  };
}
