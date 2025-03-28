import '../global.css';
import { ClerkProvider } from '@clerk/clerk-expo';
import { Slot } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';
import { Stack } from 'expo-router';
import { queryClient } from '~/providers/query-client';
import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback } from 'react';
const tokenCache = {
  async getToken(key: string) {
    try {
      return await SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (err) {
      console.error('Token save error:', err);
    }
  },
};
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env'
  );
}
export default function Layout() {
  SplashScreen.preventAutoHideAsync();

  const [fontsLoaded] = useFonts({
    Roboto: require('../assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // return <Slot onLayout={onLayoutRootView} />;
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <QueryClientProvider client={queryClient}>
        <Stack />
      </QueryClientProvider>
    </ClerkProvider>
  );
}
