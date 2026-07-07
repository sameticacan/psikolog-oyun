import type { DailyClient, OfficePanel, OfficeState } from "@/types/office";
import { FeeSettings } from "./FeeSettings";
import { OfficeHud } from "./OfficeHud";
import { OfficeRoom } from "./OfficeRoom";
import { ScheduleBoard } from "./ScheduleBoard";

interface OfficeHubProps {
  state: OfficeState;
  queue: DailyClient[];
  panel: OfficePanel;
  message: string | null;
  onPanel: (panel: OfficePanel) => void;
  onStartSession: () => void;
  onEndDay: () => void;
  onOpenUpgrades: () => void;
  onOpenStaff: () => void;
  onFeeChange: (fee: OfficeState["sessionFee"]) => void;
}

export function OfficeHub({ state, queue, panel, message, onPanel, onStartSession, onEndDay, onOpenUpgrades, onOpenStaff, onFeeChange }: OfficeHubProps) {
  const next = queue.find((client) => client.status === "waiting");
  const lowEnergy = state.energy < 18;
  return <main className="office-game-screen" data-queue-day={state.day} data-queue-signature={queue.map((client) => `${client.caseStudy.id}:${client.status}`).join("|")}>
    <OfficeHud state={state} />
    <div className="office-scene-wrap">
      <div className="office-scene-caption"><span className="live-dot" /><div><small>OFİS AÇIK</small><strong>{next ? `${next.caseStudy.characterName} bekleme alanında` : "Bugünün randevuları tamamlandı"}</strong></div></div>
      <OfficeRoom state={state} queue={queue} onStartSession={onStartSession} onOpenSchedule={() => onPanel("schedule")} onOpenNotes={() => onPanel("notes")} onOpenUpgrades={onOpenUpgrades} onOpenWaiting={() => onPanel("waiting")} onOpenStaff={onOpenStaff} />
      {(message || lowEnergy || state.ethicalTrust < 25 || state.money < 0) && <div className="office-alert"><span>◇</span><p>{message ?? (lowEnergy ? "Enerjin düşük. Bugün dinlenmek daha sağlıklı olabilir; yeni seans önerilmiyor." : state.ethicalTrust < 25 ? "Ofis itibarı zedeleniyor. Daha dikkatli ve etik sınırları gözeten kararlar almalısın." : "Giderler artıyor; dengeli ücret ve seans planı gerekebilir.")}</p></div>}
    </div>
    <nav className="office-action-bar" aria-label="Ofis eylemleri">
      <div className="next-client-card"><span>{next ? next.caseStudy.characterName.slice(0, 1) : "✓"}</span><p><small>SIRADAKİ DANIŞAN</small><strong>{next ? next.caseStudy.characterName : "Randevu kalmadı"}</strong>{next && <em>{next.caseStudy.topic} · {next.caseStudy.age}</em>}</p></div>
      <button className="start-session-button" onClick={onStartSession} disabled={!next || lowEnergy}><span>▷</span><b>Seansı başlat</b><small>{state.sessionFee} TL · 18 enerji</small></button>
      <div className="office-menu-buttons"><button onClick={() => onPanel("schedule")}><span>▦</span>Takvim</button><button onClick={onOpenUpgrades}><span>⌂</span>Geliştir</button><button onClick={onOpenStaff}><span>♙</span>Asistan</button><button onClick={() => onPanel("fee")}><span>₺</span>Ücret</button><button className="end-day" onClick={onEndDay}><span>☾</span>Günü bitir</button></div>
    </nav>
    {panel && <div className="office-modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onPanel(null); }}>
      {panel === "schedule" && <ScheduleBoard queue={queue} state={state} onStart={onStartSession} onClose={() => onPanel(null)} />}
      {panel === "fee" && <FeeSettings state={state} onChange={onFeeChange} onClose={() => onPanel(null)} />}
      {(panel === "waiting" || panel === "notes") && <section className="office-modal compact animate-rise"><div className="office-panel-heading"><div><p className="eyebrow">{panel === "waiting" ? "Bekleme alanı" : "Masa notları"}</p><h2>{panel === "waiting" ? "Bugünün danışanları" : "Günlük durum"}</h2></div><button onClick={() => onPanel(null)}>×</button></div>{panel === "waiting" ? <div className="mini-client-list">{queue.map((c, i) => <p key={i}><span>{c.caseStudy.characterName.slice(0, 1)}</span><b>{c.caseStudy.characterName}<small>{c.caseStudy.topic}</small></b><em>{c.status === "waiting" ? "Bekliyor" : c.status === "completed" ? "Tamam" : "Gelmedi"}</em></p>)}</div> : <div className="notes-panel"><p>Bugün {state.completedSessionsToday} seans tamamlandı.</p><p>Enerji sınırını ve etik güveni gözeterek günü istediğin zaman kapatabilirsin.</p><button className="secondary-button w-full" onClick={onEndDay}>Gün sonu raporunu hazırla</button></div>}</section>}
    </div>}
  </main>;
}
