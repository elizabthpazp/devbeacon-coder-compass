import { useState, useEffect } from 'react';
import { Code, LogOut, Github } from 'lucide-react';
import { WeeklyView } from '@/components/WeeklyView';
import { SnippetManager } from '@/components/SnippetManager';
import { ProjectIdeas } from '@/components/ProjectIdeas';
import { HabitTracker } from '@/components/HabitTracker';
import { Navigation } from '@/components/Navigation';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [activeSection, setActiveSection] = useState('weekly');
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-400"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

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
      <header className="border-b border-gray-700 bg-gray-800 px-4 md:px-6 py-4">  
        <div className="flex flex-col md:flex-row md:items-center justify-between ml-16 md:ml-0 space-y-2 md:space-y-0">
          {/* Logo y descripción */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Code className="h-6 md:h-8 w-6 md:w-8 text-blue-400" />
              <h1 className="text-xl md:text-2xl font-bold text-white">DevBeacon</h1>
            </div>
            <div className="hidden sm:block text-xs md:text-sm text-gray-400">
              v1.0.0 | The Ultimate Planner for Productive Developers
            </div>
          </div>
          
          {/* Usuario y botón de salir - En mobile van abajo */}
          <div className="flex flex-col md:flex-row md:items-center space-y-1 md:space-y-0 md:space-x-4">
            <span className="text-sm text-gray-400 truncate">
              {user.email}
            </span>
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors self-start md:self-auto"
            >
              <LogOut className="h-4 w-4" />
              <span className="sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <div className="flex relative">
        {/* Sidebar Navigation */}
        <Navigation 
          activeSection={activeSection} 
          setActiveSection={setActiveSection} 
        />

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 md:ml-0">
          <div className="max-w-6xl mx-auto">
            {renderActiveSection()}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-700 bg-gray-800 px-4 md:px-6 py-4 text-center text-xs md:text-sm text-gray-400">
        <p>DevBeacon © 2025 | Designed by and for developers 💜</p>
      </footer>

      {/* GitHub Link */}
      <div className="fixed bottom-4 right-4 z-50">
        <a
          href="https://github.com/elijs-dev/devbeacon"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white px-3 py-2 rounded-lg shadow-lg transition-all duration-200 border border-gray-600 hover:border-gray-500"
        >
          <Github className="h-4 w-4" />
          <span className="text-sm font-medium">View on GitHub</span>
        </a>
      </div>
    </div>
  );
};

export default Index;
