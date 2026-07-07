import { ASSISTANT_DAILY_COST, ASSISTANT_HIRE_COST, assistantLevels } from "@/data/staff";
import type { OfficeState } from "@/types/office";

interface AssistantPanelProps {
  state: OfficeState;
  onHire: () => void;
  onUpgrade: () => void;
  onClose: () => void;
}

export function AssistantPanel({ state, onHire, onUpgrade, onClose }: AssistantPanelProps) {
  const nextLevel = assistantLevels.find((item) => item.level === state.assistantLevel + 1);
  return <section className="management-screen animate-rise">
    <div className="management-topbar"><button onClick={onClose}>← Ofise dön</button><div><p className="eyebrow">Personel yönetimi</p><h1>Resepsiyon ve asistan</h1></div><span>{state.money.toLocaleString("tr-TR")} TL</span></div>
    <div className="assistant-layout">
      <article className="assistant-profile">
        <div className="assistant-avatar"><span>♙</span></div>
        <div><p className="eyebrow">{state.assistantHired ? "Aktif ekip üyesi" : "Pozisyon açık"}</p><h2>{state.assistantHired ? "Deniz · Ofis Asistanı" : "Ofis asistanı ara"}</h2><p>{state.assistantHired ? "Randevu hatırlatmaları, danışan akışı ve günlük plan konusunda ofise destek oluyor." : "Asistan, idari akışı düzenler; klinik kararların veya danışan güvenliğinin yerini almaz."}</p></div>
        {!state.assistantHired && <button className="primary-button" onClick={onHire} disabled={state.money < ASSISTANT_HIRE_COST}>İşe al · {ASSISTANT_HIRE_COST.toLocaleString("tr-TR")} TL</button>}
      </article>
      <div className="staff-progress">
        <div className="staff-cost-note"><span>Günlük gider</span><strong>{state.assistantHired ? `${ASSISTANT_DAILY_COST} TL` : "—"}</strong><small>Her gün sonunda kasadan düşer</small></div>
        <div className="staff-levels">{assistantLevels.map((level) => <article key={level.level} className={state.assistantLevel >= level.level ? "active" : ""}>
          <span>{state.assistantLevel >= level.level ? "✓" : level.level}</span><div><strong>Seviye {level.level} · {level.name}</strong><small>{level.benefit}</small></div>
        </article>)}</div>
        {state.assistantHired && nextLevel && <button className="secondary-button w-full" onClick={onUpgrade} disabled={state.money < nextLevel.upgradeCost}>Seviye {nextLevel.level} geliştir · {nextLevel.upgradeCost.toLocaleString("tr-TR")} TL</button>}
        {state.assistantLevel === 4 && <p className="max-level-note">Asistan en yüksek koordinasyon seviyesinde.</p>}
      </div>
    </div>
  </section>;
}

