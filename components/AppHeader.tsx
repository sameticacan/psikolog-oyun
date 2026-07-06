export function AppHeader({ step, total }: { step?: number; total?: number }) {
  const hasProgress = step !== undefined && total !== undefined;
  const progress = hasProgress ? Math.round((step / total) * 100) : 0;

  return (
    <header className="mx-auto w-full max-w-5xl px-5 py-5 sm:px-8 sm:py-7">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-mint/20 bg-mint/10 text-lg text-mint">◌</div>
          <div>
            <p className="text-sm font-bold tracking-wide text-cream">Terapi Odası</p>
            <p className="hidden text-xs text-slate-400 sm:block">Mini Vaka Simülatörü</p>
          </div>
        </div>
        {hasProgress && (
          <div className="rounded-full border border-line bg-panel/70 px-3 py-1.5 text-xs font-semibold text-slate-300">
            Vaka <span className="text-cream">{step}</span> / {total}
          </div>
        )}
      </div>
      {hasProgress && (
        <div className="mt-4 h-1 overflow-hidden rounded-full bg-line/70" role="progressbar" aria-label="Oturum ilerlemesi" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
          <div className="h-full rounded-full bg-gradient-to-r from-sky to-mint transition-[width] duration-500" style={{ width: `${progress}%` }} />
        </div>
      )}
    </header>
  );
}
