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
Return ONLY valid JSON.

Format:

{
  "id":"1",
  "subject":"Medicine",
  "topic":"Cardiology",
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

Return JSON only.
No markdown.
No code blocks.
`
            },
            {
              role: "user",
              content: `Generate ONE difficult NEET-PG question on ${topic}`
            }
          ],

          temperature: 0.3
        })
      }
    );

    const data = await response.json();

    const content =
      data?.choices?.[0]?.message?.content?.trim();

    const question =
      JSON.parse(content);

    res.status(200).json(question);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error:
        error.message ||
        "Generation failed"
    });

  }
}
