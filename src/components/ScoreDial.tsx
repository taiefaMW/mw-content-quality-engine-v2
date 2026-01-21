import { useMemo } from 'react';

interface ScoreDialProps {
  score: number;
  status: 'approved' | 'rewrite' | 'do-not-publish';
}

export function ScoreDial({ score, status }: ScoreDialProps) {
  const isHigh = score >= 80;
  const circumference = 2 * Math.PI * 45; // radius = 45
  const offset = circumference - (score / 100) * circumference;

  const statusLabel = useMemo(() => {
    switch (status) {
      case 'approved':
        return 'Approved to publish';
      case 'rewrite':
        return 'Rewrite suggested';
      case 'do-not-publish':
        return 'Do not publish';
    }
  }, [status]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative w-36 h-36">
        <svg
          className="w-full h-full -rotate-90"
          viewBox="0 0 100 100"
        >
          <defs>
            <linearGradient id="dialGradientHigh" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#003edb" />
              <stop offset="100%" stopColor="#4594E9" />
            </linearGradient>
            <linearGradient id="dialGradientLow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ed8f02" />
              <stop offset="100%" stopColor="#f5a623" />
            </linearGradient>
          </defs>
          
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
            className="text-muted"
          />
          
          {/* Score arc */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke={isHigh ? "url(#dialGradientHigh)" : "url(#dialGradientLow)"}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{
              '--score-offset': offset,
              transition: 'stroke-dashoffset 1s ease-out',
            } as React.CSSProperties}
            className="animate-score-fill"
          />
        </svg>
        
        {/* Score display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span 
            className={`font-heading text-3xl font-bold ${
              isHigh ? 'text-primary' : 'text-accent'
            }`}
          >
            {score}
          </span>
          <span className="text-xs text-muted-foreground font-medium">/100</span>
        </div>
      </div>
      
      {/* Status label */}
      <div 
        className={`px-4 py-1.5 rounded-full text-sm font-medium ${
          status === 'approved' 
            ? 'gradient-primary text-primary-foreground' 
            : status === 'rewrite'
            ? 'bg-accent/10 text-accent'
            : 'bg-destructive/10 text-destructive'
        }`}
      >
        {statusLabel}
      </div>
    </div>
  );
}
