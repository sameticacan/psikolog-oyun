import type { BadgeName } from "@/types/simulator";

interface WelcomeScreenProps {
  bestScore: number | null;
  lastBadge: BadgeName | null;
  completedCases: number;
  completedSessions: number;
  onStart: () => void;
}

export function WelcomeScreen({ bestScore, lastBadge, completedCases, completedSessions, onStart }: WelcomeScreenProps) {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 items-center px-5 pb-10 sm:px-8">
      <div className="grid w-full items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        <section className="animate-rise">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-mint/20 bg-mint/10 px-3 py-1.5 text-xs font-semibold text-mint">
            <span className="h-1.5 w-1.5 rounded-full bg-mint" />Her oturum 10 vaka · yaklaşık 8 dakika
          </div>
          <h1 className="max-w-3xl text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.035em] text-cream sm:text-5xl lg:text-6xl">
            Bir yanıt seç. Bağı kur. Hikâyenin değişimini izle.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
            Çocuk, ergen ve genç yetişkinlerin kısa anlatılarını oku; empatiyi, etik sınırları ve klinik düşünmeyi gözeten yaklaşımı seç.
          </p>
          <p className="mt-4 max-w-2xl rounded-2xl border border-sky/15 bg-sky/[0.045] px-4 py-3 text-sm leading-6 text-slate-300">
            Ebeveynler, psikoloji öğrencileri ve ruh sağlığı alanına ilgi duyanlar için eğitim amaçlı mini simülasyon.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <button className="primary-button" onClick={onStart}>Simülasyona Başla <span aria-hidden="true">→</span></button>
            {bestScore !== null && <div className="px-2 py-2 text-sm text-slate-400">En iyi sonuç <span className="font-bold text-sky">{bestScore}/100</span></div>}
          </div>
          {(lastBadge || completedCases > 0 || completedSessions > 0) && (
            <div className="mt-5 flex flex-wrap gap-2 text-xs">
              {lastBadge && <span className="rounded-full border border-mint/20 bg-mint/[0.06] px-3 py-1.5 text-mint">Son rozet · {lastBadge}</span>}
              <span className="rounded-full border border-line bg-panel/60 px-3 py-1.5 text-slate-300">Toplam {completedCases} vaka tamamlandı</span>
              <span className="rounded-full border border-line bg-panel/60 px-3 py-1.5 text-slate-300">{completedSessions} oturum tamamlandı</span>
            </div>
          )}
        </section>

        <aside className="glass-card animate-rise-delayed p-5 sm:p-6">
          <div className="mb-6 flex items-start justify-between">
            <div><p className="eyebrow">Oyun pusulan</p><h2 className="mt-2 text-xl font-semibold text-cream">Dört alanı dengede tut</h2></div>
            <div className="grid h-11 w-11 place-items-center rounded-full border border-sky/20 bg-sky/10 text-sky">✦</div>
          </div>
          <div className="space-y-3">
            {[
              ["01", "Güven", "Şeffaf ve iş birliğine açık bir ilişki"],
              ["02", "Empati", "Deneyimi yargılamadan duyabilmek"],
              ["03", "Etik Duruş", "Sınır, mahremiyet ve güvenliği gözetmek"],
              ["04", "Klinik Uygunluk", "Bağlama uygun, ölçülü düşünmek"],
            ].map(([number, title, text]) => (
              <div key={title} className="flex gap-3 rounded-2xl border border-line/70 bg-ink/30 p-3.5">
                <span className="pt-0.5 font-mono text-xs text-mint">{number}</span>
                <div><h3 className="text-sm font-semibold text-cream">{title}</h3><p className="mt-1 text-xs leading-5 text-slate-400">{text}</p></div>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </main>
  );
}
