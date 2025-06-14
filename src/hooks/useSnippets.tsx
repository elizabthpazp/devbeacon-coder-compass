
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface Snippet {
  id: string;
  title: string;
  language: string;
  code: string;
  description: string | null;
  user_id: string;
}

export function useSnippets() {
  const { user } = useAuth();
  const [snippets, setSnippets] = useState<Snippet[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchSnippets();
    } else {
      setSnippets([]);
      setLoading(false);
    }
  }, [user]);

  const fetchSnippets = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('code_snippets')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching snippets:', error);
        return;
      }

      setSnippets(data || []);
    } catch (error) {
      console.error('Error in fetchSnippets:', error);
    } finally {
      setLoading(false);
    }
  };

  const addSnippet = async (snippet: Omit<Snippet, 'id' | 'user_id'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('code_snippets')
        .insert({
          ...snippet,
          user_id: user.id
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding snippet:', error);
        return;
      }

      setSnippets(prev => [data, ...prev]);
    } catch (error) {
      console.error('Error in addSnippet:', error);
    }
  };

  const deleteSnippet = async (id: string) => {
    try {
      const { error } = await supabase
        .from('code_snippets')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting snippet:', error);
        return;
      }

      setSnippets(prev => prev.filter(s => s.id !== id));
    } catch (error) {
      console.error('Error in deleteSnippet:', error);
    }
  };

  return {
    snippets,
    loading,
    addSnippet,
    deleteSnippet
  };
}
