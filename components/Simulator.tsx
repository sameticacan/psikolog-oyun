"use client";

import { useEffect, useState } from "react";
import { cases } from "@/data/cases";
import type { Choice, Metrics, Screen } from "@/types/simulator";
import { AppHeader } from "./AppHeader";
import { CaseScreen } from "./CaseScreen";
import { FeedbackScreen } from "./FeedbackScreen";
import { FinalScreen } from "./FinalScreen";
import { WelcomeScreen } from "./WelcomeScreen";

const INITIAL_METRICS: Metrics = { trust: 50, empathy: 50, ethics: 50, clinical: 50 };
const clamp = (value: number) => Math.max(0, Math.min(100, value));
const getScore = (metrics: Metrics) => Math.round(Object.values(metrics).reduce((sum, value) => sum + value, 0) / 4);

export function Simulator() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [caseIndex, setCaseIndex] = useState(0);
  const [metrics, setMetrics] = useState<Metrics>(INITIAL_METRICS);
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [bestScore, setBestScore] = useState<number | null>(null);
  const [reflection, setReflection] = useState("");
  const [reflectionSaved, setReflectionSaved] = useState(false);

  useEffect(() => {
    const storedBest = window.localStorage.getItem("terapi-odasi-best-score");
    const storedReflection = window.localStorage.getItem("terapi-odasi-reflection");
    if (storedBest !== null) {
      const parsed = Number(storedBest);
      if (!Number.isNaN(parsed)) setBestScore(parsed);
    }
    if (storedReflection) { setReflection(storedReflection); setReflectionSaved(true); }
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const startSimulation = () => { setCaseIndex(0); setMetrics(INITIAL_METRICS); setSelectedChoice(null); setScreen("case"); scrollTop(); };
  const chooseApproach = (choiceId: string) => {
    const choice = cases[caseIndex].choices.find((item) => item.id === choiceId);
    if (!choice) return;
    setMetrics((current) => ({ trust: clamp(current.trust + choice.impact.trust), empathy: clamp(current.empathy + choice.impact.empathy), ethics: clamp(current.ethics + choice.impact.ethics), clinical: clamp(current.clinical + choice.impact.clinical) }));
    setSelectedChoice(choice); setScreen("feedback"); scrollTop();
  };
  const goNext = () => {
    if (caseIndex === cases.length - 1) {
      const score = getScore(metrics); const nextBest = Math.max(bestScore ?? 0, score);
      setBestScore(nextBest); window.localStorage.setItem("terapi-odasi-best-score", String(nextBest)); setScreen("final");
    } else { setCaseIndex((current) => current + 1); setSelectedChoice(null); setScreen("case"); }
    scrollTop();
  };
  const saveReflection = () => { const clean = reflection.trim(); if (!clean) return; window.localStorage.setItem("terapi-odasi-reflection", clean); setReflection(clean); setReflectionSaved(true); };
  const updateReflection = (value: string) => { setReflection(value); setReflectionSaved(false); };
  const showProgress = screen === "case" || screen === "feedback";

  return (
    <div className="app-shell">
      <AppHeader step={showProgress ? caseIndex + 1 : undefined} total={showProgress ? cases.length : undefined} />
      {screen === "welcome" && <WelcomeScreen bestScore={bestScore} onStart={startSimulation} />}
      {screen === "case" && <CaseScreen caseStudy={cases[caseIndex]} metrics={metrics} onChoose={chooseApproach} />}
      {screen === "feedback" && selectedChoice && <FeedbackScreen caseStudy={cases[caseIndex]} choice={selectedChoice} metrics={metrics} isLast={caseIndex === cases.length - 1} onNext={goNext} />}
      {screen === "final" && <FinalScreen metrics={metrics} bestScore={bestScore ?? getScore(metrics)} reflection={reflection} reflectionSaved={reflectionSaved} onReflectionChange={updateReflection} onSaveReflection={saveReflection} onRestart={startSimulation} />}
      <footer className="mx-auto w-full max-w-5xl px-5 pb-7 pt-2 text-center text-[11px] leading-5 text-slate-500 sm:px-8 sm:text-xs">Bu simülasyon bilgilendirme ve eğitim amacı taşır. Gerçek psikolojik değerlendirme, tanı veya terapi yerine geçmez.</footer>
    </div>
  );
}
