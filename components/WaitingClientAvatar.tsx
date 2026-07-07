import type { CaseStudy } from "@/types/simulator";

export function WaitingClientAvatar({ caseStudy, entering }: { caseStudy: CaseStudy; entering: boolean }) {
  return (
    <div
      className={`waiting-client-avatar age-${caseStudy.characterAgeGroup} emotion-${caseStudy.characterEmotion} ${entering ? "is-entering" : ""}`}
      data-waiting-client-id={caseStudy.id}
      role="img"
      aria-label={`${caseStudy.characterName} bekleme alanında`}
    >
      <span className="waiting-client-shadow" />
      <svg viewBox="0 0 70 126" aria-hidden="true">
        <path className="mini-client-hair-back" d="M19 30C18 11 28 4 36 4c13 0 20 11 17 29l-8 7H26l-7-10Z" />
        <ellipse className="mini-client-face" cx="36" cy="27" rx="14" ry="16" />
        <path className="mini-client-hair" d="M21 25C22 9 30 5 38 6c10 1 15 9 14 22-7-2-12-7-15-13-4 6-8 9-16 10Z" />
        <path className="mini-client-body" d="M21 46c8-7 21-7 29 0l5 42H16l5-42Z" />
        <path className="mini-client-arm left" d="m22 50-8 12 8 25 7-3-5-20 8 15 5-4-15-25Z" />
        <path className="mini-client-arm right" d="m48 50 8 12-7 25-7-3 4-20-8 15-5-4 15-25Z" />
        <path className="mini-client-legs" d="M18 84h35l-2 19H39l-4-11-4 11H19l-1-19Z" />
        <path className="mini-client-feet" d="M19 101h13v8H16c0-4 1-7 3-8Zm20 0h12c3 1 4 4 4 8H39v-8Z" />
      </svg>
      <small>{caseStudy.characterName}</small>
    </div>
  );
}

