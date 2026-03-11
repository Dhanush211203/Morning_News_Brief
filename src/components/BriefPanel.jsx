import { useState, useEffect } from 'react';
import CategorySelector from './CategorySelector';
import { useBriefGeneration } from '../hooks/useBriefGeneration';

const BriefPanel = ({ isMobile }) => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [briefText, setBriefText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [displayedText, setDisplayedText] = useState('');
  // New state for mobile panel expansion
  const [isExpanded, setIsExpanded] = useState(false);
  
  const { generateBrief } = useBriefGeneration();

  // Typewriter effect
  useEffect(() => {
    if (!briefText) return;
    
    let i = 0;
    const typingInterval = setInterval(() => {
      setDisplayedText((prev) => prev + briefText.charAt(i));
      i++;
      if (i === briefText.length) {
        clearInterval(typingInterval);
      }
    }, 15); // Adjust speed here

    return () => clearInterval(typingInterval);
  }, [briefText]);

  const handleGenerate = async () => {
    if (selectedTopics.length === 0) {
      setError('Please pick at least 1 topic.');
      return;
    }

    setIsGenerating(true);
    setError('');
    setBriefText('');
    setDisplayedText('');
    
    // Ensure panel is expanded when generating
    if (isMobile) setIsExpanded(true);

    try {
      const text = await generateBrief(selectedTopics);
      setBriefText(text);
    } catch (err) {
      setError(err.message || 'Failed to generate brief.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className={`
      bg-white dark:bg-slate-800 flex flex-col transition-all duration-300 ease-in-out
      ${isMobile 
        ? `w-full rounded-t-3xl ${isExpanded ? 'max-h-[80vh] min-h-[40vh] p-4 sm:p-6' : 'h-[80px] p-4 sm:p-6 overflow-hidden shadow-[0_-8px_30px_rgb(0,0,0,0.12)]'}` 
        : 'rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 min-h-[600px] h-[calc(100vh-8rem)] p-6 xl:p-8'
      }
    `}>
      {isMobile && (
        <div 
          className="w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full mx-auto mb-4 cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-600 active:bg-slate-400"
          onClick={() => setIsExpanded(!isExpanded)}
        />
      )}
      
      <div 
        className={`flex items-center space-x-3 mb-8 ${isMobile ? 'cursor-pointer' : ''} ${!isExpanded && isMobile ? 'mt-[-8px]' : ''}`}
        onClick={() => isMobile && setIsExpanded(!isExpanded)}
      >
        <div className="p-2.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-xl shrink-0">
          <svg className="w-6 h-6 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h2 className={`text-xl font-bold text-slate-900 dark:text-white leading-tight truncate`}>Your Morning Brief</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 truncate">AI-powered 60s summary</p>
        </div>
        
        {/* Toggle icon for mobile */}
        {isMobile && (
          <div className="shrink-0 p-1 text-slate-400 flex items-center justify-center">
              <svg className={`w-5 h-5 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
              </svg>
          </div>
        )}
      </div>

      {(!isMobile || isExpanded) && (
        <>
          <div className="mb-8">
            <CategorySelector selected={selectedTopics} onChange={setSelectedTopics} />
            {error && <p className="mt-3 text-sm font-medium text-red-500 dark:text-red-400 flex items-center">
                <svg className="w-4 h-4 mr-1 pb-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                {error}
            </p>}
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || selectedTopics.length === 0}
            className={`
              w-full py-4 px-6 rounded-xl font-bold text-lg text-white transition-all duration-300 flex items-center justify-center space-x-2 shrink-0
              ${isGenerating || selectedTopics.length === 0
                ? 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed opacity-70'
                : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl hover:shadow-indigo-500/20 transform hover:-translate-y-0.5'
              }
            `}
          >
            <span>{isGenerating ? 'Analyzing...' : 'Generate My Brief'}</span>
            {!isGenerating && (
              <svg className="w-5 h-5 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            )}
          </button>

          {/* Brief Display Area */}
          <div className="pt-8 flex-1 overflow-y-auto min-h-[150px]">
            {isGenerating ? (
              <div className="flex flex-col items-center justify-center p-4 sm:p-8 space-y-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full border-4 border-slate-200 dark:border-slate-700" />
                  <div className="w-12 h-12 rounded-full border-4 border-indigo-500 border-t-transparent animate-spin absolute top-0 left-0" />
                </div>
                <p className="text-slate-500 dark:text-slate-400 font-medium animate-pulse text-center">
                  Gemini is composing...
                </p>
              </div>
            ) : displayedText ? (
              <div className="prose prose-slate dark:prose-invert max-w-none pb-4">
                <p className="whitespace-pre-wrap leading-relaxed text-[15px] sm:text-base text-slate-700 dark:text-slate-300">
                  {displayedText}
                  {displayedText.length < briefText.length && (
                    <span className="inline-block w-1.5 h-4 ml-1 bg-indigo-500 animate-pulse" />
                  )}
                </p>
              </div>
            ) : !error ? (
              <div className="h-full flex flex-col items-center justify-center p-4 sm:p-8 text-center text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700 min-h-[150px]">
                <svg className="w-10 h-10 sm:w-12 sm:h-12 mb-3 text-slate-300 dark:text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <p className="font-medium text-sm sm:text-base">Select up to 3 topics.</p>
              </div>
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};

export default BriefPanel;
