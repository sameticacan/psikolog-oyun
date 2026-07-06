const choiceSymbols = ["◌", "♡", "◇"];

interface ChoiceButtonProps {
  index: number;
  text: string;
  onClick: () => void;
}

export function ChoiceButton({ index, text, onClick }: ChoiceButtonProps) {
  return (
    <button className="vn-choice vn-choice-card group" onClick={onClick}>
      <span className="vn-choice-icon">{choiceSymbols[index] ?? "◌"}</span>
      <span className="flex-1">{text}</span>
      <span className="vn-choice-arrow" aria-hidden="true">›</span>
    </button>
  );
}
