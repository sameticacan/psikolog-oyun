import type { ReactNode } from "react";

interface OfficeHotspotProps {
  label: string;
  hint: string;
  className: string;
  icon: ReactNode;
  onClick: () => void;
  disabled?: boolean;
}

export function OfficeHotspot({ label, hint, className, icon, onClick, disabled }: OfficeHotspotProps) {
  return (
    <button className={`office-hotspot ${className}`} onClick={onClick} disabled={disabled} aria-label={`${label}: ${hint}`}>
      <span className="office-hotspot-ring">{icon}</span>
      <span className="office-hotspot-label"><strong>{label}</strong><small>{hint}</small></span>
    </button>
  );
}

