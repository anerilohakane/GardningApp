// // src/screens/services/BookServiceScreen.js
// import React, { useState } from 'react';
// import { 
//   View, Text, Image, ScrollView, TouchableOpacity, Alert 
// } from 'react-native';
// import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
// import { format } from 'date-fns';
// import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';

// const BookServiceScreen = ({ route, navigation }) => {
//   const { service } = route.params;
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [selectedSlot, setSelectedSlot] = useState(null);

//   const timeSlots = [
//     { id: 1, time: '08:00 AM - 10:00 AM', available: true },
//     { id: 2, time: '10:00 AM - 12:00 PM', available: true },
//     { id: 3, time: '12:00 PM - 02:00 PM', available: false },
//     { id: 4, time: '02:00 PM - 04:00 PM', available: true },
//     { id: 5, time: '04:00 PM - 06:00 PM', available: true },
//   ];

//   const showDatePicker = () => {
//     DateTimePickerAndroid.open({
//       value: selectedDate,
//       onChange: (event, date) => {
//         if (date) {
//           setSelectedDate(date);
//         }
//       },
//       mode: 'date',
//       minimumDate: new Date(),
//     });
//   };

//   const handleContinue = () => {
//     if (!selectedSlot) {
//       Alert.alert('Please select a time slot');
//       return;
//     }
    
//     const selectedTimeSlot = timeSlots.find(slot => slot.id === selectedSlot);
    
//     navigation.navigate('CustomerDetails', {
//       service,
//       bookingDetails: {
//         date: selectedDate,
//         timeSlot: selectedTimeSlot.time
//       }
//     });
//   };

//   return (
//     <ScrollView className="flex-1 bg-gray-50 p-5">
//       <View className="mb-6">
//         <TouchableOpacity 
//           className="flex-row items-center mb-4"
//           onPress={() => navigation.goBack()}
//         >
//           <Ionicons name="arrow-back" size={24} color="#16A34A" />
//           <Text className="text-green-600 ml-2 text-lg">Back</Text>
//         </TouchableOpacity>
        
//         <Text className="text-green-800 font-bold text-2xl">Book {service.name}</Text>
//         <Text className="text-green-700 font-medium text-lg mt-1">{service.price}</Text>
//       </View>

//       <View className="bg-white rounded-2xl p-5 mb-6 shadow-lg shadow-green-200/80 border border-green-50">
//         <View className="flex-row items-center">
//           <View className="relative">
//             <Image
//               source={{ uri: service.image }}
//               className="w-24 h-24 rounded-xl"
//               resizeMode="cover"
//             />
//             {service.isPopular && (
//               <View className="absolute -top-2 -right-2 bg-green-600 px-2 py-1 rounded-full">
//                 <Text className="text-white text-xs font-bold">Popular</Text>
//               </View>
//             )}
//           </View>
          
//           <View className="ml-4 flex-1">
//             <View className="flex-row justify-between items-start">
//               <Text className="text-green-800 font-bold text-lg flex-1">{service.name}</Text>
//               {service.isDeal && (
//                 <View className="bg-green-100 px-2 py-1 rounded-md ml-2">
//                   <Text className="text-green-700 text-xs font-bold">Special Deal</Text>
//                 </View>
//               )}
//             </View>
            
//             <View className="flex-row items-center mt-1">
//               <View className="flex-row items-center">
//                 <FontAwesome name="star" size={16} color="#FBBF24" />
//                 <Text className="text-yellow-500 font-medium ml-1">{service.rating}</Text>
//                 <Text className="text-gray-500 text-sm ml-1">({service.reviews} reviews)</Text>
//               </View>
//             </View>
            
//             <View className="flex-row justify-between items-center mt-2">
//               <Text className="text-green-700 font-bold text-lg">{service.price}</Text>
//               {service.originalPrice && (
//                 <Text className="text-gray-400 text-sm line-through mr-2">${service.originalPrice}</Text>
//               )}
//               {service.discount && (
//                 <View className="bg-red-100 px-2 py-1 rounded-md">
//                   <Text className="text-red-600 text-xs font-bold">Save {service.discount}%</Text>
//                 </View>
//               )}
//             </View>
            
//             {service.duration && (
//               <View className="flex-row items-center mt-2">
//                 <MaterialIcons name="access-time" size={16} color="#6B7280" />
//                 <Text className="text-gray-500 text-sm ml-1">{service.duration} mins</Text>
//               </View>
//             )}
//           </View>
//         </View>
//       </View>

//       <View className="mb-8">
//         <Text className="text-green-800 font-bold text-2xl mb-5">Schedule Your Service</Text>
        
//         <View className="bg-white rounded-2xl p-5 mb-4 shadow-lg shadow-green-200/80 border border-green-50">
//           <TouchableOpacity 
//             className="flex-row items-center mb-4 py-3 border-b border-gray-100"
//             onPress={showDatePicker}
//             activeOpacity={0.7}
//           >
//             <View className="bg-green-100 p-2 rounded-full mr-3">
//               <MaterialIcons name="event" size={20} color="#16A34A" />
//             </View>
//             <Text className={`flex-1 text-base ${selectedDate ? 'text-gray-800 font-medium' : 'text-gray-400'}`}>
//               {selectedDate ? format(selectedDate, 'MMMM do, yyyy') : 'Select Date'}
//             </Text>
//             <MaterialIcons name="keyboard-arrow-right" size={24} color="#9CA3AF" />
//           </TouchableOpacity>

//           <View className="mb-4">
//             <Text className="text-gray-700 font-medium mb-3">Available Time Slots</Text>
//             <View className="flex-row flex-wrap -mx-1">
//               {timeSlots.map((slot) => (
//                 <TouchableOpacity
//                   key={slot.id}
//                   className={`w-1/2 px-1 mb-2 ${!slot.available ? 'opacity-50' : ''}`}
//                   disabled={!slot.available}
//                   onPress={() => setSelectedSlot(slot.id)}
//                 >
//                   <View className={`p-3 rounded-lg border ${selectedSlot === slot.id ? 'bg-green-100 border-green-500' : 'bg-gray-50 border-gray-200'}`}>
//                     <Text className={`text-center ${selectedSlot === slot.id ? 'text-green-700 font-bold' : 'text-gray-700'}`}>
//                       {slot.time}
//                     </Text>
//                     {!slot.available && (
//                       <Text className="text-center text-xs text-red-500 mt-1">Booked</Text>
//                     )}
//                   </View>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>
//         </View>
//       </View>

//       <TouchableOpacity 
//         className="bg-green-600 rounded-lg py-4 px-6 flex-row justify-center items-center mb-8"
//         onPress={handleContinue}
//         disabled={!selectedSlot}
//         style={!selectedSlot ? { opacity: 0.6 } : {}}
//       >
//         <Text className="text-white font-bold text-lg">Continue</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// export default BookServiceScreen;



// src/screens/services/BookServiceScreen.js
import React, { useState, useEffect } from 'react';
import { 
  View, Text, Image, ScrollView, TouchableOpacity, Alert, ActivityIndicator 
} from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { TENANT_CONFIG } from '../../config/constants';

const BookServiceScreen = ({ route, navigation }) => {
  // Accept both direct and nested params
  const service = route.params?.service || route.params?.params?.service;
  if (!service) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red' }}>Service information is missing</Text>
      </View>
    );
  }
  
//  const service = route.params?.service || route.params?.params?.service;
const serviceId = service?.id || service?._id;
  
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAvailability = async (date) => {
    setIsLoading(true);
    setError(null);
    try {
      const dateString = format(date, 'yyyy-MM-dd');
      const apiUrl = `${TENANT_CONFIG.API_BASE_URL}/appointments/availability?serviceId=${serviceId}&date=${dateString}`;
      
      const response = await fetch(apiUrl, {
        headers: {
           'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
          'X-Tenant-ID': TENANT_CONFIG.ID,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.success && data.data) {
        const transformedSlots = data.data.map((slot, index) => ({
          id: `${dateString}-${index}`,
          time: convertTo12HourFormat(slot.startTime, slot.endTime),
          available: slot.available,
          startTime: slot.startTime,
          endTime: slot.endTime
        }));
        setTimeSlots(transformedSlots);
      } else {
        throw new Error(data.message || 'Invalid response format');
      }
    } catch (err) {
      setError(err.message || 'Failed to load time slots');
      setTimeSlots([]);
    } finally {
      setIsLoading(false);
    }
  };

  const convertTo12HourFormat = (startTime, endTime) => {
    const formatTime = (time) => {
      const [hours, minutes] = time.split(':');
      const hour = parseInt(hours, 10);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const hour12 = hour % 12 || 12;
      return `${hour12}:${minutes} ${ampm}`;
    };
    return `${formatTime(startTime)} - ${formatTime(endTime)}`;
  };

  useEffect(() => {
    fetchAvailability(selectedDate);
  }, [selectedDate, serviceId]);

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: selectedDate,
      onChange: (event, date) => {
        if (date) {
          setSelectedDate(date);
          setSelectedSlot(null);
        }
      },
      mode: 'date',
      minimumDate: new Date(),
    });
  };

 const handleContinue = () => {
  if (!selectedSlot) {
    Alert.alert('Please select a time slot');
    return;
  }
  
  const selectedTimeSlot = timeSlots.find(slot => slot.id === selectedSlot);
  
  if (!selectedTimeSlot?.available) {
    Alert.alert('Slot Booked', 'This time slot is already booked');
    return;
  }
  
  navigation.navigate('CustomerDetails', {
  service,
  bookingDetails: {
    date: selectedDate,
    time: selectedTimeSlot.time,
    startTime: selectedTimeSlot.startTime,
    endTime: selectedTimeSlot.endTime,
    notes: '',
    recurring: false,
    frequency: null
  }
});
};

  const SlotItem = ({ slot, onPress, isSelected }) => {
    const isAvailable = slot.available;
    const slotStyle = isAvailable 
      ? isSelected 
        ? 'bg-green-100 border-green-500' 
        : 'bg-white border-gray-200'
      : 'bg-gray-100 border-gray-300';
    
    const textStyle = isAvailable 
      ? isSelected 
        ? 'text-green-700 font-bold' 
        : 'text-gray-700'
      : 'text-gray-500';

    return (
      <TouchableOpacity
        onPress={() => isAvailable && onPress(slot.id)}
        className={`w-1/2 px-1 mb-2 ${!isAvailable ? 'opacity-80' : ''}`}
        disabled={!isAvailable}
      >
        <View className={`p-3 rounded-lg border ${slotStyle}`}>
          <View className="flex-row items-center justify-between">
            <Text className={`text-center flex-1 ${textStyle}`}>
              {slot.time}
            </Text>
            {!isAvailable && (
              <View className="ml-2 bg-red-100 px-2 py-1 rounded-full">
                <Text className="text-red-600 text-xs font-bold">Booked</Text>
              </View>
            )}
          </View>
          {isAvailable && isSelected && (
            <Text className="text-green-600 text-xs text-center mt-1">Available</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView className="flex-1 bg-gray-50 p-5">
      <View className="mb-6">
        <TouchableOpacity 
          className="flex-row items-center mb-4"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#16A34A" />
          <Text className="text-green-600 ml-2 text-lg">Back</Text>
        </TouchableOpacity>
        
        <Text className="text-green-800 font-bold text-2xl">Book {service.name}</Text>
        <Text className="text-green-700 font-medium text-lg mt-1">{service.price}</Text>
      </View>

      <View className="bg-white rounded-2xl p-5 mb-6 shadow-sm border border-gray-100">
        <View className="flex-row items-center">
         <Image
  source={{
    uri:
      (typeof service.image === 'string'
        ? service.image
        : service.image?.url) || 'https://via.placeholder.com/150'
  }}
  className="w-24 h-24 rounded-xl"
  resizeMode="cover"
  onError={e => {
    console.log('Image load error:', e.nativeEvent.error);
  }}
/>
          <View className="ml-4 flex-1">
            <Text className="text-green-800 font-bold text-lg">{service.name}</Text>
            <View className="flex-row items-center mt-1">
              <FontAwesome name="star" size={16} color="#FBBF24" />
              <Text className="text-yellow-500 font-medium ml-1">{service.rating}</Text>
              <Text className="text-gray-500 text-sm ml-1">({service.reviews} reviews)</Text>
            </View>
            <Text className="text-green-700 font-bold text-lg mt-2">{service.price}</Text>
            {service.duration && (
              <View className="flex-row items-center mt-2">
                <MaterialIcons name="access-time" size={16} color="#6B7280" />
                <Text className="text-gray-500 text-sm ml-1">{service.duration} mins</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      <View className="mb-8">
        <Text className="text-green-800 font-bold text-xl mb-5">Schedule Your Service</Text>
        
        <View className="bg-white rounded-2xl p-5 mb-4 shadow-sm border border-gray-100">
          <TouchableOpacity 
            className="flex-row items-center mb-4 py-3"
            onPress={showDatePicker}
          >
            <View className="bg-green-100 p-2 rounded-full mr-3">
              <MaterialIcons name="event" size={20} color="#16A34A" />
            </View>
            <Text className={`flex-1 text-base ${selectedDate ? 'text-gray-800 font-medium' : 'text-gray-400'}`}>
              {selectedDate ? format(selectedDate, 'MMMM do, yyyy') : 'Select Date'}
            </Text>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="#9CA3AF" />
          </TouchableOpacity>

          <View className="mb-4">
            <Text className="text-gray-700 font-medium mb-3">Time Slots</Text>
            
            {isLoading ? (
              <View className="py-4">
                <ActivityIndicator size="large" color="#16A34A" />
              </View>
            ) : error ? (
              <View className="py-4">
                <Text className="text-center text-red-500 mb-2">{error}</Text>
                <TouchableOpacity 
                  onPress={() => fetchAvailability(selectedDate)}
                  className="bg-green-100 rounded-lg py-2 px-4 self-center"
                >
                  <Text className="text-green-700">Try Again</Text>
                </TouchableOpacity>
              </View>
            ) : timeSlots.length === 0 ? (
              <Text className="text-center text-gray-500 py-4">
                No time slots available for this date
              </Text>
            ) : (
              <View className="flex-row flex-wrap -mx-1">
                {timeSlots.map((slot) => (
                  <SlotItem
                    key={slot.id}
                    slot={slot}
                    isSelected={selectedSlot === slot.id}
                    onPress={(id) => setSelectedSlot(id)}
                  />
                ))}
              </View>
            )}
          </View>
        </View>
      </View>

      <TouchableOpacity 
        className={`bg-green-600 rounded-lg py-4 px-6 mb-8 ${!selectedSlot ? 'opacity-60' : ''}`}
        onPress={handleContinue}
        disabled={!selectedSlot}
      >
        <Text className="text-white font-bold text-lg text-center">Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default BookServiceScreen;