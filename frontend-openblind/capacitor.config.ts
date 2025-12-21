import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.openblind.app',
  appName: 'OpenBlind',
  webDir: 'dist',
  server: {
    androidScheme: 'http',
    allowNavigation: ['*'],
    cleartext: true
  }
};

export default config;
