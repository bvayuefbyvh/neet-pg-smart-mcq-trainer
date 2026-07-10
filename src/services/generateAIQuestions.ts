export async function generateAIQuestions(
  topic: string,
  count = 10
) {
  const response =
    await fetch(
      "http://localhost:3000/api/generate",
      {
        method: "POST",

        headers: {
          "Content-Type":
            "application/json",
        },

        body: JSON.stringify({
          topic,
          count,
        }),
      }
    );

  if (!response.ok) {
    throw new Error(
      "AI Generation Failed"
    );
  }

  return response.json();
}