interface Props {
  current: number;
  total: number;
}

export default function ProgressBar({
  current,
  total,
}: Props) {
  const percent =
    total > 0
      ? (current / total) * 100
      : 0;

  return (
    <div
      style={{
        marginTop: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "16px",
          background: "#333",
          borderRadius: "8px",
        }}
      >
        <div
          style={{
            width: `${percent}%`,
            height: "100%",
            background: "#22c55e",
            borderRadius: "8px",
          }}
        />
      </div>

      <p
        style={{
          marginTop: "8px",
        }}
      >
        Progress: {current}/{total}
      </p>
    </div>
  );
}