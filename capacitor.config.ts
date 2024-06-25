import { CapacitorConfig } from '@capacitor/cli';
import { defineConfig } from '@capacitor/assets';

const config: CapacitorConfig = {
  appId: 'com.otaku.app',
  appName: 'ota-ku',
  webDir: 'dist',
  plugins: {
    CapacitorAssets: {
      resourcesPath: 'src/assets/resources',
    },
  },
};

export default config;
