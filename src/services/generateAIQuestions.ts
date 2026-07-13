export async function generateAIQuestions(
  topic: string,
  difficulty: string
) {
  const response = await fetch(
    "/api/generate",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        topic,
        difficulty,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Question generation failed"
    );
  }

  return response.json();
}