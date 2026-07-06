import type { CaseStudy, Metrics } from "@/types/simulator";
import { ScoreBoard } from "./ScoreBoard";

interface CaseScreenProps {
  caseStudy: CaseStudy;
  metrics: Metrics;
  onChoose: (choiceId: string) => void;
}

export function CaseScreen({ caseStudy, metrics, onChoose }: CaseScreenProps) {
  return (
    <main className="mx-auto grid w-full max-w-5xl flex-1 gap-5 px-5 pb-10 sm:px-8 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-7">
      <section className="glass-card animate-rise overflow-hidden">
        <div className="border-b border-line/80 p-5 sm:p-7">
          <div className="mb-4 flex flex-wrap items-center gap-2">
            <span className="tag">{caseStudy.topic}</span><span className="text-xs text-slate-500">•</span>
            <span className="text-xs font-medium text-slate-400">{caseStudy.age}</span>
            {caseStudy.risk && <span className="risk-tag">Güvenlik öncelikli vaka</span>}
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-cream sm:text-3xl">{caseStudy.title}</h1>

          <div className="mt-5">
            <p className="eyebrow mb-2 text-sky">Danışan anlatımı</p>
            <blockquote className="relative rounded-2xl border border-line/70 bg-ink/45 p-5 text-[15px] leading-7 text-slate-100 sm:p-6 sm:text-base">
              <span className="absolute -top-2.5 left-5 bg-panel px-2 font-serif text-3xl leading-5 text-sky/70">“</span>
              {caseStudy.narrative}
            </blockquote>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <article className="atmosphere-card">
              <span className="atmosphere-icon text-sky">◎</span>
              <div><p className="atmosphere-title">İlk klinik izlenim</p><p>{caseStudy.clinicalImpression}</p></div>
            </article>
            <article className="atmosphere-card">
              <span className="atmosphere-icon text-mint">◇</span>
              <div><p className="atmosphere-title">Dikkat edilmesi gereken etik nokta</p><p>{caseStudy.ethicalFocus}</p></div>
            </article>
          </div>
        </div>

        <div className="p-5 sm:p-7">
          <p className="eyebrow">Yaklaşımını seç</p>
          <h2 className="mt-2 text-lg font-semibold text-cream">{caseStudy.prompt}</h2>
          <div className="mt-5 space-y-3">
            {caseStudy.choices.map((choice, index) => (
              <button key={choice.id} className="choice-button group" onClick={() => onChoose(choice.id)}>
                <span className="choice-letter">{String.fromCharCode(65 + index)}</span>
                <span className="flex-1">{choice.text}</span>
                <span className="text-lg text-slate-600 transition group-hover:translate-x-1 group-hover:text-mint" aria-hidden="true">→</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <aside>
        <div className="sticky top-5 rounded-3xl border border-line/80 bg-panel/75 p-4 backdrop-blur sm:p-5">
          <div className="mb-4 flex items-center justify-between"><p className="eyebrow">Oturum pusulan</p><span className="text-xs text-slate-500">0—100</span></div>
          <ScoreBoard metrics={metrics} />
          <p className="mt-4 text-xs leading-5 text-slate-500">Dört alanın birlikte ilerlemesi, dengeli yaklaşımı güçlendirir.</p>
        </div>
      </aside>
    </main>
  );
}
