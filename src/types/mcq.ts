export interface MCQ {
  id: string;

  subject: string;

  topic: string;

  difficulty:
    | "Easy"
    | "Medium"
    | "Hard";

  question: string;

  options: string[];

  correctAnswer: number;

  explanation: string;

  optionExplanations: string[];

  pearls: string[];

  tips: string[];

  diagramType?: string;
}