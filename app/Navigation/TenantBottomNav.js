// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { Ionicons } from '@expo/vector-icons';
// import TenantDashboardScreen from '../Screens/TenantAdmin/TenantDashboardScreen';
// import TenantServicesScreen from '../Screens/TenantAdmin/TenantServicesScreen';
// import TenantEstimatesScreen from '../Screens/TenantAdmin/EstimateList';
// import AppointmentListScreen from '../Screens/TenantAdmin/AppointmentListScreen';
// import ProfileScreen from '../Screens/TenantAdmin/ProfileScreen';
// // import TenantCustomersScreen from '../Screens/Tenant/TenantCustomersScreen';
// // import TenantProfileScreen from '../Screens/Tenant/TenantProfileScreen';
// // import TenantServiceDetailScreen from '../Screens/Tenant/TenantServiceDetailScreen';
// // import TenantCustomerDetailScreen from '../Screens/Tenant/TenantCustomerDetailScreen';
// // import TenantSettingsScreen from '../Screens/Tenant/TenantSettingsScreen';
// // import TenantReportsScreen from '../Screens/Tenant/TenantReportsScreen';

// const Tab = createBottomTabNavigator();
// const TenantStack = createNativeStackNavigator();

// function TenantDashboardStack() {
//   return (
//     <TenantStack.Navigator>
//       <TenantStack.Screen 
//         name="TenantDashboardMain" 
//         component={TenantDashboardScreen} 
//         options={{ headerShown: false }} 
//       />
//       {/* <TenantStack.Screen 
//         name="TenantReports" 
//         component={TenantReportsScreen}
//         options={{ title: 'Reports' }}
//       /> */}
//     </TenantStack.Navigator>
//   );
// }

// function TenantServicesStack() {
//   return (
//     <TenantStack.Navigator>
//       <TenantStack.Screen 
//         name="TenantServicesMain" 
//         component={TenantServicesScreen} 
//         options={{ headerShown: false }} 
//       />
//       {/* <TenantStack.Screen 
//         name="TenantServiceDetail" 
//         component={TenantServiceDetailScreen}
//         options={{ title: 'Service Details' }}
//       /> */}
//     </TenantStack.Navigator>
//   );
// }

// // function TenantCustomersStack() {
// //   return (
// //     <TenantStack.Navigator>
// //       <TenantStack.Screen 
// //         name="TenantCustomersMain" 
// //         component={TenantCustomersScreen} 
// //         options={{ headerShown: false }} 
// //       />
// //       <TenantStack.Screen 
// //         name="TenantCustomerDetail" 
// //         component={TenantCustomerDetailScreen}
// //         options={{ title: 'Customer Details' }}
// //       />
// //     </TenantStack.Navigator>
// //   );
// // }

// // function TenantProfileStack() {
// //   return (
// //     <TenantStack.Navigator>
// //       <TenantStack.Screen 
// //         name="TenantProfileMain" 
// //         component={TenantProfileScreen} 
// //         options={{ headerShown: false }} 
// //       />
// //       <TenantStack.Screen 
// //         name="TenantSettings" 
// //         component={TenantSettingsScreen}
// //         options={{ title: 'Settings' }}
// //       />
// //     </TenantStack.Navigator>
// //   );
// // }

// const TenantBottomNav = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           if (route.name === 'TenantDashboard') {
//             iconName = focused ? 'speedometer' : 'speedometer-outline';
//           } else if (route.name === 'TenantProfile') {
//              iconName = focused ? 'person' : 'person-outline';
//           } else if (route.name === 'Appointments') {
//             iconName = focused ? 'people' : 'people-outline';
//           } else if (route.name === 'Estimates') {
//              iconName = focused ? 'construct' : 'construct-outline';
//           }

//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: '#10B981', // Emerald green
//         tabBarInactiveTintColor: 'gray',
//         tabBarStyle: {
//           paddingBottom: 5,
//           height: 90,
//           backgroundColor: '#FFFFFF',
//           borderTopWidth: 1,
//           borderTopColor: '#E5E7EB',
//         },
//         tabBarLabelStyle: {
//           fontSize: 12,
//           marginBottom: 5,
//           fontWeight: '500',
//         },
//       })}
//     >
//       <Tab.Screen 
//         name="TenantDashboard" 
//         component={TenantDashboardStack}
//         options={{
//           title: 'Dashboard'
//         }}
//       />

//       <Tab.Screen 
//         name="Appointments" 
//         component={AppointmentListScreen}
//         options={{
//           title: 'Appointments'
//         }}
//       />

//        <Tab.Screen 
//         name="Estimates" 
//         component={TenantEstimatesScreen}
//         options={{
//           title: 'Estimates'
//         }}
//       />

//       <Tab.Screen 
//         name="TenantProfile" 
//         component={ProfileScreen}
//         options={{
//           title: 'Profile'
//         }}
//       />
//       {/* <Tab.Screen 
//         name="TenantCustomers" 
//         component={TenantCustomersStack}
//         options={{
//           title: 'Customers'
//         }}
//       />
//       <Tab.Screen 
//         name="TenantProfile" 
//         component={TenantProfileStack}
//         options={{
//           title: 'Profile'
//         }}
//       /> */}
//     </Tab.Navigator>
//   );
// };

// export default TenantBottomNav;






import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import TenantDashboardScreen from '../Screens/TenantAdmin/TenantDashboardScreen';
import TenantServicesScreen from '../Screens/TenantAdmin/TenantServicesScreen';
import TenantEstimatesScreen from '../Screens/TenantAdmin/EstimateList';
import AppointmentListScreen from '../Screens/TenantAdmin/AppointmentListScreen';
import EditAppointmentScreen from '../Screens/TenantAdmin/EditAppointmentScreen';
import ProfileScreen from '../Screens/TenantAdmin/ProfileScreen';

const Tab = createBottomTabNavigator();
const TenantStack = createNativeStackNavigator();
const AppointmentStack = createNativeStackNavigator();

function AppointmentStackScreen() {
  return (
    <AppointmentStack.Navigator>
      <AppointmentStack.Screen 
        name="AppointmentList" 
        component={AppointmentListScreen} 
        options={{ headerShown: false }}
      />
      <AppointmentStack.Screen 
        name="EditAppointment" 
        component={EditAppointmentScreen}
        options={{ title: 'Edit Appointment' }}
      />
    </AppointmentStack.Navigator>
  );
}

function TenantDashboardStack() {
  return (
    <TenantStack.Navigator>
      <TenantStack.Screen 
        name="TenantDashboardMain" 
        component={TenantDashboardScreen} 
        options={{ headerShown: false }} 
      />
    </TenantStack.Navigator>
  );
}

function TenantServicesStack() {
  return (
    <TenantStack.Navigator>
      <TenantStack.Screen 
        name="TenantServicesMain" 
        component={TenantServicesScreen} 
        options={{ headerShown: false }} 
      />
    </TenantStack.Navigator>
  );
}

const TenantBottomNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'TenantDashboard') {
            iconName = focused ? 'speedometer' : 'speedometer-outline';
          } else if (route.name === 'TenantProfile') {
             iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Appointments') {
            iconName = focused ? 'people' : 'people-outline';
          } else if (route.name === 'Estimates') {
             iconName = focused ? 'construct' : 'construct-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#10B981',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          paddingBottom: 5,
          height: 90,
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E5E7EB',
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
          fontWeight: '500',
        },
      })}
    >
      <Tab.Screen 
        name="TenantDashboard" 
        component={TenantDashboardStack}
        options={{ title: 'Dashboard' }}
      />

      <Tab.Screen 
        name="Appointments" 
        component={AppointmentStackScreen}
        options={{ title: 'Appointments' }}
      />

      <Tab.Screen 
        name="Estimates" 
        component={TenantEstimatesScreen}
        options={{ title: 'Estimates' }}
      />

      <Tab.Screen 
        name="TenantProfile" 
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

export default TenantBottomNav;