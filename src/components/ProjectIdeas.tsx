import { useState } from 'react';
import { Lightbulb, Plus, Star, ExternalLink, Calendar } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  tech_stack: string[];
  priority: 'low' | 'medium' | 'high';
  status: 'idea' | 'planning' | 'in_progress' | 'completed';
  estimated_time: string;
}

export const ProjectIdeas = () => {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: 1,
      title: 'Portfolio Personal Interactivo',
      description: 'Un portfolio que muestre proyectos con animaciones 3D y efectos interactivos',
      tech_stack: ['React', 'Three.js', 'Framer Motion', 'TypeScript'],
      priority: 'high',
      status: 'planning',
      estimated_time: '2 semanas'
    },
    {
      id: 2,
      title: 'API de Clima con Cache Redis',
      description: 'Microservicio que obtiene datos del clima con sistema de cache inteligente',
      tech_stack: ['Node.js', 'Express', 'Redis', 'PostgreSQL'],
      priority: 'medium',
      status: 'idea',
      estimated_time: '1 semana'
    },
    {
      id: 3,
      title: 'Mobile App de Hábitos',
      description: 'App móvil para tracking de hábitos con gamificación y analytics',
      tech_stack: ['React Native', 'Firebase', 'Redux', 'Chart.js'],
      priority: 'low',
      status: 'idea',
      estimated_time: '1 mes'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newProject, setNewProject] = useState<{
    title: string;
    description: string;
    tech_stack: string;
    priority: Project['priority'];
    estimated_time: string;
  }>({
    title: '',
    description: '',
    tech_stack: '',
    priority: 'medium',
    estimated_time: ''
  });

  const addProject = () => {
    if (newProject.title && newProject.description) {
      setProjects([...projects, {
        id: Date.now(),
        ...newProject,
        tech_stack: newProject.tech_stack.split(',').map(tech => tech.trim()),
        status: 'idea' as const
      }]);
      setNewProject({
        title: '',
        description: '',
        tech_stack: '',
        priority: 'medium',
        estimated_time: ''
      });
      setShowAddForm(false);
    }
  };

  const updateProjectStatus = (id: number, status: Project['status']) => {
    setProjects(projects.map(project => 
      project.id === id ? { ...project, status } : project
    ));
  };

  const getPriorityColor = (priority: Project['priority']) => {
    switch (priority) {
      case 'high': return 'text-red-400 bg-red-900';
      case 'medium': return 'text-yellow-400 bg-yellow-900';
      case 'low': return 'text-green-400 bg-green-900';
    }
  };

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'idea': return 'text-gray-400 bg-gray-700';
      case 'planning': return 'text-blue-400 bg-blue-900';
      case 'in_progress': return 'text-orange-400 bg-orange-900';
      case 'completed': return 'text-green-400 bg-green-900';
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
          <span>Nueva Idea</span>
        </button>
      </div>

      {/* Add Project Form */}
      {showAddForm && (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4">Agregar Nueva Idea de Proyecto</h3>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Título del proyecto"
              value={newProject.title}
              onChange={(e) => setNewProject({...newProject, title: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-purple-400"
            />
            <textarea
              placeholder="Descripción del proyecto"
              value={newProject.description}
              onChange={(e) => setNewProject({...newProject, description: e.target.value})}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-purple-400"
              rows={3}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Tech stack (separado por comas)"
                value={newProject.tech_stack}
                onChange={(e) => setNewProject({...newProject, tech_stack: e.target.value})}
                className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-purple-400"
              />
              <select
                value={newProject.priority}
                onChange={(e) => setNewProject({...newProject, priority: e.target.value as Project['priority']})}
                className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-purple-400"
              >
                <option value="low">Prioridad Baja</option>
                <option value="medium">Prioridad Media</option>
                <option value="high">Prioridad Alta</option>
              </select>
              <input
                type="text"
                placeholder="Tiempo estimado"
                value={newProject.estimated_time}
                onChange={(e) => setNewProject({...newProject, estimated_time: e.target.value})}
                className="bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-purple-400"
              />
            </div>
            <div className="flex space-x-3">
              <button
                onClick={addProject}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition-colors"
              >
                Guardar
              </button>
              <button
                onClick={() => setShowAddForm(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded transition-colors"
              >
                Cancelar
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

            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech_stack.map((tech, index) => (
                <span key={index} className="px-2 py-1 bg-blue-600 text-white text-xs rounded">
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Calendar className="h-4 w-4" />
                <span>{project.estimated_time}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <select
                value={project.status}
                onChange={(e) => updateProjectStatus(project.id, e.target.value as Project['status'])}
                className={`px-2 py-1 rounded text-xs border-none ${getStatusColor(project.status)}`}
              >
                <option value="idea">💡 Idea</option>
                <option value="planning">📋 Planificando</option>
                <option value="in_progress">🚀 En Progreso</option>
                <option value="completed">✅ Completado</option>
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
