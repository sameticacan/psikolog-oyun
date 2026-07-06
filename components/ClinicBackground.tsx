"use client";

import { useState } from "react";

export function ClinicBackground() {
  const [hasRealBackground, setHasRealBackground] = useState(false);

  return (
    <div className={`clinic-background ${hasRealBackground ? "has-real-background" : ""}`} aria-hidden="true">
      <div className="clinic-background-image" />
      <img
        src="/backgrounds/therapy-room-night.png"
        alt=""
        className="clinic-real-image"
        onLoad={() => setHasRealBackground(true)}
        onError={() => setHasRealBackground(false)}
      />
      <div className="clinic-window">
        <div className="city-lights">{Array.from({ length: 18 }, (_, index) => <span key={index} />)}</div>
      </div>
      <div className="clinic-bookshelf">{Array.from({ length: 12 }, (_, index) => <span key={index} />)}</div>
      <div className="clinic-lamp"><span /></div>
      <div className="clinic-plant"><i /><i /><i /><b /></div>
      <div className="clinic-chair clinic-chair-left" />
      <div className="clinic-chair clinic-chair-right" />
      <div className="clinic-table"><span /><i /></div>
      <div className="clinic-floor-glow" />
      <div className="vn-scene-overlay" />
      <div className="clinic-vignette" />
    </div>
  );
}
