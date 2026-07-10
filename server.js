import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.post("/api/generate", async (req, res) => {
  try {
    const { topic, count = 10 } = req.body;

    const response = await fetch(
      "http://localhost:11434/api/generate",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          model: "qwen3",

          prompt: `
Generate ${count} NEET-PG level MCQs on ${topic}.

Return ONLY valid JSON.

Format:

[
 {
  "id":"1",
  "subject":"Medicine",
  "topic":"${topic}",
  "difficulty":"Hard",
  "question":"Question text",
  "options":[
   "Option A",
   "Option B",
   "Option C",
   "Option D"
  ],
  "correctAnswer":0,
  "explanation":"Detailed explanation",
  "optionExplanations":[
   "Correct",
   "Wrong",
   "Wrong",
   "Wrong"
  ],
  "pearls":[
   "High Yield Pearl"
  ],
  "tips":[
   "NEET-PG Tip"
  ],
  "diagramType":"heart"
 }
]

Do not include markdown.
Do not include thinking.
Do not include notes.
Return JSON only.
`,

          stream: false,
        }),
      }
    );

    const data =
      await response.json();

    const text =
      data.response.trim();

    const start =
      text.indexOf("[");

    const end =
      text.lastIndexOf("]");

    const json =
      text.substring(
        start,
        end + 1
      );

    const questions =
      JSON.parse(json);

    res.json(questions);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      message:
        "Failed to generate questions",
    });

  }
});

app.listen(3000, () => {
  console.log(
    "✅ Ollama AI Server running on http://localhost:3000"
  );
});