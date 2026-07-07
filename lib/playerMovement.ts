import type { BlockedZone, PlayerBounds, PlayerPosition, WalkableZone } from "@/types/player";

export const DEFAULT_PLAYER_POSITION: PlayerPosition = { x: 52, y: 88 };
export const PLAYER_BOUNDS: PlayerBounds = { minX: 7, maxX: 93, minY: 57, maxY: 90 };
export const OFFICE_WALKABLE_ZONE: WalkableZone = { id: "office-floor", ...PLAYER_BOUNDS };
export const INTERACTION_DISTANCE = 5;
export const KEYBOARD_STEP = 3;

export const OFFICE_BLOCKED_ZONES: BlockedZone[] = [
  { id: "desk", xMin: 38, xMax: 78, yMin: 61, yMax: 83 },
  { id: "books", xMin: 80, xMax: 95, yMin: 18, yMax: 62 },
  { id: "doorUpper", xMin: 68, xMax: 84, yMin: 20, yMax: 55 },
  { id: "waitingSeats", xMin: 2, xMax: 26, yMin: 66, yMax: 88 },
  { id: "clientChair", xMin: 19, xMax: 43, yMin: 62, yMax: 86 },
  { id: "sideTable", xMin: 15, xMax: 28, yMin: 72, yMax: 90 },
  { id: "plant", xMin: 86, xMax: 98, yMin: 70, yMax: 91 },
];

function clampToBounds(position: PlayerPosition, bounds: PlayerBounds = PLAYER_BOUNDS): PlayerPosition {
  return {
    x: Math.max(bounds.minX, Math.min(bounds.maxX, position.x)),
    y: Math.max(bounds.minY, Math.min(bounds.maxY, position.y)),
  };
}

export function isInsideBlockedZone(position: PlayerPosition, zone?: BlockedZone, padding = 0) {
  const zones = zone ? [zone] : OFFICE_BLOCKED_ZONES;
  return zones.some((item) => position.x >= item.xMin - padding && position.x <= item.xMax + padding && position.y >= item.yMin - padding && position.y <= item.yMax + padding);
}

export function findNearestWalkablePosition(position: PlayerPosition, zones = OFFICE_BLOCKED_ZONES, bounds = PLAYER_BOUNDS): PlayerPosition {
  const bounded = clampToBounds(position, bounds);
  if (!zones.some((zone) => isInsideBlockedZone(bounded, zone))) return bounded;

  let best: PlayerPosition | null = null;
  let bestDistance = Number.POSITIVE_INFINITY;
  for (let y = bounds.minY; y <= bounds.maxY; y += 1) {
    for (let x = bounds.minX; x <= bounds.maxX; x += 1) {
      const candidate = { x, y };
      if (zones.some((zone) => isInsideBlockedZone(candidate, zone, 0.7))) continue;
      const distance = Math.hypot(candidate.x - bounded.x, candidate.y - bounded.y);
      if (distance < bestDistance) {
        best = candidate;
        bestDistance = distance;
      }
    }
  }
  return best ?? DEFAULT_PLAYER_POSITION;
}

export function clampPlayerPosition(position: PlayerPosition): PlayerPosition {
  return findNearestWalkablePosition(clampToBounds(position));
}

function isSegmentWalkable(from: PlayerPosition, to: PlayerPosition) {
  const distance = Math.max(1, Math.ceil(Math.hypot(to.x - from.x, to.y - from.y)));
  for (let step = 0; step <= distance; step += 1) {
    const progress = step / distance;
    const point = { x: from.x + (to.x - from.x) * progress, y: from.y + (to.y - from.y) * progress };
    if (isInsideBlockedZone(point, undefined, 0.8)) return false;
  }
  return true;
}

export function createWalkPath(from: PlayerPosition, rawDestination: PlayerPosition): PlayerPosition[] {
  const start = clampPlayerPosition(from);
  const destination = clampPlayerPosition(rawDestination);
  if (isSegmentWalkable(start, destination)) return [destination];

  const startNode = findNearestWalkablePosition({ x: Math.round(start.x), y: Math.round(start.y) });
  const endNode = findNearestWalkablePosition({ x: Math.round(destination.x), y: Math.round(destination.y) });
  const key = (position: PlayerPosition) => `${position.x},${position.y}`;
  const queue: PlayerPosition[] = [startNode];
  const visited = new Set([key(startNode)]);
  const previous = new Map<string, PlayerPosition>();
  const directions = [{ x: 1, y: 0 }, { x: -1, y: 0 }, { x: 0, y: 1 }, { x: 0, y: -1 }];

  for (let index = 0; index < queue.length; index += 1) {
    const current = queue[index];
    if (key(current) === key(endNode)) break;
    for (const direction of directions) {
      const candidate = { x: current.x + direction.x, y: current.y + direction.y };
      const candidateKey = key(candidate);
      if (candidate.x < PLAYER_BOUNDS.minX || candidate.x > PLAYER_BOUNDS.maxX || candidate.y < PLAYER_BOUNDS.minY || candidate.y > PLAYER_BOUNDS.maxY || visited.has(candidateKey) || isInsideBlockedZone(candidate, undefined, 0.8)) continue;
      visited.add(candidateKey);
      previous.set(candidateKey, current);
      queue.push(candidate);
    }
  }

  if (!visited.has(key(endNode))) return [destination];
  const nodes: PlayerPosition[] = [];
  let cursor = endNode;
  while (key(cursor) !== key(startNode)) {
    nodes.unshift(cursor);
    const parent = previous.get(key(cursor));
    if (!parent) break;
    cursor = parent;
  }

  const waypoints = nodes.filter((node, index) => {
    if (index === nodes.length - 1) return true;
    const before = index === 0 ? startNode : nodes[index - 1];
    const after = nodes[index + 1];
    return (node.x - before.x) !== (after.x - node.x) || (node.y - before.y) !== (after.y - node.y);
  });
  if (playerDistance(waypoints.at(-1) ?? start, destination) > 0.25) waypoints.push(destination);
  return waypoints;
}

export function playerDistance(from: PlayerPosition, to: PlayerPosition) {
  return Math.hypot(to.x - from.x, to.y - from.y);
}

export function getWalkDuration(from: PlayerPosition, to: PlayerPosition) {
  return Math.round(Math.max(140, Math.min(700, playerDistance(from, to) * 13)));
}

export function positionFromPoint(clientX: number, clientY: number, bounds: DOMRect): PlayerPosition {
  return clampPlayerPosition({ x: ((clientX - bounds.left) / bounds.width) * 100, y: ((clientY - bounds.top) / bounds.height) * 100 });
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
