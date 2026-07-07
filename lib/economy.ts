import { officeUpgrades } from "@/data/upgrades";
import type { Choice } from "@/types/simulator";
import type { OfficeState, SessionOutcome } from "@/types/office";

export const clampStat = (value: number) => Math.max(0, Math.min(100, value));

export function scoreChoice(choice: Choice) {
  const averageImpact = Object.values(choice.impact).reduce((sum, value) => sum + value, 0) / 4;
  return Math.round(clampStat(50 + averageImpact * 5));
}

export function getUpgradeBonuses(purchased: string[]) {
  return officeUpgrades.reduce(
    (bonuses, upgrade) => {
      if (!purchased.includes(upgrade.id)) return bonuses;
      if (upgrade.effect.type === "trust") bonuses.trust += upgrade.effect.value;
      if (upgrade.effect.type === "ethicalTrust") bonuses.ethicalTrust += upgrade.effect.value;
      if (upgrade.effect.type === "clinical") bonuses.clinical += upgrade.effect.value;
      if (upgrade.effect.type === "capacity") bonuses.capacity += upgrade.effect.value;
      if (upgrade.effect.type === "atmosphere") bonuses.empathy += upgrade.effect.value;
      return bonuses;
    },
    { trust: 0, ethicalTrust: 0, clinical: 0, capacity: 0, empathy: 0 },
  );
}

export function calculateSessionOutcome(choice: Choice, state: OfficeState, risk = false): SessionOutcome {
  const score = scoreChoice(choice);
  let income: number = state.sessionFee;
  let reputationChange = 0;
  let ethicalTrustChange = 0;

  if (score >= 80) {
    reputationChange = 4;
    ethicalTrustChange = 3;
  } else if (score >= 60) {
    reputationChange = 2;
    ethicalTrustChange = 1;
  } else if (score >= 40) {
    income = Math.round(state.sessionFee * 0.8);
    ethicalTrustChange = -1;
  } else {
    income = Math.round(state.sessionFee * 0.55);
    reputationChange = -2;
    ethicalTrustChange = -4;
  }

  const ethicalConcern = choice.impact.ethics < 0;
  if (ethicalConcern) {
    ethicalTrustChange -= risk ? 5 : 2;
    reputationChange -= risk ? 2 : 1;
    income = Math.min(income, Math.round(state.sessionFee * 0.75));
  }

  const bonuses = getUpgradeBonuses(state.purchasedUpgrades);
  ethicalTrustChange += bonuses.ethicalTrust;

  return {
    score,
    income,
    reputationChange,
    ethicalTrustChange,
    energyChange: -18,
    ethicalConcern,
    message: ethicalConcern
      ? "Seans geliri ikincil kaldı: etik sınırlar ve danışan güvenliği zarar gördü."
      : score >= 80
        ? "Dengeli yaklaşım güveni ve ofis itibarını güçlendirdi."
        : score >= 60
          ? "Seans tamamlandı; yaklaşımın bazı alanları gelişime açık."
          : "Seans sonlandırıldı; sonraki görüşmede etik çerçeve ve iş birliği öncelenmeli.",
  };
}

export function getDemandCapacity(state: OfficeState) {
  const upgradeCapacity = getUpgradeBonuses(state.purchasedUpgrades).capacity;
  const assistantCapacity = state.assistantHired ? 1 : 0;
  let demandPenalty = 0;
  if (state.sessionFee === 800 && state.reputation < 30) demandPenalty = 1;
  if (state.sessionFee === 1000 && (state.reputation < 55 || state.ethicalTrust < 55)) demandPenalty = 1;
  return Math.max(2, 3 + assistantCapacity + upgradeCapacity - demandPenalty);
}

export function canUseFee(fee: OfficeState["sessionFee"], state: OfficeState) {
  return fee !== 1000 || (state.reputation >= 55 && state.ethicalTrust >= 55);
}
