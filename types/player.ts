export interface PlayerPosition {
  x: number;
  y: number;
}

export type PlayerFacing = "left" | "right";

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

