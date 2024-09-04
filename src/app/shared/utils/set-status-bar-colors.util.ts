import { StatusBar } from '@capacitor/status-bar';
import { isPlatform } from '@ionic/angular';

export const setStatusBarToDarkGreen = async () => {
  await StatusBar.setBackgroundColor({ color: '#254336' });
};

export const setStatusBarToWhite = async () => {
  await StatusBar.setBackgroundColor({ color: '#FFFFFF' });
};

export const setOverlaysWebView = async () => {
  if (isPlatform('android')) {
    await StatusBar.setOverlaysWebView({ overlay: true });
  }
};
