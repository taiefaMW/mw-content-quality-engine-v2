import { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { DraftInput } from '@/components/DraftInput';
import { NotionControls } from '@/components/NotionControls';
import { ScoreDial } from '@/components/ScoreDial';
import { ScoreBreakdown } from '@/components/ScoreBreakdown';
import { FeedbackPanel } from '@/components/FeedbackPanel';
import { scoreContent, type ScoringResult } from '@/lib/scoringEngine';
import { toast } from 'sonner';
import bgImage from '@/assets/content-engine-bg.png';

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
    <div className="min-h-screen flex flex-col relative">
      {/* Background with blur */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(2px)',
        }}
      />
      {/* Overlay for better contrast */}
      <div className="fixed inset-0 z-0 bg-black/10" />
      
      {/* Content */}
      <div className="container max-w-6xl mx-auto px-4 flex-1 relative z-10">
        <Header />
        
        <main className="py-6 md:py-10">
          {/* Input Section */}
          <div className="bg-card rounded-xl p-5 md:p-6 card-shadow mb-8">
            <DraftInput value={draft} onChange={setDraft} />
            <NotionControls score={result.totalScore} onPush={handlePushToNotion} />
          </div>

          {/* Scoring Section - Side by Side on Desktop */}
          <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Left Column: Total Score + Improvements (desktop) */}
            <div className="space-y-6 flex flex-col order-1 lg:order-1">
              {/* Score Dial - Hero */}
              <div className="bg-card rounded-xl p-6 md:p-8 card-shadow flex flex-col items-center">
                <h3 className="font-heading text-lg font-semibold text-primary mb-5 self-start">
                  Total Score
                </h3>
                <ScoreDial score={result.totalScore} status={result.status} />
              </div>
              
              {/* Improvements Panel - appears last on mobile, here on desktop */}
              <div className="bg-card rounded-xl p-5 md:p-6 card-shadow flex-1 order-3 lg:order-2">
                <h3 className="font-heading text-base font-semibold text-primary mb-3">
                  Improvements
                </h3>
                <FeedbackPanel result={result} />
              </div>
            </div>
            
            {/* Right Column: Score Breakdown - second on mobile, right on desktop */}
            <div className="bg-card rounded-xl p-5 md:p-6 card-shadow lg:self-stretch flex flex-col order-2 lg:order-2">
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
