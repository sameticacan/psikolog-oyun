import type { Metrics } from "@/types/simulator";

interface GameHudProps {
  current: number;
  total: number;
  metrics: Metrics;
  label?: string;
}

export function GameHud({ current, total, metrics, label = "Seans 1" }: GameHudProps) {
  const relationship = Math.round((metrics.trust + metrics.empathy) / 2);
  return (
    <header className="game-hud">
      <div className="flex items-center gap-3">
        <span className="hud-session">{label}</span>
        <span className="hud-case">Vaka {current}/{total}</span>
      </div>
      <div className="hud-relationship">
        <div className="flex items-center justify-between gap-4"><span>Genel ilişki</span><strong>{relationship}</strong></div>
        <div className="hud-bar"><span style={{ width: `${relationship}%` }} /></div>
      </div>
      <div className="hidden items-center gap-2 sm:flex" aria-label="Oyun bilgi alanları">
        <span className="hud-icon" title="Seans notları">≡ <i>Notlar</i></span>
        <span className="hud-icon" title="Etik çerçeve">◇ <i>Etik not</i></span>
      </div>
    </header>
  );
}
