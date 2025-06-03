import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import "./global.css"
import BottomNav from './app/Navigation/BottomNav';

export default function App() {
  return (
    <NavigationContainer>
        <BottomNav/>
    </NavigationContainer>
  );
}

