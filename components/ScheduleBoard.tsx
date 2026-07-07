import type { DailyClient, OfficeState } from "@/types/office";

export function ScheduleBoard({ queue, state, onStart, onClose }: { queue: DailyClient[]; state: OfficeState; onStart: () => void; onClose: () => void }) {
  const status = { waiting: "Bekliyor", completed: "Tamamlandı", "no-show": "Gelmedi" } as const;
  return (
    <section className="office-modal office-board animate-rise" role="dialog" aria-modal="true" aria-label="Randevu takvimi">
      <div className="office-panel-heading"><div><p className="eyebrow">Gün {state.day} · randevu akışı</p><h2>Bugünün takvimi</h2></div><button onClick={onClose} aria-label="Kapat">×</button></div>
      <div className="schedule-list">
        {queue.map((client, index) => <article key={`${client.caseStudy.id}-${index}`} className={client.status}>
          <time>{String(18 + index).padStart(2, "0")}:00</time><span><strong>{client.caseStudy.characterName}</strong><small>{client.caseStudy.topic} · {client.caseStudy.age}</small></span><em>{status[client.status]}</em>
        </article>)}
      </div>
      <div className="assistant-note"><span>{state.assistantHired ? "✓" : "!"}</span><p><strong>{state.assistantHired ? "Asistan planı düzenledi" : "Takvimi kendin yönetiyorsun"}</strong>{state.assistantHired ? " Hatırlatmalar no-show riskini azaltıyor." : " Asistan, günlük kapasiteyi ve hatırlatma düzenini iyileştirir."}</p></div>
      <button className="primary-button mt-4 w-full" onClick={onStart} disabled={!queue.some((c) => c.status === "waiting") || state.energy < 18}>Sıradaki seansı başlat <span>→</span></button>
    </section>
  );
}

