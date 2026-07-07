export interface StaffLevel {
  level: number;
  name: string;
  benefit: string;
  upgradeCost: number;
}

export const ASSISTANT_HIRE_COST = 2500;
export const ASSISTANT_DAILY_COST = 350;

export const assistantLevels: StaffLevel[] = [
  { level: 1, name: "Randevu düzeni", benefit: "Günlük maksimum randevu +1", upgradeCost: 0 },
  { level: 2, name: "Hatırlatma sistemi", benefit: "No-show olasılığını belirgin azaltır", upgradeCost: 1100 },
  { level: 3, name: "Ön bilgilendirme", benefit: "Danışan akışını ve hazırlığı iyileştirir", upgradeCost: 1600 },
  { level: 4, name: "Ofis koordinasyonu", benefit: "Akış ve gün sonu raporlamasını güçlendirir", upgradeCost: 2200 },
];

