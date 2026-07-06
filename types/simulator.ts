export type MetricKey = "trust" | "empathy" | "ethics" | "clinical";

export type Metrics = Record<MetricKey, number>;

export interface Choice {
  id: string;
  text: string;
  impact: Metrics;
  result: string;
  explanation: string;
  reveal?: string;
}

export interface CaseStudy {
  id: number;
  topic: string;
  title: string;
  age: string;
  narrative: string;
  prompt: string;
  clinicalImpression: string;
  ethicalFocus: string;
  choices: Choice[];
  risk?: boolean;
}

export type Screen = "welcome" | "case" | "feedback" | "final";

export type BadgeName =
  | "Etik Pusula"
  | "Empati Ustası"
  | "Klinik Düşünür"
  | "Güven İnşa Eden"
  | "Denge Arayan";

export interface ResultProfile {
  score: number;
  badge: BadgeName;
  strongest: MetricKey;
  developing: MetricKey;
  style: string;
  strengthText: string;
  developmentText: string;
  learnings: [string, string, string];
}
