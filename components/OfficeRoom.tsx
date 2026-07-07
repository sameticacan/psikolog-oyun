"use client";

import { useState } from "react";
import { clampPlayerPosition, positionFromPoint } from "@/lib/playerMovement";
import type { DailyClient, OfficeState } from "@/types/office";
import type { OfficeInteractionTarget, PlayerFacing, PlayerPosition } from "@/types/player";
import { InteractionTargetMarker } from "./InteractionTargetMarker";
import { OfficeHotspot } from "./OfficeHotspot";
import { PlayerAvatar } from "./PlayerAvatar";
import { WaitingClientAvatar } from "./WaitingClientAvatar";

interface OfficeRoomProps {
  state: OfficeState;
  queue: DailyClient[];
  interactionTargets: OfficeInteractionTarget[];
  playerPosition: PlayerPosition;
  targetPosition: PlayerPosition | null;
  facing: PlayerFacing;
  isWalking: boolean;
  transitionMs: number;
  pendingTargetId: OfficeInteractionTarget["id"] | null;
  isWelcomingClient: boolean;
  onMove: (position: PlayerPosition) => void;
  onInteract: (target: OfficeInteractionTarget) => void;
}

export function OfficeRoom({ state, queue, interactionTargets, playerPosition, targetPosition, facing, isWalking, transitionMs, pendingTargetId, isWelcomingClient, onMove, onInteract }: OfficeRoomProps) {
  const nextClient = queue.find((client) => client.status === "waiting");
  const has = (id: string) => state.purchasedUpgrades.includes(id);
  const [hoveredTargetId, setHoveredTargetId] = useState<OfficeInteractionTarget["id"] | null>(null);
  const hoveredTarget = interactionTargets.find((target) => target.id === hoveredTargetId);

  const moveOnFloor = (event: React.PointerEvent<HTMLElement>) => {
    if (event.button !== 0 || (event.target as HTMLElement).closest("button, [data-no-move]")) return;
    onMove(positionFromPoint(event.clientX, event.clientY, event.currentTarget.getBoundingClientRect()));
  };

  return (
    <section className="office-room" aria-label="Gezilebilir psikolog ofisi. Hareket etmek için zemine tıklayın veya ok ve WASD tuşlarını kullanın." onPointerDown={moveOnFloor}>
      <div className="office-ceiling-light"><i /></div>
      <div className="office-room-wall">
        <div className="office-window"><i /><i /><i /><i /><span className="window-reflection" /></div>
        <div className="office-wall-art"><span><i /></span><span><i /></span></div>
        <div className="office-clock">21:10</div>
        <div className="office-baseboard" />
      </div>
      <div className={`office-books ${has("library") ? "upgraded" : ""}`}><span className="bookshelf-top" /><span className="bookshelf-side" /><i /><i /><i /><i /><i /><i /></div>
      <div className="office-rug"><i /></div>
      <div className="office-desk-shadow" />
      <div className="office-desk">
        <div className="office-desk-top" /><div className="office-desk-front" />
        <div className="office-monitor"><span>RANDEVU<br /><b>{queue.filter((c) => c.status === "waiting").length} BEKLİYOR</b></span></div>
        <div className="desk-lamp" /><div className="desk-notebook" /><div className="desk-mug" /><div className="desk-drawer"><i /><i /></div>
      </div>
      <div className={`client-chair ${has("comfort-chair") ? "upgraded" : ""}`}><span className="client-chair-back" /><span className="client-chair-seat" /><i /></div>
      <div className={`waiting-seats ${has("waiting-area") ? "upgraded" : ""}`}><i /><i /></div>
      <div className="office-side-table"><span /><i /></div>
      {nextClient && <WaitingClientAvatar caseStudy={nextClient.caseStudy} entering={isWelcomingClient} />}
      {has("plants") && <div className="office-scene-plant"><i /><i /><i /><b /></div>}
      {has("online-kit") && <div className="office-online-kit">●</div>}
      {has("soundproofing") && <div className="office-soundproof"><i /><i /><i /></div>}
      <div className={`office-door ${isWelcomingClient ? "is-welcoming" : ""}`}><b className="door-depth" /><i className="door-panel" /><span>{nextClient ? "DANIŞAN BEKLİYOR" : "BUGÜN TAMAM"}</span></div>
      <div className="office-floor-light" /><div className="office-vignette" />

      {hoveredTarget && !targetPosition && <InteractionTargetMarker position={clampPlayerPosition(hoveredTarget.position)} label={hoveredTarget.label} />}
      {targetPosition && <InteractionTargetMarker position={targetPosition} active label={interactionTargets.find((target) => target.id === pendingTargetId)?.label} />}
      <PlayerAvatar position={playerPosition} facing={facing} isWalking={isWalking} transitionMs={transitionMs} />
      {interactionTargets.map((target) => (
        <OfficeHotspot key={target.id} target={target} onInteract={onInteract} queued={pendingTargetId === target.id} onHoverChange={(hovered) => setHoveredTargetId(hovered ? target.id : null)} />
      ))}
    </section>
  );
}
