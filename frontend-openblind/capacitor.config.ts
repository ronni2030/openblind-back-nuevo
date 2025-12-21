import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.openblind.app',
  appName: 'OpenBlind',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    allowNavigation: ['*']
  }
};

export default config;
