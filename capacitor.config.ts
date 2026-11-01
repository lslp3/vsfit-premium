import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.vsgym.premium',
  appName: 'VSFit Premium',
  webDir: 'dist', // O Expo prebuild gera a pasta 'dist' automaticamente
  plugins: {
    // Se necessário, adicione configurações específicas aqui
  },
};

export default config;