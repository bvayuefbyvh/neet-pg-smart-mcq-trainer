import { mockGenerate } from "./mockGenerator";

export async function topicGenerator(
  topic: string,
  count = 10
) {
  console.log("Generating for:", topic);

  return await mockGenerate(topic, count);
}