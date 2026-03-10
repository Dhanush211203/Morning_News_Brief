import { getCached } from '../utils/cache';

const CATEGORIES = [
  { id: 'general', label: 'General' },
  { id: 'technology', label: 'Tech' },
  { id: 'business', label: 'Business' },
  { id: 'sports', label: 'Sports' },
  { id: 'science', label: 'Science' },
  { id: 'health', label: 'Health' },
];

export const useBriefGeneration = () => {
    
  const generateBrief = async (selectedCategories) => {
    let allHeadlines = [];

    // Gather cached headlines for selected categories
    for (const category of selectedCategories) {
      const cached = getCached(category);
      if (cached && cached.length > 0) {
          // Take top 5 per category to avoid token limits
         allHeadlines = [...allHeadlines, ...cached.slice(0, 5)];
      }
    }

    if (allHeadlines.length === 0) {
        throw new Error("No headlines found for the selected categories. Please view a tab first to load articles.");
    }

    try {
        const response = await fetch('/api/brief', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ headlines: allHeadlines })
        });
        
        if (!response.ok) {
            const err = await response.text();
             throw new Error(err || "Failed to generate brief");
        }
        
        const data = await response.json();
        return data.brief;

    } catch (err) {
        console.error("Error calling brief endpoint:", err);
        throw err;
    }
  };

  return { generateBrief };
};
