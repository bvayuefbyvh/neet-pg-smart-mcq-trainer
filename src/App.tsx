import { useState } from "react";

import MCQCard from "./components/MCQCard";
import Dashboard from "./components/Dashboard";

import {
  generateAIQuestions
} from "./services/generateAIQuestions";

export default function App() {

  const [topic, setTopic] =
    useState("");

  const [question, setQuestion] =
    useState<any>(null);

  const [score, setScore] =
    useState(0);

  const [attempted, setAttempted] =
    useState(0);

  const [loading, setLoading] =
    useState(false);

  async function loadQuestion() {

    try {

      setLoading(true);

      const newQuestion =
        await generateAIQuestions(
          topic
        );

      setQuestion(newQuestion);

    } catch (error) {

      console.error(error);

      alert(
        "Question generation failed"
      );

    } finally {

      setLoading(false);

    }
  }

  const accuracy =
    attempted > 0
      ? Math.round(
          (score / attempted) *
            100
        )
      : 0;

  const handleCorrect = () => {

    setScore(
      (prev) => prev + 1
    );

    setAttempted(
      (prev) => prev + 1
    );
  };

  const handleIncorrect = () => {

    setAttempted(
      (prev) => prev + 1
    );
  };

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "20px auto",
        padding: "20px",
        color: "white",
      }}
    >
      <h1
        style={{
          textAlign: "center",
        }}
      >
        🩺 AI NEET-PG Trainer
      </h1>

      <h3
        style={{
          textAlign: "center",
          color: "#9ca3af",
        }}
      >
        Unlimited AI Questions
      </h3>

      <input
        value={topic}
        onChange={(e) =>
          setTopic(
            e.target.value
          )
        }
        placeholder="Enter Topic"
        style={{
          width: "100%",
          padding: "12px",
        }}
      />

      <button
        onClick={loadQuestion}
        disabled={loading}
        style={{
          marginTop: "20px",
          padding: "12px 24px",
        }}
      >
        {loading
          ? "Generating..."
          : "Generate Question"}
      </button>

      <Dashboard
        score={score}
        attempted={attempted}
        accuracy={accuracy}
      />

      {question && (
        <>
          <MCQCard
            question={question}
            onCorrect={
              handleCorrect
            }
            onIncorrect={
              handleIncorrect
            }
          />

          <button
            onClick={
              loadQuestion
            }
            style={{
              marginTop: "20px",
              padding:
                "12px 24px",
            }}
          >
            Next Question
          </button>
        </>
      )}
    </div>
  );
}