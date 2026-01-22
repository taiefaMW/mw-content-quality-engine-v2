import { FileText } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface DraftInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function DraftInput({ value, onChange }: DraftInputProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <FileText className="w-5 h-5 text-primary" />
        <h2 className="font-heading text-lg font-semibold text-primary">
          Paste your draft below to begin scoring
        </h2>
      </div>
      
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your LinkedIn draft here..."
        className="min-h-[200px] resize-none bg-card border-0 shadow-sm focus-visible:ring-2 focus-visible:ring-primary"
      />
    </div>
  );
}
