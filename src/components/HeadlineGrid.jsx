import { useState } from 'react';
import { useHeadlines } from '../hooks/useHeadlines';
import HeadlineCard from './HeadlineCard';
import SkeletonCard from './SkeletonCard';

const CATEGORIES = [
  { id: 'general', label: 'General' },
  { id: 'technology', label: 'Tech' },
  { id: 'business', label: 'Business' },
  { id: 'sports', label: 'Sports' },
  { id: 'science', label: 'Science' },
  { id: 'health', label: 'Health' },
];

const HeadlineGrid = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const { headlines, loading, error } = useHeadlines(activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      {/* Category Tabs */}
      <div className="mb-8 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex space-x-2 sm:space-x-4 min-w-max">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 sm:px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                activeCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20 dark:bg-blue-500'
                  : 'bg-white text-slate-600 hover:bg-slate-50 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 hover:shadow-sm'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid Or State Messages */}
      {error ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white/50 dark:bg-slate-800/50 rounded-3xl border border-red-100 dark:border-red-900/30">
          <div className="text-red-500 dark:text-red-400 mb-4 text-5xl">😕</div>
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Oops! Something went wrong</h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-sm text-center">
            {error}. Please try again later.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {loading
            ? Array.from({ length: 9 }).map((_, i) => <SkeletonCard key={i} />)
            : headlines.map((article, idx) => (
                <HeadlineCard key={idx} article={article} />
              ))}
        </div>
      )}
      
      {!loading && !error && headlines?.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 bg-white/50 dark:bg-slate-800/50 rounded-3xl border border-slate-200 dark:border-slate-700/50">
             <div className="text-slate-400 dark:text-slate-500 mb-4 text-5xl">📭</div>
             <p className="text-slate-600 dark:text-slate-400">No headlines found for this category today.</p>
          </div>
      )}
    </div>
  );
};

export default HeadlineGrid;
