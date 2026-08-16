const ai = require("../config/gemini");

const generateInsights = async (dashboardData) => {

    const prompt = `
You are a Senior Social Media Marketing Consultant.

Analyze this dashboard data.

${JSON.stringify(dashboardData, null, 2)}

Generate JSON only.

{
  "summary":"",
  "strengths":[
  ],
  "weaknesses":[
  ],
  "recommendations":[
  ],
  "bestPlatform":"",
  "postingSuggestion":""
}
`;

    const response = await ai.models.generateContent({
        model: process.env.GEMINI_MODEL,
        contents: prompt,
    });

    const cleaned = response.text
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

    return JSON.parse(cleaned);
};

module.exports = {
    generateInsights,
};