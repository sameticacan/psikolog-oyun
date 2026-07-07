import { officeUpgrades } from "@/data/upgrades";
import type { OfficeState } from "@/types/office";

export function UpgradeShop({ state, onBuy, onClose }: { state: OfficeState; onBuy: (id: string) => void; onClose: () => void }) {
  return <section className="management-screen animate-rise">
    <div className="management-topbar"><button onClick={onClose}>← Ofise dön</button><div><p className="eyebrow">Mekân ve eğitim</p><h1>Ofis geliştirmeleri</h1></div><span>{state.money.toLocaleString("tr-TR")} TL</span></div>
    <p className="shop-intro">Her geliştirme kalıcıdır ve ofis sahnesinde görünür. Konfor, mahremiyet ve eğitim altyapısı; etik yaklaşımın yerini almaz, onu destekler.</p>
    <div className="upgrade-grid">{officeUpgrades.map((upgrade) => {
      const purchased = state.purchasedUpgrades.includes(upgrade.id);
      return <article key={upgrade.id} className={purchased ? "purchased" : ""}>
        <span className="upgrade-icon">{upgrade.icon}</span><div><p className="eyebrow">{upgrade.effectLabel}</p><h2>{upgrade.name}</h2><p>{upgrade.description}</p></div>
        <button onClick={() => onBuy(upgrade.id)} disabled={purchased || state.money < upgrade.cost}>{purchased ? "Kuruldu ✓" : `${upgrade.cost.toLocaleString("tr-TR")} TL`}</button>
      </article>;
    })}</div>
  </section>;
}

