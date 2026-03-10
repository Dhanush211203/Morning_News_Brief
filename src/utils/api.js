export const fetchHeadlines = async (category) => {
  const GNEWS_API_KEY = import.meta.env.VITE_GNEWS_API_KEY;
  if (!GNEWS_API_KEY) {
      console.error("Missing VITE_GNEWS_API_KEY");
      return [];
  }
  
  const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=10&apikey=${GNEWS_API_KEY}`;
  
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
