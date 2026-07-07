import type { PlayerPosition } from "@/types/player";

export function InteractionTargetMarker({ position, active = false, label }: { position: PlayerPosition; active?: boolean; label?: string }) {
  return (
    <span className={`interaction-target-marker ${active ? "active" : "preview"}`} style={{ left: `${position.x}%`, top: `${position.y}%` }} aria-hidden="true">
      <i />{label && <small>{label}</small>}
    </span>
  );
}
