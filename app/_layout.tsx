import { ClerkProvider } from '@clerk/clerk-expo';
import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { queryClient } from '~/providers/query-client';
import '../global.css';
import { tokenCache } from '../config/tokenCache';
import { Gesture, GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env'
  );
}
export default function Layout() {
  const [fontsLoaded] = useFonts({
    Roboto: require('../assets/fonts/Roboto-Regular.ttf'),
    'Roboto-Bold': require('../assets/fonts/Roboto-Bold.ttf'),
  });

  const [isSplashScreenHidden, setSplashScreenHidden] = useState(false);

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync().then(() => setSplashScreenHidden(true));
    }
  }, [fontsLoaded]);

  useEffect(() => {
    console.log('Fonts loaded:', fontsLoaded);
    console.log('Splash screen hidden:', isSplashScreenHidden);
  }, [fontsLoaded, isSplashScreenHidden]);

  if (!fontsLoaded || !isSplashScreenHidden) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <QueryClientProvider client={queryClient}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: 'white' },
            }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="home" options={{ headerShown: false }} />
            <StatusBar style="auto" />
          </Stack>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </ClerkProvider>
  );
}
