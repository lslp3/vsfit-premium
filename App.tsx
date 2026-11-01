import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import './global.css'; // Importação do Tailwind

import ExecutionScreen from './src/screens/ExecutionScreen';
import BuilderScreen from './src/screens/BuilderScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: '#18181b',
              borderTopColor: 'rgba(255,255,255,0.1)',
              paddingTop: 10,
              height: 85,
              paddingBottom: 25,
            },
            tabBarActiveTintColor: '#dc2626',
            tabBarInactiveTintColor: '#71717a',
            tabBarLabelStyle: { fontSize: 10, fontWeight: 'bold', marginTop: -5 },
          }}
        >
          <Tab.Screen 
            name="Dashboard" 
            component={DashboardScreen} 
            options={{ tabBarIcon: ({color}) => <Ionicons name="grid-outline" size={24} color={color} /> }}
          />
          <Tab.Screen 
            name="Executar" 
            component={ExecutionScreen} 
            options={{ tabBarIcon: ({color}) => <Ionicons name="play-circle-outline" size={28} color={color} /> }}
          />
          <Tab.Screen 
            name="Montar" 
            component={BuilderScreen} 
            options={{ tabBarIcon: ({color}) => <Ionicons name="construct-outline" size={24} color={color} /> }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}