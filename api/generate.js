export default async function handler(req, res) {
  try {
    const { topic } = req.body;

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",

          messages: [
            {
              role: "system",
              content: `
Generate ONE difficult NEET-PG MCQ.

Return ONLY valid JSON.

Format:

[
 {
  "id":"1",
  "subject":"Medicine",
  "topic":"${topic}",
  "difficulty":"Hard",
  "question":"Question text",
  "options":["A","B","C","D"],
  "correctAnswer":0,
  "explanation":"Explanation",
  "optionExplanations":[
   "Correct",
   "Wrong",
   "Wrong",
   "Wrong"
  ],
  "pearls":["High Yield Pearl"],
  "tips":["NEET-PG Tip"]
 }
]

No markdown.
No code fences.
No extra text.
`
            },
            {
              role: "user",
              content: `Generate 1 difficult NEET-PG question on ${topic}`
            }
          ],

          temperature: 0.3
        })
      }
    );

    const data = await response.json();

    if (!data?.choices?.[0]?.message?.content) {
      console.log(data);

      return res.status(500).json({
        error: "Invalid Groq response"
      });
    }

    const content =
      data.choices[0].message.content
        .trim();

    try {
      const questions =
        JSON.parse(content);

      return res.status(200).json(
        questions
      );

    } catch (err) {

      console.error(
        "Bad JSON from Groq:",
        content
      );

      return res.status(200).json([
        {
          id: "fallback",
          subject: "Medicine",
          topic,
          difficulty: "Medium",
          question:
            "AI could not generate a valid question. Please click Generate Questions again.",
          options: [
            "Retry",
            "Retry",
            "Retry",
            "Retry"
          ],
          correctAnswer: 0,
          explanation:
            "Groq returned invalid JSON.",
          optionExplanations: [
            "",
            "",
            "",
            ""
          ],
          pearls: [
            "Retry generation"
          ],
          tips: [
            "AI occasionally produces malformed JSON."
          ]
        }
      ]);
    }

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error:
        error.message ||
        "Generation failed"
    });

  }
}