import { SignedIn, SignedOut, useUser } from '@clerk/clerk-expo';
import { Link } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Page() {
  const { user } = useUser();

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <SafeAreaView />
      <StatusBar style="auto" />
      <SignedIn>
        <Text className="text-2xl font-bold">Hello {user?.emailAddresses[0].emailAddress}</Text>
      </SignedIn>
      <SignedOut>
        <Link href="/(auth)/login">
          <Text>Sign in</Text>
        </Link>
        <Link href="/(auth)/register">
          <Text>Sign up</Text>
        </Link>
      </SignedOut>
    </View>
  );
}
