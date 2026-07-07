"use client";

import { useEffect, useRef, useState } from "react";
import { ASSISTANT_DAILY_COST, ASSISTANT_HIRE_COST, assistantLevels } from "@/data/staff";
import { officeUpgrades } from "@/data/upgrades";
import { cases } from "@/data/cases";
import { calculateSessionOutcome, clampStat, getDemandCapacity, getUpgradeBonuses } from "@/lib/economy";
import { EMPTY_DAY_LEDGER, INITIAL_OFFICE_STATE, loadOfficeSnapshot, saveOfficeSnapshot } from "@/lib/officeStorage";
import { createSessionCases } from "@/lib/session";
import type { Choice, Metrics } from "@/types/simulator";
import type { DailyClient, DayLedger, OfficePanel, OfficeScreen, OfficeState, SessionOutcome, StoredDailyClient } from "@/types/office";
import { AppHeader } from "./AppHeader";
import { AssistantPanel } from "./AssistantPanel";
import { CaseScreen } from "./CaseScreen";
import { DaySummary } from "./DaySummary";
import { FeedbackScreen } from "./FeedbackScreen";
import { GameShell } from "./GameShell";
import { OfficeHub } from "./OfficeHub";
import { UpgradeShop } from "./UpgradeShop";

const INITIAL_METRICS: Metrics = { trust: 50, empathy: 50, ethics: 50, clinical: 50 };

function createDailyQueue(state: OfficeState): DailyClient[] {
  const capacity = Math.min(4, getDemandCapacity(state));
  const selected = createSessionCases(cases.filter((item) => !item.risk), capacity);
  if (state.day % 5 === 0) {
    const riskCase = cases.find((item) => item.risk);
    if (riskCase) selected[selected.length - 1] = riskCase;
  }
  return selected.map((caseStudy, index) => ({ caseStudy, status: index < state.completedSessionsToday ? "completed" : "waiting" }));
}

function restoreDailyQueue(stored: StoredDailyClient[], queueDay: number, state: OfficeState): DailyClient[] | null {
  if (queueDay !== state.day || stored.length < 2 || stored.length > 4) return null;
  const restored = stored.flatMap((client) => {
    const caseStudy = cases.find((item) => item.id === client.caseId);
    return caseStudy ? [{ caseStudy, status: client.status }] : [];
  });
  if (restored.length !== stored.length || new Set(restored.map((client) => client.caseStudy.id)).size !== restored.length) return null;
  return restored;
}

function noShowChance(state: OfficeState) {
  if (!state.assistantHired) return 14;
  if (state.assistantLevel >= 3) return 2;
  if (state.assistantLevel >= 2) return 4;
  return 8;
}

export function OfficeGame() {
  const [started, setStarted] = useState(false);
  const [screen, setScreen] = useState<OfficeScreen>("office");
  const [state, setState] = useState<OfficeState>(INITIAL_OFFICE_STATE);
  const [queue, setQueue] = useState<DailyClient[]>(() => createDailyQueue(INITIAL_OFFICE_STATE));
  const [panel, setPanel] = useState<OfficePanel>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [activeClientIndex, setActiveClientIndex] = useState<number | null>(null);
  const [metrics, setMetrics] = useState<Metrics>(INITIAL_METRICS);
  const [selectedChoice, setSelectedChoice] = useState<Choice | null>(null);
  const [outcome, setOutcome] = useState<SessionOutcome | null>(null);
  const [ledger, setLedger] = useState<DayLedger>(EMPTY_DAY_LEDGER);
  const [storageReady, setStorageReady] = useState(false);
  const selectionLock = useRef(false);

  useEffect(() => {
    const stored = loadOfficeSnapshot();
    setState(stored.state);
    setQueue(restoreDailyQueue(stored.dailyQueue, stored.queueDay, stored.state) ?? createDailyQueue(stored.state));
    setLedger(stored.queueDay === stored.state.day ? stored.ledger : EMPTY_DAY_LEDGER);
    setStorageReady(true);
  }, []);

  useEffect(() => {
    if (storageReady) saveOfficeSnapshot(state, queue, ledger);
  }, [ledger, queue, state, storageReady]);

  const activeClient = activeClientIndex === null ? null : queue[activeClientIndex];

  const startSession = () => {
    const clientIndex = queue.findIndex((client) => client.status === "waiting");
    if (clientIndex < 0) { setMessage("Bugünün bekleyen danışanı kalmadı. Gün sonu raporunu hazırlayabilirsin."); setPanel(null); return; }
    if (state.energy < 18) { setMessage("Enerjin düşük. Bugün dinlenmek daha sağlıklı olabilir; yeni seans önerilmiyor."); setPanel(null); return; }
    const candidate = queue[clientIndex];
    const roll = (state.day * 17 + candidate.caseStudy.id * 13) % 100;
    if (roll < noShowChance(state)) {
      setQueue((current) => current.map((client, index) => index === clientIndex ? { ...client, status: "no-show" } : client));
      setLedger((current) => ({ ...current, noShows: current.noShows + 1 }));
      setMessage(state.assistantHired ? "Danışan randevuya gelemedi; asistan sıradaki kişiyi bilgilendirdi." : "Danışan randevuya gelmedi. Hatırlatma düzeni için asistan desteği faydalı olabilir.");
      setPanel(null);
      return;
    }
    const bonuses = getUpgradeBonuses(state.purchasedUpgrades);
    setMetrics({ trust: 50 + bonuses.trust, empathy: 50 + bonuses.empathy, ethics: 50, clinical: 50 + bonuses.clinical });
    setActiveClientIndex(clientIndex);
    setSelectedChoice(null);
    setOutcome(null);
    selectionLock.current = false;
    setPanel(null);
    setMessage(null);
    setScreen("session");
  };

  const chooseApproach = (choiceId: string) => {
    if (!activeClient || selectionLock.current) return;
    const choice = activeClient.caseStudy.choices.find((item) => item.id === choiceId);
    if (!choice) return;
    selectionLock.current = true;
    const nextMetrics = {
      trust: clampStat(metrics.trust + choice.impact.trust), empathy: clampStat(metrics.empathy + choice.impact.empathy),
      ethics: clampStat(metrics.ethics + choice.impact.ethics), clinical: clampStat(metrics.clinical + choice.impact.clinical),
    };
    const result = calculateSessionOutcome(choice, state, Boolean(activeClient.caseStudy.risk));
    setMetrics(nextMetrics);
    setSelectedChoice(choice);
    setOutcome(result);
    setQueue((current) => current.map((client, index) => index === activeClientIndex ? { ...client, status: "completed" } : client));
    setState((current) => ({ ...current, money: current.money + result.income, reputation: clampStat(current.reputation + result.reputationChange), ethicalTrust: clampStat(current.ethicalTrust + result.ethicalTrustChange), energy: clampStat(current.energy + result.energyChange), completedSessionsToday: current.completedSessionsToday + 1, totalSessions: current.totalSessions + 1 }));
    setLedger((current) => ({ ...current, grossIncome: current.grossIncome + result.income, reputationChange: current.reputationChange + result.reputationChange, ethicalTrustChange: current.ethicalTrustChange + result.ethicalTrustChange, sessions: current.sessions + 1 }));
    setScreen("feedback");
  };

  const endDay = () => {
    const expenses = (state.assistantHired ? ASSISTANT_DAILY_COST : 0) + (state.day % 5 === 0 ? state.rentDue : 0);
    setLedger((current) => ({ ...current, expenses }));
    setState((current) => ({ ...current, money: current.money - expenses }));
    setPanel(null);
    setScreen("daySummary");
  };

  const startNextDay = () => {
    const nextState = { ...state, day: state.day + 1, completedDays: state.completedDays + 1, completedSessionsToday: 0, energy: 100 };
    setState(nextState); setQueue(createDailyQueue(nextState)); setLedger(EMPTY_DAY_LEDGER); setMessage(null); setScreen("office");
  };

  const hireAssistant = () => {
    if (state.assistantHired || state.money < ASSISTANT_HIRE_COST) return;
    setState((current) => ({ ...current, money: current.money - ASSISTANT_HIRE_COST, assistantHired: true, assistantLevel: 1 }));
  };

  const upgradeAssistant = () => {
    const next = assistantLevels.find((item) => item.level === state.assistantLevel + 1);
    if (!next || state.money < next.upgradeCost) return;
    setState((current) => ({ ...current, money: current.money - next.upgradeCost, assistantLevel: next.level }));
  };

  const buyUpgrade = (id: string) => {
    const upgrade = officeUpgrades.find((item) => item.id === id);
    if (!upgrade || state.purchasedUpgrades.includes(id) || state.money < upgrade.cost) return;
    setState((current) => ({ ...current, money: current.money - upgrade.cost, purchasedUpgrades: [...current.purchasedUpgrades, id], officeLevel: Math.min(4, 1 + Math.floor((current.purchasedUpgrades.length + 1) / 2)) }));
  };

  const changeFee = (fee: OfficeState["sessionFee"]) => {
    setState((current) => ({ ...current, sessionFee: fee }));
    setMessage(fee >= 800 && state.reputation < 35 ? "Bu ücret mevcut itibar düzeyinde randevu talebini azaltabilir." : "Yeni ücret bir sonraki randevu planına yansıtıldı.");
  };

  if (!started) return <GameShell><AppHeader /><main className="office-welcome"><section className="animate-rise"><span className="welcome-kicker"><i />YENİ · OFİS YÖNETİMİ</span><p className="eyebrow">Terapi Odası</p><h1>Kapıyı aç.<br /><em>Günü dengede tut.</em></h1><p>Danışanlarını karşıla, etik kararlar ver, enerjini koru ve kazandığın gelirle sıcak bir ofis kur.</p><div className="welcome-loop"><span>01 <b>Randevuyu planla</b></span><i>→</i><span>02 <b>Seansı yürüt</b></span><i>→</i><span>03 <b>Ofisi geliştir</b></span></div><button className="primary-button" onClick={() => setStarted(true)}>Ofise başla <span>→</span></button><small>Bu bir eğitim simülasyonudur; terapi, tanı veya gerçek klinik yönlendirme değildir.</small></section><aside className="welcome-office-card"><div className="mini-office-window" /><div className="mini-office-desk" /><div className="mini-office-chair" /><div className="mini-office-plant" /><span>GÜN 01 · OFİS HAZIR</span></aside></main></GameShell>;

  return <GameShell>
    {screen === "office" && <OfficeHub state={state} queue={queue} panel={panel} message={message} onPanel={setPanel} onStartSession={startSession} onEndDay={endDay} onOpenUpgrades={() => setScreen("upgradeShop")} onOpenStaff={() => setScreen("staff")} onFeeChange={changeFee} />}
    {screen === "session" && activeClient && <CaseScreen caseStudy={activeClient.caseStudy} metrics={metrics} current={state.completedSessionsToday + 1} total={queue.length} onChoose={chooseApproach} />}
    {screen === "feedback" && activeClient && selectedChoice && <FeedbackScreen caseStudy={activeClient.caseStudy} choice={selectedChoice} metrics={metrics} current={state.completedSessionsToday} total={queue.length} isLast onNext={() => setScreen("final")} nextLabel="Seans sonucunu gör" />}
    {screen === "final" && outcome && activeClient && <main className="session-final"><section className="session-final-card animate-rise"><span className={outcome.ethicalConcern ? "warning" : "success"}>{outcome.ethicalConcern ? "!" : "✓"}</span><p className="eyebrow">Seans tamamlandı</p><h1>{activeClient.caseStudy.characterName} ile görüşme kapandı</h1><p>{outcome.message}</p><div className="session-result-grid"><span><small>Yaklaşım puanı</small><strong>{outcome.score}</strong></span><span><small>Ofis geliri</small><strong>+{outcome.income} TL</strong></span><span><small>İtibar</small><strong>{outcome.reputationChange >= 0 ? "+" : ""}{outcome.reputationChange}</strong></span><span><small>Etik güven</small><strong>{outcome.ethicalTrustChange >= 0 ? "+" : ""}{outcome.ethicalTrustChange}</strong></span><span><small>Enerji</small><strong>−18</strong></span></div>{activeClient.caseStudy.risk && <div className="risk-priority-note"><strong>Güvenlik ekonomik sonuçtan önce gelir.</strong> Risk durumlarında şeffaf güvenlik planı, güvenilir destek ağı ve gerektiğinde acil yardım önceliklidir.</div>}<button className="primary-button w-full" onClick={() => { setScreen("office"); setMessage(outcome.ethicalConcern ? outcome.message : null); }}>Ofise dön <span>→</span></button></section></main>}
    {screen === "upgradeShop" && <UpgradeShop state={state} onBuy={buyUpgrade} onClose={() => setScreen("office")} />}
    {screen === "staff" && <AssistantPanel state={state} onHire={hireAssistant} onUpgrade={upgradeAssistant} onClose={() => setScreen("office")} />}
    {screen === "daySummary" && <DaySummary state={state} ledger={ledger} onNextDay={startNextDay} />}
  </GameShell>;
}
