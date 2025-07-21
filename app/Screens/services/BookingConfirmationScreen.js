// // src/screens/services/BookingConfirmationScreen.js
// import React from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { MaterialCommunityIcons } from '@expo/vector-icons';

// const BookingConfirmationScreen = ({ navigation }) => {
//   return (
//     <View className="flex-1 bg-gray-50 items-center justify-center p-8">
//       <View className="bg-white rounded-2xl p-8 items-center shadow-sm shadow-green-100 w-full max-w-md">
//         <View className="bg-green-100 rounded-full p-5 mb-6">
//           <View className="bg-green-200 rounded-full p-4">
//             <MaterialCommunityIcons name="check-circle" size={40} color="#16A34A" />
//           </View>
//         </View>
        
//         <Text className="text-green-800 font-bold text-2xl text-center mb-3">Booking Confirmed!</Text>
//         <Text className="text-gray-600 text-center mb-6">
//           Your service has been successfully booked. Our team will contact you shortly to confirm the details.
//         </Text>
        
//         <TouchableOpacity 
//           className="bg-green-600 rounded-lg py-3 px-6 w-full items-center"
//           onPress={() => navigation.popToTop()}
//         >
//           <Text className="text-white font-bold text-lg">Back to Home</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// export default BookingConfirmationScreen;




// Updated BookingConfirmationScreen.js
import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  ActivityIndicator
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { TENANT_CONFIG } from '../../config/constants';

const BookingConfirmationScreen = ({ route, navigation }) => {
  const { bookingData } = route.params;
  const [loading, setLoading] = useState(true);
  const [appointment, setAppointment] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const createAppointment = async () => {
  try {
    setLoading(true);
    
    if (!bookingData) {
      throw new Error('Booking data is missing');
    }

    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('User not authenticated');
    }

    // Format the date and time for the email
    const formattedDate = new Date(bookingData.bookingDetails.date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const formattedTime = formatTimeSlot(
      bookingData.bookingDetails.startTime,
      bookingData.bookingDetails.endTime
    );

    // Prepare payload with additional formatted fields
    const payload = {
      service: bookingData.service.id,
      date: bookingData.bookingDetails.date,
      timeSlot: {
        startTime: bookingData.bookingDetails.startTime,
        endTime: bookingData.bookingDetails.endTime,
        formatted: formattedTime // Add formatted time string
      },
      formattedDate: formattedDate, // Add formatted date string
      customerNotes: bookingData.bookingDetails.notes || '',
      propertyDetails: (bookingData.properties || []).map(property => ({
        propertyId: property?.id || '',
        address: {
          street: property?.street || '',
          city: property?.city || '',
          state: property?.state || '',
          zip: property?.zip || ''
        },
        areas: property?.areas ? 
          Object.entries(property.areas)
            .filter(([_, needsService]) => needsService)
            .map(([area]) => area)
          : []
      }))
    };

    const response = await axios.post(
      `${TENANT_CONFIG.API_BASE_URL}/appointments`,
      payload,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
          'X-Tenant-ID': TENANT_CONFIG.ID,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.data && response.data.data) {
      setAppointment(response.data.data);
    } else {
      throw new Error('Invalid response from server');
    }
  } catch (err) {
    console.error('Appointment creation failed:', err);
    setError(err.response?.data?.message || err.message || 'Failed to create appointment');
  } finally {
    setLoading(false);
  }
};

    createAppointment();
  }, [bookingData]);

 
const formatTimeSlot = (startTime, endTime) => {
  try {
    // If the times are already in HH:mm format (from BookServiceScreen)
    if (typeof startTime === 'string' && startTime.includes(':')) {
      const formatTime = (timeStr) => {
        const [hours, minutes] = timeStr.split(':');
        const hour = parseInt(hours, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes} ${ampm}`;
      };
      return `${formatTime(startTime)} - ${formatTime(endTime)}`;
    }
    
    // If the times are ISO strings (from API response)
    if (startTime instanceof Date || typeof startTime === 'string') {
      const start = new Date(startTime);
      const end = new Date(endTime);
      return `${start.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })} - ${end.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })}`;
    }

    return 'Time not available';
  } catch (error) {
    console.error('Error formatting time:', error);
    return 'Invalid time format';
  }
};

// And update the time display in the return statement:
<View className="bg-gray-50 p-4 rounded-lg mb-3">
  <Text className="text-gray-700 font-medium mb-1">Date:</Text>
  <Text className="text-gray-800">
    {new Date(bookingData.bookingDetails.date).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })}
  </Text>
  <Text className="text-gray-700 font-medium mb-1 mt-2">Time:</Text>
  <Text className="text-gray-800">
    {formatTimeSlot(bookingData.bookingDetails.startTime, bookingData.bookingDetails.endTime)}
  </Text>
</View>

  if (loading) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center">
        <ActivityIndicator size="large" color="#16A34A" />
        <Text className="mt-4 text-gray-600">Confirming your booking...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-gray-50 items-center justify-center p-8">
        <View className="bg-white rounded-2xl p-8 items-center shadow-sm shadow-red-100 w-full max-w-md">
          <View className="bg-red-100 rounded-full p-5 mb-6">
            <View className="bg-red-200 rounded-full p-4">
              <MaterialCommunityIcons name="alert-circle" size={40} color="#DC2626" />
            </View>
          </View>
          
          <Text className="text-red-800 font-bold text-2xl text-center mb-3">Booking Failed</Text>
          <Text className="text-gray-600 text-center mb-6">
            {error}
          </Text>
          
          <TouchableOpacity 
            className="bg-red-600 rounded-lg py-3 px-6 w-full items-center"
            onPress={() => navigation.goBack()}
          >
            <Text className="text-white font-bold text-lg">Try Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (!appointment) {
    return null;
  }

  return (
    <View className="flex-1 bg-gray-50 items-center justify-center p-8">
      <View className="bg-white rounded-2xl p-8 items-center shadow-sm shadow-green-100 w-full max-w-md">
        <View className="bg-green-100 rounded-full p-5 mb-6">
          <View className="bg-green-200 rounded-full p-4">
            <MaterialCommunityIcons name="check-circle" size={40} color="#16A34A" />
          </View>
        </View>
        
        <Text className="text-green-800 font-bold text-2xl text-center mb-3">Booking Confirmed!</Text>
        
        <View className="w-full mb-6">
          <View className="bg-gray-50 p-4 rounded-lg mb-3">
            <Text className="text-gray-700 font-medium mb-1">Service:</Text>
            <Text className="text-gray-800">{bookingData?.service?.name || 'N/A'}</Text>
          </View>
          
          <View className="bg-gray-50 p-4 rounded-lg mb-3">
            <Text className="text-gray-700 font-medium mb-1">Date:</Text>
            <Text className="text-gray-800">
              {new Date(appointment.date).toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </Text>
            <Text className="text-gray-700 font-medium mb-1 mt-2">Time:</Text>
            <Text className="text-gray-800">
              {formatTimeSlot(appointment.timeSlot.startTime, appointment.timeSlot.endTime)}
            </Text>
          </View>
          
          <View className="bg-gray-50 p-4 rounded-lg">
            <Text className="text-gray-700 font-medium mb-1">Confirmation #:</Text>
            <Text className="text-gray-800">{appointment._id}</Text>
          </View>
        </View>
        
        <Text className="text-gray-600 text-center mb-6">
          You'll receive a confirmation email shortly. Our team will contact you if we need any additional information.
        </Text>
        
        <TouchableOpacity 
          className="bg-green-600 rounded-lg py-3 px-6 w-full items-center mb-4"
          onPress={() => navigation.popToTop()}
        >
          <Text className="text-white font-bold text-lg">Back to Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="border border-green-600 rounded-lg py-3 px-6 w-full items-center"
          onPress={() => navigation.navigate('HomeTab', { screen: 'AppointmentList' })}
        >
          <Text className="text-green-600 font-bold text-lg">View My Appointments</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookingConfirmationScreen;