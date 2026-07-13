import { useState, useEffect } from "react";

interface Props {
  question: any;
  onCorrect: () => void;
  onIncorrect: () => void;
}

export default function MCQCard({
  question,
  onCorrect,
  onIncorrect,
}: Props) {
  const [selected, setSelected] =
    useState<number | null>(null);

  const [submitted, setSubmitted] =
    useState(false);

  useEffect(() => {
    setSelected(null);
    setSubmitted(false);
  }, [question]);

  const handleSubmit = () => {
    if (selected === null) return;

    setSubmitted(true);

    if (
      selected === question.correctAnswer
    ) {
      onCorrect();
    } else {
      onIncorrect();
    }
  };

  const isCorrect =
    selected === question.correctAnswer;

  return (
    <div
      style={{
        marginTop: "20px",
        padding: "20px",
        border: "1px solid #333",
        borderRadius: "12px",
      }}
    >
      <h2>{question.question}</h2>

      {question.options.map(
        (
          option: string,
          index: number
        ) => (
          <button
            key={index}
            onClick={() =>
              !submitted &&
              setSelected(index)
            }
            style={{
              display: "block",
              width: "100%",
              marginTop: "10px",
              padding: "12px",

              background:
                submitted &&
                index ===
                  question.correctAnswer
                  ? "green"
                  : selected === index
                  ? "#2563eb"
                  : "#555",

              color: "white",

              cursor: submitted
                ? "default"
                : "pointer",
            }}
          >
            {option}
          </button>
        )
      )}

      <button
        onClick={handleSubmit}
        disabled={submitted}
        style={{
          marginTop: "15px",
          padding: "12px 20px",
        }}
      >
        Submit
      </button>

      {submitted && (
        <>
          <h2
            style={{
              color: isCorrect
                ? "#22c55e"
                : "#ef4444",
            }}
          >
            {isCorrect
              ? "✅ Correct"
              : "❌ Incorrect"}
          </h2>

          <h3>Explanation</h3>

          <p>
            {question.explanation}
          </p>

          {question.pearls?.length >
            0 && (
            <>
              <h3
                style={{
                  color:
                    "#22c55e",
                }}
              >
                High Yield Pearls
              </h3>

              {question.pearls.map(
                (
                  pearl: string,
                  index: number
                ) => (
                  <div
                    key={index}
                    style={{
                      background:
                        "#1e293b",
                      padding:
                        "12px",
                      borderRadius:
                        "8px",
                      marginBottom:
                        "8px",
                    }}
                  >
                    ✅ {pearl}
                  </div>
                )
              )}
            </>
          )}

          {question.tips?.length >
            0 && (
            <>
              <h3
                style={{
                  color:
                    "#60a5fa",
                }}
              >
                NEET-PG Tips
              </h3>

              {question.tips.map(
                (
                  tip: string,
                  index: number
                ) => (
                  <div
                    key={index}
                    style={{
                      background:
                        "#1e40af",
                      padding:
                        "12px",
                      borderRadius:
                        "8px",
                      marginBottom:
                        "8px",
                    }}
                  >
                    💡 {tip}
                  </div>
                )
              )}
            </>
          )}
        </>
      )}
    </div>
  );
}