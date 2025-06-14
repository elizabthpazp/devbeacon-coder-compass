
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface Task {
  id: string;
  text: string;
  completed: boolean;
  day: string;
  user_id: string;
}

export function useTasks() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchTasks();
    } else {
      setTasks([]);
      setLoading(false);
    }
  }, [user]);

  const fetchTasks = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching tasks:', error);
        return;
      }

      setTasks(data || []);
    } catch (error) {
      console.error('Error in fetchTasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (text: string, day: string) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('tasks')
        .insert({
          text,
          day,
          user_id: user.id,
          completed: false
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding task:', error);
        return;
      }

      setTasks(prev => [...prev, data]);
    } catch (error) {
      console.error('Error in addTask:', error);
    }
  };

  const updatePomodoroCount = async (dayName: string) => {
    if (!user) return;

    try {
      // Get current pomodoro count for the day
      const { data: currentData, error: fetchError } = await supabase
        .from('pomodoros')
        .select('count')
        .eq('user_id', user.id)
        .eq('day_name', dayName)
        .single();

      const currentCount = currentData?.count || 0;

      // Increment the count
      const { error } = await supabase
        .from('pomodoros')
        .upsert({
          user_id: user.id,
          day_name: dayName,
          count: currentCount + 1,
          week_start_date: new Date().toISOString().split('T')[0]
        });

      if (error) {
        console.error('Error updating pomodoro count:', error);
      }
    } catch (error) {
      console.error('Error in updatePomodoroCount:', error);
    }
  };

  const toggleTask = async (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    try {
      const { data, error } = await supabase
        .from('tasks')
        .update({ completed: !task.completed })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error toggling task:', error);
        return;
      }

      // If task is being marked as completed, increment pomodoro count
      if (!task.completed && data.completed) {
        await updatePomodoroCount(task.day);
      }

      setTasks(prev => prev.map(t => t.id === id ? data : t));
    } catch (error) {
      console.error('Error in toggleTask:', error);
    }
  };

  return {
    tasks,
    loading,
    addTask,
    toggleTask
  };
}
