import { useState } from "react";

import MCQCard from "./components/MCQCard";
import Dashboard from "./components/Dashboard";
import ProgressBar from "./components/ProgressBar";


import { generateAIQuestions } from "./services/generateAIQuestions";

export default function App() {
  const [topic, setTopic] = useState("");

  const [questions, setQuestions] =
    useState<any[]>([]);

  const [currentIndex, setCurrentIndex] =
    useState(0);

  const [score, setScore] =
    useState(0);

  const [answered, setAnswered] =
    useState(0);

  const [loading, setLoading] =
    useState(false);

  async function generate() {
    try {
      setLoading(true);

      const result =
        await generateAIQuestions(
          topic,
          5
        );

      setQuestions(result);

      setCurrentIndex(0);
      setScore(0);
      setAnswered(0);
    } catch (error) {
      console.error(error);

      alert(
        "Question generation failed"
      );
    } finally {
      setLoading(false);
    }
  }

  function restartTest() {
    setQuestions([]);
    setCurrentIndex(0);
    setScore(0);
    setAnswered(0);
    setTopic("");
  }

  const currentQuestion =
    questions[currentIndex];

  const accuracy =
    answered > 0
      ? Math.round(
          (score / answered) * 100
        )
      : 0;

  const handleCorrect = () => {
    setScore((prev) => prev + 1);
  };

  const nextQuestion = () => {
    setAnswered(
      (prev) => prev + 1
    );

    setCurrentIndex((prev) =>
      Math.min(
        prev + 1,
        questions.length - 1
      )
    );
  };

  const isFinished =
    questions.length > 0 &&
    currentIndex ===
      questions.length - 1;

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
        AI Powered Medical Question Generator
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
          marginTop: "20px",
        }}
      />

      <button
        onClick={generate}
        disabled={loading}
        style={{
          marginTop: "15px",
          padding: "12px 24px",
          marginRight: "10px",
        }}
      >
        {loading
          ? "Generating..."
          : "Generate Questions"}
      </button>

      <button
        onClick={restartTest}
        style={{
          marginTop: "15px",
          padding: "12px 24px",
          background: "#dc2626",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Restart Test
      </button>

      <Dashboard
        score={score}
        attempted={answered}
        accuracy={accuracy}
      />

      {questions.length > 0 && (
        <>
          <ProgressBar
            current={
              currentIndex + 1
            }
            total={
              questions.length
            }
          />

          <h2
            style={{
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            Question{" "}
            {currentIndex + 1}
            / {questions.length}
          </h2>

          <MCQCard
            question={
              currentQuestion
            }
            onCorrect={
              handleCorrect
            }
          />

          {!isFinished && (
            <button
              onClick={
                nextQuestion
              }
              style={{
                marginTop: "20px",
                padding: "12px 24px",
              }}
            >
              Next Question
            </button>
          )}

          {isFinished && (
            <div
              style={{
                marginTop: "30px",
                textAlign: "center",
              }}
            >
              <h2>
                🎉 Test Completed
              </h2>

              <h3>
                Score: {score}
              </h3>

              <h3>
                Accuracy: {accuracy}%
              </h3>

              <button
                onClick={
                  restartTest
                }
                style={{
                  marginTop: "15px",
                  padding:
                    "12px 24px",
                  background:
                    "#16a34a",
                  color:
                    "white",
                  border:
                    "none",
                }}
              >
                Start New Test
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}