import { GoogleGenerativeAI } from '@google/generative-ai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { headlines } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ error: 'Server configuration error.' });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const headlineText = headlines.map((h, i) => `${i + 1}. ${h.title}`).join('\n');

    const prompt = `
You are a professional morning news anchor writing a spoken-style briefing.
Write a natural, conversational news summary based ONLY on these headlines.

Rules:
- Start with "Good morning!" and today's date.
- Cover each topic section with a natural transition phrase.
- Keep total length to 120–150 words. No more.
- Use a warm, confident, professional tone.
- Do not editorialize or add opinions.
- End with one sentence that looks ahead to the day.

Headlines:
${headlineText}
`;

    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        maxOutputTokens: 300,
      }
    });

    const text = result.response.text();
    return res.status(200).json({ brief: text });
  } catch (error) {
    console.error("Function error:", error);
    return res.status(500).json({ error: 'Internal Server Error', details: error.message });
  }
}
