import { CheckCircle2, AlertTriangle } from 'lucide-react';
import type { ScoringResult } from '@/lib/scoringEngine';

interface FeedbackPanelProps {
  result: ScoringResult;
}

export function FeedbackPanel({ result }: FeedbackPanelProps) {
  const { status, feedback } = result;

  const icon = {
    approved: <CheckCircle2 className="w-5 h-5 text-primary" />,
    rewrite: <AlertTriangle className="w-5 h-5 text-accent" />,
    'do-not-publish': <AlertTriangle className="w-5 h-5 text-accent" />,
  }[status];

  const bgColor = {
    approved: 'bg-primary/5 border-primary/20',
    rewrite: 'bg-accent/5 border-accent/20',
    'do-not-publish': 'bg-accent/5 border-accent/20',
  }[status];

  // Parse markdown-style bold
  const formatFeedback = (text: string) => {
    const parts = text.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, index) => 
      index % 2 === 1 ? <strong key={index} className="font-semibold">{part}</strong> : part
    );
  };

  return (
    <div className={`rounded-lg border p-4 ${bgColor}`}>
      <div className="flex gap-3">
        <div className="flex-shrink-0 mt-0.5">{icon}</div>
        <div className="space-y-2 text-sm leading-relaxed text-foreground/90">
          {feedback.split('\n\n').map((paragraph, i) => (
            <p key={i}>{formatFeedback(paragraph)}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
