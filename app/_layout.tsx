// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, usePathname, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { Appbar } from 'react-native-paper';

import { useColorScheme } from '@/hooks/useColorScheme';
import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import { View } from 'react-native';

const theme = {
  ...DefaultTheme,
  // colors: {
  //   ...DefaultTheme.colors,
  //   primary: 'tomato',
  //   secondary: 'yellow',
  // },
};
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const colorScheme = useColorScheme();
  const router = useRouter()
  const pathname = usePathname()
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>

      <Appbar.Header>
        {
          pathname !== '/' && <Appbar.BackAction onPress={() => router.back()} />
        }
     
        <Appbar.Content title="Bedee Test" />
      </Appbar.Header>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="enter_name" options={{ headerShown: false }} />
          <Stack.Screen name="question" options={{ headerShown: false }} />
          <Stack.Screen name="board" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" options={{ headerShown: false }} />
        </Stack>

    </PaperProvider>
  );
}
