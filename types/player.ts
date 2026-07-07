export interface PlayerPosition {
  x: number;
  y: number;
}

export interface PlayerBounds {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

export interface BlockedZone {
  id: string;
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}

export interface WalkableZone extends PlayerBounds {
  id: string;
}

export type PlayerFacing = "left" | "right";

export type OfficeInteractionPhase = "idle" | "walking" | "welcoming-client";

export type OfficeInteractionId = "door" | "computer" | "desk" | "library" | "waiting" | "reception";

export interface OfficeInteractionTarget {
  id: OfficeInteractionId;
  label: string;
  hint: string;
  icon: string;
  className: string;
  position: PlayerPosition;
  action: () => void;
  disabled?: boolean;
}
