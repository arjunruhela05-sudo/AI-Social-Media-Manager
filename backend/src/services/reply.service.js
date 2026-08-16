const ai = require("../config/gemini");

const generateReply = async ({
  brandName,
  platform,
  tone,
  customerComment,
}) => {
  const prompt = `
You are a professional social media manager.

Brand Name: ${brandName}
Platform: ${platform}
Brand Tone: ${tone}

Customer Comment:
"${customerComment}"

Reply professionally in the brand's tone.

Return ONLY valid JSON.

{
  "reply":""
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
  generateReply,
};