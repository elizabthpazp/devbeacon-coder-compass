
import { Calendar, Code, Target, Bug, BookOpen, Lightbulb, BarChart3 } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const Navigation = ({ activeSection, setActiveSection }: NavigationProps) => {
  const navItems = [
    { id: 'weekly', label: 'Vista Semanal', icon: Calendar },
    { id: 'habits', label: 'Habit Tracker', icon: BarChart3 },
    { id: 'snippets', label: 'Code Snippets', icon: Code },
    { id: 'projects', label: 'Side Projects', icon: Lightbulb },
  ];

  return (
    <nav className="w-64 bg-gray-800 border-r border-gray-700 min-h-screen">
      <div className="p-4">
        <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Módulos
        </h2>
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-md text-left transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};
