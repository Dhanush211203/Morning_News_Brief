export const truncate = (str, n) => {
  return (str.length > n) ? str.slice(0, n-1) + '...' : str;
};

export const getRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInMs = now - date;
  
  const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
  
  if (diffInHours === 0) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return `${diffInMinutes}m ago`;
  }
  if (diffInHours < 24) return `${diffInHours}h ago`;
  
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays}d ago`;
};
