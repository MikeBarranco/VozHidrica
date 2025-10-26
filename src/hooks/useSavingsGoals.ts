import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export interface SavingsGoal {
  id: string;
  goal_name: string;
  target_amount: number;
  current_amount: number;
  category: string;
  auto_deposit_percentage: number;
  target_date: string | null;
  created_at: string;
  updated_at: string;
}

export function useSavingsGoals() {
  const { user } = useAuth();
  const [goals, setGoals] = useState<SavingsGoal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchGoals();
    }
  }, [user]);

  const fetchGoals = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('savings_goals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setGoals(data || []);
    } catch (error) {
      console.error('Error fetching savings goals:', error);
    } finally {
      setLoading(false);
    }
  };

  const createGoal = async (goal: Omit<SavingsGoal, 'id' | 'created_at' | 'updated_at' | 'current_amount'>) => {
    if (!user) return;

    try {
      const { error } = await supabase.from('savings_goals').insert({
        user_id: user.id,
        ...goal,
        current_amount: 0,
      });

      if (error) throw error;
      await fetchGoals();
    } catch (error) {
      console.error('Error creating goal:', error);
    }
  };

  const updateGoal = async (goalId: string, updates: Partial<SavingsGoal>) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('savings_goals')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', goalId)
        .eq('user_id', user.id);

      if (error) throw error;
      await fetchGoals();
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };

  const addToGoal = async (goalId: string, amount: number) => {
    if (!user) return;

    try {
      const goal = goals.find((g) => g.id === goalId);
      if (!goal) return;

      const newAmount = goal.current_amount + amount;

      await updateGoal(goalId, { current_amount: newAmount });
    } catch (error) {
      console.error('Error adding to goal:', error);
    }
  };

  const deleteGoal = async (goalId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('savings_goals')
        .delete()
        .eq('id', goalId)
        .eq('user_id', user.id);

      if (error) throw error;
      await fetchGoals();
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  const getGoalProgress = (goal: SavingsGoal): number => {
    if (goal.target_amount === 0) return 0;
    return Math.min((goal.current_amount / goal.target_amount) * 100, 100);
  };

  const getTotalSaved = (): number => {
    return goals.reduce((total, goal) => total + goal.current_amount, 0);
  };

  const getTotalTarget = (): number => {
    return goals.reduce((total, goal) => total + goal.target_amount, 0);
  };

  return {
    goals,
    loading,
    createGoal,
    updateGoal,
    addToGoal,
    deleteGoal,
    getGoalProgress,
    getTotalSaved,
    getTotalTarget,
    refetch: fetchGoals,
  };
}
