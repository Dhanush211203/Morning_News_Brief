export default async function handler(req, res) {
  const category = req.query.category || 'general';
  const apiKey = process.env.VITE_GNEWS_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'GNews API key not configured' });
  }

  const url = `https://gnews.io/api/v4/top-headlines?category=${category}&lang=en&country=us&max=10&apikey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch headlines', details: error.message });
  }
}
