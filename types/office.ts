import type { CaseStudy, Metrics } from "./simulator";

export type OfficeScreen =
  | "office"
  | "session"
  | "feedback"
  | "final"
  | "daySummary"
  | "upgradeShop"
  | "staff";

export type OfficePanel = "schedule" | "fee" | "waiting" | "notes" | "endDay" | null;

export interface OfficeState {
  money: number;
  reputation: number;
  ethicalTrust: number;
  energy: number;
  day: number;
  completedSessionsToday: number;
  totalSessions: number;
  completedDays: number;
  sessionFee: 400 | 600 | 800 | 1000;
  rentDue: number;
  assistantHired: boolean;
  assistantLevel: number;
  officeLevel: number;
  purchasedUpgrades: string[];
}

export interface DailyClient {
  caseStudy: CaseStudy;
  status: "waiting" | "completed" | "no-show";
}

export interface StoredDailyClient {
  caseId: number;
  status: DailyClient["status"];
}

export interface DayLedger {
  grossIncome: number;
  expenses: number;
  reputationChange: number;
  ethicalTrustChange: number;
  sessions: number;
  noShows: number;
}

export interface OfficeStorageSnapshot {
  version: 2;
  state: OfficeState;
  queueDay: number;
  dailyQueue: StoredDailyClient[];
  ledger: DayLedger;
}

export interface SessionOutcome {
  score: number;
  income: number;
  reputationChange: number;
  ethicalTrustChange: number;
  energyChange: number;
  message: string;
  ethicalConcern: boolean;
}

export interface ActiveSession {
  clientIndex: number;
  metrics: Metrics;
}
