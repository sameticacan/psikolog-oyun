import { getResultProfile, metricLabels } from "@/lib/results";
import type { Metrics } from "@/types/simulator";
import { BadgeCard } from "./BadgeCard";
import { ScoreBoard } from "./ScoreBoard";

interface FinalScreenProps {
  metrics: Metrics;
  bestScore: number;
  reflection: string;
  reflectionSaved: boolean;
  onReflectionChange: (value: string) => void;
  onSaveReflection: () => void;
  onRestart: () => void;
}

export function FinalScreen({ metrics, bestScore, reflection, reflectionSaved, onReflectionChange, onSaveReflection, onRestart }: FinalScreenProps) {
  const profile = getResultProfile(metrics);

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-5 pb-12 sm:px-8">
      <section className="glass-card animate-rise overflow-hidden">
        <div className="border-b border-line/80 p-6 text-center sm:p-9">
          <div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-mint/25 bg-mint/10 text-2xl text-mint">✦</div>
          <p className="eyebrow mt-5">Oturum tamamlandı</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-cream sm:text-4xl">Yaklaşım puanın {profile.score}</h1>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-400">Bu puan bir yeterlilik ölçümü değil; seçimlerinin dört eğitimsel boyuttaki yansımasıdır.</p>
          {profile.score >= bestScore && <span className="mt-4 inline-flex rounded-full border border-sky/20 bg-sky/10 px-3 py-1 text-xs font-semibold text-sky">Yeni en iyi sonucun</span>}
        </div>

        <div className="grid gap-7 p-5 sm:p-8 lg:grid-cols-2">
          <div className="space-y-6">
            <BadgeCard badge={profile.badge} />
            <div><p className="eyebrow mb-4">Son göstergeler</p><ScoreBoard metrics={metrics} compact /></div>
          </div>

          <div className="space-y-3">
            <article className="rounded-2xl border border-mint/15 bg-mint/[0.055] p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-mint">En güçlü alan · {metricLabels[profile.strongest]}</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">{profile.strengthText}</p>
            </article>
            <article className="rounded-2xl border border-sky/15 bg-sky/[0.045] p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-sky">Gelişime açık alan · {metricLabels[profile.developing]}</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">{profile.developmentText}</p>
            </article>
            <article className="rounded-2xl border border-line bg-ink/30 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-[#efc793]">Genel yaklaşım tarzın</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">{profile.style}</p>
            </article>
          </div>
        </div>

        <div className="grid gap-6 border-t border-line/80 p-5 sm:p-8 lg:grid-cols-2">
          <section>
            <p className="eyebrow">Oturumdan yanında kalanlar</p>
            <h2 className="mt-2 text-xl font-semibold text-cream">3 kısa öğrenme notu</h2>
            <ol className="mt-4 space-y-3">
              {profile.learnings.map((learning, index) => (
                <li key={learning} className="flex gap-3 rounded-2xl border border-line/70 bg-white/[0.025] p-3.5 text-sm leading-6 text-slate-300">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-sky/10 text-xs font-bold text-sky">{index + 1}</span>{learning}
                </li>
              ))}
            </ol>
          </section>

          <section className="rounded-3xl border border-line/80 bg-ink/35 p-5 sm:p-6">
            <p className="eyebrow">Kendine not</p>
            <h2 className="mt-2 text-xl font-semibold text-cream">Bu simülasyondan ne öğrendin?</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">Dikkatini çeken bir yaklaşımı veya sonraki adımını birkaç cümleyle yaz.</p>
            <label htmlFor="reflection" className="sr-only">Simülasyon yansıtması</label>
            <textarea id="reflection" value={reflection} onChange={(event) => onReflectionChange(event.target.value)} placeholder="Örneğin: Çözüme geçmeden önce duyguyu anlamanın..." maxLength={600} className="mt-4 min-h-36 w-full resize-y rounded-2xl border border-line bg-panel/80 p-4 text-sm leading-6 text-cream outline-none transition placeholder:text-slate-600 focus:border-sky/60 focus:ring-2 focus:ring-sky/10" />
            <div className="mt-2 flex items-center justify-between text-xs"><span className={reflectionSaved ? "text-mint" : "text-slate-500"}>{reflectionSaved ? "Bu cihazda kaydedildi" : "Yalnızca bu cihazda saklanır"}</span><span className="text-slate-600">{reflection.length}/600</span></div>
            <button className="secondary-button mt-4 w-full" onClick={onSaveReflection} disabled={!reflection.trim()}>Yansıtmayı Kaydet</button>
          </section>
        </div>

        <div className="border-t border-line/80 p-5 sm:px-8 sm:py-6"><button className="primary-button w-full sm:mx-auto sm:w-auto" onClick={onRestart}>Yeni Bir Oturum Başlat <span aria-hidden="true">↻</span></button></div>
      </section>
    </main>
  );
}
