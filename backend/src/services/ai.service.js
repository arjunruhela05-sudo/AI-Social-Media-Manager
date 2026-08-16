const ai = require("../config/gemini");
const ApiError = require("../utils/ApiError");

const generateContent = async (data) => {
  try {
    const {
      brandName,
      industry,
      tone,
      platform,
      topic,
    } = data;

    const prompt = `
You are an expert social media manager.

Brand Name: ${brandName}
Industry: ${industry}
Platform: ${platform}
Tone: ${Array.isArray(tone) ? tone.join(", ") : tone}
Topic: ${topic}

Return ONLY valid JSON.

Requirements:

1. Generate THREE different captions:
   - Professional
   - Friendly
   - Humorous

2. Generate exactly 10 relevant hashtags.

3. Generate one strong Call-To-Action.

4. Suggest the best posting day and time.

5. Predict expected engagement.

Return ONLY this JSON:

{
  "captions":[
    {
      "style":"Professional",
      "text":""
    },
    {
      "style":"Friendly",
      "text":""
    },
    {
      "style":"Humorous",
      "text":""
    }
  ],
  "hashtags":[
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
  ],
  "cta":"",
  "emojiStyle":"",
  "bestPostingTime":{
    "day":"",
    "time":"",
    "reason":""
  },
  "engagementPrediction":{
    "level":"",
    "score":0,
    "reason":""
  }
}
`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
    });

    console.log("========== GEMINI RESPONSE ==========");
    console.dir(response, { depth: null });

    const text = response.text;

    // Remove markdown if Gemini returns ```json
    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    try {
      return JSON.parse(cleaned);
    } catch (parseError) {
      console.error("\n========== AI JSON PARSE ERROR ==========");
      console.error("Raw AI Response:");
      console.error(cleaned);
      console.error("=========================================\n");

      throw new ApiError(
        500,
        "AI returned an invalid JSON response. Please try again."
      );
    }

  } catch (error) {

    console.log("\n========== GEMINI ERROR ==========");
    console.dir(error, { depth: null });
    console.log("==================================\n");

    throw error;
  }
};

module.exports = {
  generateContent,
};