import type { CaseStudy, Choice, Metrics } from "@/types/simulator";
import { ScoreBoard } from "./ScoreBoard";

const impactLabel = (value: number) => `${value > 0 ? "+" : ""}${value}`;

export function FeedbackScreen({ caseStudy, choice, metrics, isLast, onNext }: { caseStudy: CaseStudy; choice: Choice; metrics: Metrics; isLast: boolean; onNext: () => void }) {
  const positive = Object.values(choice.impact).reduce((sum, value) => sum + value, 0) > 0;
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-5 pb-10 sm:px-8">
      <section className="glass-card animate-rise overflow-hidden">
        <div className={`h-1 ${positive ? "bg-mint" : "bg-[#e4b77d]"}`} />
        <div className="p-5 sm:p-8">
          <div className="flex items-start gap-4"><div className={`grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-xl ${positive ? "bg-mint/10 text-mint" : "bg-[#e4b77d]/10 text-[#e4b77d]"}`}>{positive ? "✓" : "↗"}</div><div><p className="eyebrow">Seçimin sonucu</p><h1 className="mt-2 text-xl font-semibold leading-8 text-cream sm:text-2xl">{choice.result}</h1></div></div>
          <div className="mt-6 rounded-2xl border border-sky/15 bg-sky/[0.06] p-5"><p className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-sky">Neden önemli?</p><p className="text-sm leading-7 text-slate-300 sm:text-[15px]">{choice.explanation}</p></div>
          {caseStudy.risk && <div className="mt-4 rounded-2xl border border-[#e4b77d]/20 bg-[#e4b77d]/[0.06] p-4 text-sm leading-6 text-slate-300"><strong className="text-[#efc793]">Güvenlik notu:</strong> Yakın veya acil tehlikede kişi yalnız bırakılmamalı; yerel acil yardım birimleri ve uygun profesyonel destek gecikmeden devreye alınmalıdır.</div>}
          <div className="mt-7"><div className="mb-3 flex items-end justify-between"><p className="eyebrow">Güncel göstergeler</p><div className="flex gap-2 text-[11px] text-slate-500">{Object.entries(choice.impact).map(([key, value]) => <span key={key} className={value >= 0 ? "text-mint" : "text-[#e4b77d]"}>{impactLabel(value)}</span>)}</div></div><ScoreBoard metrics={metrics} compact /></div>
          <button className="primary-button mt-7 w-full sm:ml-auto sm:w-auto" onClick={onNext}>{isLast ? "Değerlendirmeyi Gör" : "Sonraki Vaka"}<span aria-hidden="true">→</span></button>
        </div>
      </section>
    </main>
  );
}
