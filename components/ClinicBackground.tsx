export function ClinicBackground() {
  return (
    <div className="clinic-background" aria-hidden="true">
      <div className="clinic-background-image" />
      <div className="clinic-window">
        <div className="city-lights">
          {Array.from({ length: 18 }, (_, index) => <span key={index} />)}
        </div>
      </div>
      <div className="clinic-bookshelf">
        {Array.from({ length: 12 }, (_, index) => <span key={index} />)}
      </div>
      <div className="clinic-lamp"><span /></div>
      <div className="clinic-plant"><i /><i /><i /><b /></div>
      <div className="clinic-chair clinic-chair-left" />
      <div className="clinic-chair clinic-chair-right" />
      <div className="clinic-table"><span /><i /></div>
      <div className="clinic-floor-glow" />
      <div className="clinic-vignette" />
    </div>
  );
}
