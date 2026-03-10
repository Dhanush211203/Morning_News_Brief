const CATEGORIES = [
  { id: 'general', label: 'General', emoji: '🌍' },
  { id: 'technology', label: 'Tech', emoji: '💻' },
  { id: 'business', label: 'Business', emoji: '📈' },
  { id: 'sports', label: 'Sports', emoji: '🏅' },
  { id: 'science', label: 'Science', emoji: '🔬' },
  { id: 'health', label: 'Health', emoji: '🏥' },
];

const CategorySelector = ({ selected, onChange }) => {
  const toggleSelection = (id) => {
    if (selected.includes(id)) {
      onChange(selected.filter(item => item !== id));
    } else {
      if (selected.length < 3) {
        onChange([...selected, id]);
      }
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-200">
          Topics (Max 3)
        </h4>
        <span className="text-xs font-medium text-slate-500 bg-slate-100 dark:bg-slate-800 dark:text-slate-400 px-2.5 py-1 rounded-full">
          {selected.length}/3
        </span>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => {
          const isSelected = selected.includes(cat.id);
          const isDisabled = !isSelected && selected.length >= 3;
          
          return (
            <label
              key={cat.id}
              className={`
                relative flex items-center p-2.5 rounded-xl border-2 transition-all duration-200 cursor-pointer select-none
                ${isSelected 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                  : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-700'
                }
                ${isDisabled ? 'opacity-50 cursor-not-allowed grayscale' : ''}
              `}
            >
              <input
                type="checkbox"
                className="sr-only"
                checked={isSelected}
                onChange={() => toggleSelection(cat.id)}
                disabled={isDisabled}
              />
              <span className="text-base mr-2">{cat.emoji}</span>
              <span className={`text-sm font-medium ${
                isSelected 
                  ? 'text-blue-700 dark:text-blue-300' 
                  : 'text-slate-600 dark:text-slate-300'
              }`}>
                {cat.label}
              </span>
              
              {isSelected && (
                <svg className="absolute top-1/2 -translate-y-1/2 right-2 w-4 h-4 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default CategorySelector;
