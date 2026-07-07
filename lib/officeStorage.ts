import type { DailyClient, DayLedger, OfficeState, OfficeStorageSnapshot, StoredDailyClient } from "@/types/office";

export const OFFICE_STORAGE_KEY = "terapi-odasi-office-state";
export const EMPTY_DAY_LEDGER: DayLedger = { grossIncome: 0, expenses: 0, reputationChange: 0, ethicalTrustChange: 0, sessions: 0, noShows: 0 };

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
  rentDue: 800,
  assistantHired: false,
  assistantLevel: 0,
  officeLevel: 1,
  purchasedUpgrades: [],
};

const validStatuses = new Set<StoredDailyClient["status"]>(["waiting", "completed", "no-show"]);

function normalizeState(parsed: Partial<OfficeState>): OfficeState {
  return {
    ...INITIAL_OFFICE_STATE,
    ...parsed,
    purchasedUpgrades: Array.isArray(parsed.purchasedUpgrades) ? parsed.purchasedUpgrades.filter((item): item is string => typeof item === "string") : [],
    energy: Math.max(0, Math.min(100, Number(parsed.energy ?? 100))),
    rentDue: Math.min(800, Math.max(0, Number(parsed.rentDue ?? INITIAL_OFFICE_STATE.rentDue))),
  };
}

function normalizeQueue(value: unknown): StoredDailyClient[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const candidate = item as Partial<StoredDailyClient>;
    if (!Number.isInteger(candidate.caseId) || !candidate.status || !validStatuses.has(candidate.status)) return [];
    return [{ caseId: Number(candidate.caseId), status: candidate.status }];
  });
}

function normalizeLedger(value: unknown): DayLedger {
  if (!value || typeof value !== "object") return EMPTY_DAY_LEDGER;
  const ledger = value as Partial<DayLedger>;
  return Object.fromEntries(Object.keys(EMPTY_DAY_LEDGER).map((key) => [key, Number(ledger[key as keyof DayLedger]) || 0])) as unknown as DayLedger;
}

export function loadOfficeSnapshot(): Omit<OfficeStorageSnapshot, "version"> {
  if (typeof window === "undefined") return { state: INITIAL_OFFICE_STATE, queueDay: 0, dailyQueue: [], ledger: EMPTY_DAY_LEDGER };
  try {
    const stored = window.localStorage.getItem(OFFICE_STORAGE_KEY);
    if (!stored) return { state: INITIAL_OFFICE_STATE, queueDay: 0, dailyQueue: [], ledger: EMPTY_DAY_LEDGER };
    const parsed = JSON.parse(stored) as Partial<OfficeStorageSnapshot> & Partial<OfficeState>;
    if (parsed.version === 2 && parsed.state) {
      const state = normalizeState(parsed.state);
      return { state, queueDay: Number(parsed.queueDay) || 0, dailyQueue: normalizeQueue(parsed.dailyQueue), ledger: normalizeLedger(parsed.ledger) };
    }
    return { state: normalizeState(parsed), queueDay: 0, dailyQueue: [], ledger: EMPTY_DAY_LEDGER };
  } catch {
    return { state: INITIAL_OFFICE_STATE, queueDay: 0, dailyQueue: [], ledger: EMPTY_DAY_LEDGER };
  }
}

export function saveOfficeSnapshot(state: OfficeState, queue: DailyClient[], ledger: DayLedger) {
  if (typeof window === "undefined") return;
  const snapshot: OfficeStorageSnapshot = {
    version: 2,
    state,
    queueDay: state.day,
    dailyQueue: queue.map((client) => ({ caseId: client.caseStudy.id, status: client.status })),
    ledger,
  };
  window.localStorage.setItem(OFFICE_STORAGE_KEY, JSON.stringify(snapshot));
}
