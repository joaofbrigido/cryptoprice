import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext({});

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark');

  function toggleTheme() {
    setTheme((theme) => (theme === 'dark' ? 'light' : 'dark'));
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme === 'dark' ? 'light' : 'dark');
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const themeLocalstorage = localStorage.getItem('theme');
      if (themeLocalstorage) setTheme(themeLocalstorage);
      else setTheme('dark');
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
