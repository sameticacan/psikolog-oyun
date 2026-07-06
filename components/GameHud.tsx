import type { Metrics } from "@/types/simulator";

interface GameHudProps {
  current: number;
  total: number;
  metrics: Metrics;
}

export function GameHud({ current, total, metrics }: GameHudProps) {
  const relationship = Math.round((metrics.trust + metrics.empathy) / 2);
  return (
    <header className="game-hud">
      <div className="vn-top-left">
        <span className="hud-case">Vaka {current} / {total}</span>
        <div className="hud-relationship">
          <div className="flex items-center justify-between gap-3"><span>İlişki</span><strong>{relationship}</strong></div>
          <div className="hud-bar"><span style={{ width: `${relationship}%` }} /></div>
        </div>
      </div>
      <div className="vn-top-actions">
        <button type="button" className="hud-action-button" aria-label="Menüyü aç" title="Menü"><span>☰</span><i>Menü</i></button>
        <button type="button" className="hud-action-button" aria-label="Seans notlarını aç" title="Notlar"><span>≡</span><i>Notlar</i></button>
        <button type="button" className="hud-action-button" aria-label="Yardım ve etik notu aç" title="Yardım ve etik not"><span>?</span><i>Yardım</i></button>
      </div>
    </header>
  );
}
