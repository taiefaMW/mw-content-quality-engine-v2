import { ScoreBar } from './ScoreBar';
import type { ScoreBreakdown as ScoreBreakdownType } from '@/lib/scoringEngine';

interface ScoreBreakdownProps {
  scores: ScoreBreakdownType;
}

const dimensionLabels: Record<keyof ScoreBreakdownType, string> = {
  openingStrength: 'Opening Strength',
  businessImpact: 'Business Impact Framing',
  clickIntentClarity: 'Click Intent Clarity',
  credibilitySpecificity: 'Credibility & Specificity',
  formatFit: 'Format Fit',
};

export function ScoreBreakdown({ scores }: ScoreBreakdownProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-heading text-base font-semibold text-foreground">
        Scoring Breakdown
      </h3>
      <div className="space-y-4">
        {(Object.entries(scores) as [keyof ScoreBreakdownType, number][]).map(
          ([key, value], index) => (
            <ScoreBar
              key={key}
              label={dimensionLabels[key]}
              score={value}
              maxScore={20}
              delay={index * 100}
            />
          )
        )}
      </div>
    </div>
  );
}
