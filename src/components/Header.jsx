import { useState, useEffect } from 'react';
import { useDarkMode } from '../hooks/useDarkMode';

const Header = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const calculateTimeUntilMidnight = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      
      const diffMs = midnight - now;
      const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

      const pad = (num) => num.toString().padStart(2, '0');
      setTimeLeft(`${pad(hours)}:${pad(minutes)}:${pad(seconds)}`);
    };

    calculateTimeUntilMidnight();
    const interval = setInterval(calculateTimeUntilMidnight, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xl sm:text-2xl" role="img" aria-label="sun">☀️</span>
          <h1 className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
            Morning Brief
          </h1>
        </div>
        
        <div className="flex items-center space-x-4 sm:space-x-6">
          <div className="hidden sm:flex text-sm text-slate-500 dark:text-slate-400">
            Resets in <span className="ml-1 font-mono">{timeLeft}</span>
          </div>
          
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? '🌞' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
