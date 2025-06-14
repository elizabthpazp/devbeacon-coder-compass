
import { useState } from 'react';
import { BarChart3 } from 'lucide-react';
import { useHabits } from '@/hooks/useHabits';

export const HabitTracker = () => {
  const { habits, habitData, updateHabitValue } = useHabits();
  const [selectedHabit, setSelectedHabit] = useState<string | null>(null);

  const weekDays = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];

  const getHabitValue = (habitId: string, dayName: string) => {
    const data = habitData.find(hd => hd.habit_id === habitId && hd.day_name === dayName);
    return data?.value || 0;
  };

  const getProgress = (habitId: string) => {
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return 0;

    const total = weekDays.reduce((sum, day) => sum + getHabitValue(habitId, day), 0);
    const target = habit.target * 7;
    return Math.min((total / target) * 100, 100);
  };

  const getStreakCount = (habitId: string) => {
    const habit = habits.find(h => h.id === habitId);
    if (!habit) return 0;

    let streak = 0;
    for (let i = weekDays.length - 1; i >= 0; i--) {
      const day = weekDays[i];
      if (getHabitValue(habitId, day) >= habit.target) {
        streak++;
      } else {
        break;
      }
    }
    return streak;
  };

  const selectedHabitData = habits.find(h => h.id === selectedHabit);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white flex items-center">
          <BarChart3 className="mr-2 h-6 w-6 text-purple-400" />
          Habit Tracker
        </h2>
        <div className="text-sm text-gray-400">
          Semana del 11-17 Junio 2024
        </div>
      </div>

      {/* Habits Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {habits.map((habit) => (
          <div 
            key={habit.id}
            onClick={() => setSelectedHabit(habit.id)}
            className={`bg-gray-800 rounded-lg p-4 border cursor-pointer transition-colors ${
              selectedHabit === habit.id 
                ? 'border-purple-500 bg-gray-750' 
                : 'border-gray-700 hover:border-gray-600'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{habit.icon}</span>
              <div className="text-right">
                <div className="text-sm text-gray-400">Streak</div>
                <div className="text-lg font-bold text-orange-400">
                  {getStreakCount(habit.id)} días
                </div>
              </div>
            </div>
            <h3 className="font-semibold text-white mb-2">{habit.name}</h3>
            <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
              <div 
                className="bg-gradient-to-r from-purple-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getProgress(habit.id)}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-400">
              {getProgress(habit.id).toFixed(0)}% completado esta semana
            </div>
          </div>
        ))}
      </div>

      {/* Detailed View */}
      {selectedHabitData && (
        <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
          <div className="flex items-center space-x-3 mb-6">
            <span className="text-3xl">{selectedHabitData.icon}</span>
            <div>
              <h3 className="text-xl font-semibold text-white">
                {selectedHabitData.name}
              </h3>
              <p className="text-gray-400">
                Meta diaria: {selectedHabitData.target} {selectedHabitData.unit}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-3">
            {weekDays.map((day) => {
              const value = getHabitValue(selectedHabitData.id, day);
              const achieved = value >= selectedHabitData.target;
              
              return (
                <div key={day} className="text-center">
                  <div className="text-sm text-gray-400 mb-2">{day.slice(0, 3)}</div>
                  <div className={`w-16 h-16 rounded-lg border-2 flex items-center justify-center transition-colors ${
                    achieved 
                      ? 'border-green-500 bg-green-900' 
                      : value > 0 
                        ? 'border-yellow-500 bg-yellow-900' 
                        : 'border-gray-600 bg-gray-700'
                  }`}>
                    <input
                      type="number"
                      value={value}
                      onChange={(e) => updateHabitValue(selectedHabitData.id, day, Number(e.target.value))}
                      className="w-full h-full bg-transparent text-center text-white text-sm focus:outline-none"
                      min="0"
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {achieved ? '✅' : value > 0 ? '🔶' : '⭕'}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Weekly Stats */}
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-gray-700 rounded">
              <div className="text-2xl font-bold text-blue-400">
                {weekDays.reduce((sum, day) => sum + getHabitValue(selectedHabitData.id, day), 0)}
              </div>
              <div className="text-sm text-gray-400">Total Semanal</div>
            </div>
            <div className="text-center p-3 bg-gray-700 rounded">
              <div className="text-2xl font-bold text-green-400">
                {weekDays.filter(day => getHabitValue(selectedHabitData.id, day) >= selectedHabitData.target).length}
              </div>
              <div className="text-sm text-gray-400">Días Completados</div>
            </div>
            <div className="text-center p-3 bg-gray-700 rounded">
              <div className="text-2xl font-bold text-purple-400">
                {getProgress(selectedHabitData.id).toFixed(0)}%
              </div>
              <div className="text-sm text-gray-400">Progreso</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
