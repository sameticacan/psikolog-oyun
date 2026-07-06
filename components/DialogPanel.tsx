import type { ReactNode } from "react";
import type { CaseStudy } from "@/types/simulator";

export function DialogPanel({ caseStudy, children }: { caseStudy: CaseStudy; children: ReactNode }) {
  return (
    <section className="dialog-panel animate-rise">
      <div className="flex flex-wrap items-center gap-2">
        <span className="tag">{caseStudy.topic}</span><span className="text-xs text-slate-500">•</span>
        <span className="text-xs font-semibold text-slate-300">{caseStudy.age}</span>
        {caseStudy.risk && <span className="risk-tag">Güvenlik öncelikli</span>}
      </div>
      <p className="eyebrow mt-5 text-sky">Danışan anlatımı</p>
      <h1 className="mt-2 text-2xl font-semibold tracking-tight text-cream">{caseStudy.title}</h1>
      <blockquote className="dialog-quote">“{caseStudy.narrative}”</blockquote>
      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <div className="dialog-clue"><span>◎</span><div><strong>İlk klinik izlenim</strong><p>{caseStudy.clinicalImpression}</p></div></div>
        <div className="dialog-clue"><span>◇</span><div><strong>Etik odak</strong><p>{caseStudy.ethicalFocus}</p></div></div>
      </div>
      {children}
    </section>
  );
}
