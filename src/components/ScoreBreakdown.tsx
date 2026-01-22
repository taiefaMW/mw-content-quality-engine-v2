import { ScoreBar } from './ScoreBar';
import type { ScoreBreakdown as ScoreBreakdownType } from '@/lib/scoringEngine';
import { Sparkles, TrendingUp, MousePointerClick, Award, LayoutTemplate } from 'lucide-react';

interface ScoreBreakdownProps {
  scores: ScoreBreakdownType;
}

const dimensionConfig: Record<keyof ScoreBreakdownType, { label: string; icon: React.ReactNode }> = {
  openingStrength: { label: 'Opening Strength', icon: <Sparkles className="w-4 h-4" /> },
  businessImpact: { label: 'Business Impact Framing', icon: <TrendingUp className="w-4 h-4" /> },
  clickIntentClarity: { label: 'Click Intent Clarity', icon: <MousePointerClick className="w-4 h-4" /> },
  credibilitySpecificity: { label: 'Credibility & Specificity', icon: <Award className="w-4 h-4" /> },
  formatFit: { label: 'Format Fit', icon: <LayoutTemplate className="w-4 h-4" /> },
};

export function ScoreBreakdown({ scores }: ScoreBreakdownProps) {
  return (
    <div className="space-y-4">
      <h3 className="font-heading text-base font-semibold text-primary">
        Scoring Breakdown
      </h3>
      <div className="space-y-5">
        {(Object.entries(scores) as [keyof ScoreBreakdownType, number][]).map(
          ([key, value], index) => (
            <ScoreBar
              key={key}
              label={dimensionConfig[key].label}
              icon={dimensionConfig[key].icon}
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
