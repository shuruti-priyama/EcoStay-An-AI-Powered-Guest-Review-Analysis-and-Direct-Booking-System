# AI Prompts Log

## Project
EcoStay - AI Powered Guest Review Analysis

---

## Prompt Variation 1

### Prompt
Analyze the following guest review. Classify the sentiment as Positive, Neutral, or Negative. Mention the main theme (Food, Host, Cleanliness, Location, Value, Experience).

### Example Input
"The rooms were very clean and the host was extremely helpful. Food was delicious."

### Example Output
Sentiment: Positive

Theme:
- Cleanliness
- Host
- Food

Summary:
The guest appreciated the cleanliness, hospitality, and food quality.

---

## Prompt Variation 2

### Prompt
You are an AI hotel review assistant. Analyze the guest review and return:

- Sentiment
- Main Theme
- Short Summary
- Suggested Reply from Owner

### Example Input
"The location was beautiful but the room was not clean."

### Example Output

Sentiment: Neutral

Theme:
- Location
- Cleanliness

Summary:
Guest liked the location but was unhappy with room cleanliness.

Suggested Reply:
Thank you for your feedback. We appreciate your comments and will improve our housekeeping standards.

---

## Prompt Variation 3

### Prompt
Analyze the hotel review and return the response in JSON format with:
{
"sentiment":"",
"theme":"",
"summary":"",
"suggestedReply":""
}

### Example Input
"The stay was amazing. Friendly staff and excellent food."

### Example Output

{
"sentiment":"Positive",
"theme":["Food","Host"],
"summary":"Guest had an enjoyable stay with excellent food and friendly staff.",
"suggestedReply":"Thank you for your wonderful feedback. We hope to welcome you again!"
}

---

# Best Prompt

Prompt Variation 2 worked best because it generated structured, human-readable responses while also creating a professional reply for the hotel owner. It consistently identified sentiment and themes accurately, making it easy to display the results in the frontend. Compared to the other prompts, it required less post-processing and produced outputs that were directly useful for the application.

---

# System Prompt

You are an AI assistant for EcoStay. Analyze guest reviews, identify sentiment, classify themes, summarize the review, and generate a polite owner response. Keep the response concise, accurate, and professional.