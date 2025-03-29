import { useSSO } from '@clerk/clerk-expo';
import { useMutation } from '@tanstack/react-query';
import { randomUUID } from 'expo-crypto';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Lock, Mail } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import IconButton from '~/components/ButtonWithIcon';
import TextInputWithIcon from '~/components/TextInputWithIcon';
import { strapiProvider } from '~/providers/strapi-provider';

const Register = () => {
  const { startSSOFlow } = useSSO();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const {
    mutate: register,
    isError,
    error,
  } = useMutation({
    mutationFn: (data: { email: string; username: string; password: string; clerkId: string }) =>
      strapiProvider.create('/auth/local/register', data),
    onSuccess: (data: any) => {
      router.push('/home');
    },
    onError: (error: Error | any) => {
      // Handle login error
      console.error('Login error:', error);
      Alert.alert('Login Error', error.message || 'Invalid credentials');
    },
  });

  const handleSignInWithSSO = async (strategy: 'oauth_google' | 'oauth_apple') => {
    try {
      const { createdSessionId, setActive, signUp } = await startSSOFlow({
        strategy,
      });

      // If sign in was successful, set the active session
      if (createdSessionId) {
        setActive!({ session: createdSessionId });

        const email = signUp?.emailAddress;
        const username = signUp?.emailAddress;
        const password = randomUUID();
        const id = signUp?.createdUserId;

        if (!email || !username || !password || !id) {
          throw new Error('Missing required fields');
        }

        const strapiUser = {
          email,
          username,
          password,
          clerkId: id,
        };

        register(strapiUser);
      }
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.log(err);
    }
  };

  const handleLogin = () => {
    const strapiUser = {
      email,
      username: email.split('@')[0],
      password,
      clerkId: randomUUID(),
    };

    register(strapiUser);
  };

  return (
    <View className={'relative flex-1 justify-center bg-gray-100 px-5'}>
      <StatusBar style="auto" />
      <View className={'mb-5 flex items-center justify-center'}>
        <Image
          source={require('../../assets/icon.png')}
          alt="Logo"
          className="mb-5 h-[120px] w-[120px] rounded-full"
          resizeMode="cover"
        />
        <Text className={'mb-5 text-center text-2xl font-bold text-slate-700'}>
          Create New Account
        </Text>
      </View>
      {isError && <Text className={'mb-3 text-center text-red-500'}>{error?.message}</Text>}
      <TextInputWithIcon
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        icon={<Mail size={24} color="#6b7280" />}
      />

      <TextInputWithIcon
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        icon={<Mail size={24} color="#6b7280" />}
      />
      <TextInputWithIcon
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        icon={<Lock size={24} color="#6b7280" />}
      />

      <IconButton text="Sign Up" onPress={handleLogin} />

      <IconButton
        text="Continue with Google"
        iconName="google"
        onPress={() => handleSignInWithSSO('oauth_google')}
      />
      <TouchableOpacity className={'mt-3'} onPress={() => router.push('/(auth)/login')}>
        <Text className={'text-center text-blue-500'}>
          Do you have an account? <Text className={'font-bold'}>Login</Text>
        </Text>
      </TouchableOpacity>

      <Text className={'mt-5 max-w-sm text-gray-500'}>
        By logging in, you agree to our <Text className={'text-blue-500'}>Terms</Text> and{' '}
        <Text className={'text-cenetr text-blue-500'}>Privacy Policy</Text>.
      </Text>
    </View>
  );
};

export default Register;
