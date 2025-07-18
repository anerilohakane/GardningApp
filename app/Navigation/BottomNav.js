// // app/Navigation/BottomNav.js
// import React from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { Ionicons } from '@expo/vector-icons';
// import HomeScreen from '../Screens/home';
// import ProfileScreen from '../Screens/ProfileScreen';
// import PaymentScreen from '../Screens/PaymentScreen';
// import ServicesScreen from '../Screens/ServicesScreen';
// import BookingScreen from '../Screens/bookingScreen';
// import AllServicesScreen from '../Screens/AllServicesScreen';
// import RequestEstimateScreen from '../Screens/RequestEstimateScreen';
// import MyEstimatesScreen from '../Screens/MyEstimateScreen';
// import EstimateDetailScreen from '../Screens/EstimateDetailScreen';
// import Gallery from '../Screens/Gallery';
// import LoginScreen from '../Screens/login';
// import DateTimeSelectionScreen from '../Screens/DateTimeSelectionScreen';

// import BookingConfirmationScreen from '../Screens/BookingConfirmationScreen';
// import RescheduleScreen from '../Screens/Reschedule';
// import PortfolioScreen from '../Screens/Portfolio';
// import PrivacyPolicy from '../Screens/PrivacyPolicy';
// import HelpSupport from '../Screens/HelpSupport';

// const Tab = createBottomTabNavigator();
// const HomeStack = createNativeStackNavigator();

// function HomeStackScreen() {
//   return (
//     <HomeStack.Navigator>
//       <HomeStack.Screen 
//         name="HomeMain" 
//         component={HomeScreen} 
//         options={{ headerShown: false }} 
//       />
//        <HomeStack.Screen 
//         name="RequestEstimateScreen" 
//         component={RequestEstimateScreen}
//         options={{ 
//           title: 'Request Estimate',
//           headerBackTitle: 'Back'
//         }}
//       />
//       <HomeStack.Screen 
//         name="MyEstimates" 
//         component={MyEstimatesScreen}
//         options={{ 
//           title: 'My Estimates',
//           headerBackTitle: 'Back'
//         }}
//       />
//       <HomeStack.Screen 
//         name="EstimateDetail" 
//         component={EstimateDetailScreen} 
//         options={{ title: 'Estimate Details' }}
//       />
//       <HomeStack.Screen 
//         name="AllServices" 
//         component={AllServicesScreen}
//         options={{ 
//           title: 'My Services',
//           headerBackTitle: 'Back'
//         }}
//       />


//       <HomeStack.Screen 
//         name="Gallery" 
//         component={Gallery} 
//         options={{ title: 'Gallery' }}
//       />
//       <HomeStack.Screen 
//           name="login" 
//           component={LoginScreen} 
//           options={{ headerShown: false }}
//         />
//         <HomeStack.Screen 
//   name="DateTimeSelection" 
//   component={DateTimeSelectionScreen} 
//   options={{ title: 'Select Date & Time' }}
// />
 

//        <HomeStack.Screen 
//         name="Reschedule" 
//         component={RescheduleScreen} 
//         options={{ title: 'Reschedule Service' }}
//       />

//       <HomeStack.Screen 
//         name="BookingConfirmation" 
//         component={BookingConfirmationScreen}
//         options={{ title: 'Booking Confirmation', headerLeft: null }} // Disables back button
//       />
//        <HomeStack.Screen 
//         name="PrivacyPolicy" 
//         component={PrivacyPolicy}
//         options={{ title: 'Privacy Policy' }}
//       />

//       <HomeStack.Screen 
//         name="HelpSupport" 
//         component={HelpSupport}
//         options={{ 
//           title: 'Help & Support',
//           headerBackTitle: 'Back'
//         }}
//       />

//        <HomeStack.Screen 
//         name="Payment" 
//         component={PaymentScreen}
//         options={{
//           title: 'Payment'
//         }}
//       />
//     </HomeStack.Navigator>
//   );
// }

// const BottomNav = () => {
//   return (
    
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarIcon: ({ focused, color, size }) => {
//           let iconName;

//           if (route.name === 'Home') {
//             iconName = focused ? 'home' : 'home-outline';
//           } else if (route.name === 'Services') {
//             iconName = focused ? 'list' : 'list-outline';
//           } else if (route.name === 'Booking') {
//             iconName = focused ? 'calendar' : 'calendar-outline';
//           } else if (route.name === 'Payment') {
//             iconName = focused ? 'card' : 'card-outline';
//           } else if (route.name === 'Profile') {
//             iconName = focused ? 'person' : 'person-outline';
//           }

//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//         tabBarActiveTintColor: 'green',
//         tabBarInactiveTintColor: 'gray',
//         tabBarStyle: {
//           paddingBottom: 80,
//           height: 60,
//         },
//         tabBarLabelStyle: {
//           fontSize: 12,
//           marginBottom: 5,
//         },
//       })}
//     >
//       <Tab.Screen 
//         name="HomeTab" 
//         component={HomeStackScreen}
//         options={{
//           title: 'Home',
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="home" size={size} color={color} />
//           ),
//         }}
//       />


//       <Tab.Screen 
//         name="Services" 
//         component={ServicesScreen}
//         options={{
//           title: 'Services'
//         }}
//       />
//       <Tab.Screen 
//         name="Booking" 
//         component={BookingScreen}
//         options={{
//           title: 'Booking'
//         }}
//       />
//       {/* <Tab.Screen 
//         name="Payment" 
//         component={PaymentScreen}
//         options={{
//           title: 'Payment'
//         }}
//       /> */}
//  <Tab.Screen 
//         name="Portfolio" 
//         component={PortfolioScreen}
//         options={{
//           title: 'Portfolio',
//           tabBarIcon: ({ color, size }) => (
//             <Ionicons name="business" size={size} color={color} />
//           ),
//         }}
//       />
      
//       <Tab.Screen 
//         name="Profile" 
//         component={ProfileScreen}
//         options={{
//           title: 'Profile'
//         }}
//       />
//     </Tab.Navigator>
//   );
// };

// export default BottomNav;




// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { CURRENT_ROLE, ROLES } from '../config/roles';
// import Dashboard from '../Screens/TenantAdmin/Dashboard';
// import AppointmentListScreen from '../Screens/TenantAdmin/AppointmentListScreen';
// import ViewAppointment from '../Screens/TenantAdmin/ViewAppointment';
// import ServiceList from '../Screens/TenantAdmin/ServiceList';
// import EstimateList from '../Screens/TenantAdmin/EstimateList';
// import CustomerList from '../Screens/TenantAdmin/CustomerList';
// import AddService from '../Screens/TenantAdmin/AddService';
// import EditService from '../Screens/TenantAdmin/EditService';
// import MyEstimatesScreen from '../Screens/Customer/MyEstimateScreen';
// import EstimateDetailScreen from '../Screens/Customer/EstimateDetailScreen';

// const Tab = createBottomTabNavigator();
// const HomeStack = createNativeStackNavigator();
// const TenantAdminStack = createNativeStackNavigator();

// // Tenant Admin Stack Navigator
// function TenantAdminHomeStack() {
//   return (
//      <TenantAdminStack.Navigator
//       screenOptions={{
//         animation: 'fade',
//         gestureEnabled: true,
//         headerShown: false,
//         detachInactiveScreens: false // Crucial for fixing the issue
//       }}
//     >
//       <TenantAdminStack.Screen 
//         name="Dashboard" 
//         component={Dashboard}
//         options={{ 
//           title: 'Admin Dashboard',
//           freezeOnBlur: false,
//         }}
//       />
//       <TenantAdminStack.Screen 
//         name="AppointmentListScreen" 
//         component={AppointmentListScreen}
//         options={{ 
//           title: 'Appointments',
//           freezeOnBlur: false
//         }}
//       />

//       <TenantAdminStack.Screen 
//         name="ViewAppointment" 
//         component={ViewAppointment}
//         options={{ 
//           title: 'ViewAppointment',
//           freezeOnBlur: false
//         }}
//       />
//       <TenantAdminStack.Screen 
//         name="ServiceList" 
//         component={ServiceList}
//         options={{ 
//           title: 'Services',
//           freezeOnBlur: false
//         }}
//       />
//       <TenantAdminStack.Screen 
//         name="EstimateList" 
//         component={EstimateList}
//         options={{ 
//           title: 'Pending Requests',
//           freezeOnBlur: false
//         }}
//       />

//       <TenantAdminStack.Screen 
//         name="CustomerList" 
//         component={CustomerList}
//         options={{ 
//           title: 'Customers',
//           freezeOnBlur: false
//         }}
//       />


//        <TenantAdminStack.Screen 
//         name="AddService" 
//         component={AddService}
//         options={{ 
//           title: 'AddService',
//           freezeOnBlur: false
//         }}
//       />

      
//        <TenantAdminStack.Screen 
//         name="EditService" 
//         component={EditService}
//         options={{ 
//           title: 'EditService',
//           freezeOnBlur: false
//         }}
//       />
//       <TenantAdminStack.Screen 
//         name="ActiveUsersScreen" 
//         component={MyEstimatesScreen} // Replace with your actual component
//         options={{ 
//           title: 'Active Users',
//           freezeOnBlur: false
//         }}
//       />
//     </TenantAdminStack.Navigator>
//   );
// }

// // Customer Stack Navigator
// function CustomerHomeStack() {
//   return (
//     <HomeStack.Navigator
//       screenOptions={{
//         freezeOnBlur: false, // Prevents navigation issues
//         detachPreviousScreen: false
//       }}
//     >
//       <HomeStack.Screen 
//         name="AllServices" 
//         component={AllServicesScreen}
//         options={{ title: 'All Services' }}
//       />
//       <HomeStack.Screen 
//         name="RequestEstimate" 
//         component={RequestEstimateScreen}
//         options={{ title: 'Request Estimate' }}
//       />
//       <HomeStack.Screen 
//         name="MyEstimates" 
//         component={MyEstimatesScreen}
//         options={{ title: 'My Estimates' }}
//       />
//       <HomeStack.Screen 
//         name="EstimateDetail" 
//         component={EstimateDetailScreen}
//         options={{ title: 'Estimate Details' }}
//       />
//     </HomeStack.Navigator>
//   );
// }

// export default function BottomNav() {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         lazy: false, // Preload all tabs
//         unmountOnBlur: false, // Keep all tabs mounted
//         freezeOnBlur: false, // Important for navigation consistency
//         detachPreviousScreen: false
//       }}
//     >
//       {/* Tenant Admin Tab */}
//       {CURRENT_ROLE === ROLES.TENANT_ADMIN && (
//         <Tab.Screen 
//           name="AdminHome" 
//           component={TenantAdminHomeStack}
//           options={{ 
//             title: 'Admin',
//             // Add these for better tab behavior
//             freezeOnBlur: false
//           }}
//         />
//       )}

//       {/* Customer Tab */}
//       {CURRENT_ROLE === ROLES.CUSTOMER && (
//         <Tab.Screen 
//           name="CustomerHome" 
//           component={CustomerHomeStack}
//           options={{ 
//             title: 'Home',
//             freezeOnBlur: false
//           }}
//         />
//       )}
//     </Tab.Navigator>
//   );
// }




import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ServiceStack from './ServiceStack';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from '../Screens/home';
import ProfileScreen from '../Screens/ProfileScreen';
import PaymentScreen from '../Screens/PaymentScreen';
import ServicesScreen from '../Screens/ServicesScreen';
import DashboardScreen from '../Screens/DashboardScreen';
import AllServicesScreen from '../Screens/AllServicesScreen';
import RequestEstimateScreen from '../Screens/RequestEstimateScreen';
import MyEstimatesScreen from '../Screens/MyEstimateScreen';
import EstimateDetailScreen from '../Screens/EstimateDetailScreen';
import Gallery from '../Screens/Gallery';
import LoginScreen from '../Screens/login';

import EditProfileScreen from '../Screens/EditProfile';
import RescheduleScreen from '../Screens/Reschedule';
import PortfolioScreen from '../Screens/Portfolio';
import PortfolioDetailScreen from '../Screens/PortfolioDetailScreen'
import PrivacyPolicy from '../Screens/PrivacyPolicy';
import HelpSupport from '../Screens/HelpSupport';
import TermsOfService from '../Screens/TermsOfService';
import AppointmentList from '../Screens/AppointmentList';


const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();

const PortfolioStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen 
        name="HomeMain" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
      <HomeStack.Screen 
        name="RequestEstimateScreen" 
        component={RequestEstimateScreen}
        options={{ 
          title: 'Request Estimate',
          headerBackTitle: 'Back'
        }}
      />
      <HomeStack.Screen 
        name="MyEstimates" 
        component={MyEstimatesScreen}
        options={{ 
          title: 'My Estimates',
          headerBackTitle: 'Back'
        }}
      />
      <HomeStack.Screen 
        name="EstimateDetail" 
        component={EstimateDetailScreen} 
        options={{ title: 'Estimate Details' }}
      />
      <HomeStack.Screen 
        name="AllServices" 
        component={AllServicesScreen}
        options={{ 
          title: 'My Services',
          headerBackTitle: 'Back'
        }}
      />
      <HomeStack.Screen 
        name="Gallery" 
        component={Gallery} 
        options={{ title: 'Gallery' }}
      />
      <HomeStack.Screen 
        name="login" 
        component={LoginScreen} 
        options={{ headerShown: false }}
      />
      
      <HomeStack.Screen 
        name="Reschedule" 
        component={RescheduleScreen} 
        options={{ title: 'Reschedule Service' }}
      />
      <HomeStack.Screen 
        name="EditProfile" 
        component={EditProfileScreen}
        options={{ title: 'Edit Profile', headerLeft: null }}
      />
       <HomeStack.Screen 
        name="AppointmentList" 
        component={AppointmentList}
        options={{ title: 'My Appointments', headerLeft: null }}
      />
      <HomeStack.Screen 
        name="PortfolioDetail" 
        component={PortfolioDetailScreen}
        options={{ title: 'Portfolio Details', headerLeft: null }}
      />
      <HomeStack.Screen 
        name="PrivacyPolicy" 
        component={PrivacyPolicy}
        options={{ title: 'Privacy Policy' }}
      />
      <HomeStack.Screen 
        name="HelpSupport" 
        component={HelpSupport}
        options={{ 
          title: 'Help & Support',
          headerBackTitle: 'Back'
        }}
      />
      <HomeStack.Screen 
        name="TermsOfService" 
        component={TermsOfService}
        options={{ title: 'Terms Of Service' }}
      />
      <HomeStack.Screen 
        name="Payment" 
        component={PaymentScreen}
        options={{ title: 'Payment' }}
      />
    </HomeStack.Navigator>
  );
}


function PortfolioStackScreen() {
  return (
    <PortfolioStack.Navigator>
      <PortfolioStack.Screen 
        name="PortfolioMain" 
        component={PortfolioScreen} 
        options={{ headerShown: false }}
      />
      <PortfolioStack.Screen 
        name="PortfolioDetail" 
        component={PortfolioDetailScreen}
        options={{ title: 'Portfolio Details' }}
      />
    </PortfolioStack.Navigator>
  );
}

const BottomNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'HomeTab') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Services') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Dashboard') {
            iconName = focused ? 'calendar' : 'calendar-outline';
          } else if (route.name === 'Portfolio') {
            iconName = focused ? 'business' : 'business-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'green',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          paddingBottom: 5,
          height: 90,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
      })}
    >
      <Tab.Screen 
        name="HomeTab" 
        component={HomeStackScreen}
        options={{
          title: 'Home'
        }}
      />
      {/* <Tab.Screen 
        name="Services" 
        component={ServicesScreen}
        options={{
          title: 'Services'
        }}
      /> */}


      <Tab.Screen 
        name="Services" 
        component={ServiceStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Dashboard" 
        component={DashboardScreen}
        options={{
          title: 'Dashboard'
        }}
      />
      <Tab.Screen 
        name="Portfolio" 
        component={PortfolioStackScreen}
        options={{
          title: 'Portfolio'
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          title: 'Profile'
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNav;