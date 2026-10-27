import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchNotices } from '../services/api';

export function useNotices() {
  const [notices, setNotices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const isMountedRef = useRef(true);

  const reload = useCallback(async () => {
    setIsLoading(true);
    setError('');

    try {
      const data = await fetchNotices();
      if (isMountedRef.current) {
        setNotices(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      if (isMountedRef.current) {
        setError(err?.message || 'Não foi possível carregar os avisos.');
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    reload();

    return () => {
      isMountedRef.current = false;
    };
  }, [reload]);

  return { notices, isLoading, error, reload };
}
