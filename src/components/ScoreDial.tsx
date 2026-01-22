import { useMemo } from 'react';

interface ScoreDialProps {
  score: number;
  status: 'approved' | 'rewrite' | 'do-not-publish';
}

export function ScoreDial({ score, status }: ScoreDialProps) {
  const isHigh = score >= 80;
  const circumference = 2 * Math.PI * 52; // radius = 52 (larger dial)
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
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-48 h-48">
        <svg
          className="w-full h-full -rotate-90"
          viewBox="0 0 120 120"
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
            <filter id="dialGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Background circle */}
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            className="text-muted"
          />
          
          {/* Score arc */}
          <circle
            cx="60"
            cy="60"
            r="52"
            fill="none"
            stroke={isHigh ? "url(#dialGradientHigh)" : "url(#dialGradientLow)"}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            filter="url(#dialGlow)"
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
            className={`font-heading text-4xl font-bold ${
              isHigh ? 'text-primary' : 'text-accent'
            }`}
          >
            {score}
          </span>
          <span className="text-sm text-muted-foreground font-medium">/100</span>
        </div>
      </div>
      
      {/* Status label */}
      <div 
        className={`px-5 py-2 rounded-full text-sm font-semibold shadow-sm ${
          status === 'approved' 
            ? 'gradient-primary text-primary-foreground' 
            : 'bg-accent/15 text-accent'
        }`}
      >
        {statusLabel}
      </div>
    </div>
  );
}
