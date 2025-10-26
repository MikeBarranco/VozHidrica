import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export interface WaterConsumption {
  id: string;
  consumption_date: string;
  cubic_meters: number;
  created_at: string;
}

export interface WaterStreak {
  id: string;
  current_streak: number;
  longest_streak: number;
  last_activity_date: string;
}

export function useWaterTracking() {
  const { user } = useAuth();
  const [consumption, setConsumption] = useState<WaterConsumption[]>([]);
  const [streak, setStreak] = useState<WaterStreak | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchConsumption();
      fetchStreak();
    }
  }, [user]);

  const fetchConsumption = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('water_consumption')
        .select('*')
        .eq('user_id', user.id)
        .order('consumption_date', { ascending: false })
        .limit(180);

      if (error) throw error;
      setConsumption(data || []);
    } catch (error) {
      console.error('Error fetching consumption:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStreak = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('water_streaks')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') throw error;

      if (!data) {
        const { data: newStreak, error: insertError } = await supabase
          .from('water_streaks')
          .insert({
            user_id: user.id,
            current_streak: 0,
            longest_streak: 0,
            last_activity_date: null,
          })
          .select()
          .single();

        if (insertError) throw insertError;
        setStreak(newStreak);
      } else {
        setStreak(data);
      }
    } catch (error) {
      console.error('Error fetching streak:', error);
    }
  };

  const addConsumption = async (cubicMeters: number, date?: string) => {
    if (!user) return;

    const consumptionDate = date || new Date().toISOString().split('T')[0];

    try {
      const { error } = await supabase
        .from('water_consumption')
        .upsert({
          user_id: user.id,
          consumption_date: consumptionDate,
          cubic_meters: cubicMeters,
        });

      if (error) throw error;

      await updateStreak(consumptionDate);
      await fetchConsumption();
    } catch (error) {
      console.error('Error adding consumption:', error);
    }
  };

  const updateStreak = async (activityDate: string) => {
    if (!user || !streak) return;

    try {
      const today = new Date(activityDate);
      const lastActivity = streak.last_activity_date
        ? new Date(streak.last_activity_date)
        : null;

      let newStreak = streak.current_streak;

      if (!lastActivity) {
        newStreak = 1;
      } else {
        const daysDiff = Math.floor(
          (today.getTime() - lastActivity.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (daysDiff === 1) {
          newStreak = streak.current_streak + 1;
        } else if (daysDiff === 0) {
          newStreak = streak.current_streak;
        } else {
          newStreak = 1;
        }
      }

      const longestStreak = Math.max(newStreak, streak.longest_streak);

      const { error } = await supabase
        .from('water_streaks')
        .update({
          current_streak: newStreak,
          longest_streak: longestStreak,
          last_activity_date: activityDate,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);

      if (error) throw error;
      await fetchStreak();
    } catch (error) {
      console.error('Error updating streak:', error);
    }
  };

  const getCurrentMonthConsumption = (): number => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return consumption
      .filter((c) => {
        const date = new Date(c.consumption_date);
        return (
          date.getMonth() === currentMonth && date.getFullYear() === currentYear
        );
      })
      .reduce((sum, c) => sum + Number(c.cubic_meters), 0);
  };

  const getLastMonthConsumption = (): number => {
    const now = new Date();
    const lastMonth = now.getMonth() === 0 ? 11 : now.getMonth() - 1;
    const lastMonthYear =
      now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();

    return consumption
      .filter((c) => {
        const date = new Date(c.consumption_date);
        return (
          date.getMonth() === lastMonth && date.getFullYear() === lastMonthYear
        );
      })
      .reduce((sum, c) => sum + Number(c.cubic_meters), 0);
  };

  const getMonthlyConsumptionTrend = (months: number = 7) => {
    const now = new Date();
    const result: { month: string; value: number }[] = [];

    for (let i = months - 1; i >= 0; i--) {
      const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = date.toLocaleDateString('es-ES', { month: 'short' });
      const month = date.getMonth();
      const year = date.getFullYear();

      const total = consumption
        .filter((c) => {
          const cDate = new Date(c.consumption_date);
          return cDate.getMonth() === month && cDate.getFullYear() === year;
        })
        .reduce((sum, c) => sum + Number(c.cubic_meters), 0);

      result.push({
        month: monthName.charAt(0).toUpperCase() + monthName.slice(1),
        value: total,
      });
    }

    return result;
  };

  const getReductionPercentage = (): number => {
    const current = getCurrentMonthConsumption();
    const last = getLastMonthConsumption();

    if (last === 0) return 0;
    return ((last - current) / last) * 100;
  };

  return {
    consumption,
    streak,
    loading,
    addConsumption,
    getCurrentMonthConsumption,
    getLastMonthConsumption,
    getMonthlyConsumptionTrend,
    getReductionPercentage,
    refetch: () => {
      fetchConsumption();
      fetchStreak();
    },
  };
}
