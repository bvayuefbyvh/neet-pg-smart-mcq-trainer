export async function generateAIQuestions(
  topic: string,
  count = 10
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
        count,
      }),
    }
  );

  return response.json();
}