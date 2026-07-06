import { getConnectionUpdate, metricLabels } from "@/lib/results";
import type { CaseStudy, Choice, MetricKey, Metrics } from "@/types/simulator";
import { ScoreBoard } from "./ScoreBoard";

const impactLabel = (value: number) => `${value > 0 ? "+" : ""}${value}`;

interface FeedbackScreenProps {
  caseStudy: CaseStudy;
  choice: Choice;
  metrics: Metrics;
  isLast: boolean;
  onNext: () => void;
}

export function FeedbackScreen({ caseStudy, choice, metrics, isLast, onNext }: FeedbackScreenProps) {
  const positive = Object.values(choice.impact).reduce((sum, value) => sum + value, 0) > 0;
  const connectionUpdate = getConnectionUpdate(choice);

  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-5 pb-10 sm:px-8">
      <section className="glass-card animate-rise overflow-hidden">
        <div className={`h-1 ${positive ? "bg-mint" : "bg-[#e4b77d]"}`} />
        <div className="p-5 sm:p-8">
          <div className="flex items-start gap-4">
            <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-xl ${positive ? "bg-mint/10 text-mint" : "bg-[#e4b77d]/10 text-[#e4b77d]"}`}>{positive ? "✓" : "↗"}</div>
            <div><p className="eyebrow">Seçimin sonucu</p><h1 className="mt-2 text-xl font-semibold leading-8 text-cream sm:text-2xl">{choice.result}</h1></div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <article className="rounded-2xl border border-mint/15 bg-mint/[0.055] p-5">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-mint">Danışanla bağ</p>
              <p className="text-sm leading-6 text-slate-300">{connectionUpdate}</p>
            </article>
            <article className="rounded-2xl border border-sky/15 bg-sky/[0.055] p-5">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-sky">Neden önemli?</p>
              <p className="text-sm leading-6 text-slate-300">{choice.explanation}</p>
            </article>
          </div>

          {choice.reveal && (
            <article className="reveal-card animate-rise-delayed">
              <div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#efc793]"><span className="h-2 w-2 animate-soft-pulse rounded-full bg-[#e4b77d]" />Ek bilgi · Danışan devam ediyor</div>
              <p className="text-[15px] italic leading-7 text-cream">“{choice.reveal}”</p>
            </article>
          )}

          {caseStudy.risk && (
            <div className="mt-4 rounded-2xl border border-[#e4b77d]/25 bg-[#e4b77d]/[0.07] p-4 text-sm leading-6 text-slate-200">
              <strong className="text-[#efc793]">Güvenlik notu:</strong> Yakın veya acil tehlikede kişi yalnız bırakılmamalı. Güvenilir bir yetişkin ve ruh sağlığı profesyonelinden destek alınmalı; 112 aranmalı veya en yakın acil servise başvurulmalıdır. Güvenlik durumlarında gizlilik mutlak değildir ve bu sınır kişiye açıkça anlatılmalıdır.
            </div>
          )}

          <div className="mt-7">
            <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <p className="eyebrow">Pusuladaki değişim</p>
              <div className="flex flex-wrap gap-1.5 text-[10px]">
                {(Object.entries(choice.impact) as Array<[MetricKey, number]>).map(([key, value]) => (
                  <span key={key} className={`rounded-full border px-2 py-1 ${value >= 0 ? "border-mint/15 bg-mint/[0.05] text-mint" : "border-[#e4b77d]/15 bg-[#e4b77d]/[0.05] text-[#e4b77d]"}`}>
                    {metricLabels[key]} {impactLabel(value)}
                  </span>
                ))}
              </div>
            </div>
            <ScoreBoard metrics={metrics} compact />
          </div>

          <button className="primary-button mt-7 w-full sm:ml-auto sm:w-auto" onClick={onNext}>{isLast ? "Değerlendirmeyi Gör" : "Sonraki Vakaya Geç"}<span aria-hidden="true">→</span></button>
        </div>
      </section>
    </main>
  );
}
