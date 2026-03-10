const { GoogleGenerativeAI } = require('@google/generative-ai');

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { headlines } = JSON.parse(event.body);
    
    if (!process.env.GEMINI_API_KEY) {
      console.error("GEMINI_API_KEY is not set.");
      return { statusCode: 500, body: 'Server configuration error.' };
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

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ brief: text }),
    };
  } catch (error) {
    console.error("Function error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error', details: error.message }),
    };
  }
};
