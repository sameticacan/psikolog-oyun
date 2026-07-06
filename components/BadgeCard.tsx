import { getBadgeDescription } from "@/lib/results";
import type { BadgeName } from "@/types/simulator";

const badgeSymbols: Record<BadgeName, string> = {
  "Etik Pusula": "◇",
  "Empati Ustası": "◌",
  "Klinik Düşünür": "◎",
  "Güven İnşa Eden": "△",
  "Denge Arayan": "✦",
};

export function BadgeCard({ badge }: { badge: BadgeName }) {
  return (
    <article className="relative overflow-hidden rounded-3xl border border-mint/20 bg-gradient-to-br from-mint/[0.13] via-panel to-sky/[0.08] p-5 sm:p-6">
      <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-mint/10 blur-2xl" />
      <div className="relative flex items-center gap-4">
        <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl border border-mint/25 bg-ink/45 text-3xl text-mint shadow-[0_0_35px_rgba(135,215,189,0.12)]">{badgeSymbols[badge]}</div>
        <div><p className="eyebrow text-mint">Kazanılan rozet</p><h2 className="mt-1 text-2xl font-semibold text-cream">{badge}</h2></div>
      </div>
      <p className="relative mt-4 text-sm leading-6 text-slate-300">{getBadgeDescription(badge)}</p>
    </article>
  );
}
