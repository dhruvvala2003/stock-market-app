import { useState, useEffect } from 'react';
import { supabase } from '../services/supabase';

export const usePortfolio = () => {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHoldings();
  }, []);

  const fetchHoldings = async () => {
    if (!supabase) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('portfolio_holdings')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setHoldings(data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const addHolding = async (holding) => {
    if (!supabase) return;
    try {
      const { error } = await supabase
        .from('portfolio_holdings')
        .insert([holding]);
      
      if (error) throw error;
      await fetchHoldings(); // Refresh list
    } catch (err) {
      setError(err.message);
    }
  };

  return { holdings, loading, error, addHolding, fetchHoldings };
};
