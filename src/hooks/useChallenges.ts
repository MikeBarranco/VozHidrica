import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export interface Challenge {
  id: string;
  title: string;
  description: string;
  challenge_type: string;
  target_value: number;
  reward_points: number;
  start_date: string;
  end_date: string;
  is_active: boolean;
  icon: string;
}

export interface UserChallenge {
  id: string;
  challenge_id: string;
  progress: number;
  is_completed: boolean;
  completed_at: string | null;
  started_at: string;
  challenge?: Challenge;
}

export function useChallenges() {
  const { user } = useAuth();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [userChallenges, setUserChallenges] = useState<UserChallenge[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchChallenges();
      fetchUserChallenges();
    }
  }, [user]);

  const fetchChallenges = async () => {
    try {
      const { data, error } = await supabase
        .from('challenges')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setChallenges(data || []);
    } catch (error) {
      console.error('Error fetching challenges:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserChallenges = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_challenges')
        .select(`
          *,
          challenge:challenges(*)
        `)
        .eq('user_id', user.id)
        .order('started_at', { ascending: false });

      if (error) throw error;
      setUserChallenges(data || []);
    } catch (error) {
      console.error('Error fetching user challenges:', error);
    }
  };

  const joinChallenge = async (challengeId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase.from('user_challenges').insert({
        user_id: user.id,
        challenge_id: challengeId,
        progress: 0,
        is_completed: false,
      });

      if (error) throw error;
      await fetchUserChallenges();
    } catch (error) {
      console.error('Error joining challenge:', error);
    }
  };

  const updateChallengeProgress = async (
    challengeId: string,
    progress: number
  ) => {
    if (!user) return;

    try {
      const isCompleted = progress >= 100;

      const { error } = await supabase
        .from('user_challenges')
        .update({
          progress,
          is_completed: isCompleted,
          completed_at: isCompleted ? new Date().toISOString() : null,
        })
        .eq('user_id', user.id)
        .eq('challenge_id', challengeId);

      if (error) throw error;
      await fetchUserChallenges();
    } catch (error) {
      console.error('Error updating challenge progress:', error);
    }
  };

  const getAvailableChallenges = () => {
    const userChallengeIds = new Set(
      userChallenges.map((uc) => uc.challenge_id)
    );
    return challenges.filter((c) => !userChallengeIds.has(c.id));
  };

  const getActiveChallenges = () => {
    return userChallenges.filter((uc) => !uc.is_completed);
  };

  const getCompletedChallenges = () => {
    return userChallenges.filter((uc) => uc.is_completed);
  };

  return {
    challenges,
    userChallenges,
    loading,
    joinChallenge,
    updateChallengeProgress,
    getAvailableChallenges,
    getActiveChallenges,
    getCompletedChallenges,
    refetch: () => {
      fetchChallenges();
      fetchUserChallenges();
    },
  };
}
