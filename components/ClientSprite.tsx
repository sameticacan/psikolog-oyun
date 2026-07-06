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
            <linearGradient id={`skin-${name}`} x1="0" y1="0" x2="1" y2="1"><stop stopColor={colors.skin} /><stop offset=".72" stopColor={colors.skin} /><stop offset="1" stopColor="#a96f5b" /></linearGradient>
            <filter id={`shadow-${name}`}><feDropShadow dx="0" dy="8" stdDeviation="8" floodOpacity=".25" /></filter>
          </defs>
          <g filter={`url(#shadow-${name})`}>
            <ellipse cx="100" cy="302" rx="76" ry="13" fill="rgba(4,8,14,.35)" />
            <path d="M26 310 C28 226 48 184 100 178 C152 184 172 226 174 310Z" fill={`url(#shirt-${name})`} />
            <path d="M58 215 Q31 236 31 292 Q43 305 62 294 L80 229Z" fill={`url(#shirt-${name})`} />
            <path d="M142 215 Q169 236 169 292 Q157 305 138 294 L120 229Z" fill={`url(#shirt-${name})`} />
            <path d="M67 291 Q100 274 133 291 L147 310 L53 310Z" fill="#1c2e3b" opacity=".88" />
            <path d="M79 159 L77 192 Q100 207 123 192 L121 159Z" fill={`url(#skin-${name})`} />
            <ellipse cx="55" cy="105" rx="8" ry="15" fill={colors.skin} />
            <ellipse cx="145" cy="105" rx="8" ry="15" fill="#b97e65" />
            <ellipse cx="100" cy="103" rx="46" ry="61" fill={`url(#skin-${name})`} />
            <path d="M54 105 Q47 39 98 27 Q153 34 148 111 L137 76 Q101 87 63 69Z" fill={colors.hair} />
            <path d="M61 65 Q93 31 139 55" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="5" strokeLinecap="round" />
            <path d={emotion === "angry" ? "M72 88 L91 83 M109 83 L128 88" : "M72 85 Q82 81 91 85 M109 85 Q119 81 128 85"} fill="none" stroke="#40323a" strokeWidth="4" strokeLinecap="round" />
            <ellipse cx="82" cy="95" rx="4" ry={emotion === "tired" ? "2" : "5"} fill="#20232c" />
            <ellipse cx="118" cy="95" rx="4" ry={emotion === "tired" ? "2" : "5"} fill="#20232c" />
            <path d="M100 98 Q96 113 102 116" fill="none" stroke="rgba(112,67,62,.46)" strokeWidth="2.5" strokeLinecap="round" />
            <path d={mouthPath(emotion)} fill="none" stroke="#784e50" strokeWidth="4" strokeLinecap="round" />
            <ellipse cx="72" cy="113" rx="8" ry="4" fill="rgba(162,82,83,.09)" />
            <ellipse cx="128" cy="113" rx="8" ry="4" fill="rgba(162,82,83,.09)" />
            <path d="M62 224 Q100 242 138 224" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="3" />
            <path d="M31 295 Q34 221 62 202" fill="none" stroke="rgba(148,225,207,.22)" strokeWidth="3" strokeLinecap="round" />
          </g>
        </svg>
      )}
      <figcaption className="client-nameplate"><strong>{name}</strong><span>{emotionLabels[emotion]}</span></figcaption>
    </figure>
  );
}
