import { metricLabels } from "@/lib/results";
import type { MetricKey, Metrics } from "@/types/simulator";

const metricDetails: Array<{ key: MetricKey; color: string }> = [
  { key: "trust", color: "bg-mint" },
  { key: "empathy", color: "bg-sky" },
  { key: "ethics", color: "bg-[#b5a7e8]" },
  { key: "clinical", color: "bg-[#e4b77d]" },
];

const getLevel = (value: number) => {
  if (value >= 75) return "Güçlü";
  if (value >= 50) return "Gelişiyor";
  return "Dikkat";
};

export function ScoreBoard({ metrics, compact = false }: { metrics: Metrics; compact?: boolean }) {
  return (
    <section aria-label="Yaklaşım göstergeleri" className={`grid grid-cols-1 gap-3 ${compact ? "sm:grid-cols-2" : ""}`}>
      {metricDetails.map(({ key, color }) => (
        <div key={key} className="rounded-2xl border border-line/80 bg-white/[0.035] p-3.5">
          <div className="mb-2 flex items-center justify-between gap-2">
            <div>
              <p className="text-xs font-semibold text-slate-200">{metricLabels[key]}</p>
              <p className="mt-0.5 text-[10px] text-slate-500">{getLevel(metrics[key])}</p>
            </div>
            <span className="text-sm font-bold tabular-nums text-cream">{metrics[key]}<span className="text-[10px] font-medium text-slate-500">/100</span></span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-700/80" role="progressbar" aria-label={metricLabels[key]} aria-valuemin={0} aria-valuemax={100} aria-valuenow={metrics[key]}>
            <div className={`h-full rounded-full transition-[width] duration-700 ease-out ${color}`} style={{ width: `${metrics[key]}%` }} />
          </div>
        </div>
      ))}
    </section>
  );
}
