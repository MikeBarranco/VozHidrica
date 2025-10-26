import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export interface EcoBalance {
  total_points: number;
  lifetime_points: number;
  level: string;
  points_to_next_level: number;
}

export interface EcoTransaction {
  id: string;
  points: number;
  transaction_type: string;
  description: string;
  created_at: string;
}

export function useEcoPoints() {
  const { user } = useAuth();
  const [balance, setBalance] = useState<EcoBalance | null>(null);
  const [transactions, setTransactions] = useState<EcoTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchEcoBalance();
      fetchTransactions();
    }
  }, [user]);

  const fetchEcoBalance = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_eco_balance')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;

      if (!data) {
        const { data: newBalance, error: insertError } = await supabase
          .from('user_eco_balance')
          .insert({
            user_id: user.id,
            total_points: 0,
            lifetime_points: 0,
            level: 'Bronce',
            points_to_next_level: 1000,
          })
          .select()
          .single();

        if (insertError) throw insertError;
        setBalance(newBalance);
      } else {
        setBalance(data);
      }
    } catch (error) {
      console.error('Error fetching eco balance:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactions = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('eco_points_transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setTransactions(data || []);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const addEcoPoints = async (
    points: number,
    transactionType: string,
    description: string,
    relatedEntityId?: string
  ) => {
    if (!user || !balance) return;

    try {
      const { error: transactionError } = await supabase
        .from('eco_points_transactions')
        .insert({
          user_id: user.id,
          points,
          transaction_type: transactionType,
          description,
          related_entity_id: relatedEntityId,
        });

      if (transactionError) throw transactionError;

      const newTotalPoints = balance.total_points + points;
      const newLifetimePoints = balance.lifetime_points + (points > 0 ? points : 0);

      let newLevel = balance.level;
      let pointsToNextLevel = balance.points_to_next_level;

      if (newLifetimePoints >= 10000) {
        newLevel = 'Platino';
        pointsToNextLevel = 0;
      } else if (newLifetimePoints >= 5000) {
        newLevel = 'Oro';
        pointsToNextLevel = 10000 - newLifetimePoints;
      } else if (newLifetimePoints >= 2000) {
        newLevel = 'Plata';
        pointsToNextLevel = 5000 - newLifetimePoints;
      } else {
        newLevel = 'Bronce';
        pointsToNextLevel = 2000 - newLifetimePoints;
      }

      const { error: updateError } = await supabase
        .from('user_eco_balance')
        .update({
          total_points: newTotalPoints,
          lifetime_points: newLifetimePoints,
          level: newLevel,
          points_to_next_level: pointsToNextLevel,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);

      if (updateError) throw updateError;

      await fetchEcoBalance();
      await fetchTransactions();
    } catch (error) {
      console.error('Error adding eco points:', error);
    }
  };

  const convertPointsToMoney = (points: number): number => {
    return points / 10;
  };

  return {
    balance,
    transactions,
    loading,
    addEcoPoints,
    convertPointsToMoney,
    refetch: () => {
      fetchEcoBalance();
      fetchTransactions();
    },
  };
}
