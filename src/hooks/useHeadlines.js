import { useState, useEffect } from 'react';
import { fetchHeadlines } from '../utils/api';
import { getCached, setCache } from '../utils/cache';

export const useHeadlines = (category) => {
  const [headlines, setHeadlines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    
    const loadHeadlines = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const cachedData = getCached(category);
        if (cachedData) {
          if (isMounted) {
            setHeadlines(cachedData);
            setLoading(false);
          }
          return;
        }

        const freshData = await fetchHeadlines(category);
        if (freshData?.length > 0) {
          setCache(category, freshData);
          if (isMounted) setHeadlines(freshData);
        } else {
          if (isMounted) setError("No headlines found.");
        }
      } catch (err) {
        if (isMounted) setError(err.message || "Failed to load headlines.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadHeadlines();
    
    return () => {
      isMounted = false;
    };
  }, [category]);

  return { headlines, loading, error };
};
