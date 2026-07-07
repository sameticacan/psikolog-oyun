export type UpgradeEffect =
  | { type: "trust"; value: number }
  | { type: "ethicalTrust"; value: number }
  | { type: "clinical"; value: number }
  | { type: "capacity"; value: number }
  | { type: "remoteChance"; value: number }
  | { type: "atmosphere"; value: number };

export interface OfficeUpgrade {
  id: string;
  name: string;
  description: string;
  cost: number;
  effectLabel: string;
  effect: UpgradeEffect;
  icon: string;
}

export const officeUpgrades: OfficeUpgrade[] = [
  { id: "comfort-chair", name: "Rahat danışan koltuğu", description: "Seans alanını daha sakin ve kapsayıcı kılar.", cost: 1200, effectLabel: "Güven bonusu +1", effect: { type: "trust", value: 1 }, icon: "◒" },
  { id: "soundproofing", name: "Ses yalıtımı", description: "Mahremiyet hissini ve etik güveni güçlendirir.", cost: 1800, effectLabel: "Etik güven +2", effect: { type: "ethicalTrust", value: 2 }, icon: "◉" },
  { id: "library", name: "Kitaplık ve materyal seti", description: "Eğitim materyallerini düzenli ve erişilebilir tutar.", cost: 1500, effectLabel: "Klinik bonus +1", effect: { type: "clinical", value: 1 }, icon: "▤" },
  { id: "waiting-area", name: "Bekleme alanı", description: "Günün randevu kapasitesini bir kişi artırır.", cost: 2200, effectLabel: "Günlük kapasite +1", effect: { type: "capacity", value: 1 }, icon: "◫" },
  { id: "online-kit", name: "Online seans ekipmanı", description: "Gelecekte uzaktan danışan akışını destekler.", cost: 2000, effectLabel: "Uzaktan danışan olasılığı", effect: { type: "remoteChance", value: 1 }, icon: "⌁" },
  { id: "plants", name: "Ofis bitkileri", description: "Odaya sıcak, dinlendirici bir atmosfer ekler.", cost: 700, effectLabel: "Empati atmosferi +1", effect: { type: "atmosphere", value: 1 }, icon: "♧" },
];

