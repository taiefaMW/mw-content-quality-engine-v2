import { createContext, useContext, useState, ReactNode } from 'react';

type ThemeMode = 'blue' | 'light';

interface ThemeContextType {
  mode: ThemeMode;
  toggleMode: () => void;
  isBlueMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('blue');

  const toggleMode = () => {
    setMode((prev) => (prev === 'blue' ? 'light' : 'blue'));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleMode, isBlueMode: mode === 'blue' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
