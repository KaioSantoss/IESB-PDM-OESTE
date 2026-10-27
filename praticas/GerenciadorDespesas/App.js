import React, { useMemo, useState } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';

import { ThemeModeProvider, theme, useThemeMode } from './src/constants/theme';
import DespesasRecentes from './src/screens/DespesasRecentes';
import GerenciarDespesa from './src/screens/GerenciarDespesa';
import TodasDespesas from './src/screens/TodasDespesas';
import { ExpensesContextProvider } from './src/store/expenses-context';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeTabs() {
  const { currentTheme } = useThemeMode();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: currentTheme.surface,
          borderTopColor: currentTheme.border,
        },
        tabBarActiveTintColor: currentTheme.primary,
        tabBarInactiveTintColor: currentTheme.textSecondary,
      }}
    >
      <Tab.Screen
        name="DespesasRecentes"
        component={DespesasRecentes}
        options={{ title: 'Recentes' }}
      />
      <Tab.Screen
        name="TodasDespesas"
        component={TodasDespesas}
        options={{ title: 'Todas' }}
      />
    </Tab.Navigator>
  );
}

function ThemeToggleButton() {
  const { themeMode, setThemeMode, currentTheme } = useThemeMode();

  return (
    <View style={styles.themeToggleWrapper}>
      <Pressable
        onPress={() => setThemeMode(themeMode === 'light' ? 'dark' : 'light')}
        style={[
          styles.themeToggle,
          {
            backgroundColor: currentTheme.surface,
            borderColor: currentTheme.border,
          },
        ]}
      >
        <Text style={[styles.themeToggleText, { color: currentTheme.text }]}>
          {themeMode === 'light' ? 'Modo claro' : 'Modo escuro'}
        </Text>
      </Pressable>
    </View>
  );
}

export default function App() {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState('system');

  const navigationTheme = useMemo(() => {
    const isDark = themeMode === 'dark' || (themeMode === 'system' && systemColorScheme === 'dark');
    return isDark ? DarkTheme : DefaultTheme;
  }, [systemColorScheme, themeMode]);

  return (
    <ExpensesContextProvider>
      <ThemeModeProvider themeMode={themeMode} setThemeMode={setThemeMode} systemColorScheme={systemColorScheme}>
        <NavigationContainer theme={navigationTheme}>
          <Stack.Navigator>
            <Stack.Screen
              name="HomeTabs"
              component={HomeTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="GerenciarDespesa"
              component={GerenciarDespesa}
              options={{ title: 'Nova despesa' }}
            />
          </Stack.Navigator>
          <ThemeToggleButton />
        </NavigationContainer>
      </ThemeModeProvider>
    </ExpensesContextProvider>
  );
}

const styles = StyleSheet.create({
  themeToggleWrapper: {
    position: 'absolute',
    right: 16,
    bottom: 90,
    zIndex: 10,
  },
  themeToggle: {
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
  },
  themeToggleText: {
    fontWeight: '700',
  },
});
