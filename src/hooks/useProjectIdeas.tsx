
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

interface ProjectIdea {
  id: string;
  title: string;
  description: string | null;
  technology_stack: string | null;
  priority: string;
  status: string;
  user_id: string;
}

export function useProjectIdeas() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<ProjectIdea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchProjects();
    } else {
      setProjects([]);
      setLoading(false);
    }
  }, [user]);

  const fetchProjects = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('project_ideas')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching projects:', error);
        return;
      }

      setProjects(data || []);
    } catch (error) {
      console.error('Error in fetchProjects:', error);
    } finally {
      setLoading(false);
    }
  };

  const addProject = async (project: Omit<ProjectIdea, 'id' | 'user_id'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('project_ideas')
        .insert({
          ...project,
          user_id: user.id
        })
        .select()
        .single();

      if (error) {
        console.error('Error adding project:', error);
        return;
      }

      setProjects(prev => [data, ...prev]);
    } catch (error) {
      console.error('Error in addProject:', error);
    }
  };

  const updateProjectStatus = async (id: string, status: string) => {
    try {
      const { data, error } = await supabase
        .from('project_ideas')
        .update({ status })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating project status:', error);
        return;
      }

      setProjects(prev => prev.map(p => p.id === id ? data : p));
    } catch (error) {
      console.error('Error in updateProjectStatus:', error);
    }
  };

  return {
    projects,
    loading,
    addProject,
    updateProjectStatus
  };
}
