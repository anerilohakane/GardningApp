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



// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import BottomNav from './BottomNav';
// import LoginScreen from '../Screens/login';
// import SignUp from '../Screens/signUp';

// const Stack = createNativeStackNavigator();

// const AppNavigator = () => {
//   return (
//     <Stack.Navigator initialRouteName="Login">
//       {/* Auth Screens */}
//       <Stack.Screen
//         name="Login"
//         component={LoginScreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="SignUp"
//         component={SignUp}
//         options={{ headerShown: false }}
//       />
      
//       {/* Main App (Tabs + Nested Stacks) */}
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
import TenantBottomNav from './TenantBottomNav'; // New import
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
// import LoadingScreen from '../Screens/LoadingScreen';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [initialRoute, setInitialRoute] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const userString = await AsyncStorage.getItem('user');
        const user = userString ? JSON.parse(userString) : null;

        if (token && user) {
          // Check user role to determine which dashboard to show
          if (user.role === 'tenantAdmin' || user.role === 'superAdmin') {
            setInitialRoute('TenantHome');
          } else {
            setInitialRoute('Home');
          }
        } else {
          setInitialRoute('Login');
        }
      } catch (error) {
        console.error('Error checking auth:', error);
        setInitialRoute('Login');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // if (isLoading) {
  //   return <LoadingScreen />;
  // }

  return (
    <Stack.Navigator initialRouteName={initialRoute}>
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
      
      {/* Customer App */}
      <Stack.Screen
        name="Home"
        component={BottomNav}
        options={{ headerShown: false }}
      />
      
      {/* Tenant Admin App */}
      <Stack.Screen
        name="TenantHome"
        component={TenantBottomNav}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;