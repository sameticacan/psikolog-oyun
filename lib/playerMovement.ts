import type { PlayerPosition } from "@/types/player";

export const DEFAULT_PLAYER_POSITION: PlayerPosition = { x: 52, y: 87 };
export const PLAYER_BOUNDS = { minX: 7, maxX: 93, minY: 57, maxY: 90 } as const;
export const INTERACTION_DISTANCE = 5;
export const KEYBOARD_STEP = 3;

export function clampPlayerPosition(position: PlayerPosition): PlayerPosition {
  return {
    x: Math.max(PLAYER_BOUNDS.minX, Math.min(PLAYER_BOUNDS.maxX, position.x)),
    y: Math.max(PLAYER_BOUNDS.minY, Math.min(PLAYER_BOUNDS.maxY, position.y)),
  };
}

export function playerDistance(from: PlayerPosition, to: PlayerPosition) {
  return Math.hypot(to.x - from.x, to.y - from.y);
}

export function getWalkDuration(from: PlayerPosition, to: PlayerPosition) {
  return Math.round(Math.max(220, Math.min(1050, playerDistance(from, to) * 18)));
}

export function positionFromPoint(clientX: number, clientY: number, bounds: DOMRect): PlayerPosition {
  return clampPlayerPosition({
    x: ((clientX - bounds.left) / bounds.width) * 100,
    y: ((clientY - bounds.top) / bounds.height) * 100,
  });
}

export function moveWithKey(position: PlayerPosition, key: string): PlayerPosition | null {
  const deltaByKey: Record<string, PlayerPosition> = {
    ArrowLeft: { x: -KEYBOARD_STEP, y: 0 }, a: { x: -KEYBOARD_STEP, y: 0 }, A: { x: -KEYBOARD_STEP, y: 0 },
    ArrowRight: { x: KEYBOARD_STEP, y: 0 }, d: { x: KEYBOARD_STEP, y: 0 }, D: { x: KEYBOARD_STEP, y: 0 },
    ArrowUp: { x: 0, y: -KEYBOARD_STEP }, w: { x: 0, y: -KEYBOARD_STEP }, W: { x: 0, y: -KEYBOARD_STEP },
    ArrowDown: { x: 0, y: KEYBOARD_STEP }, s: { x: 0, y: KEYBOARD_STEP }, S: { x: 0, y: KEYBOARD_STEP },
  };
  const delta = deltaByKey[key];
  return delta ? clampPlayerPosition({ x: position.x + delta.x, y: position.y + delta.y }) : null;
}

export function acceptsMovementInput(target: EventTarget | null) {
  return !(target instanceof HTMLElement) || !target.closest("input, textarea, select, [contenteditable='true'], [role='dialog']");
}
