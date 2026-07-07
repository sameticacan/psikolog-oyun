import type { DailyClient, OfficeState } from "@/types/office";
import { OfficeHotspot } from "./OfficeHotspot";

interface OfficeRoomProps {
  state: OfficeState;
  queue: DailyClient[];
  onStartSession: () => void;
  onOpenSchedule: () => void;
  onOpenNotes: () => void;
  onOpenUpgrades: () => void;
  onOpenWaiting: () => void;
  onOpenStaff: () => void;
}

export function OfficeRoom({ state, queue, onStartSession, onOpenSchedule, onOpenNotes, onOpenUpgrades, onOpenWaiting, onOpenStaff }: OfficeRoomProps) {
  const nextClient = queue.find((client) => client.status === "waiting");
  const has = (id: string) => state.purchasedUpgrades.includes(id);

  return (
    <section className="office-room" aria-label="Etkileşimli psikolog ofisi">
      <div className="office-room-wall"><div className="office-window"><i /><i /><i /><i /></div><div className="office-clock">21:10</div></div>
      <div className={`office-books ${has("library") ? "upgraded" : ""}`}><i /><i /><i /><i /><i /><i /></div>
      <div className="office-desk"><div className="office-monitor"><span>RANDEVU<br /><b>{queue.filter((c) => c.status === "waiting").length} BEKLİYOR</b></span></div><div className="desk-lamp" /></div>
      <div className={`client-chair ${has("comfort-chair") ? "upgraded" : ""}`} />
      <div className={`waiting-seats ${has("waiting-area") ? "upgraded" : ""}`}><i /><i /></div>
      {has("plants") && <div className="office-scene-plant"><i /><i /><i /><b /></div>}
      {has("online-kit") && <div className="office-online-kit">●</div>}
      {has("soundproofing") && <div className="office-soundproof"><i /><i /><i /></div>}
      <div className="office-door"><span>{nextClient ? "DANIŞAN BEKLİYOR" : "BUGÜN TAMAM"}</span></div>
      <div className="office-floor-light" />

      <OfficeHotspot className="hotspot-door" label="Kapı" hint={nextClient ? "Sıradaki danışanı al" : "Bekleyen danışan yok"} icon="↳" onClick={onStartSession} disabled={!nextClient} />
      <OfficeHotspot className="hotspot-computer" label="Bilgisayar" hint="Randevu takvimi" icon="▣" onClick={onOpenSchedule} />
      <OfficeHotspot className="hotspot-desk" label="Masa" hint="Notlar ve gün raporu" icon="≡" onClick={onOpenNotes} />
      <OfficeHotspot className="hotspot-library" label="Kitaplık" hint="Ofis geliştirmeleri" icon="▤" onClick={onOpenUpgrades} />
      <OfficeHotspot className="hotspot-waiting" label="Bekleme alanı" hint="Danışan listesi" icon="◫" onClick={onOpenWaiting} />
      <OfficeHotspot className="hotspot-reception" label="Resepsiyon" hint="Asistan yönetimi" icon="♙" onClick={onOpenStaff} />
    </section>
  );
}

