import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import logoWhite from '@/assets/myworks-logo-white.png';
import logoColor from '@/assets/myworks-logo.png';
import underline from '@/assets/underline.png';

export function Header() {
  const { isBlueMode, toggleMode } = useTheme();

  return (
    <header className="flex flex-col items-center py-8 space-y-3 relative">
      {/* Theme Toggle - top right */}
      <button
        onClick={toggleMode}
        className="absolute top-4 right-0 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors text-sm font-medium"
        style={{ color: isBlueMode ? '#ffffff' : '#003edb' }}
      >
        {isBlueMode ? (
          <>
            <Moon className="w-4 h-4" />
            <span>Blue</span>
          </>
        ) : (
          <>
            <Sun className="w-4 h-4" />
            <span>Light</span>
          </>
        )}
      </button>

      <img 
        src={isBlueMode ? logoColor : logoWhite} 
        alt="MyWorks" 
        className="h-10 md:h-12 object-contain"
      />
      <h1 
        className="font-heading text-3xl md:text-4xl font-semibold text-center"
        style={{ color: isBlueMode ? '#ffffff' : '#003edb' }}
      >
        Content{' '}
        <span className="relative inline-block">
          Quality
          <img 
            src={underline} 
            alt="" 
            className="absolute left-0 right-0 -bottom-2 w-full h-auto pointer-events-none"
          />
        </span>{' '}
        Engine
      </h1>
      <p 
        className="text-xs md:text-sm text-center whitespace-nowrap"
        style={{ color: isBlueMode ? 'rgba(255,255,255,0.8)' : '#5c5c5c' }}
      >
        Score and approve LinkedIn posts against proven performance patterns
      </p>
    </header>
  );
}
