// // app/Navigation/AppNavigator.js
// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import BottomNav from './BottomNav';
// import LoginScreen from '../Screens/login';
// import SignUp from '../Screens/signUp'; // Your signup screen

// const Stack = createNativeStackNavigator();

// const AppNavigator = () => {
//   return (
//     <Stack.Navigator initialRouteName="Login">
//       <Stack.Screen
//         name="Login"
//         component={LoginScreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="signUp"
//         component={SignUp}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Home"
//         component={BottomNav}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   );
// };

// export default AppNavigator;



import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNav from './BottomNav';
import LoginScreen from '../Screens/login';
import SignUp from '../Screens/signUp';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      {/* Auth Screens */}
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      
      {/* Main App (Tabs + Nested Stacks) */}
      <Stack.Screen
        name="Home"
        component={BottomNav}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;