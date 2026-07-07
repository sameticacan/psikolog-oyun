import type { OfficeState } from "@/types/office";

export const OFFICE_STORAGE_KEY = "terapi-odasi-office-state";

export const INITIAL_OFFICE_STATE: OfficeState = {
  money: 1500,
  reputation: 20,
  ethicalTrust: 50,
  energy: 100,
  day: 1,
  completedSessionsToday: 0,
  totalSessions: 0,
  completedDays: 0,
  sessionFee: 600,
  rentDue: 900,
  assistantHired: false,
  assistantLevel: 0,
  officeLevel: 1,
  purchasedUpgrades: [],
};

export function loadOfficeState(): OfficeState {
  if (typeof window === "undefined") return INITIAL_OFFICE_STATE;
  try {
    const stored = window.localStorage.getItem(OFFICE_STORAGE_KEY);
    if (!stored) return INITIAL_OFFICE_STATE;
    const parsed = JSON.parse(stored) as Partial<OfficeState>;
    return {
      ...INITIAL_OFFICE_STATE,
      ...parsed,
      purchasedUpgrades: Array.isArray(parsed.purchasedUpgrades) ? parsed.purchasedUpgrades : [],
      energy: Math.max(0, Math.min(100, Number(parsed.energy ?? 100))),
    };
  } catch {
    return INITIAL_OFFICE_STATE;
  }
}

export function saveOfficeState(state: OfficeState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(OFFICE_STORAGE_KEY, JSON.stringify(state));
}
