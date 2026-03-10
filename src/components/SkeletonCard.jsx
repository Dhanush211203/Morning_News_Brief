const SkeletonCard = () => {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden animate-pulse">
      <div className="h-48 w-full bg-slate-200 dark:bg-slate-700" />
      <div className="p-5 flex-1 flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="h-4 w-24 bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="h-4 w-16 bg-slate-200 dark:bg-slate-700 rounded" />
        </div>
        <div className="h-6 w-full bg-slate-200 dark:bg-slate-700 rounded" />
        <div className="h-6 w-3/4 bg-slate-200 dark:bg-slate-700 rounded" />
        <div className="mt-auto space-y-2">
          <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="h-4 w-full bg-slate-200 dark:bg-slate-700 rounded" />
          <div className="h-4 w-2/3 bg-slate-200 dark:bg-slate-700 rounded" />
        </div>
        <div className="mt-4 h-10 w-full bg-slate-200 dark:bg-slate-700 rounded-lg" />
      </div>
    </div>
  );
};

export default SkeletonCard;
