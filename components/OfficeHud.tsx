import type { OfficeState } from "@/types/office";

function Meter({ value, tone }: { value: number; tone: "mint" | "amber" }) {
  return <span className={`office-hud-meter ${tone}`}><i style={{ width: `${Math.max(0, Math.min(100, value))}%` }} /></span>;
}

export function OfficeHud({ state }: { state: OfficeState }) {
  const stats = [
    { icon: "₺", label: "Kasa", value: `${state.money.toLocaleString("tr-TR")} TL` },
    { icon: "✦", label: "İtibar", value: state.reputation, meter: true },
    { icon: "◇", label: "Etik güven", value: state.ethicalTrust, meter: true },
    { icon: "ϟ", label: "Enerji", value: state.energy, meter: true },
  ];

  return (
    <header className="office-hud">
      <div className="office-day-mark"><small>GÜN</small><strong>{String(state.day).padStart(2, "0")}</strong></div>
      <div className="office-hud-stats">
        {stats.map((stat) => (
          <div className="office-hud-stat" key={stat.label}>
            <span className="office-hud-icon">{stat.icon}</span>
            <span><small>{stat.label}</small><strong>{stat.value}</strong>{stat.meter && <Meter value={Number(stat.value)} tone={stat.label === "Enerji" && Number(stat.value) < 35 ? "amber" : "mint"} />}</span>
          </div>
        ))}
      </div>
      <div className="office-level"><small>OFİS</small><strong>LVL {state.officeLevel}</strong></div>
    </header>
  );
}

