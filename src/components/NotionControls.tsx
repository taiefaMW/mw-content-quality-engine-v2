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
        className={`gap-2 transition-all shadow-md ${
          canPush 
            ? 'bg-primary hover:bg-gradient-to-r hover:from-primary hover:to-[#4594E9] text-primary-foreground' 
            : 'bg-muted text-muted-foreground cursor-not-allowed shadow-none'
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
          className={`text-sm font-medium ${!canPush ? 'text-muted-foreground' : 'text-foreground'}`}
        >
          Auto-push
        </Label>
      </div>
    </div>
  );
}
