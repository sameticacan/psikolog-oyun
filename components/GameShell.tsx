import type { ReactNode } from "react";
import { ClinicBackground } from "./ClinicBackground";

export function GameShell({ children }: { children: ReactNode }) {
  return (
    <div className="game-shell">
      <ClinicBackground />
      <div className="relative z-10 flex h-full min-h-0 flex-col overflow-hidden">{children}</div>
    </div>
  );
}
