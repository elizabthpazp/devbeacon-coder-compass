
import { useState, useEffect } from 'react';
import { Code, LogOut } from 'lucide-react';
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
        <div className="flex items-center justify-between ml-12 md:ml-0">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-2">
              <Code className="h-6 md:h-8 w-6 md:w-8 text-blue-400" />
              <h1 className="text-xl md:text-2xl font-bold text-white">DevBeacon</h1>
            </div>
            <div className="hidden sm:block text-xs md:text-sm text-gray-400">
              v1.0.0 | The Ultimate Planner for Productive Developers
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-400">
              {user.email}
            </span>
            <button
              onClick={handleSignOut}
              className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Sign Out</span>
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
    </div>
  );
};

export default Index;
