"use client";

import { useEffect, useState } from "react";
import type { CharacterAgeGroup, CharacterEmotion } from "@/types/simulator";

const emotionLabels: Record<CharacterEmotion, string> = {
  anxious: "kaygılı",
  sad: "üzgün",
  angry: "öfkeli",
  withdrawn: "içe çekilmiş",
  confused: "kararsız",
  tired: "yorgun",
  worried: "endişeli",
  hopeful: "biraz rahatlamış",
  guarded: "temkinli",
};

const paletteByAge: Record<CharacterAgeGroup, { skin: string; hair: string; shirt: string }> = {
  child: { skin: "#d8a47f", hair: "#2c252d", shirt: "#71a7a0" },
  teen: { skin: "#c98f6c", hair: "#252531", shirt: "#547f91" },
  "young-adult": { skin: "#d5a17d", hair: "#322a2f", shirt: "#786f91" },
  parent: { skin: "#bd8065", hair: "#30282b", shirt: "#8d725e" },
};

function mouthPath(emotion: CharacterEmotion) {
  if (emotion === "hopeful") return "M86 109 Q100 119 114 109";
  if (emotion === "sad" || emotion === "withdrawn" || emotion === "worried") return "M88 116 Q100 106 112 116";
  if (emotion === "angry") return "M88 112 L112 112";
  return "M90 112 Q100 115 110 112";
}

interface ClientSpriteProps {
  name: string;
  ageGroup: CharacterAgeGroup;
  emotion: CharacterEmotion;
  image: string;
  reacting?: boolean;
}

export function ClientSprite({ name, ageGroup, emotion, image, reacting = false }: ClientSpriteProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const colors = paletteByAge[ageGroup];

  useEffect(() => setImageFailed(false), [image]);

  return (
    <figure className={`client-sprite ${reacting ? "client-sprite-reacting" : ""}`} data-emotion={emotion}>
      <div className="client-sprite-glow" />
      {!imageFailed ? (
        // A plain img keeps optional public assets replaceable without build-time coupling.
        <img src={image} alt={`${name} adlı danışanın 2D karakter görseli`} onError={() => setImageFailed(true)} className="client-sprite-image" />
      ) : (
        <svg className="client-sprite-fallback" viewBox="0 0 200 310" role="img" aria-label={`${name} için stilize danışan portresi`}>
          <defs>
            <linearGradient id={`shirt-${name}`} x1="0" y1="0" x2="0" y2="1"><stop stopColor={colors.shirt} /><stop offset="1" stopColor="#25394a" /></linearGradient>
            <filter id={`shadow-${name}`}><feDropShadow dx="0" dy="8" stdDeviation="8" floodOpacity=".25" /></filter>
          </defs>
          <g filter={`url(#shadow-${name})`}>
            <path d="M35 310 C38 215 53 178 100 174 C147 178 162 215 165 310Z" fill={`url(#shirt-${name})`} />
            <path d="M78 164 L77 192 Q100 210 123 192 L122 164Z" fill={colors.skin} />
            <ellipse cx="100" cy="103" rx="49" ry="68" fill={colors.skin} />
            <path d="M52 102 Q45 32 100 25 Q158 31 151 111 L137 78 Q100 91 63 72Z" fill={colors.hair} />
            <path d={emotion === "angry" ? "M72 88 L91 83 M109 83 L128 88" : "M72 85 Q82 81 91 85 M109 85 Q119 81 128 85"} fill="none" stroke="#40323a" strokeWidth="4" strokeLinecap="round" />
            <ellipse cx="82" cy="95" rx="4" ry={emotion === "tired" ? "2" : "5"} fill="#20232c" />
            <ellipse cx="118" cy="95" rx="4" ry={emotion === "tired" ? "2" : "5"} fill="#20232c" />
            <path d={mouthPath(emotion)} fill="none" stroke="#784e50" strokeWidth="4" strokeLinecap="round" />
            <path d="M62 224 Q100 242 138 224" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="3" />
          </g>
        </svg>
      )}
      <figcaption className="client-nameplate"><strong>{name}</strong><span>{emotionLabels[emotion]}</span></figcaption>
    </figure>
  );
}
