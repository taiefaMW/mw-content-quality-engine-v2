import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

interface NotionControlsProps {
  score: number;
  onPush: () => void;
}

export function NotionControls({ score, onPush }: NotionControlsProps) {
  const [autoPush, setAutoPush] = useState(false);
  const canPush = score >= 70;

  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <Button
        onClick={onPush}
        disabled={!canPush}
        className={`gap-2 transition-all ${
          canPush 
            ? 'gradient-primary hover:opacity-90' 
            : 'bg-muted text-muted-foreground cursor-not-allowed'
        }`}
      >
        <Send className="w-4 h-4" />
        Push to Notion
      </Button>
      
      <div className="flex items-center gap-3">
        <Switch
          id="auto-push"
          checked={autoPush}
          onCheckedChange={setAutoPush}
          disabled={!canPush}
        />
        <Label 
          htmlFor="auto-push" 
          className={`text-sm ${!canPush ? 'text-muted-foreground' : 'text-foreground'}`}
        >
          Auto-push
        </Label>
      </div>
    </div>
  );
}
