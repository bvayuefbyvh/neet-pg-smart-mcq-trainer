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
Generate NEET-PG MCQs.

Return ONLY valid JSON.
`
            },
            {
              role: "user",
              content: `Generate ${count} MCQs on ${topic}`
            }
          ],
          temperature: 0.7
        })
      }
    );

    const data = await response.json();

    console.log(
      "Groq Response:",
      JSON.stringify(data, null, 2)
    );

    if (!data.choices) {
      return res.status(500).json({
        error: data
      });
    }

    res.status(200).json(data);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: error.message
    });

  }
}