import { supabase } from '../lib/supabase';

export async function generateSampleWaterData(userId: string) {
  try {
    const today = new Date();
    const consumptionData = [];

    for (let i = 180; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      const baseConsumption = 4.5;
      const variation = (Math.random() - 0.5) * 1.5;
      const trendReduction = (i / 180) * 0.5;
      const dailyConsumption = Math.max(3, baseConsumption - trendReduction + variation);

      consumptionData.push({
        user_id: userId,
        consumption_date: date.toISOString().split('T')[0],
        cubic_meters: parseFloat(dailyConsumption.toFixed(2)),
      });
    }

    const { error: consumptionError } = await supabase
      .from('water_consumption')
      .upsert(consumptionData, { onConflict: 'user_id,consumption_date' });

    if (consumptionError) throw consumptionError;

    const { error: streakError } = await supabase
      .from('water_streaks')
      .upsert({
        user_id: userId,
        current_streak: 12,
        longest_streak: 25,
        last_activity_date: today.toISOString().split('T')[0],
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' });

    if (streakError) throw streakError;

    const { error: balanceError } = await supabase
      .from('user_eco_balance')
      .upsert({
        user_id: userId,
        total_points: 1250,
        lifetime_points: 1250,
        level: 'Bronce',
        points_to_next_level: 750,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' });

    if (balanceError) throw balanceError;

    const pointsTransactions = [
      {
        user_id: userId,
        points: 500,
        transaction_type: 'water_saved',
        description: 'Ahorro de agua del mes',
        created_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        user_id: userId,
        points: 250,
        transaction_type: 'challenge_completed',
        description: 'Reto semanal completado',
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        user_id: userId,
        points: 200,
        transaction_type: 'education_completed',
        description: 'Módulo educativo: Ahorro e inversión',
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        user_id: userId,
        points: 150,
        transaction_type: 'streak_bonus',
        description: 'Bonificación por racha de 7 días',
        created_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        user_id: userId,
        points: 150,
        transaction_type: 'water_saved',
        description: 'Ahorro de agua semanal',
        created_at: new Date().toISOString(),
      },
    ];

    const { error: transactionsError } = await supabase
      .from('eco_points_transactions')
      .insert(pointsTransactions);

    if (transactionsError) throw transactionsError;

    const availableChallenges = await supabase
      .from('challenges')
      .select('id')
      .eq('is_active', true)
      .limit(2);

    if (availableChallenges.data && availableChallenges.data.length > 0) {
      const userChallenges = availableChallenges.data.map((challenge, index) => ({
        user_id: userId,
        challenge_id: challenge.id,
        progress: index === 0 ? 65 : 40,
        is_completed: false,
        started_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      }));

      await supabase
        .from('user_challenges')
        .upsert(userChallenges, { onConflict: 'user_id,challenge_id' });
    }

    return { success: true };
  } catch (error) {
    console.error('Error generating sample data:', error);
    return { success: false, error };
  }
}
