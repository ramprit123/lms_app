import { View, Text, TouchableOpacity } from 'react-native';
import { useUser, useClerk } from '@clerk/clerk-expo';

export default function HomePage() {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome, {user?.fullName}!</Text>
      <TouchableOpacity onPress={() => signOut()}>
        <Text style={{ color: 'blue', marginTop: 20 }}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
