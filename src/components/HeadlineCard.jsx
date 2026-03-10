import { truncate, getRelativeTime } from '../utils/formatters';

const HeadlineCard = ({ article }) => {
  if (!article) return null;

  const { title, description, url, image, publishedAt, source } = article;

  return (
    <div className="flex flex-col h-full bg-white dark:bg-slate-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-200 dark:border-slate-700 overflow-hidden group">
      {/* Image Container */}
      <div className="relative h-48 w-full bg-slate-100 dark:bg-slate-900 overflow-hidden">
        {image ? (
          <img
            src={image}
            alt=""
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div 
          className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800"
          style={{ display: image ? 'none' : 'flex' }}
        >
          <span className="text-4xl font-bold text-slate-300 dark:text-slate-600">
            {source?.name?.charAt(0) || 'N'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-3">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
            {source?.name || 'News Source'}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {getRelativeTime(publishedAt)}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-2 mb-2 leading-tight">
          {title}
        </h3>

        <p className="text-sm text-slate-600 dark:text-slate-300 line-clamp-3 mb-6 flex-1">
          {description}
        </p>

        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex items-center justify-center w-full px-4 py-2.5 text-sm font-semibold text-white bg-slate-900 dark:bg-white dark:text-slate-900 rounded-lg hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900 dark:focus:ring-white"
        >
          Read Full Article
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default HeadlineCard;
