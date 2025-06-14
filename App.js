import './global.css';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 bg-blue-500 justify-center items-center">
      <Text className="text-white text-2xl font-bold">
        Hello NativeWind with Expo!
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}