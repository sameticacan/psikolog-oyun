import type { CaseStudy } from "@/types/simulator";

function shuffle<T>(items: T[], random: () => number) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1));
    [result[index], result[target]] = [result[target], result[index]];
  }
  return result;
}

export function createSessionCases(
  allCases: CaseStudy[],
  count = 10,
  random: () => number = Math.random,
) {
  const selected = shuffle(allCases, random).slice(0, Math.min(count, allCases.length));
  const riskIndex = selected.findIndex((caseStudy) => caseStudy.risk);

  if (riskIndex >= 0 && selected.length >= 3) {
    const [riskCase] = selected.splice(riskIndex, 1);
    const lateStart = Math.max(0, selected.length - 1);
    const targetIndex = lateStart + Math.floor(random() * 2);
    selected.splice(Math.min(targetIndex, selected.length), 0, riskCase);
  }

  return selected;
}
