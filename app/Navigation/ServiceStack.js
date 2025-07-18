// src/navigation/ServiceStack.js
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../Screens/ServicesScreen';
import ServiceDetailScreen from '../Screens/services/ServiceDetailScreen';
import BookServiceScreen from '../Screens/services/BookServiceScreen';
import CustomerDetailsScreen from '../Screens/services/CustomerDetailsScreen';
import BookingConfirmationScreen from '../Screens/services/BookingConfirmationScreen';
import ContactScreen from '../Screens/common/ContactScreen';

const Stack = createNativeStackNavigator();

const ServiceStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ServicesHome" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="ServiceDetail" 
        component={ServiceDetailScreen} 
        options={{ title: 'Service Details' }} 
      />
      <Stack.Screen 
        name="BookService" 
        component={BookServiceScreen} 
        options={{ title: 'Book Service' }} 
      />
      <Stack.Screen 
        name="CustomerDetails" 
        component={CustomerDetailsScreen} 
        options={{ title: 'Your Details' }} 
      />
      <Stack.Screen 
        name="BookingConfirmation" 
        component={BookingConfirmationScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Contact" 
        component={ContactScreen} 
        options={{ title: 'Contact Us' }} 
      />
    </Stack.Navigator>
  );
};

export default ServiceStack;