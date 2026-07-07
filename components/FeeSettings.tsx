import { canUseFee } from "@/lib/economy";
import type { OfficeState } from "@/types/office";

const feeOptions = [
  { value: 400 as const, name: "Erişilebilir", note: "Daha yüksek randevu talebi" },
  { value: 600 as const, name: "Dengeli", note: "Gelir ve erişim dengesi" },
  { value: 800 as const, name: "Yüksek", note: "Düşük itibarda talep azalır" },
  { value: 1000 as const, name: "Uzmanlık", note: "60 itibar ve etik güven gerekir" },
];

export function FeeSettings({ state, onChange, onClose }: { state: OfficeState; onChange: (fee: OfficeState["sessionFee"]) => void; onClose: () => void }) {
  return <section className="office-modal compact animate-rise" role="dialog" aria-modal="true" aria-label="Seans ücreti ayarları">
    <div className="office-panel-heading"><div><p className="eyebrow">Erişim ve sürdürülebilirlik</p><h2>Seans ücreti</h2></div><button onClick={onClose} aria-label="Kapat">×</button></div>
    <p className="office-panel-copy">Ücret, ofis giderlerini karşılarken erişilebilirliği de gözetmeli. Yüksek ücret düşük itibarda randevu talebini azaltır.</p>
    <div className="fee-grid">{feeOptions.map((fee) => {
      const enabled = canUseFee(fee.value, state);
      return <button key={fee.value} disabled={!enabled} className={state.sessionFee === fee.value ? "selected" : ""} onClick={() => onChange(fee.value)}><strong>{fee.value} TL</strong><span>{fee.name}</span><small>{enabled ? fee.note : "Henüz uygun değil"}</small></button>;
    })}</div>
  </section>;
}
