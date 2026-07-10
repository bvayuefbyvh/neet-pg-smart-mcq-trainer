import HeartDiagram
from "../diagrams/HeartDiagram";

interface Props {
  type?: string;
}

export default function DiagramRenderer({
  type,
}: Props) {

  if (type === "heart") {
    return <HeartDiagram />;
  }

  return null;
}