import type { MetricKey, Metrics } from "@/types/simulator";
import { metricLabels, ScoreBoard } from "./ScoreBoard";

const metricKeys: MetricKey[] = ["trust", "empathy", "ethics", "clinical"];

export function FinalScreen({ metrics, bestScore, reflection, reflectionSaved, onReflectionChange, onSaveReflection, onRestart }: { metrics: Metrics; bestScore: number; reflection: string; reflectionSaved: boolean; onReflectionChange: (value: string) => void; onSaveReflection: () => void; onRestart: () => void }) {
  const score = Math.round(Object.values(metrics).reduce((sum, value) => sum + value, 0) / 4);
  const sorted = [...metricKeys].sort((a, b) => metrics[b] - metrics[a]);
  const strongest = sorted[0];
  const developing = sorted[sorted.length - 1];
  const strengthText: Record<MetricKey, string> = {
    trust: "Şeffaf, güven veren ve iş birliğine açık bir ilişki kurma eğilimin güçlü.",
    empathy: "Duygusal deneyimi küçümsemeden duyma ve doğrulama konusunda iyi bir pusulan var.",
    ethics: "Mahremiyet, özerklik, sınırlar ve güvenlik arasında dikkatli düşünüyorsun.",
    clinical: "Tek bir açıklamaya atlamadan bağlamı ve işlevselliği birlikte değerlendirebiliyorsun.",
  };
  const developmentText: Record<MetricKey, string> = {
    trust: "Kararları kişiyle birlikte almak ve süreci daha şeffaf açıklamak güven alanını güçlendirebilir.",
    empathy: "Çözüme geçmeden önce duyguyu biraz daha duymak ve doğrulamak yararlı olabilir.",
    ethics: "Gizlilik sınırları, gelişimsel özerklik ve güvenlik istisnelerini birlikte düşünmeyi sürdürebilirsin.",
    clinical: "Belirtileri bağlam, süre, işlevsellik ve destek kaynaklarıyla birlikte ele almak yaklaşımını geliştirebilir.",
  };
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-5 pb-12 sm:px-8">
      <section className="glass-card animate-rise overflow-hidden">
        <div className="border-b border-line/80 p-6 text-center sm:p-9"><div className="mx-auto grid h-16 w-16 place-items-center rounded-full border border-mint/25 bg-mint/10 text-2xl text-mint">✦</div><p className="eyebrow mt-5">Simülasyon tamamlandı</p><h1 className="mt-2 text-3xl font-semibold tracking-tight text-cream sm:text-4xl">Yaklaşım puanın {score}</h1><p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-400">Bu puan bir yeterlilik ölçümü değil; seçimlerinin dört eğitimsel boyuttaki yansımasıdır.</p>{score >= bestScore && <span className="mt-4 inline-flex rounded-full border border-sky/20 bg-sky/10 px-3 py-1 text-xs font-semibold text-sky">En iyi sonucun</span>}</div>
        <div className="grid gap-7 p-5 sm:p-8 lg:grid-cols-2">
          <div><p className="eyebrow mb-4">Son göstergeler</p><ScoreBoard metrics={metrics} /><div className="mt-6 space-y-3"><article className="rounded-2xl border border-mint/15 bg-mint/[0.055] p-4"><p className="text-xs font-bold uppercase tracking-wider text-mint">Güçlü yön · {metricLabels[strongest]}</p><p className="mt-2 text-sm leading-6 text-slate-300">{strengthText[strongest]}</p></article><article className="rounded-2xl border border-sky/15 bg-sky/[0.045] p-4"><p className="text-xs font-bold uppercase tracking-wider text-sky">Gelişime açık · {metricLabels[developing]}</p><p className="mt-2 text-sm leading-6 text-slate-300">{developmentText[developing]}</p></article></div></div>
          <div className="rounded-3xl border border-line/80 bg-ink/35 p-5 sm:p-6"><p className="eyebrow">Kendine not</p><h2 className="mt-2 text-xl font-semibold text-cream">Bu simülasyondan ne öğrendin?</h2><p className="mt-2 text-sm leading-6 text-slate-400">Dikkatini çeken bir yaklaşımı veya sonraki adımını birkaç cümleyle yaz.</p><label htmlFor="reflection" className="sr-only">Simülasyon yansıtması</label><textarea id="reflection" value={reflection} onChange={(event) => onReflectionChange(event.target.value)} placeholder="Örneğin: Çözüme geçmeden önce duyguyu anlamanın..." maxLength={600} className="mt-4 min-h-36 w-full resize-y rounded-2xl border border-line bg-panel/80 p-4 text-sm leading-6 text-cream outline-none transition placeholder:text-slate-600 focus:border-sky/60 focus:ring-2 focus:ring-sky/10" /><div className="mt-2 flex items-center justify-between text-xs"><span className={reflectionSaved ? "text-mint" : "text-slate-500"}>{reflectionSaved ? "Bu cihazda kaydedildi" : "Yalnızca bu cihazda saklanır"}</span><span className="text-slate-600">{reflection.length}/600</span></div><button className="secondary-button mt-4 w-full" onClick={onSaveReflection} disabled={!reflection.trim()}>Yansıtmayı Kaydet</button></div>
        </div>
        <div className="border-t border-line/80 p-5 sm:px-8 sm:py-6"><button className="primary-button w-full sm:mx-auto sm:w-auto" onClick={onRestart}>Yeniden Başlat <span aria-hidden="true">↻</span></button></div>
      </section>
    </main>
  );
}
