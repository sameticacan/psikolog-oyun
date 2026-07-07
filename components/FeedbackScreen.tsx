import { getConnectionUpdate, metricLabels } from "@/lib/results";
import type { CaseStudy, CharacterEmotion, Choice, MetricKey, Metrics } from "@/types/simulator";
import { ClientSprite } from "./ClientSprite";
import { GameHud } from "./GameHud";
import { MetricHud } from "./MetricHud";

const impactLabel = (value: number) => `${value > 0 ? "+" : ""}${value}`;

interface FeedbackScreenProps {
  caseStudy: CaseStudy;
  choice: Choice;
  metrics: Metrics;
  current: number;
  total: number;
  isLast: boolean;
  onNext: () => void;
  nextLabel?: string;
}

export function FeedbackScreen({ caseStudy, choice, metrics, current, total, isLast, onNext, nextLabel }: FeedbackScreenProps) {
  const positive = Object.values(choice.impact).reduce((sum, value) => sum + value, 0) > 0;
  const connectionUpdate = getConnectionUpdate(choice);
  const reactionEmotion: CharacterEmotion = positive ? "hopeful" : "guarded";

  return (
    <main className="game-screen">
      <GameHud current={current} total={total} metrics={metrics} />
      <div className="visual-novel-stage feedback-stage">
        <div className="client-stage-zone">
          <ClientSprite
            name={caseStudy.characterName}
            ageGroup={caseStudy.characterAgeGroup}
            emotion={reactionEmotion}
            image={caseStudy.characterImage}
            reacting
          />
          <div className="stage-whisper"><span className={positive ? "bg-mint" : "bg-[#e4b77d]"} />{positive ? "Bağ güçleniyor" : "Danışan temkinli"}</div>
        </div>

        <section className="feedback-dialog animate-rise">
          <div className="flex items-start gap-3">
            <div className={`feedback-result-icon ${positive ? "text-mint" : "text-[#e4b77d]"}`}>{positive ? "✓" : "↗"}</div>
            <div><p className="eyebrow">Seçimin yansıması</p><h1 className="mt-1 text-xl font-semibold leading-7 text-cream">{choice.result}</h1></div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <article className="vn-feedback-card border-mint/15 bg-mint/[0.06]"><p className="text-mint">♡ Danışanla bağ</p><span>{connectionUpdate}</span></article>
            <article className="vn-feedback-card border-sky/15 bg-sky/[0.06]"><p className="text-sky">◎ Neden önemli?</p><span>{choice.explanation}</span></article>
          </div>

          {choice.reveal && (
            <article className="reveal-card animate-rise-delayed">
              <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.15em] text-[#efc793]"><span className="h-2 w-2 animate-soft-pulse rounded-full bg-[#e4b77d]" />{caseStudy.characterName} devam ediyor</div>
              <p className="text-sm italic leading-6 text-cream">“{choice.reveal}”</p>
            </article>
          )}

          {caseStudy.risk && (
            <div className="mt-3 rounded-2xl border border-[#e4b77d]/25 bg-[#e4b77d]/[0.08] p-3 text-xs leading-5 text-slate-200">
              <strong className="text-[#efc793]">Güvenlik notu:</strong> Yakın veya acil tehlikede kişi yalnız bırakılmamalı. Güvenilir bir yetişkin ve ruh sağlığı profesyonelinden destek alınmalı; 112 aranmalı veya en yakın acil servise başvurulmalıdır.
            </div>
          )}

          <div className="mt-4 flex flex-wrap gap-1.5">
            {(Object.entries(choice.impact) as Array<[MetricKey, number]>).map(([key, value]) => (
              <span key={key} className={`metric-change-chip ${value >= 0 ? "text-mint" : "text-[#e4b77d]"}`}>{metricLabels[key]} {impactLabel(value)}</span>
            ))}
          </div>

          <button className="game-next-button mt-5 w-full sm:ml-auto sm:w-auto" onClick={onNext}>
            {nextLabel ?? (isLast ? "Seans Değerlendirmesini Gör" : "Sonraki Vakaya Geç")}<span aria-hidden="true">→</span>
          </button>
        </section>
      </div>
      <div className="vn-feedback-bottom"><MetricHud metrics={metrics} /></div>
    </main>
  );
}
