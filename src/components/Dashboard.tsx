interface Props {
  score: number;
  attempted: number;
  accuracy: number;
}

export default function Dashboard({
  score,
  attempted,
  accuracy,
}: Props) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(220px,1fr))",
        gap: "20px",
        marginTop: "20px",
      }}
    >
      <StatCard
        title="Score"
        value={score}
      />

      <StatCard
        title="Attempted"
        value={attempted}
      />

      <StatCard
        title="Accuracy"
        value={`${accuracy}%`}
      />
    </div>
  );
}

function StatCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div
      style={{
        border: "1px solid #444",
        borderRadius: "12px",
        padding: "24px",
        textAlign: "center",
        background: "#111827",
      }}
    >
      <h1>{value}</h1>
      <p>{title}</p>
    </div>
  );
}