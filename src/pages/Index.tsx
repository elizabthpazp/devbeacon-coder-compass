
import { useState } from 'react';
import { Calendar, Code, Target, Bug, CheckSquare, Clock, BookOpen, Lightbulb } from 'lucide-react';
import { WeeklyView } from '@/components/WeeklyView';
import { SnippetManager } from '@/components/SnippetManager';
import { ProjectIdeas } from '@/components/ProjectIdeas';
import { HabitTracker } from '@/components/HabitTracker';
import { Navigation } from '@/components/Navigation';

const Index = () => {
  const [activeSection, setActiveSection] = useState('weekly');

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'weekly':
        return <WeeklyView />;
      case 'snippets':
        return <SnippetManager />;
      case 'projects':
        return <ProjectIdeas />;
      case 'habits':
        return <HabitTracker />;
      default:
        return <WeeklyView />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-green-400 font-mono">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-800 px-6 py-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Code className="h-8 w-8 text-blue-400" />
            <h1 className="text-2xl font-bold text-white">DevBeacon</h1>
          </div>
          <div className="text-sm text-gray-400">
            v1.0.0 | El Planner Definitivo para Developers Productivos
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <Navigation 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
        />

        {/* Main Content */}
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            {renderActiveSection()}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-700 bg-gray-800 px-6 py-4 text-center text-sm text-gray-400">
        <p>DevBeacon © 2024 | Diseñado por y para developers 💜</p>
      </footer>
    </div>
  );
};

export default Index;
