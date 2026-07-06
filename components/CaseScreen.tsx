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
          <DialogPanel caseStudy={caseStudy}>
            <div className="mt-5 border-t border-white/10 pt-5">
              <p className="eyebrow">Yaklaşımını seç</p>
              <h2 className="mt-1 text-sm font-semibold text-slate-200">{caseStudy.prompt}</h2>
              <div className="mt-4 space-y-2.5">
                {caseStudy.choices.map((choice, index) => (
                  <ChoiceButton key={choice.id} index={index} text={choice.text} onClick={() => onChoose(choice.id)} />
                ))}
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
      <div className="mx-auto w-full max-w-6xl px-4 pb-5 sm:px-6"><MetricHud metrics={metrics} /></div>
    </main>
  );
}
