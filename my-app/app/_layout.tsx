import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { AuthContext } from '@/hooks/useAuthContext';

import { useState } from 'react';
import { User } from '@/store/types';


export default function RootLayout() {

  const [ authUser, setAuthUser] = useState<User | null>(null);


  return (
    <AuthContext.Provider  value={{ authUser, setAuthUser }} >
    <ThemeProvider value={DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
    </AuthContext.Provider>
  );
}
