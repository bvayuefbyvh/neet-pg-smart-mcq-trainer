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
          temperature: 0.3,

          messages: [
            {
              role: "system",
              content: `
Return ONLY valid JSON.

Format:

{
  "id":"1",
  "subject":"Medicine",
  "topic":"${topic}",
  "difficulty":"Hard",

  "question":"Question text",

  "options":[
    "A",
    "B",
    "C",
    "D"
  ],

  "correctAnswer":0,

  "explanation":"Detailed educational explanation",

  "optionExplanations":[
    "Correct",
    "Wrong",
    "Wrong",
    "Wrong"
  ],

  "pearls":[
    "One important NEET-PG pearl"
  ],

  "tips":[
    "One NEET-PG exam tip"
  ]
}

JSON only.
No markdown.
No code fences.
`
            },

            {
              role: "user",
              content:
                `Generate ONE difficult NEET-PG level question on ${topic}`
            }
          ]
        })
      }
    );

    const data = await response.json();

    const content =
      data?.choices?.[0]?.message?.content?.trim();

    if (!content) {
      return res.status(500).json({
        error: "No content returned"
      });
    }

    const question =
      JSON.parse(content);

    return res.status(200).json(
      question
    );

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error:
        error.message ||
        "Generation failed"
    });

  }
}