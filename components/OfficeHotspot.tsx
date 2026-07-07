import type { OfficeInteractionTarget } from "@/types/player";

interface OfficeHotspotProps {
  target: OfficeInteractionTarget;
  onInteract: (target: OfficeInteractionTarget) => void;
  onHoverChange?: (hovered: boolean) => void;
  queued?: boolean;
}

export function OfficeHotspot({ target, onInteract, onHoverChange, queued }: OfficeHotspotProps) {
  return (
    <button
      className={`office-hotspot ${target.className} ${queued ? "is-queued" : ""}`}
      onClick={() => onInteract(target)}
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
      onFocus={() => onHoverChange?.(true)}
      onBlur={() => onHoverChange?.(false)}
      disabled={target.disabled}
      aria-label={`${target.label}: ${target.hint}`}
      aria-pressed={queued}
    >
      <span className="office-hotspot-ring">{target.icon}</span>
      <span className="office-hotspot-label"><strong>{target.label}</strong><small>{target.hint}</small></span>
    </button>
  );
}
