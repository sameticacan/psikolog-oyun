import type { CaseStudy, Metrics } from "@/types/simulator";
import { ChoiceButton } from "./ChoiceButton";
import { ClientSprite } from "./ClientSprite";
import { DialogPanel } from "./DialogPanel";
import { GameHud } from "./GameHud";
import { MetricHud } from "./MetricHud";

interface CaseScreenProps {
  caseStudy: CaseStudy;
  metrics: Metrics;
  current: number;
  total: number;
  onChoose: (choiceId: string) => void;
}

export function CaseScreen({ caseStudy, metrics, current, total, onChoose }: CaseScreenProps) {
  return (
    <main className="game-screen">
      <GameHud current={current} total={total} metrics={metrics} />
      <div className="visual-novel-stage">
        <div className="client-stage-zone">
          <ClientSprite
            name={caseStudy.characterName}
            ageGroup={caseStudy.characterAgeGroup}
            emotion={caseStudy.characterEmotion}
            image={caseStudy.characterImage}
          />
          <div className="stage-whisper"><span />Gece seansı · oda hazır</div>
        </div>

        <div className="dialog-stage-zone">
          <DialogPanel caseStudy={caseStudy}><p className="mt-4 text-sm font-medium text-slate-300">{caseStudy.prompt}</p></DialogPanel>
        </div>
      </div>
      <section className="vn-bottom-zone" aria-label="Yaklaşım seçenekleri">
        <p className="eyebrow mb-2">Yaklaşımını seç</p>
        <div className="vn-bottom-choices">
          {caseStudy.choices.map((choice, index) => (
            <ChoiceButton key={choice.id} index={index} text={choice.text} onClick={() => onChoose(choice.id)} />
          ))}
        </div>
        <MetricHud metrics={metrics} />
      </section>
    </main>
  );
}
