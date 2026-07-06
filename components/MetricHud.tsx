import { metricLabels } from "@/lib/results";
import type { MetricKey, Metrics } from "@/types/simulator";

const metricsList: Array<{ key: MetricKey; color: string }> = [
  { key: "trust", color: "bg-mint" },
  { key: "empathy", color: "bg-sky" },
  { key: "ethics", color: "bg-[#b5a7e8]" },
  { key: "clinical", color: "bg-[#e4b77d]" },
];

export function MetricHud({ metrics }: { metrics: Metrics }) {
  return (
    <section className="metric-hud" aria-label="Seans pusulası">
      {metricsList.map(({ key, color }) => (
        <div key={key} className="metric-hud-item">
          <div><span>{metricLabels[key]}</span><strong>{metrics[key]}</strong></div>
          <div className="metric-hud-bar"><i className={color} style={{ width: `${metrics[key]}%` }} /></div>
        </div>
      ))}
    </section>
  );
}
