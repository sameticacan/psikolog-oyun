export function AppHeader({ step, total }: { step?: number; total?: number }) {
  const hasProgress = step !== undefined && total !== undefined;
  return (
    <header className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-5 py-6 sm:px-8 sm:py-8">
      <div className="flex items-center gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-mint/20 bg-mint/10 text-lg text-mint">◌</div>
        <div><p className="text-sm font-bold tracking-wide text-cream">Terapi Odası</p><p className="hidden text-xs text-slate-400 sm:block">Mini Vaka Simülatörü</p></div>
      </div>
      {hasProgress && <div className="rounded-full border border-line bg-panel/70 px-3 py-1.5 text-xs font-semibold text-slate-300">Vaka <span className="text-cream">{step}</span> / {total}</div>}
    </header>
  );
}
