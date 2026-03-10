export const getCached = (category) => {
  const TODAY = new Date().toISOString().split('T')[0];
  const raw = localStorage.getItem(`mb_${category}_${TODAY}`);
  return raw ? JSON.parse(raw) : null;
};

export const setCache = (category, data) => {
  const TODAY = new Date().toISOString().split('T')[0];
  // Clean up yesterday's keys first
  Object.keys(localStorage)
    .filter(k => k.startsWith('mb_') && !k.includes(TODAY))
    .forEach(k => localStorage.removeItem(k));
    
  localStorage.setItem(`mb_${category}_${TODAY}`, JSON.stringify(data));
};
