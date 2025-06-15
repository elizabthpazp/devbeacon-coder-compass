
import { useState } from 'react';
import { Lightbulb, Plus, Star, ExternalLink, Calendar } from 'lucide-react';
import { useProjectIdeas } from '@/hooks/useProjectIdeas';

export const ProjectIdeas = () => {
  const { projects, addProject, updateProjectStatus } = useProjectIdeas();

  const [showAddForm, setShowAddForm] = useState(false);
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technology_stack: '',
    priority: 'medium' as const,
    status: 'idea' as const
  });

  const handleAddProject = async () => {
    if (newProject.title && newProject.description) {
      await addProject(newProject);
      setNewProject({
        title: '',
        description: '',
        technology_stack: '',
        priority: 'medium',
        status: 'idea'
      });
      setShowAddForm(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-900';
      case 'medium': return 'text-yellow-400 bg-yellow-900';
      case 'low': return 'text-green-400 bg-green-900';
      default: return 'text-gray-400 bg-gray-700';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'idea': return 'text-gray-400 bg-gray-700';
      case 'planning': return 'text-blue-400 bg-blue-900';
      case 'in_progress': return 'text-orange-400 bg-orange-900';
      case 'completed': return 'text-green-400 bg-green-900';
      default: return 'text-gray-400 bg-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white flex items-center">
          <Lightbulb className="mr-2 h-6 w-6 text-yellow-400" />
          Side Projects & Ideas
        </h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>New Idea</span>
        </button>
      </div>

      {/* Add Project Form */}
      {showAddForm && (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Add New Project Idea</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Project title"
              value={newProject.title}
              onChange={(e) => setNewProject({...newProject, title: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-purple-400"
            />
            <textarea
              placeholder="Project description"
              value={newProject.description}
              onChange={(e) => setNewProject({...newProject, description: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-purple-400"
              rows={3}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Tech stack (comma separated)"
                value={newProject.technology_stack}
                onChange={(e) => setNewProject({...newProject, technology_stack: e.target.value})}
                className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-purple-400"
              />
              <select
                value={newProject.priority}
                onChange={(e) => setNewProject({...newProject, priority: e.target.value as any})}
                className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-purple-400"
              >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
              </select>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleAddProject}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-gray-800 rounded-lg border border-gray-700 p-6 hover:border-purple-500 transition-colors">
            <div className="flex justify-between items-start mb-3">
              <h3 className="text-lg font-semibold text-white">{project.title}</h3>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 text-yellow-400" />
                <span className={`px-2 py-1 rounded text-xs ${getPriorityColor(project.priority)}`}>
                  {project.priority}
                </span>
              </div>
            </div>
            
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              {project.description}
            </p>

            {project.technology_stack && (
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technology_stack.split(',').map((tech, index) => (
                  <span key={index} className="px-2 py-1 bg-blue-600 text-white text-xs rounded">
                    {tech.trim()}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between">
              <select
                value={project.status}
                onChange={(e) => updateProjectStatus(project.id, e.target.value)}
                className={`px-2 py-1 rounded text-xs border-none ${getStatusColor(project.status)}`}
              >
                <option value="idea">💡 Idea</option>
                <option value="planning">📋 Planning</option>
                <option value="in_progress">🚀 In Progress</option>
                <option value="completed">✅ Completed</option>
              </select>
              
              <button className="text-gray-400 hover:text-white transition-colors">
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
