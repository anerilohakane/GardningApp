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
        
        // Validate booking data exists
        if (!bookingData) {
          throw new Error('Booking data is missing');
        }

        // Get the user token from AsyncStorage
        const token = await AsyncStorage.getItem('token');
        if (!token) {
          throw new Error('User not authenticated');
        }

        // Validate required fields
          if (!bookingData?.service?.id && !bookingData?.service?._id) {
    throw new Error('Service information is missing');
  }

        if (!bookingData?.bookingDetails?.date) {
          throw new Error('Booking date is missing');
        }

        if (!bookingData?.bookingDetails?.startTime || !bookingData?.bookingDetails?.endTime) {
          throw new Error('Booking times are missing');
        }

        // Parse the times
        let startHours, startMinutes, endHours, endMinutes;
        try {
          [startHours, startMinutes] = bookingData.bookingDetails.startTime.split(':').map(Number);
          [endHours, endMinutes] = bookingData.bookingDetails.endTime.split(':').map(Number);
          
          if (isNaN(startHours) || isNaN(startMinutes) || isNaN(endHours) || isNaN(endMinutes)) {
            throw new Error('Invalid time format');
          }
        } catch (err) {
          throw new Error('Invalid time format. Please use HH:mm format (e.g., "08:00")');
        }

        // Create date objects
        const startDate = new Date(bookingData.bookingDetails.date);
        startDate.setHours(startHours, startMinutes, 0, 0);

        const endDate = new Date(bookingData.bookingDetails.date);
        endDate.setHours(endHours, endMinutes, 0, 0);

        // Prepare payload with proper null checks
        const payload = {
          service: bookingData.service.id,
          date: bookingData.bookingDetails.date,
          timeSlot: {
            startTime: startDate.toISOString(),
            endTime: endDate.toISOString()
          },
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

        // Make the API call to create appointment
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

  // Format the appointment date
  const formattedDate = new Date(appointment.date).toLocaleString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

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
            <Text className="text-gray-700 font-medium mb-1">Date & Time:</Text>
            <Text className="text-gray-800">{formattedDate}</Text>
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