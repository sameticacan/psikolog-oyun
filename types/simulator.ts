export type MetricKey = "trust" | "empathy" | "ethics" | "clinical";

export type Metrics = Record<MetricKey, number>;

export interface Choice {
  id: string;
  text: string;
  impact: Metrics;
  result: string;
  explanation: string;
}

export interface CaseStudy {
  id: number;
  topic: string;
  title: string;
  age: string;
  narrative: string;
  prompt: string;
  choices: Choice[];
  risk?: boolean;
}

export type Screen = "welcome" | "case" | "feedback" | "final";
