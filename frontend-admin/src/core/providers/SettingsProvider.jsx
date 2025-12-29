/**
 * Settings Provider
 * @description Proveedor de contexto de configuraciones globales
 */

import { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem('app-settings');
    return savedSettings ? JSON.parse(savedSettings) : {
      language: 'es',
      notifications: true,
      soundEnabled: true,
      fontSize: 16,
    };
  });

  useEffect(() => {
    localStorage.setItem('app-settings', JSON.stringify(settings));
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateSettings = (newSettings) => {
    setSettings((prev) => ({
      ...prev,
      ...newSettings,
    }));
  };

  const resetSettings = () => {
    const defaultSettings = {
      language: 'es',
      notifications: true,
      soundEnabled: true,
      fontSize: 16,
    };
    setSettings(defaultSettings);
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSetting,
        updateSettings,
        resetSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettingsContext debe usarse dentro de SettingsProvider');
  }
  return context;
};

export default SettingsProvider;
