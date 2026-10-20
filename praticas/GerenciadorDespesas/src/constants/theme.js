import React, { createContext, useContext, useMemo } from 'react';

export const theme = {
  light: {
    background: '#eef4ff',
    surface: '#ffffff',
    text: '#111827',
    textSecondary: '#64748b',
    primary: '#2563eb',
    border: '#dfeafc',
    error: '#dc2626',
    card: '#ffffff',
    inputBackground: '#f8fafc',
    accent: '#dbeafe',
  },
  dark: {
    background: '#0f172a',
    surface: '#111827',
    text: '#f8fafc',
    textSecondary: '#cbd5e1',
    primary: '#60a5fa',
    border: '#334155',
    error: '#f87171',
    card: '#1e293b',
    inputBackground: '#0b1220',
    accent: '#1d4ed8',
  },
};

export const ThemeModeContext = createContext(null);

export function ThemeModeProvider({ children, themeMode, setThemeMode, systemColorScheme }) {
  const currentTheme = useMemo(() => {
    if (themeMode === 'dark') {
      return theme.dark;
    }

    if (themeMode === 'light') {
      return theme.light;
    }

    return systemColorScheme === 'dark' ? theme.dark : theme.light;
  }, [systemColorScheme, themeMode]);

  const value = useMemo(
    () => ({
      themeMode,
      setThemeMode,
      currentTheme,
    }),
    [currentTheme, setThemeMode, themeMode]
  );

  return <ThemeModeContext.Provider value={value}>{children}</ThemeModeContext.Provider>;
}

export function useThemeMode() {
  const context = useContext(ThemeModeContext);

  if (!context) {
    throw new Error('useThemeMode deve ser usado dentro de ThemeModeProvider');
  }

  return context;
}
