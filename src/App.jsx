import Header from './components/Header';
import HeadlineGrid from './components/HeadlineGrid';
import BriefPanel from './components/BriefPanel';

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center w-full">
      <Header />
      
      <main className="w-full relative flex-1">
        <div className="max-w-[1920px] mx-auto w-full pb-32 xl:pb-0">
          <div className="xl:grid xl:grid-cols-[1fr_400px] xl:gap-8 overflow-x-hidden">
            <HeadlineGrid />
            <div className="hidden xl:block">
              <div className="sticky top-24 pt-8 pr-8">
                <BriefPanel />
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Mobile Bottom Sheet for Brief Panel */}
      <div className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-[0_-8px_30px_rgb(0,0,0,0.12)]">
        <BriefPanel isMobile />
      </div>
      
      <footer className="w-full text-center py-6 text-sm text-slate-500 dark:text-slate-400 mt-auto border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <p>© {new Date().getFullYear()} Morning Brief · Powered by Gemini · <a href="https://5newsheadline.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline font-medium">5news</a></p>
      </footer>
    </div>
  );
}

export default App;
