import { useState, useEffect, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { DraftInput } from '@/components/DraftInput';
import { NotionControls } from '@/components/NotionControls';
import { ScoreDial } from '@/components/ScoreDial';
import { ScoreBreakdown } from '@/components/ScoreBreakdown';
import { FeedbackPanel } from '@/components/FeedbackPanel';
import { scoreContent, type ScoringResult } from '@/lib/scoringEngine';
import { toast } from 'sonner';

const Index = () => {
  const [draft, setDraft] = useState('');
  const [result, setResult] = useState<ScoringResult>(() => scoreContent(''));

  // Auto-score on draft change (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      setResult(scoreContent(draft));
    }, 300);
    return () => clearTimeout(timer);
  }, [draft]);

  const handlePushToNotion = () => {
    toast.success('Draft pushed to Notion successfully!', {
      description: 'Your content has been saved to your Notion workspace.',
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container max-w-6xl mx-auto px-4 flex-1">
        <Header />
        
        <main className="py-6 md:py-10">
          {/* Input Section */}
          <div className="bg-card rounded-xl p-5 md:p-6 card-shadow mb-8">
            <DraftInput value={draft} onChange={setDraft} />
            <NotionControls score={result.totalScore} onPush={handlePushToNotion} />
          </div>

          {/* Scoring Section - Side by Side */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left: Total Score + Feedback */}
            <div className="space-y-6 flex flex-col">
              {/* Score Dial - Hero */}
              <div className="bg-card rounded-xl p-6 md:p-8 card-shadow flex flex-col items-center">
                <h3 className="font-heading text-lg font-semibold text-primary mb-5 self-start">
                  Total Score
                </h3>
                <ScoreDial score={result.totalScore} status={result.status} />
              </div>
              
              {/* Feedback Panel */}
              <div className="bg-card rounded-xl p-5 md:p-6 card-shadow flex-1">
                <h3 className="font-heading text-base font-semibold text-primary mb-3">
                  Feedback
                </h3>
                <FeedbackPanel result={result} />
              </div>
            </div>
            
            {/* Right: Score Breakdown */}
            <div className="bg-card rounded-xl p-5 md:p-6 card-shadow h-fit lg:self-stretch">
              <ScoreBreakdown scores={result.scores} />
            </div>
          </div>
        </main>
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
