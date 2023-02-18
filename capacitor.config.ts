import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.taek.story',
  appName: 'story_scroll',
  webDir: 'build',
  bundledWebRuntime: false,
  server: {
    hostname: 'https://nostrss.github.io/story_scroll',
    androidScheme: 'https',
    url: 'https://nostrss.github.io/story_scroll',
  },
};

export default config;
