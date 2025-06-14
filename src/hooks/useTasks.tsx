
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
