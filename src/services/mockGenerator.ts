import type { MCQ } from "../types/mcq";

const QUESTIONS = [
  {
    question:
      "A 58-year-old diabetic male presents with crushing retrosternal chest pain radiating to the left arm. ECG shows ST elevation in V1-V4. What artery is most likely occluded?",

    options: [
      "Left Anterior Descending",
      "Right Coronary Artery",
      "Circumflex Artery",
      "Posterior Descending Artery",
    ],

    correctAnswer: 0,

    explanation:
      "LAD occlusion causes anterior wall STEMI. ST elevation in leads V1-V4 strongly suggests an anterior wall myocardial infarction.",

    pearls: [
      "LAD is the most common artery involved in anterior wall MI.",
    ],

    tips: [
      "Always correlate ECG leads with coronary artery territories.",
    ],

    diagramType: "heart",
  },

  {
    question:
      "A patient develops generalized edema, massive proteinuria and hypoalbuminemia. What is the most likely diagnosis?",

    options: [
      "Nephrotic Syndrome",
      "Acute Tubular Necrosis",
      "Pyelonephritis",
      "Renal Stone",
    ],

    correctAnswer: 0,

    explanation:
      "Nephrotic syndrome is characterized by heavy protein loss in urine, leading to edema and hypoalbuminemia.",

    pearls: [
      "Nephrotic syndrome causes hypercoagulability due to loss of antithrombin III.",
    ],

    tips: [
      "Remember the classic tetrad: proteinuria, hypoalbuminemia, edema and hyperlipidemia.",
    ],

    diagramType: "heart",
  },

  {
    question:
      "A patient presents with hyperpigmentation, fatigue and hypotension. Which hormone deficiency is responsible?",

    options: [
      "Cortisol",
      "TSH",
      "Prolactin",
      "ADH",
    ],

    correctAnswer: 0,

    explanation:
      "Primary adrenal insufficiency (Addison disease) causes cortisol deficiency and elevated ACTH, resulting in hyperpigmentation.",

    pearls: [
      "Hyperpigmentation is a key clue for primary adrenal insufficiency.",
    ],

    tips: [
      "Differentiate primary from secondary adrenal insufficiency using ACTH levels.",
    ],

    diagramType: "heart",
  },

  {
    question:
      "A child presents with fever, sore throat and a strawberry tongue. What is the most likely diagnosis?",

    options: [
      "Scarlet Fever",
      "Measles",
      "Rubella",
      "Mumps",
    ],

    correctAnswer: 0,

    explanation:
      "Scarlet fever is caused by Streptococcus pyogenes and classically presents with strawberry tongue and rash.",

    pearls: [
      "Scarlet fever is associated with erythrogenic toxin production.",
    ],

    tips: [
      "Strawberry tongue is a favorite NEET-PG question topic.",
    ],

    diagramType: "heart",
  },

  {
    question:
      "A patient develops ptosis, diplopia and fatigable muscle weakness. What is the most likely diagnosis?",

    options: [
      "Myasthenia Gravis",
      "Guillain-Barre Syndrome",
      "Multiple Sclerosis",
      "Parkinson Disease",
    ],

    correctAnswer: 0,

    explanation:
      "Myasthenia gravis is caused by antibodies against acetylcholine receptors at the neuromuscular junction.",

    pearls: [
      "Weakness worsens with activity and improves with rest.",
    ],

    tips: [
      "Think myasthenia gravis whenever ptosis and diplopia occur together.",
    ],

    diagramType: "heart",
  },
];

export async function mockGenerate(
  topic: string,
  count = 10
): Promise<MCQ[]> {
  return Array.from(
    { length: count },
    (_, i) => {
      const q =
        QUESTIONS[
          i % QUESTIONS.length
        ];

      return {
        id: `${i + 1}`,

        subject: "Medicine",

        topic,

        difficulty: "Medium" as const,

        question: q.question,

        options: q.options,

        correctAnswer:
          q.correctAnswer,

        explanation:
          q.explanation,

        optionExplanations: [
          "Correct answer",
          "Incorrect answer",
          "Incorrect answer",
          "Incorrect answer",
        ],

        pearls: q.pearls,

        tips: q.tips,

        diagramType:
          q.diagramType,
      };
    }
  );
}