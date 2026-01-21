import { useCallback, useState } from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

interface DraftInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function DraftInput({ value, onChange }: DraftInputProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    setError(null);

    const file = e.dataTransfer.files[0];
    if (!file) return;

    const validTypes = ['.txt', '.pdf', '.docx'];
    const extension = '.' + file.name.split('.').pop()?.toLowerCase();
    
    if (!validTypes.includes(extension)) {
      setError('Please upload a .txt, .pdf, or .docx file');
      return;
    }

    try {
      if (extension === '.txt') {
        const text = await file.text();
        onChange(text);
      } else {
        // For PDF and DOCX, we'd need backend processing
        // For now, show a message to paste instead
        setError('File could not be read — paste the draft instead.');
      }
    } catch {
      setError('File could not be read — paste the draft instead.');
    }
  }, [onChange]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        <FileText className="w-5 h-5 text-primary" />
        <h2 className="font-heading text-lg font-semibold text-foreground">
          Paste or upload your draft below
        </h2>
      </div>
      
      <div
        className={`relative rounded-lg transition-all duration-200 ${
          isDragging 
            ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' 
            : ''
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <Textarea
          value={value}
          onChange={(e) => {
            setError(null);
            onChange(e.target.value);
          }}
          placeholder="Start typing or drag & drop a .txt, .pdf, or .docx file..."
          className="min-h-[200px] resize-none bg-card border-0 shadow-sm focus-visible:ring-1 focus-visible:ring-primary"
        />
        
        {!value && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Upload className="w-8 h-8 opacity-40" />
              <span className="text-sm">Drop file here or start typing</span>
            </div>
          </div>
        )}
      </div>
      
      {error && (
        <div className="flex items-center gap-2 text-sm text-accent">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
