export const fetchHeadlines = async (category) => {
  const url = `/api/headlines?category=${category}`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch from GNews');
    const data = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error("Error fetching headlines:", error);
    return [];
  }
};
