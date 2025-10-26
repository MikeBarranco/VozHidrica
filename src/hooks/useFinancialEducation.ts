import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

export interface EducationModule {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
  difficulty_level: string;
  points_reward: number;
  estimated_minutes: number;
  order_index: number;
}

export interface UserEducationProgress {
  id: string;
  module_id: string;
  is_completed: boolean;
  progress_percentage: number;
  completed_at: string | null;
  started_at: string;
  module?: EducationModule;
}

export function useFinancialEducation() {
  const { user } = useAuth();
  const [modules, setModules] = useState<EducationModule[]>([]);
  const [userProgress, setUserProgress] = useState<UserEducationProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchModules();
      fetchUserProgress();
    }
  }, [user]);

  const fetchModules = async () => {
    try {
      const { data, error } = await supabase
        .from('financial_education_modules')
        .select('*')
        .eq('is_published', true)
        .order('order_index', { ascending: true });

      if (error) throw error;
      setModules(data || []);
    } catch (error) {
      console.error('Error fetching education modules:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserProgress = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_education_progress')
        .select(`
          *,
          module:financial_education_modules(*)
        `)
        .eq('user_id', user.id);

      if (error) throw error;
      setUserProgress(data || []);
    } catch (error) {
      console.error('Error fetching user progress:', error);
    }
  };

  const startModule = async (moduleId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase.from('user_education_progress').insert({
        user_id: user.id,
        module_id: moduleId,
        progress_percentage: 0,
        is_completed: false,
      });

      if (error) throw error;
      await fetchUserProgress();
    } catch (error) {
      console.error('Error starting module:', error);
    }
  };

  const completeModule = async (moduleId: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_education_progress')
        .update({
          progress_percentage: 100,
          is_completed: true,
          completed_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)
        .eq('module_id', moduleId);

      if (error) throw error;
      await fetchUserProgress();
    } catch (error) {
      console.error('Error completing module:', error);
    }
  };

  const updateProgress = async (moduleId: string, percentage: number) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_education_progress')
        .update({
          progress_percentage: percentage,
        })
        .eq('user_id', user.id)
        .eq('module_id', moduleId);

      if (error) throw error;
      await fetchUserProgress();
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  const getModuleProgress = (moduleId: string) => {
    return userProgress.find((p) => p.module_id === moduleId);
  };

  const getCompletedModules = () => {
    return userProgress.filter((p) => p.is_completed);
  };

  const getTotalPointsEarned = () => {
    return getCompletedModules().reduce((total, progress) => {
      const module = modules.find((m) => m.id === progress.module_id);
      return total + (module?.points_reward || 0);
    }, 0);
  };

  const getModulesByCategory = (category: string) => {
    return modules.filter((m) => m.category === category);
  };

  return {
    modules,
    userProgress,
    loading,
    startModule,
    completeModule,
    updateProgress,
    getModuleProgress,
    getCompletedModules,
    getTotalPointsEarned,
    getModulesByCategory,
    refetch: () => {
      fetchModules();
      fetchUserProgress();
    },
  };
}
