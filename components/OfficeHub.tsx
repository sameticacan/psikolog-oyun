"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { acceptsMovementInput, clampPlayerPosition, DEFAULT_PLAYER_POSITION, getWalkDuration, INTERACTION_DISTANCE, moveWithKey, playerDistance } from "@/lib/playerMovement";
import type { DailyClient, OfficePanel, OfficeState } from "@/types/office";
import type { OfficeInteractionId, OfficeInteractionTarget, PlayerFacing, PlayerPosition } from "@/types/player";
import { FeeSettings } from "./FeeSettings";
import { OfficeHud } from "./OfficeHud";
import { OfficeRoom } from "./OfficeRoom";
import { ScheduleBoard } from "./ScheduleBoard";

const TUTORIAL_STORAGE_KEY = "terapi-odasi-office-movement-tutorial";

interface OfficeHubProps {
  state: OfficeState;
  queue: DailyClient[];
  panel: OfficePanel;
  message: string | null;
  onPanel: (panel: OfficePanel) => void;
  onStartSession: () => void;
  onEndDay: () => void;
  onOpenUpgrades: () => void;
  onOpenStaff: () => void;
  onFeeChange: (fee: OfficeState["sessionFee"]) => void;
}

export function OfficeHub({ state, queue, panel, message, onPanel, onStartSession, onEndDay, onOpenUpgrades, onOpenStaff, onFeeChange }: OfficeHubProps) {
  const next = queue.find((client) => client.status === "waiting");
  const lowEnergy = state.energy < 18;
  const [playerPosition, setPlayerPosition] = useState<PlayerPosition>(DEFAULT_PLAYER_POSITION);
  const [targetPosition, setTargetPosition] = useState<PlayerPosition | null>(null);
  const [isWalking, setIsWalking] = useState(false);
  const [facing, setFacing] = useState<PlayerFacing>("right");
  const [transitionMs, setTransitionMs] = useState(0);
  const [pendingTargetId, setPendingTargetId] = useState<OfficeInteractionId | null>(null);
  const [showTutorial, setShowTutorial] = useState(true);
  const movementTimer = useRef<number | null>(null);
  const positionRef = useRef(playerPosition);

  useEffect(() => { positionRef.current = playerPosition; }, [playerPosition]);
  useEffect(() => { setShowTutorial(window.localStorage.getItem(TUTORIAL_STORAGE_KEY) !== "dismissed"); }, []);

  const cancelMovement = useCallback(() => {
    if (movementTimer.current) window.clearTimeout(movementTimer.current);
    movementTimer.current = null;
    setIsWalking(false);
    setTargetPosition(null);
    setPendingTargetId(null);
    setTransitionMs(0);
  }, []);

  const movePlayer = useCallback((rawDestination: PlayerPosition, onArrival?: () => void, interactionId: OfficeInteractionId | null = null, quick = false) => {
    if (movementTimer.current) window.clearTimeout(movementTimer.current);
    const destination = clampPlayerPosition(rawDestination);
    const current = positionRef.current;
    const distance = playerDistance(current, destination);
    if (distance <= INTERACTION_DISTANCE && onArrival) {
      cancelMovement();
      onArrival();
      return;
    }
    const duration = quick ? 150 : getWalkDuration(current, destination);
    setFacing(destination.x < current.x ? "left" : "right");
    setTransitionMs(duration);
    setTargetPosition(destination);
    setPendingTargetId(interactionId);
    setIsWalking(true);
    positionRef.current = destination;
    setPlayerPosition(destination);
    movementTimer.current = window.setTimeout(() => {
      movementTimer.current = null;
      setIsWalking(false);
      setTargetPosition(null);
      setPendingTargetId(null);
      setTransitionMs(0);
      onArrival?.();
    }, duration + 40);
  }, [cancelMovement]);

  const interactionTargets = useMemo<OfficeInteractionTarget[]>(() => [
    { id: "door", label: "Kapı", hint: next ? "Sıradaki danışanı al" : "Bekleyen danışan yok", icon: "↳", className: "hotspot-door", position: { x: 72, y: 62 }, action: onStartSession, disabled: !next || lowEnergy },
    { id: "computer", label: "Bilgisayar", hint: "Randevu takvimi", icon: "▣", className: "hotspot-computer", position: { x: 58, y: 66 }, action: () => onPanel("schedule") },
    { id: "desk", label: "Masa", hint: "Notlar ve gün raporu", icon: "≡", className: "hotspot-desk", position: { x: 62, y: 87 }, action: () => onPanel("notes") },
    { id: "library", label: "Kitaplık", hint: "Ofis geliştirmeleri", icon: "▤", className: "hotspot-library", position: { x: 86, y: 64 }, action: onOpenUpgrades },
    { id: "waiting", label: "Bekleme alanı", hint: "Danışan listesi", icon: "◫", className: "hotspot-waiting", position: { x: 16, y: 82 }, action: () => onPanel("waiting") },
    { id: "reception", label: "Resepsiyon", hint: "Asistan yönetimi", icon: "♙", className: "hotspot-reception", position: { x: 44, y: 88 }, action: onOpenStaff },
  ], [lowEnergy, next, onOpenStaff, onOpenUpgrades, onPanel, onStartSession]);

  const queueInteraction = useCallback((target: OfficeInteractionTarget) => {
    if (panel || target.disabled) return;
    movePlayer(target.position, target.action, target.id);
  }, [movePlayer, panel]);

  const queueById = (id: OfficeInteractionId) => {
    const target = interactionTargets.find((item) => item.id === id);
    if (target) queueInteraction(target);
  };

  const moveToFloorPoint = (position: PlayerPosition) => {
    if (panel) return;
    movePlayer(position);
  };

  useEffect(() => {
    if (panel) cancelMovement();
  }, [cancelMovement, panel]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (panel || !acceptsMovementInput(event.target)) return;
      const nextPosition = moveWithKey(positionRef.current, event.key);
      if (!nextPosition) return;
      event.preventDefault();
      movePlayer(nextPosition, undefined, null, true);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [movePlayer, panel]);

  useEffect(() => () => {
    if (movementTimer.current) window.clearTimeout(movementTimer.current);
  }, []);

  const dismissTutorial = () => {
    window.localStorage.setItem(TUTORIAL_STORAGE_KEY, "dismissed");
    setShowTutorial(false);
  };

  return <main className="office-game-screen" data-queue-day={state.day} data-queue-signature={queue.map((client) => `${client.caseStudy.id}:${client.status}`).join("|")}>
    <OfficeHud state={state} />
    <div className="office-scene-wrap">
      <div className="office-scene-caption"><span className="live-dot" /><div><small>OFİS AÇIK</small><strong>{next ? `${next.caseStudy.characterName} bekleme alanında` : "Bugünün randevuları tamamlandı"}</strong></div></div>
      <OfficeRoom state={state} queue={queue} interactionTargets={interactionTargets} playerPosition={playerPosition} targetPosition={targetPosition} facing={facing} isWalking={isWalking} transitionMs={transitionMs} pendingTargetId={pendingTargetId} onMove={moveToFloorPoint} onInteract={queueInteraction} />
      {showTutorial && <aside className="office-movement-tutorial" data-no-move><button onClick={dismissTutorial} aria-label="Hareket ipucunu kapat">×</button><strong>Ofiste gezin</strong><p>Bir noktaya tıkla veya <kbd>WASD</kbd> / ok tuşlarını kullan. Kapı danışanı, bilgisayar takvimi, kitaplık geliştirmeleri açar.</p></aside>}
      {isWalking && pendingTargetId && <div className="interaction-status" aria-live="polite"><i />{interactionTargets.find((target) => target.id === pendingTargetId)?.label} noktasına gidiliyor</div>}
      {(message || lowEnergy || state.ethicalTrust < 25 || state.money < 0) && <div className="office-alert"><span>◇</span><p>{message ?? (lowEnergy ? "Enerjin düşük. Bugün dinlenmek daha sağlıklı olabilir; yeni seans önerilmiyor." : state.ethicalTrust < 25 ? "Ofis itibarı zedeleniyor. Daha dikkatli ve etik sınırları gözeten kararlar almalısın." : "Giderler artıyor; dengeli ücret ve seans planı gerekebilir.")}</p></div>}
    </div>
    <nav className="office-action-bar" aria-label="Ofis eylemleri">
      <div className="next-client-card"><span>{next ? next.caseStudy.characterName.slice(0, 1) : "✓"}</span><p><small>SIRADAKİ DANIŞAN</small><strong>{next ? next.caseStudy.characterName : "Randevu kalmadı"}</strong>{next && <em>{next.caseStudy.topic} · {next.caseStudy.age}</em>}</p></div>
      <button className="start-session-button" onClick={() => queueById("door")} disabled={!next || lowEnergy || Boolean(panel)}><span>▷</span><b>Kapıya git</b><small>{state.sessionFee} TL · 18 enerji</small></button>
      <div className="office-menu-buttons"><button onClick={() => queueById("computer")}><span>▦</span>Takvim</button><button onClick={() => queueById("library")}><span>⌂</span>Geliştir</button><button onClick={() => queueById("reception")}><span>♙</span>Asistan</button><button onClick={() => onPanel("fee")}><span>₺</span>Ücret</button><button className="end-day" onClick={onEndDay}><span>☾</span>Günü bitir</button></div>
    </nav>
    {panel && <div className="office-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onPanel(null); }}>
      {panel === "schedule" && <ScheduleBoard queue={queue} state={state} onStart={onStartSession} onClose={() => onPanel(null)} />}
      {panel === "fee" && <FeeSettings state={state} onChange={onFeeChange} onClose={() => onPanel(null)} />}
      {(panel === "waiting" || panel === "notes") && <section className="office-modal compact animate-rise"><div className="office-panel-heading"><div><p className="eyebrow">{panel === "waiting" ? "Bekleme alanı" : "Masa notları"}</p><h2>{panel === "waiting" ? "Bugünün danışanları" : "Günlük durum"}</h2></div><button onClick={() => onPanel(null)}>×</button></div>{panel === "waiting" ? <div className="mini-client-list">{queue.map((c, i) => <p key={i}><span>{c.caseStudy.characterName.slice(0, 1)}</span><b>{c.caseStudy.characterName}<small>{c.caseStudy.topic}</small></b><em>{c.status === "waiting" ? "Bekliyor" : c.status === "completed" ? "Tamam" : "Gelmedi"}</em></p>)}</div> : <div className="notes-panel"><p>Bugün {state.completedSessionsToday} seans tamamlandı.</p><p>Enerji sınırını ve etik güveni gözeterek günü istediğin zaman kapatabilirsin.</p><button className="secondary-button w-full" onClick={onEndDay}>Gün sonu raporunu hazırla</button></div>}</section>}
    </div>}
  </main>;
}
