import type { MetricKey, Metrics } from "@/types/simulator";

const metricDetails: Array<{ key: MetricKey; label: string; color: string }> = [
  { key: "trust", label: "Güven", color: "bg-mint" },
  { key: "empathy", label: "Empati", color: "bg-sky" },
  { key: "ethics", label: "Etik Duruş", color: "bg-[#b5a7e8]" },
  { key: "clinical", label: "Klinik Uygunluk", color: "bg-[#e4b77d]" },
];

export const metricLabels: Record<MetricKey, string> = {
  trust: "Güven",
  empathy: "Empati",
  ethics: "Etik Duruş",
  clinical: "Klinik Uygunluk",
};

export function ScoreBoard({ metrics, compact = false }: { metrics: Metrics; compact?: boolean }) {
  return (
    <section aria-label="Yaklaşım göstergeleri" className={`grid grid-cols-2 gap-3 ${compact ? "sm:grid-cols-4" : "sm:grid-cols-2"}`}>
      {metricDetails.map(({ key, label, color }) => (
        <div key={key} className="rounded-2xl border border-line/80 bg-white/[0.035] p-3">
          <div className="mb-2 flex items-center justify-between gap-2 text-xs font-semibold text-slate-300">
            <span>{label}</span><span className="tabular-nums text-cream">{metrics[key]}</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-slate-700" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={metrics[key]}>
            <div className={`h-full rounded-full transition-[width] duration-500 ease-out ${color}`} style={{ width: `${metrics[key]}%` }} />
          </div>
        </div>
      ))}
    </section>
  );
}
