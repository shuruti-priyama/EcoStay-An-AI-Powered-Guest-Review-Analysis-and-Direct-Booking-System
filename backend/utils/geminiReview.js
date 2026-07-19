const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

/**
 *
 * @param {string} reviewText 
 * @returns {Promise<Object>} 
 */
const analyzeReview = async (reviewText) => {
  const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

  const prompt = `You are a hospitality expert AI assistant for EcoStay, an eco-friendly homestay platform.

Analyze the following guest review and return a JSON object with exactly these fields:
{
  "sentiment": "Positive" | "Neutral" | "Negative",
  "summary": "One concise sentence summarizing the overall guest experience",
  "themes": ["array", "of", "main", "topics", "mentioned"],
  "positives": ["list", "of", "specific", "positive", "points"],
  "negatives": ["list", "of", "specific", "negative", "points"],
  "suggestedResponse": "A warm, professional response the host can send to this guest"
}

Rules:
- Return ONLY valid JSON, no markdown, no explanation, no code fences.
- If there are no positives or negatives, return an empty array [].
- Keep themes to 2-5 words each, max 5 themes.
- Keep positives and negatives concise bullet-point style.
- The suggestedResponse should be 2-3 sentences, warm and personal.

Guest Review:
"${reviewText}"`;

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();

 
  const clean = text.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();

  const parsed = JSON.parse(clean);


  const required = ['sentiment', 'summary', 'themes', 'positives', 'negatives', 'suggestedResponse'];
  for (const field of required) {
    if (!(field in parsed)) {
      throw new Error(`Gemini response missing field: ${field}`);
    }
  }

  return parsed;
};

module.exports = { analyzeReview, analyzeOtaReviewsBulk };

/**
 *
 * @param {string} rawText 
 * @returns {Promise<Array<Object>>} 
 */
async function analyzeOtaReviewsBulk(rawText) {
  const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });

  const prompt = `You are a hospitality expert AI assistant for EcoStay, an eco-friendly homestay platform. A homestay owner has pasted raw text copied from an external booking site (Airbnb, Booking.com, MakeMyTrip, or similar). This text may contain ONE OR MORE separate guest reviews, possibly mixed with reviewer names, dates, and star ratings.

Your job:
1. Identify and separate each distinct individual review in the text.
2. For each review, extract the reviewer's name if one is present (otherwise use "Guest"), and the star rating if one is present (otherwise null).
3. Analyze each review independently.

Return ONLY a valid JSON array (no markdown, no code fences, no explanation), where each element has exactly these fields:
{
  "reviewerName": "extracted name or \\"Guest\\"",
  "rating": number or null,
  "originalText": "the individual review text you extracted, verbatim",
  "sentiment": "Positive" | "Neutral" | "Negative",
  "summary": "One concise sentence summarizing this guest's experience",
  "themes": ["2-5 word topics mentioned, e.g. cleanliness, food quality, location, staff service, value for money - max 5"],
  "positives": ["specific positive points, concise bullet style"],
  "negatives": ["specific negative points, concise bullet style"],
  "suggestedResponse": "A warm, professional 2-3 sentence response the host can post publicly on the OTA site"
}

Rules:
- If the pasted text contains only one review, return an array with exactly one element.
- If you cannot find any real review content, return an empty array [].
- If there are no positives or negatives, use an empty array [] for that field.
- Never fabricate reviews that are not present in the source text.

Pasted text:
"""
${rawText}
"""`;

  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();

  const clean = text.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();

  const parsed = JSON.parse(clean);

  if (!Array.isArray(parsed)) {
    throw new Error('Gemini did not return a JSON array as expected');
  }

  const required = ['reviewerName', 'rating', 'originalText', 'sentiment', 'summary', 'themes', 'positives', 'negatives', 'suggestedResponse'];
  parsed.forEach((item, i) => {
    for (const field of required) {
      if (!(field in item)) {
        throw new Error(`Gemini response item ${i} missing field: ${field}`);
      }
    }
  });

  return parsed;
}