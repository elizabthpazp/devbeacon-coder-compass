import { useState } from 'react';
import { CheckSquare, Square, Clock, Target, Zap, Plus } from 'lucide-react';

export const WeeklyView = () => {
  const [weeklyGoal, setWeeklyGoal] = useState('Completar feature de autenticación');
  const [currentStack, setCurrentStack] = useState('React + TypeScript');
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Implementar login con GitHub', completed: true, day: 'Lunes' },
    { id: 2, text: 'Crear componente de dashboard', completed: false, day: 'Martes' },
    { id: 3, text: 'Integrar API de usuario', completed: false, day: 'Miércoles' },
    { id: 4, text: 'Testing unitario', completed: false, day: 'Jueves' },
    { id: 5, text: 'Deployment a producción', completed: false, day: 'Viernes' },
  ]);

  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({ text: '', day: 'Lunes' });

  const [pomodoros, setPomodoros] = useState({
    Lunes: 6,
    Martes: 4,
    Miércoles: 0,
    Jueves: 0,
    Viernes: 0,
    Sábado: 0,
    Domingo: 0,
  });

  const [energy, setEnergy] = useState(85);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = () => {
    if (newTask.text.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        text: newTask.text,
        completed: false,
        day: newTask.day
      }]);
      setNewTask({ text: '', day: 'Lunes' });
      setShowAddTask(false);
    }
  };

  const weekDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h2 className="text-xl font-bold text-white mb-4 flex items-center">
          <Target className="mr-2 h-6 w-6 text-blue-400" />
          Vista Semanal
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Objetivo Semanal</label>
            <input
              type="text"
              value={weeklyGoal}
              onChange={(e) => setWeeklyGoal(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Stack/Tecnología</label>
            <input
              type="text"
              value={currentStack}
              onChange={(e) => setCurrentStack(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-blue-400"
            />
          </div>
        </div>

        {/* Energy Level */}
        <div className="mt-4">
          <label className="block text-sm text-gray-400 mb-2 flex items-center">
            <Zap className="mr-2 h-4 w-4" />
            Nivel de Energía: {energy}%
          </label>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-green-400 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${energy}%` }}
            ></div>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={energy}
            onChange={(e) => setEnergy(Number(e.target.value))}
            className="w-full mt-2"
          />
        </div>
      </div>

      {/* Daily Tasks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tasks */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-white flex items-center">
              <CheckSquare className="mr-2 h-5 w-5 text-green-400" />
              Tareas de la Semana
            </h3>
            <button
              onClick={() => setShowAddTask(true)}
              className="flex items-center space-x-1 bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Agregar</span>
            </button>
          </div>

          {/* Add Task Form */}
          {showAddTask && (
            <div className="mb-4 p-3 bg-gray-700 rounded border border-gray-600">
              <input
                type="text"
                placeholder="Nueva tarea..."
                value={newTask.text}
                onChange={(e) => setNewTask({...newTask, text: e.target.value})}
                className="w-full bg-gray-600 border border-gray-500 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-green-400 mb-3"
                autoFocus
              />
              <div className="flex justify-between items-center">
                <select
                  value={newTask.day}
                  onChange={(e) => setNewTask({...newTask, day: e.target.value})}
                  className="bg-gray-600 border border-gray-500 rounded px-2 py-1 text-white text-sm focus:outline-none focus:border-green-400"
                >
                  {weekDays.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
                <div className="flex space-x-2">
                  <button
                    onClick={addTask}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    Guardar
                  </button>
                  <button
                    onClick={() => setShowAddTask(false)}
                    className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center space-x-3 p-3 bg-gray-700 rounded border border-gray-600">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`flex-shrink-0 ${task.completed ? 'text-green-400' : 'text-gray-400'}`}
                >
                  {task.completed ? <CheckSquare className="h-5 w-5" /> : <Square className="h-5 w-5" />}
                </button>
                <div className="flex-1">
                  <p className={`${task.completed ? 'line-through text-gray-400' : 'text-white'}`}>
                    {task.text}
                  </p>
                  <p className="text-xs text-gray-500">{task.day}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pomodoro Tracker */}
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Clock className="mr-2 h-5 w-5 text-red-400" />
            Pomodoros Completados
          </h3>
          <div className="space-y-3">
            {weekDays.map((day) => (
              <div key={day} className="flex items-center justify-between p-3 bg-gray-700 rounded border border-gray-600">
                <span className="text-white font-medium">{day}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-400 font-mono">{pomodoros[day]}</span>
                  <div className="flex space-x-1">
                    {[...Array(Math.min(pomodoros[day], 8))].map((_, i) => (
                      <div key={i} className="w-3 h-3 bg-red-400 rounded-full"></div>
                    ))}
                    {[...Array(Math.max(0, 8 - pomodoros[day]))].map((_, i) => (
                      <div key={i} className="w-3 h-3 border border-gray-500 rounded-full"></div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
