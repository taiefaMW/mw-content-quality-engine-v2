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
  const isLow = score < 15;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {icon && (
            <span className={`${isLow ? 'text-accent' : 'text-primary'}`}>
              {icon}
            </span>
          )}
          <span className="text-sm font-medium text-foreground">{label}</span>
        </div>
        <span className={`text-sm font-semibold ${isLow ? 'text-accent' : 'text-primary'}`}>
          {score}/{maxScore}
        </span>
      </div>
      <div className="h-2.5 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${
            isLow ? 'score-bar-gradient-low' : 'score-bar-gradient-high'
          }`}
          style={{
            width: `${percentage}%`,
            '--bar-width': `${percentage}%`,
            animationDelay: `${delay}ms`,
          } as React.CSSProperties}
        />
      </div>
    </div>
  );
}
