"use client";

import { useEffect, useRef, useState } from "react";
import { cases } from "@/data/cases";
import { calculateScore, getBadge } from "@/lib/results";
import { createSessionCases } from "@/lib/session";
import type { BadgeName, Choice, Metrics, Screen } from "@/types/simulator";
import { AppHeader } from "./AppHeader";
import { CaseScreen } from "./CaseScreen";
import { FeedbackScreen } from "./FeedbackScreen";
import { FinalScreen } from "./FinalScreen";
import { GameShell } from "./GameShell";
import { WelcomeScreen } from "./WelcomeScreen";

const INITIAL_METRICS: Metrics = { trust: 50, empathy: 50, ethics: 50, clinical: 50 };
const STORAGE_KEYS = {
  bestScore: "terapi-odasi-best-score",
  reflection: "terapi-odasi-reflection",
  lastBadge: "terapi-odasi-last-badge",
  completedCases: "terapi-odasi-completed-cases",
  completedSessions: "terapi-odasi-completed-sessions",
} as const;
const badges: BadgeName[] = ["Etik Pusula", "Empati Ustası", "Klinik Düşünür", "Güven İnşa Eden", "Denge Arayan"];
const clamp = (value: number) => Math.max(0, Math.min(100, value));

export function Simulator() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [sessionCases, setSessionCases] = useState(() => cases.slice(0, 10));
  const [caseIndex, setCaseIndex] = useState(0);
  const [metrics, setMetrics] = useState<Metrics>(INITIAL_METRICS);
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [lastBadge, setLastBadge] = useState<BadgeName | null>(null);
  const [completedCases, setCompletedCases] = useState(0);
  const [completedSessions, setCompletedSessions] = useState(0);
  const [reflection, setReflection] = useState("");
  const [reflectionSaved, setReflectionSaved] = useState(false);
  const selectionLock = useRef(false);
  const sessionCompleted = useRef(false);

  useEffect(() => {
    const storedBest = Number(window.localStorage.getItem(STORAGE_KEYS.bestScore));
    const storedCompleted = Number(window.localStorage.getItem(STORAGE_KEYS.completedCases));
    const storedSessions = Number(window.localStorage.getItem(STORAGE_KEYS.completedSessions));
    const storedReflection = window.localStorage.getItem(STORAGE_KEYS.reflection);
    const storedBadge = window.localStorage.getItem(STORAGE_KEYS.lastBadge) as BadgeName | null;

    if (storedBest > 0) setBestScore(storedBest);
    if (storedCompleted > 0) setCompletedCases(storedCompleted);
    if (storedSessions > 0) setCompletedSessions(storedSessions);
    if (storedBadge && badges.includes(storedBadge)) setLastBadge(storedBadge);
    if (storedReflection) {
      setReflection(storedReflection);
      setReflectionSaved(true);
    }
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const startSimulation = () => {
    selectionLock.current = false;
    sessionCompleted.current = false;
    setSessionCases(createSessionCases(cases));
    setCaseIndex(0);
    setMetrics(INITIAL_METRICS);
    setSelectedChoice(null);
    setScreen("case");
    scrollTop();
  };

  const chooseApproach = (choiceId: string) => {
    if (selectionLock.current) return;
    const choice = sessionCases[caseIndex].choices.find((item) => item.id === choiceId);
    if (!choice) return;
    selectionLock.current = true;

    setMetrics((current) => ({
      trust: clamp(current.trust + choice.impact.trust),
      empathy: clamp(current.empathy + choice.impact.empathy),
      ethics: clamp(current.ethics + choice.impact.ethics),
      clinical: clamp(current.clinical + choice.impact.clinical),
    }));
    setCompletedCases((current) => {
      const next = current + 1;
      window.localStorage.setItem(STORAGE_KEYS.completedCases, String(next));
      return next;
    });
    setSelectedChoice(choice);
    setScreen("feedback");
    scrollTop();
  };

  const goNext = () => {
    selectionLock.current = false;
    if (caseIndex === sessionCases.length - 1) {
      const score = calculateScore(metrics);
      const badge = getBadge(metrics);
      const nextBest = Math.max(bestScore ?? 0, score);

      setBestScore(nextBest);
      setLastBadge(badge);
      window.localStorage.setItem(STORAGE_KEYS.bestScore, String(nextBest));
      window.localStorage.setItem(STORAGE_KEYS.lastBadge, badge);
      if (!sessionCompleted.current) {
        sessionCompleted.current = true;
        setCompletedSessions((current) => {
          const next = current + 1;
          window.localStorage.setItem(STORAGE_KEYS.completedSessions, String(next));
          return next;
        });
      }
      setScreen("final");
    } else {
      setCaseIndex((current) => current + 1);
      setSelectedChoice(null);
      setScreen("case");
    }
    scrollTop();
  };

  const saveReflection = () => {
    const clean = reflection.trim();
    if (!clean) return;
    window.localStorage.setItem(STORAGE_KEYS.reflection, clean);
    setReflection(clean);
    setReflectionSaved(true);
  };

  const updateReflection = (value: string) => {
    setReflection(value);
    setReflectionSaved(false);
  };

  const activeCase = sessionCases[caseIndex];

  return (
    <GameShell>
      {screen === "welcome" && <AppHeader />}
      {screen === "welcome" && <WelcomeScreen bestScore={bestScore} lastBadge={lastBadge} completedCases={completedCases} completedSessions={completedSessions} onStart={startSimulation} />}
      {screen === "case" && <CaseScreen caseStudy={activeCase} metrics={metrics} current={caseIndex + 1} total={sessionCases.length} onChoose={chooseApproach} />}
      {screen === "feedback" && selectedChoice && <FeedbackScreen caseStudy={activeCase} choice={selectedChoice} metrics={metrics} current={caseIndex + 1} total={sessionCases.length} isLast={caseIndex === sessionCases.length - 1} onNext={goNext} />}
      {screen === "final" && <FinalScreen metrics={metrics} bestScore={bestScore ?? calculateScore(metrics)} completedCases={completedCases} completedSessions={completedSessions} reflection={reflection} reflectionSaved={reflectionSaved} onReflectionChange={updateReflection} onSaveReflection={saveReflection} onRestart={startSimulation} />}
      {(screen === "welcome" || screen === "final") && (
        <footer className="mx-auto w-full max-w-5xl shrink-0 px-5 pb-3 pt-2 text-center text-[10px] leading-4 text-slate-500 sm:px-8">
          Bu simülasyon bilgilendirme ve eğitim amacı taşır. Gerçek psikolojik değerlendirme, tanı veya terapi yerine geçmez.
        </footer>
      )}
    </GameShell>
  );
}
