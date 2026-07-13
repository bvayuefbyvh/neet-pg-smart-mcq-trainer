export default async function handler(req, res) {
  try {
    const { topic, count = 10 } = req.body;

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
Generate difficult NEET-PG level MCQs.

Return ONLY valid JSON.

Format:

[
 {
  "id":"1",
  "subject":"Medicine",
  "topic":"Cardiology",
  "difficulty":"Hard",
  "question":"Question text",
  "options":["A","B","C","D"],
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
  ]
 }
]

Return JSON only.
No markdown.
No code blocks.
`
            },
            {
              role: "user",
              content: `Generate ${count} NEET-PG questions on ${topic}`
            }
          ],

          temperature: 0.7
        })
      }
    );

    const data = await response.json();

    const content =
      data.choices[0].message.content;

    const questions =
      JSON.parse(content);

    res.status(200).json(questions);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to generate questions"
    });

  }
}