export default function HeartDiagram() {
  return (
    <svg
      width="500"
      height="250"
      viewBox="0 0 500 250"
    >
      <ellipse
        cx="160"
        cy="120"
        rx="70"
        ry="90"
        fill="#dc2626"
      />

      <ellipse
        cx="330"
        cy="120"
        rx="70"
        ry="90"
        fill="#f9a8d4"
      />

      <text
        x="125"
        y="125"
        fill="white"
        fontSize="20"
      >
        Right Atrium
      </text>

      <text
        x="290"
        y="125"
        fill="black"
        fontSize="20"
      >
        Left Atrium
      </text>

      <line
        x1="230"
        y1="120"
        x2="260"
        y2="120"
        stroke="white"
        strokeWidth="4"
      />
    </svg>
  );
}