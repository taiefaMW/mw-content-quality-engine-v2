import { ReactNode } from 'react';

interface ScoreBarProps {
  label: string;
  icon?: ReactNode;
  score: number;
  maxScore: number;
  delay?: number;
}

export function ScoreBar({ label, icon, score, maxScore, delay = 0 }: ScoreBarProps) {
  const percentage = (score / maxScore) * 100;
  const isVeryLow = score < 10;

  return (
    <div className="space-y-2.5">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {icon && (
            <span className="text-primary">
              {icon}
            </span>
          )}
          <span className="text-sm font-medium text-foreground">{label}</span>
        </div>
        <span className={`text-sm font-semibold ${isVeryLow ? 'text-accent' : 'text-primary'}`}>
          {score}/{maxScore}
        </span>
      </div>
      <div className="h-2.5 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full score-bar-animate ${
            isVeryLow ? 'score-bar-gradient-low' : 'score-bar-gradient-high'
          }`}
          style={{
            '--bar-target-width': `${percentage}%`,
            animationDelay: `${delay}ms`,
          } as React.CSSProperties}
        />
      </div>
    </div>
  );
}
