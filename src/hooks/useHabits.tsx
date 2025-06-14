
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface Habit {
  id: string;
  name: string;
  icon: string;
  target: number;
  unit: string;
  user_id: string;
}

interface HabitData {
  id: string;
  habit_id: string;
  day_name: string;
  value: number;
  week_start_date: string;
}

export function useHabits() {
  const { user } = useAuth();
  const [habits, setHabits] = useState<Habit[]>([]);
  const [habitData, setHabitData] = useState<HabitData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchHabits();
      fetchHabitData();
    } else {
      setHabits([]);
      setHabitData([]);
      setLoading(false);
    }
  }, [user]);

  const fetchHabits = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('habits')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching habits:', error);
        return;
      }

      setHabits(data || []);
    } catch (error) {
      console.error('Error in fetchHabits:', error);
    }
  };

  const fetchHabitData = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('habit_daily_data')
        .select('*')
        .in('habit_id', habits.map(h => h.id));

      if (error) {
        console.error('Error fetching habit data:', error);
        return;
      }

      setHabitData(data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error in fetchHabitData:', error);
      setLoading(false);
    }
  };

  const updateHabitValue = async (habitId: string, dayName: string, value: number) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('habit_daily_data')
        .upsert({
          habit_id: habitId,
          day_name: dayName,
          value: value,
          week_start_date: new Date().toISOString().split('T')[0]
        })
        .select()
        .single();

      if (error) {
        console.error('Error updating habit value:', error);
        return;
      }

      setHabitData(prev => {
        const existing = prev.find(hd => hd.habit_id === habitId && hd.day_name === dayName);
        if (existing) {
          return prev.map(hd => hd.id === existing.id ? data : hd);
        } else {
          return [...prev, data];
        }
      });
    } catch (error) {
      console.error('Error in updateHabitValue:', error);
    }
  };

  return {
    habits,
    habitData,
    loading,
    updateHabitValue
  };
}
