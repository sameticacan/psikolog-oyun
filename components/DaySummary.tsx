import type { DayLedger, OfficeState } from "@/types/office";

export function DaySummary({ state, ledger, onNextDay }: { state: OfficeState; ledger: DayLedger; onNextDay: () => void }) {
  const net = ledger.grossIncome - ledger.expenses;
  const comment = ledger.sessions === 0
    ? "Bugün seans yapılmadı. Dinlenmek ve sınırları korumak da sağlıklı bir planın parçası."
    : state.energy < 35
      ? "Yoğun bir gündü. Yeni güne geçmeden önce dinlenme sınırını korumak önemli."
      : ledger.ethicalTrustChange < 0
        ? "Etik güven geriledi. Sonraki gün iş birliği, mahremiyet ve güvenlik kararlarını öne al."
        : "Günü dengeli kapattın. Sürdürülebilir tempo, iyi kararlar kadar önemli.";
  return <main className="day-summary-screen">
    <section className="day-summary-panel animate-rise">
      <div className="summary-seal"><small>GÜN</small><strong>{state.day}</strong></div><p className="eyebrow">Ofis günlüğü</p><h1>Gün sonu raporu</h1><p className="summary-date">Seanslar tamamlandı · ofis kapatılıyor</p>
      <div className="summary-ledger">
        <article><small>Yapılan seans</small><strong>{ledger.sessions}</strong><span>{ledger.noShows ? `${ledger.noShows} randevuya gelinmedi` : "Planlanan akış tamamlandı"}</span></article>
        <article><small>Günlük gelir</small><strong className="positive">+{ledger.grossIncome.toLocaleString("tr-TR")} TL</strong><span>Seans ödemeleri</span></article>
        <article><small>Giderler</small><strong className="negative">−{ledger.expenses.toLocaleString("tr-TR")} TL</strong><span>Kira / asistan giderleri</span></article>
        <article><small>Net kazanç</small><strong className={net >= 0 ? "positive" : "negative"}>{net >= 0 ? "+" : ""}{net.toLocaleString("tr-TR")} TL</strong><span>Günün kasa hareketi</span></article>
      </div>
      <div className="summary-changes"><span>İtibar <b className={ledger.reputationChange >= 0 ? "positive" : "negative"}>{ledger.reputationChange >= 0 ? "+" : ""}{ledger.reputationChange}</b></span><span>Etik güven <b className={ledger.ethicalTrustChange >= 0 ? "positive" : "negative"}>{ledger.ethicalTrustChange >= 0 ? "+" : ""}{ledger.ethicalTrustChange}</b></span><span>Enerji <b>{state.energy}/100</b></span></div>
      <p className="summary-comment">“{comment}”</p>
      <button className="primary-button w-full" onClick={onNextDay}>Yeni güne başla <span>→</span></button>
      <p className="education-disclaimer">Bu oyun eğitim amaçlı bir karar simülasyonudur; terapi, tanı veya gerçek klinik yönlendirme sunmaz.</p>
    </section>
  </main>;
}

