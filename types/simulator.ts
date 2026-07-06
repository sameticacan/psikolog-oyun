export type MetricKey = "trust" | "empathy" | "ethics" | "clinical";

export type Metrics = Record<MetricKey, number>;

export type CharacterEmotion =
  | "anxious"
  | "sad"
  | "angry"
  | "withdrawn"
  | "confused"
  | "tired"
  | "worried"
  | "hopeful"
  | "guarded";

export type CharacterAgeGroup = "child" | "teen" | "young-adult" | "parent";

export interface CharacterProfile {
  id: string;
  name: string;
  ageGroup: CharacterAgeGroup;
  emotion: CharacterEmotion;
  image: string;
}

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
  characterId: string;
  characterName: string;
  characterAgeGroup: CharacterAgeGroup;
  characterEmotion: CharacterEmotion;
  characterImage: string;
  choices: Choice[];
  risk?: boolean;
}

export type Screen = "welcome" | "case" | "feedback" | "final";

export interface SessionState {
  screen: Screen;
  caseIndex: number;
  metrics: Metrics;
  selectedChoice: Choice | null;
  completedInSession: number;
}

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
