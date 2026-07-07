"use client";

import { useState } from "react";
import type { PlayerFacing, PlayerPosition } from "@/types/player";

interface PlayerAvatarProps {
  position: PlayerPosition;
  facing: PlayerFacing;
  isWalking: boolean;
  transitionMs: number;
}

export function PlayerAvatar({ position, facing, isWalking, transitionMs }: PlayerAvatarProps) {
  const [spriteLoaded, setSpriteLoaded] = useState(false);
  return (
    <div
      className={`player-avatar ${isWalking ? "is-walking" : "is-idle"}`}
      style={{ left: `${position.x}%`, top: `${position.y}%`, zIndex: Math.round(40 + position.y), transitionDuration: `${transitionMs}ms` }}
      data-player-x={position.x.toFixed(1)}
      data-player-y={position.y.toFixed(1)}
      data-player-walking={isWalking ? "true" : "false"}
      role="img"
      aria-label={isWalking ? "Psikolog ofiste yürüyor" : "Psikolog ofiste duruyor"}
    >
      <span className="player-ground-shadow" />
      <span className={`player-avatar-figure facing-${facing}`}>
        <img
          src="/characters/therapist-avatar.png"
          alt=""
          className={`player-avatar-image ${spriteLoaded ? "loaded" : ""}`}
          onLoad={() => setSpriteLoaded(true)}
          onError={() => setSpriteLoaded(false)}
        />
        {!spriteLoaded && (
          <svg className="player-avatar-fallback" viewBox="0 0 64 128" aria-hidden="true">
            <ellipse className="avatar-hair-back" cx="32" cy="22" rx="15" ry="18" />
            <ellipse className="avatar-face" cx="32" cy="24" rx="12" ry="14" />
            <path className="avatar-hair" d="M20 23c0-13 6-19 14-19 10 0 15 8 14 20-5-2-9-6-12-12-4 7-9 10-16 11Z" />
            <path className="avatar-neck" d="M27 35h10v12H27z" />
            <path className="avatar-shirt" d="M19 45c5-4 9-6 13-6s9 2 14 6l3 41H15l4-41Z" />
            <path className="avatar-collar" d="m24 42 8 10 8-10-2 19H26l-2-19Z" />
            <path className="avatar-arm left" d="m20 48-7 7-5 28 7 2 9-24Z" />
            <path className="avatar-arm right" d="m44 48 7 7 5 28-7 2-9-24Z" />
            <path className="avatar-trousers" d="M17 82h31l-3 40H34l-2-30-2 30H19l-2-40Z" />
            <path className="avatar-shoe left" d="M18 118h13v7H15c0-4 1-6 3-7Z" />
            <path className="avatar-shoe right" d="M34 118h12c2 1 3 3 3 7H34v-7Z" />
          </svg>
        )}
      </span>
    </div>
  );
}
