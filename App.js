// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import 'react-native-gesture-handler';
// import "./global.css"
// import BottomNav from './app/Navigation/BottomNav';
// import AppNavigator from './app/Navigation/AppNavigator';

// export default function App() {
//   return (
//     <NavigationContainer>
//         <BottomNav/>
//          <AppNavigator />
//     </NavigationContainer>
//   );
// }



import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './app/Navigation/AppNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <AppNavigator /> {/* Only one root navigator */}
    </NavigationContainer>
  );
}