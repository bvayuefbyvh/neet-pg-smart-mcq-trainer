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

[
 {
  "id":"1",
  "subject":"Medicine",
  "topic":"${topic}",
  "difficulty":"Hard",
  "question":"Question",
  "options":["A","B","C","D"],
  "correctAnswer":0,
  "explanation":"Explanation",
  "optionExplanations":[
   "Correct",
   "Wrong",
   "Wrong",
   "Wrong"
  ],
  "pearls":["Pearl"],
  "tips":["Tip"]
 }
]

Do not return markdown.
Do not return code fences.
Only JSON.
`
            },
            {
              role: "user",
              content: `Generate 5 difficult NEET-PG questions on ${topic}`
            }
          ],
          temperature: 0.7
        })
      }
    );

    const data = await response.json();

    if (!data.choices?.[0]?.message?.content) {
      console.log(data);

      return res.status(500).json({
        error: "Invalid Groq response",
        data
      });
    }

    const content =
      data.choices[0].message.content.trim();

    const questions =
      JSON.parse(content);

    return res.status(200).json(
      questions
    );

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      error: error.message
    });

  }
}