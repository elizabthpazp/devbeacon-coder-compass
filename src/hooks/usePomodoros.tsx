
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface Pomodoro {
  id: string;
  user_id: string;
  day_name: string;
  count: number;
  week_start_date: string;
}

export function usePomodoros() {
  const { user } = useAuth();
  const [pomodoros, setPomodoros] = useState<Pomodoro[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchPomodoros();
      
      // Set up real-time subscription to pomodoros table
      const channel = supabase
        .channel('pomodoros-changes')
        .on(
          'postgres_changes',
          {
            event: '*',
            schema: 'public',
            table: 'pomodoros',
            filter: `user_id=eq.${user.id}`
          },
          () => {
            fetchPomodoros();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } else {
      setPomodoros([]);
      setLoading(false);
    }
  }, [user]);

  const fetchPomodoros = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('pomodoros')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching pomodoros:', error);
        return;
      }

      setPomodoros(data || []);
      setLoading(false);
    } catch (error) {
      console.error('Error in fetchPomodoros:', error);
      setLoading(false);
    }
  };

  const updatePomodoroCount = async (dayName: string, count: number) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('pomodoros')
        .upsert({
          user_id: user.id,
          day_name: dayName,
          count: count,
          week_start_date: new Date().toISOString().split('T')[0]
        })
        .select()
        .single();

      if (error) {
        console.error('Error updating pomodoro count:', error);
        return;
      }

      setPomodoros(prev => {
        const existing = prev.find(p => p.day_name === dayName);
        if (existing) {
          return prev.map(p => p.id === existing.id ? data : p);
        } else {
          return [...prev, data];
        }
      });
    } catch (error) {
      console.error('Error in updatePomodoroCount:', error);
    }
  };

  const getPomodoroCount = (dayName: string) => {
    const pomodoro = pomodoros.find(p => p.day_name === dayName);
    return pomodoro ? pomodoro.count : 0;
  };

  return {
    pomodoros,
    loading,
    updatePomodoroCount,
    getPomodoroCount
  };
}
