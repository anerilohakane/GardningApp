// import React, { useState, useRef, useEffect } from 'react';
// import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, Dimensions, Animated, StyleSheet,Modal,TouchableWithoutFeedback } from 'react-native';
// import { FontAwesome, MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { format } from 'date-fns';
// import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
// import * as ImagePicker from 'expo-image-picker';

// const Stack = createNativeStackNavigator();

// function HomeScreen({ navigation }) {
//   const { width } = Dimensions.get('window');
//   const serviceCardWidth = width * 0.44;
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredServices, setFilteredServices] = useState([]);
//   const scrollY = useRef(new Animated.Value(0)).current;

//   const serviceCategories = [
//     { id: 1, name: 'Lawn Maintenance', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=320&q=80' },
//     { id: 2, name: 'Palm Trimming', image: 'https://i.pinimg.com/736x/64/70/d3/6470d3fdfd48d29ffd0dbc2c0160ee68.jpg' },
//     { id: 3, name: 'Synthetic Turf', image: 'https://i.pinimg.com/736x/49/97/b0/4997b039f6a641af68f383e0f7bb9c3e.jpg' },
//     { id: 4, name: 'Garden Design', image: 'https://i.pinimg.com/736x/e9/a0/d6/e9a0d68ead0296cb64ea2b680c2869c9.jpg' },
//     { id: 5, name: 'Paver Installation', image: 'https://i.pinimg.com/736x/18/bd/5b/18bd5b474a2682e2c3d8e329e56f69d1.jpg' },
//     { id: 6, name: 'Irrigation Systems', image: 'https://i.pinimg.com/736x/c9/15/a1/c915a1d8c26dfab990c32dabad3bc72a.jpg' },
//   ];

//   const popularServices = [
//     { id: 1, name: 'Premium Lawn Care', price: '$199', rating: 4.9, reviews: 128, image: 'https://i.pinimg.com/736x/57/9a/e4/579ae4d3f89d19226bf16ce52779bd0c.jpg' },
//     { id: 2, name: 'Synthetic Turf', price: '$599', rating: 4.8, reviews: 95, image: 'https://i.pinimg.com/736x/68/de/49/68de49997c07f81e362a9b710d43856a.jpg' },
//   ];

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//     if (query) {
//       const filtered = serviceCategories.filter(service =>
//         service.name.toLowerCase().includes(query.toLowerCase())
//       );
//       setFilteredServices(filtered);
//     } else {
//       setFilteredServices([]);
//     }
//   };

//   const servicesToDisplay = searchQuery ? filteredServices : serviceCategories;

//   const headerHeight = scrollY.interpolate({
//     inputRange: [0, 100],
//     outputRange: [180, 100],
//     extrapolate: 'clamp',
//   });

//   const headerOpacity = scrollY.interpolate({
//     inputRange: [0, 50],
//     outputRange: [1, 0.9],
//     extrapolate: 'clamp',
//   });

//   return (
//     <View className="flex-1 bg-gray-50 pt-4">
//       <Animated.View 
//         className="absolute top-0 left-0 right-0 z-10 bg-gray-50 pt-10 px-5 pb-4"
//         style={{
//           height: headerHeight,
//           opacity: headerOpacity,
//         }}
//       >
//         <View className="mb-3 pt-7">
//           <Text className="text-green-800 font-bold text-3xl">Crafting Outdoor Beauty</Text>
//           <Text className="text-green-600 text-lg mt-1">One Service at a Time</Text>
//         </View>

//         <View className="flex-row items-center bg-white rounded-xl p-3 shadow-sm shadow-green-100 border border-gray-100">
//           <MaterialIcons name="search" size={20} color="#4B5563" />
//           <TextInput
//             placeholder="Find a Service..."
//             placeholderTextColor="#9CA3AF"
//             className="flex-1 ml-2 text-gray-700 text-base"
//             value={searchQuery}
//             onChangeText={handleSearch}
//           />
//           <View className="h-6 w-px bg-gray-200 mx-2" />
//           <TouchableOpacity className="p-1">
//             <MaterialIcons name="tune" size={20} color="#16A34A" />
//           </TouchableOpacity>
//         </View>
//       </Animated.View>

//       <ScrollView 
//         className="flex-1" 
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingTop: 180 }}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//           { useNativeDriver: false }
//         )}
//         scrollEventThrottle={16}
//       >
//         <View className="p-5 pt-0">
//           <View className="flex-row justify-between items-center mb-4 mt-4">
//             <Text className="text-green-800 font-bold text-xl">
//               {searchQuery ? 'Search Results' : 'Our Services'}
//             </Text>
//             {!searchQuery && (
//               <TouchableOpacity className="flex-row items-center">
//                 <Text className="text-green-600 text-sm mr-1">See all</Text>
//                 <MaterialIcons name="chevron-right" size={16} color="#16A34A" />
//               </TouchableOpacity>
//             )}
//           </View>
          
//           {servicesToDisplay.length > 0 ? (
//             <View className="flex-row flex-wrap justify-between mb-2">
//               {servicesToDisplay.map((service) => (
//                 <TouchableOpacity
//                   key={service.id}
//                   className="mb-4 bg-white rounded-xl overflow-hidden shadow-sm shadow-green-100"
//                   style={{ width: serviceCardWidth }}
//                   activeOpacity={0.8}
//                   onPress={() => navigation.navigate('ServiceDetail', { service })}
//                 >
//                   <View className="relative">
//                     <Image
//                       source={{ uri: service.image }}
//                       className="w-full h-40 rounded-t-xl"
//                       resizeMode="cover"
//                     />
//                     <View className="absolute inset-0 bg-black/20 rounded-xl" />
//                     <View className="absolute bottom-0 left-0 right-0 p-3">
//                       <Text className="text-white font-semibold text-lg">{service.name}</Text>
//                     </View>
//                   </View>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           ) : searchQuery ? (
//             <View className="py-10 items-center justify-center">
//               <Text className="text-gray-500">No services found matching "{searchQuery}"</Text>
//             </View>
//           ) : null}

//           {!searchQuery && (
//             <>
//               <View className="flex-row justify-between items-center mb-4 mt-6">
//                 <Text className="text-green-800 font-bold text-xl">Popular Services</Text>
//                 <TouchableOpacity className="flex-row items-center">
//                   <Text className="text-green-600 text-sm mr-1">See all</Text>
//                   <MaterialIcons name="chevron-right" size={16} color="#16A34A" />
//                 </TouchableOpacity>
//               </View>
              
//               <ScrollView 
//                 horizontal 
//                 showsHorizontalScrollIndicator={false}
//                 className="mb-6"
//               >
//                 {popularServices.map((service) => (
//                   <TouchableOpacity
//                     key={service.id}
//                     className="bg-white rounded-xl overflow-hidden shadow-sm shadow-green-100 mr-4"
//                     style={{ width: width * 0.7 }}
//                     activeOpacity={0.8}
//                     onPress={() => navigation.navigate('ServiceDetail', { service })}
//                   >
//                     <View className="relative">
//                       <Image
//                         source={{ uri: service.image }}
//                         className="w-full h-48 rounded-t-xl"
//                         resizeMode="cover"
//                       />
//                       {service.id === 2 && (
//                         <View className="absolute top-3 left-3 bg-green-600 rounded-full px-3 py-1 flex-row items-center">
//                           <FontAwesome name="star" size={13} color="yellow" className="mr-1" />
//                           <Text className="text-white text-xs font-medium">Popular</Text>
//                         </View>
//                       )}
//                       <View className="absolute bottom-0 left-0 right-0 p-4 bg-black/60">
//                         <Text className="text-white font-bold text-xl mb-1">{service.name}</Text>
//                         <View className="flex-row items-center mb-2">
//                           <FontAwesome name="star" size={16} color="#FBBF24" />
//                           <Text className="text-yellow-300 font-medium ml-1">{service.rating}</Text>
//                           <Text className="text-gray-300 text-sm ml-1">({service.reviews} reviews)</Text>
//                         </View>
//                         <Text className="text-white font-bold text-lg">{service.price}</Text>
//                       </View>
//                     </View>
//                   </TouchableOpacity>
//                 ))}
//               </ScrollView>

//               <View className="flex-row justify-between items-center mb-4">
//                 <Text className="text-green-800 font-bold text-xl">Spring Specials</Text>
//                 <TouchableOpacity className="flex-row items-center">
//                   <Text className="text-green-600 text-sm mr-1">See all</Text>
//                   <MaterialIcons name="chevron-right" size={16} color="#16A34A" />
//                 </TouchableOpacity>
//               </View>
              
//               <TouchableOpacity 
//                 className="w-full mb-8 bg-white rounded-xl overflow-hidden shadow-sm shadow-green-100"
//                 activeOpacity={0.8}
//                 onPress={() => navigation.navigate('ServiceDetail', { 
//                   service: {
//                     id: 7,
//                     name: 'Palm Trimming Service',
//                     price: '$199',
//                     originalPrice: '$249',
//                     rating: 4.7,
//                     reviews: 86,
//                     image: 'https://i.pinimg.com/736x/7f/19/ef/7f19efd4c591705de2f93d9c7cf76d33.jpg',
//                     discount: '20% Off'
//                   }
//                 })}
//               >
//                 <View className="relative">
//                   <Image
//                     source={{ uri: 'https://i.pinimg.com/736x/7f/19/ef/7f19efd4c591705de2f93d9c7cf76d33.jpg' }}
//                     className="w-full h-48 rounded-t-xl"
//                     resizeMode="cover"
//                   />
//                   <View className="absolute top-3 left-3 bg-green-600 rounded-full px-3 py-1">
//                     <Text className="text-white text-xs font-medium">Spring Special</Text>
//                   </View>
//                   <View className="absolute bottom-0 left-0 right-0 p-4 bg-black/70">
//                     <Text className="text-white font-bold text-xl mb-1">Palm Trimming Service</Text>
//                     <View className="flex-row items-center">
//                       <Text className="text-gray-300 line-through mr-2">$249</Text>
//                       <Text className="text-green-200 font-bold text-lg">20% Off - Now $199</Text>
//                     </View>
//                   </View>
//                 </View>
//               </TouchableOpacity>

//               <View className="bg-green-700 rounded-xl p-5 mb-8">
//                 <Text className="text-white font-bold text-xl mb-2">Need Help With Your Project?</Text>
//                 <Text className="text-green-100 mb-4">Our landscaping experts are ready to transform your outdoor space.</Text>
//                 <TouchableOpacity 
//                   className="bg-white rounded-lg py-3 px-5 flex-row justify-center items-center"
//                   onPress={() => navigation.navigate('Contact')}
//                 >
//                   <Text className="text-green-700 font-bold text-center">Get a Free Quote</Text>
//                 </TouchableOpacity>
//               </View>
//             </>
//           )}
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// function ServiceDetailScreen({ route, navigation }) {
//   const { service } = route.params;
  
//   return (
//     <ScrollView className="flex-1 bg-gray-50">
//       <View className="p-5">
//         <View className="relative">
//           <Image
//             source={{ uri: service.image }}
//             className="w-full h-64 rounded-xl"
//             resizeMode="cover"
//           />
//           {service.discount && (
//             <View className="absolute top-3 left-3 bg-green-600 rounded-full px-3 py-1">
//               <Text className="text-white text-xs font-medium">{service.discount}</Text>
//             </View>
//           )}
//         </View>
        
//         <View className="mt-6">
//           <Text className="text-green-800 font-bold text-2xl">{service.name}</Text>
          
//           <View className="flex-row items-center mt-2">
//             <FontAwesome name="star" size={20} color="#FBBF24" />
//             <Text className="text-yellow-500 font-medium ml-1">{service.rating}</Text>
//             <Text className="text-gray-500 text-sm ml-1">({service.reviews} reviews)</Text>
//           </View>
          
//           <View className="mt-4">
//             {service.originalPrice ? (
//               <View className="flex-row items-center">
//                 <Text className="text-gray-500 line-through mr-2">{service.originalPrice}</Text>
//                 <Text className="text-green-700 font-bold text-xl">{service.price}</Text>
//               </View>
//             ) : (
//               <Text className="text-green-700 font-bold text-xl">{service.price}</Text>
//             )}
//           </View>
          
//           <Text className="mt-6 text-gray-700">
//             Professional landscaping service with high-quality materials and expert craftsmanship. 
//             Our team will transform your outdoor space into a beautiful and functional area.
//           </Text>
          
//           <TouchableOpacity 
//             className="mt-8 bg-green-600 rounded-lg py-4 px-6 flex-row justify-center items-center"
//             onPress={() => navigation.navigate('BookService', { service })}
//           >
//             <Text className="text-white font-bold text-lg">Book This Service</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ScrollView>
//   );
// }

// function BookServiceScreen({ route, navigation }) {
//   const { service } = route.params;
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [selectedTime, setSelectedTime] = useState(new Date());
//   const [address, setAddress] = useState('');
//   const [selectedSlot, setSelectedSlot] = useState(null);

//   // Available time slots
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

//   const showTimePicker = () => {
//     DateTimePickerAndroid.open({
//       value: selectedTime,
//       onChange: (event, time) => {
//         if (time) {
//           setSelectedTime(time);
//         }
//       },
//       mode: 'time',
//       is24Hour: false,
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

//       {/* Service Summary */}
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

//       {/* Booking Form */}
//       <View className="mb-8">
//         <Text className="text-green-800 font-bold text-2xl mb-5">Schedule Your Service</Text>
        
//         <View className="bg-white rounded-2xl p-5 mb-4 shadow-lg shadow-green-200/80 border border-green-50">
//           {/* Date Picker */}
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

//           {/* Time Slot Selection */}
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

//       {/* Confirm Booking Button */}
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
// }



// function CustomerDetailsScreen({ route, navigation }) {
//   const { service, bookingDetails } = route.params;
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [communicationPrefs, setCommunicationPrefs] = useState({
//     email: true,
//     sms: false
//   });
  
//   // Customer Address
//   const [customerAddress, setCustomerAddress] = useState({
//     street: '',
//     city: '',
//     state: '',
//     zip: ''
//   });
  
//   // Property Details
//   const [properties, setProperties] = useState([
//     {
//       id: 1,
//       name: 'Property 1',
//       street: '',
//       city: '',
//       state: '',
//       zip: '',
//       size: '',
//       areas: {
//         frontyard: false,
//         backyard: false,
//         garden: false,
//         trees: false
//       },
//       photos: []
//     }
//   ]);
  
//   const [activeProperty, setActiveProperty] = useState(1);

//   useEffect(() => {
//     (async () => {
//       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (status !== 'granted') {
//         alert('Sorry, we need camera roll permissions to make this work!');
//       }
      
//       const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
//       if (cameraStatus.status !== 'granted') {
//         alert('Sorry, we need camera permissions to make this work!');
//       }
//     })();
//   }, []);

//   const handleCustomerAddressChange = (field, value) => {
//     setCustomerAddress(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };
  
//   const handlePropertyChange = (propertyId, field, value) => {
//     setProperties(prev => 
//       prev.map(prop => 
//         prop.id === propertyId ? { ...prop, [field]: value } : prop
//       )
//     );
//   };
  
//   const handleAreaToggle = (propertyId, area) => {
//     setProperties(prev => 
//       prev.map(prop => 
//         prop.id === propertyId 
//           ? { 
//               ...prop, 
//               areas: { 
//                 ...prop.areas, 
//                 [area]: !prop.areas[area] 
//               } 
//             } 
//           : prop
//       )
//     );
//   };
  
//   const addProperty = () => {
//     const newId = properties.length > 0 ? Math.max(...properties.map(p => p.id)) + 1 : 1;
//     setProperties(prev => [
//       ...prev,
//       {
//         id: newId,
//         name: `Property ${newId}`,
//         street: '',
//         city: '',
//         state: '',
//         zip: '',
//         size: '',
//         areas: {
//           frontyard: false,
//           backyard: false,
//           garden: false,
//           trees: false
//         },
//         photos: []
//       }
//     ]);
//     setActiveProperty(newId);
//   };
  
//   const removeProperty = (id) => {
//     if (properties.length <= 1) return;
//     setProperties(prev => prev.filter(prop => prop.id !== id));
//     if (activeProperty === id) {
//       setActiveProperty(properties[0].id);
//     }
//   };
  
//   const takePhoto = async (propertyId) => {
//     let result = await ImagePicker.launchCameraAsync({
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 0.7,
//     });

//     if (!result.canceled) {
//       const newPhoto = {
//         id: Date.now(),
//         uri: result.assets[0].uri
//       };
      
//       setProperties(prev => 
//         prev.map(prop => 
//           prop.id === propertyId 
//             ? { ...prop, photos: [...prop.photos, newPhoto] } 
//             : prop
//         )
//       );
//     }
//   };

//   const pickFromGallery = async (propertyId) => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 0.7,
//     });

//     if (!result.canceled) {
//       const newPhoto = {
//         id: Date.now(),
//         uri: result.assets[0].uri
//       };
      
//       setProperties(prev => 
//         prev.map(prop => 
//           prop.id === propertyId 
//             ? { ...prop, photos: [...prop.photos, newPhoto] } 
//             : prop
//         )
//       );
//     }
//   };
  
//   const removePhoto = (propertyId, photoId) => {
//     setProperties(prev => 
//       prev.map(prop => 
//         prop.id === propertyId 
//           ? { ...prop, photos: prop.photos.filter(p => p.id !== photoId) } 
//           : prop
//       )
//     );
//   };
  
//   const toggleCommunicationPref = (type) => {
//     setCommunicationPrefs(prev => ({
//       ...prev,
//       [type]: !prev[type]
//     }));
//   };
  
//   const handleConfirmBooking = () => {
//     const bookingData = {
//       service,
//       customerDetails: {
//         name,
//         email,
//         phone,
//         address: customerAddress,
//         communicationPrefs
//       },
//       properties,
//       bookingDetails
//     };
    
//     navigation.navigate('BookingConfirmation', {
//       bookingData
//     });
//   };

//   const currentProperty = properties.find(prop => prop.id === activeProperty);

//   return (
//     <ScrollView className="flex-1 bg-gray-50 p-5">
//       <View className="mb-6">
//         <Text className="text-green-800 font-bold text-2xl">Customer Details</Text>
//         <Text className="text-gray-600 mt-2">Please fill in your information</Text>
//       </View>

//       {/* Personal Information */}
//       <View className="mb-8">
//         <Text className="text-green-700 font-bold text-lg mb-4">Personal Information</Text>
        
//         <View className="space-y-4 mb-6">
//           <View>
//             <Text className="text-gray-700 mb-1 font-medium">Full Name</Text>
//             <TextInput
//               placeholder="John Doe"
//               className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800"
//               placeholderTextColor="#9CA3AF"
//               value={name}
//               onChangeText={setName}
//             />
//           </View>
          
//           <View>
//             <Text className="text-gray-700 mb-1 font-medium">Email Address</Text>
//             <TextInput
//               placeholder="your@email.com"
//               className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800"
//               placeholderTextColor="#9CA3AF"
//               keyboardType="email-address"
//               value={email}
//               onChangeText={setEmail}
//             />
//           </View>
          
//           <View>
//             <Text className="text-gray-700 mb-1 font-medium">Phone Number</Text>
//             <TextInput
//               placeholder="+1 (123) 456-7890"
//               className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800"
//               placeholderTextColor="#9CA3AF"
//               keyboardType="phone-pad"
//               value={phone}
//               onChangeText={setPhone}
//             />
//           </View>
//         </View>

//         {/* Customer Address */}
//         <Text className="text-green-700 font-bold text-lg mb-4">Your Address</Text>
//         <View className="space-y-4 mb-6">
//           <View>
//             <Text className="text-gray-700 mb-1 font-medium">Street Address</Text>
//             <TextInput
//               placeholder="123 Main St"
//               className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800"
//               placeholderTextColor="#9CA3AF"
//               value={customerAddress.street}
//               onChangeText={(text) => handleCustomerAddressChange('street', text)}
//             />
//           </View>
          
//           <View className="flex-row">
//             <View className="flex-1 mr-2">
//               <Text className="text-gray-700 mb-1 font-medium">City</Text>
//               <TextInput
//                 placeholder="City"
//                 className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800"
//                 placeholderTextColor="#9CA3AF"
//                 value={customerAddress.city}
//                 onChangeText={(text) => handleCustomerAddressChange('city', text)}
//               />
//             </View>
//             <View className="flex-1 ml-2">
//               <Text className="text-gray-700 mb-1 font-medium">State</Text>
//               <TextInput
//                 placeholder="State"
//                 className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800"
//                 placeholderTextColor="#9CA3AF"
//                 value={customerAddress.state}
//                 onChangeText={(text) => handleCustomerAddressChange('state', text)}
//               />
//             </View>
//           </View>
          
//           <View>
//             <Text className="text-gray-700 mb-1 font-medium">ZIP Code</Text>
//             <TextInput
//               placeholder="12345"
//               className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800"
//               placeholderTextColor="#9CA3AF"
//               keyboardType="number-pad"
//               value={customerAddress.zip}
//               onChangeText={(text) => handleCustomerAddressChange('zip', text)}
//             />
//           </View>
//         </View>

//         {/* Communication Preferences */}
//         <Text className="text-green-700 font-bold text-lg mb-4">Communication Preferences</Text>
//         <View className="flex-row items-center mb-2">
//           <TouchableOpacity
//             onPress={() => toggleCommunicationPref('email')}
//             className="mr-3"
//           >
//             <View className="w-6 h-6 rounded-md border border-gray-400 items-center justify-center">
//               {communicationPrefs.email && (
//                 <MaterialIcons name="check" size={20} color="#16A34A" />
//               )}
//             </View>
//           </TouchableOpacity>
//           <Text className="text-gray-700">Email</Text>
//         </View>
//         <View className="flex-row items-center">
//           <TouchableOpacity
//             onPress={() => toggleCommunicationPref('sms')}
//             className="mr-3"
//           >
//             <View className="w-6 h-6 rounded-md border border-gray-400 items-center justify-center">
//               {communicationPrefs.sms && (
//                 <MaterialIcons name="check" size={20} color="#16A34A" />
//               )}
//             </View>
//           </TouchableOpacity>
//           <Text className="text-gray-700">SMS/Text Message</Text>
//         </View>
//       </View>

//       {/* Property Details */}
//       <View className="mb-8">
//         <View className="flex-row justify-between items-center mb-4">
//           <Text className="text-green-700 font-bold text-lg">Property Details</Text>
//           <TouchableOpacity 
//             onPress={addProperty}
//             className="flex-row items-center bg-green-100 px-3 py-2 rounded-lg"
//           >
//             <Ionicons name="add" size={18} color="#16A34A" />
//             <Text className="text-green-700 ml-1">Add Property</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Property Tabs */}
//         <ScrollView 
//           horizontal 
//           showsHorizontalScrollIndicator={false}
//           className="mb-4"
//         >
//           <View className="flex-row">
//             {properties.map((property) => (
//               <TouchableOpacity
//                 key={property.id}
//                 onPress={() => setActiveProperty(property.id)}
//                 className={`px-4 py-2 mr-2 rounded-lg ${activeProperty === property.id ? 'bg-green-600' : 'bg-gray-200'}`}
//               >
//                 <Text className={`font-medium ${activeProperty === property.id ? 'text-white' : 'text-gray-700'}`}>
//                   {property.name}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </ScrollView>

//         {/* Current Property Form */}
//         {currentProperty && (
//           <View className="bg-white rounded-xl p-5 shadow-sm">
//             <View className="flex-row justify-between items-center mb-3">
//               <Text className="text-gray-500 font-medium">{currentProperty.name}</Text>
//               {properties.length > 1 && (
//                 <TouchableOpacity 
//                   onPress={() => removeProperty(currentProperty.id)}
//                   className="p-1"
//                 >
//                   <MaterialIcons name="delete" size={20} color="#EF4444" />
//                 </TouchableOpacity>
//               )}
//             </View>
            
//             <View className="space-y-4">
//               <Text className="text-gray-700 font-medium">Property Address</Text>
              
//               <View>
//                 <Text className="text-gray-600 mb-1 text-sm">Street</Text>
//                 <TextInput
//                   placeholder="123 Main St"
//                   className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-800"
//                   placeholderTextColor="#9CA3AF"
//                   value={currentProperty.street}
//                   onChangeText={(text) => handlePropertyChange(currentProperty.id, 'street', text)}
//                 />
//               </View>
              
//               <View className="flex-row">
//                 <View className="flex-1 mr-2">
//                   <Text className="text-gray-600 mb-1 text-sm">City</Text>
//                   <TextInput
//                     placeholder="City"
//                     className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-800"
//                     placeholderTextColor="#9CA3AF"
//                     value={currentProperty.city}
//                     onChangeText={(text) => handlePropertyChange(currentProperty.id, 'city', text)}
//                   />
//                 </View>
//                 <View className="flex-1 ml-2">
//                   <Text className="text-gray-600 mb-1 text-sm">State</Text>
//                   <TextInput
//                     placeholder="State"
//                     className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-800"
//                     placeholderTextColor="#9CA3AF"
//                     value={currentProperty.state}
//                     onChangeText={(text) => handlePropertyChange(currentProperty.id, 'state', text)}
//                   />
//                 </View>
//               </View>
              
//               <View>
//                 <Text className="text-gray-600 mb-1 text-sm">ZIP Code</Text>
//                 <TextInput
//                   placeholder="12345"
//                   className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-800"
//                   placeholderTextColor="#9CA3AF"
//                   keyboardType="number-pad"
//                   value={currentProperty.zip}
//                   onChangeText={(text) => handlePropertyChange(currentProperty.id, 'zip', text)}
//                 />
//               </View>
              
//               <View>
//                 <Text className="text-gray-600 mb-1 text-sm">Property Size (sq ft)</Text>
//                 <TextInput
//                   placeholder="e.g., 5000"
//                   className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-800"
//                   placeholderTextColor="#9CA3AF"
//                   keyboardType="number-pad"
//                   value={currentProperty.size}
//                   onChangeText={(text) => handlePropertyChange(currentProperty.id, 'size', text)}
//                 />
//               </View>
              
//               <View>
//                 <Text className="text-gray-700 font-medium mb-2">Areas Needing Service</Text>
//                 <View className="flex-row flex-wrap">
//                   {Object.entries(currentProperty.areas).map(([area, selected]) => (
//                     <TouchableOpacity
//                       key={area}
//                       onPress={() => handleAreaToggle(currentProperty.id, area)}
//                       className={`flex-row items-center mr-4 mb-3 ${selected ? 'bg-green-100' : 'bg-gray-100'} px-3 py-2 rounded-lg`}
//                     >
//                       <View className={`w-5 h-5 rounded-sm border ${selected ? 'border-green-500 bg-green-500' : 'border-gray-400'} items-center justify-center mr-2`}>
//                         {selected && <MaterialIcons name="check" size={16} color="white" />}
//                       </View>
//                       <Text className="text-gray-700 capitalize">{area}</Text>
//                     </TouchableOpacity>
//                   ))}
//                 </View>
//               </View>
              
//               <View>
//                 <Text className="text-gray-700 font-medium mb-2">Property Photos</Text>
//                 <Text className="text-gray-500 text-sm mb-3">Upload photos to help us understand your needs</Text>
                
//                 <View className="flex-row mb-3">
//                   <TouchableOpacity 
//                     onPress={() => takePhoto(currentProperty.id)}
//                     className="flex-row items-center bg-green-100 px-4 py-2 rounded-lg mr-3"
//                   >
//                     <MaterialCommunityIcons name="camera" size={18} color="#16A34A" />
//                     <Text className="text-green-700 ml-2">Take Photo</Text>
//                   </TouchableOpacity>
                  
//                   <TouchableOpacity 
//                     onPress={() => pickFromGallery(currentProperty.id)}
//                     className="flex-row items-center bg-gray-100 px-4 py-2 rounded-lg"
//                   >
//                     <MaterialIcons name="photo-library" size={18} color="#4B5563" />
//                     <Text className="text-gray-700 ml-2">From Gallery</Text>
//                   </TouchableOpacity>
//                 </View>
                
//                 {currentProperty.photos.length > 0 && (
//                   <ScrollView horizontal className="py-2">
//                     {currentProperty.photos.map(photo => (
//                       <View key={photo.id} className="relative mr-3">
//                         <Image
//                           source={{ uri: photo.uri }}
//                           className="w-24 h-24 rounded-lg"
//                         />
//                         <TouchableOpacity 
//                           onPress={() => removePhoto(currentProperty.id, photo.id)}
//                           className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
//                         >
//                           <MaterialIcons name="close" size={14} color="white" />
//                         </TouchableOpacity>
//                       </View>
//                     ))}
//                   </ScrollView>
//                 )}
//               </View>
//             </View>
//           </View>
//         )}
//       </View>

//       {/* Confirm Booking Button */}
//       <TouchableOpacity 
//         className="bg-green-600 rounded-lg py-4 px-6 flex-row justify-center items-center mb-8"
//         onPress={handleConfirmBooking}
//       >
//         <Text className="text-white font-bold text-lg">Confirm Booking</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// function BookingConfirmationScreen({ navigation }) {
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
// }

// function ContactScreen({ navigation }) {
//   return (
//     <ScrollView className="flex-1 bg-gray-50 p-5">
//       <View className="mb-8">
//         <TouchableOpacity 
//           className="flex-row items-center mb-6 p-2 -ml-2"
//           onPress={() => navigation.goBack()}
//         >
//           <Ionicons name="chevron-back" size={28} color="#16A34A" />
//           <Text className="text-green-600 ml-1 text-lg font-medium">Back</Text>
//         </TouchableOpacity>
        
//         <View className="flex-row items-center">
//           <Ionicons name="mail-outline" size={28} color="#166534" className="mr-3" />
//           <Text className="text-green-900 font-bold text-3xl">Contact Us</Text>
//         </View>
//         <Text className="text-gray-600 mt-2 text-base">
//           Have questions? Fill out the form below and we'll get back to you soon.
//         </Text>
//       </View>
      
//       <View className="space-y-5 mb-6">
//         <View>
//           <Text className="text-gray-700 mb-2 font-medium">Your Name</Text>
//           <TextInput
//             placeholder="John Doe"
//             className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800 mb-4"
//             placeholderTextColor="#9CA3AF"
//           />
//         </View>
        
//         <View>
//           <Text className="text-gray-700 mb-2 font-medium">Email Address</Text>
//           <TextInput
//             placeholder="your@email.com"
//             className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800 mb-4"
//             placeholderTextColor="#9CA3AF"
//             keyboardType="email-address"
//           />
//         </View>
        
//         <View>
//           <Text className="text-gray-700 mb-2 font-medium">Phone Number</Text>
//           <TextInput
//             placeholder="+1 (123) 456-7890"
//             className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800 mb-5"
//             placeholderTextColor="#9CA3AF"
//             keyboardType="phone-pad"
//           />
//         </View>
        
//         <View>
//           <Text className="text-gray-700 mb-2 font-medium">Tell us about your project</Text>
//           <TextInput
//             placeholder="Describe your needs or questions..."
//             className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800 h-40 text-align-top"
//             placeholderTextColor="#9CA3AF"
//             multiline
//           />
//         </View>
//       </View>
      
//       <TouchableOpacity 
//         className="bg-green-600 rounded-xl py-5 px-6 flex-row justify-center items-center shadow-lg shadow-green-200 active:bg-green-700"
//         activeOpacity={0.8}
//       >
//         <Text className="text-white font-bold text-lg">Submit Request</Text>
//         <Ionicons name="arrow-forward" size={22} color="white" className="ml-2" />
//       </TouchableOpacity>
//       <View className="h-9"></View>
//     </ScrollView>
//   );
// }

// const ServiceStack = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen 
//         name="ServicesHome" 
//         component={HomeScreen} 
//         options={{ headerShown: false }} 
//       />
//       <Stack.Screen 
//         name="ServiceDetail" 
//         component={ServiceDetailScreen} 
//         options={{ title: 'Service Details' }} 
//       />
//       <Stack.Screen 
//         name="BookService" 
//         component={BookServiceScreen} 
//         options={{ title: 'Book Service' }} 
//       />
//        <Stack.Screen 
//         name="CustomerDetails" 
//         component={CustomerDetailsScreen} 
//         options={{ title: 'Your Details' }} 
//       />
//       <Stack.Screen 
//         name="BookingConfirmation" 
//         component={BookingConfirmationScreen} 
//         options={{ headerShown: false }} 
//       />
//       <Stack.Screen 
//         name="Contact" 
//         component={ContactScreen} 
//         options={{ title: 'Contact Us' }} 
//       />
//     </Stack.Navigator>
//   );
// };

// export default ServiceStack;

// const styles = StyleSheet.create({
//   shadow: {
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
// });



// import React, { useState, useRef, useEffect } from 'react';
// import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, Dimensions, Animated, StyleSheet, Modal, TouchableWithoutFeedback, Alert } from 'react-native';
// import { FontAwesome, MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { format } from 'date-fns';
// import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
// import * as ImagePicker from 'expo-image-picker';
// import axios from 'axios';

// // Tenant configuration
// const TENANT_CONFIG = {
//   SUBDOMAIN: 'isaac-gomes-ernandes',
//   ID: '686371dc6afb07584c866517',
//   API_BASE_URL: 'https://your-api-domain.com/api/v1' // Replace with your actual API base URL
// };

// // API Client Setup
// const api = axios.create({
//   baseURL: TENANT_CONFIG.API_BASE_URL,
//   headers: {
//     'Content-Type': 'application/json',
//     'X-Tenant-ID': TENANT_CONFIG.ID,
//     'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN // Add this line
//   }
// });

// // Set up request interceptor to add auth token if available
// api.interceptors.request.use(async (config) => {
//   // Ensure tenant headers are always set
//   config.headers = config.headers || {};
//   config.headers['X-Tenant-ID'] = TENANT_CONFIG.ID;
//   config.headers['X-Tenant-Subdomain'] = TENANT_CONFIG.SUBDOMAIN;
  
//   // Add auth token if available
//   // const token = await AsyncStorage.getItem('token');
//   // if (token) {
//   //   config.headers.Authorization = `Bearer ${token}`;
//   // }
  
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });
// // API Service Functions
// const ServiceAPI = {
//   getServices: async () => {
//     try {
//       const response = await api.get("http://192.168.0.109:5000/api/v1/services");
//       return response.data.data;
//     } catch (error) {
//       console.error('Error fetching services:', error);
//       throw error;
//     }
//   },

//   getAvailability: async (serviceId, date) => {
//     try {
//       const response = await api.get('/availability', {
//         params: { serviceId, date: format(date, 'yyyy-MM-dd') }
//       });
//       return response.data.data;
//     } catch (error) {
//       console.error('Error fetching availability:', error);
//       throw error;
//     }
//   },

//   createAppointment: async (appointmentData) => {
//     try {
//       const response = await api.post('/appointments', appointmentData);
//       return response.data.data;
//     } catch (error) {
//       console.error('Error creating appointment:', error);
//       throw error;
//     }
//   },

//   getCustomerProfile: async () => {
//     try {
//       const response = await api.get('/customers/me');
//       return response.data.data;
//     } catch (error) {
//       console.error('Error fetching customer profile:', error);
//       throw error;
//     }
//   }
// };

// const Stack = createNativeStackNavigator();

// function HomeScreen({ navigation }) {
//   const { width } = Dimensions.get('window');
//   const serviceCardWidth = width * 0.44;
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredServices, setFilteredServices] = useState([]);
//   const scrollY = useRef(new Animated.Value(0)).current;
//   const [services, setServices] = useState([]);
//   const [popularServices, setPopularServices] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchServices = async () => {
//       try {
//         setLoading(true);
//         const servicesData = await ServiceAPI.getServices();
//         setServices(servicesData);
        
//         // For demo purposes, set first 2 services as popular
//         setPopularServices(servicesData.slice(0, 2));
//       } catch (error) {
//         Alert.alert('Error', 'Failed to load services');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchServices();
//   }, []);

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//     if (query) {
//       const filtered = services.filter(service =>
//         service.name.toLowerCase().includes(query.toLowerCase())
//       );
//       setFilteredServices(filtered);
//     } else {
//       setFilteredServices([]);
//     }
//   };

//   const servicesToDisplay = searchQuery ? filteredServices : services;

//   const headerHeight = scrollY.interpolate({
//     inputRange: [0, 100],
//     outputRange: [180, 100],
//     extrapolate: 'clamp',
//   });

//   const headerOpacity = scrollY.interpolate({
//     inputRange: [0, 50],
//     outputRange: [1, 0.9],
//     extrapolate: 'clamp',
//   });

//   if (loading) {
//     return (
//       <View className="flex-1 bg-gray-50 items-center justify-center">
//         <Text>Loading services...</Text>
//       </View>
//     );
//   }

//   return (
//     <View className="flex-1 bg-gray-50 pt-4">
//       <Animated.View 
//         className="bg-white px-5 pb-4"
//         style={[styles.shadow, { height: headerHeight, opacity: headerOpacity }]}
//       >
//         <View className="flex-row items-center justify-between mb-4">
//           <View>
//             <Text className="text-gray-500 text-sm">Welcome to</Text>
//             <Text className="text-2xl font-bold">Service Booking</Text>
//           </View>
//           <TouchableOpacity onPress={() => navigation.navigate('Contact')}>
//             <Ionicons name="help-circle-outline" size={24} color="#4B5563" />
//           </TouchableOpacity>
//         </View>

//         <View className="relative">
//           <TextInput
//             className="bg-gray-100 rounded-lg py-3 pl-10 pr-4"
//             placeholder="Search services..."
//             value={searchQuery}
//             onChangeText={handleSearch}
//           />
//           <FontAwesome
//             name="search"
//             size={16}
//             color="#9CA3AF"
//             style={{ position: 'absolute', left: 12, top: 16 }}
//           />
//         </View>
//       </Animated.View>

//       <ScrollView
//         className="flex-1"
//         scrollEventThrottle={16}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//           { useNativeDriver: false }
//         )}
//       >
//         <View className="px-5 pt-4">
//           {popularServices.length > 0 && (
//             <>
//               <Text className="text-lg font-bold mb-3">Popular Services</Text>
//               <View className="flex-row justify-between mb-6">
//                 {popularServices.map((service) => (
//                   <TouchableOpacity
//                     key={service.id}
//                     onPress={() => navigation.navigate('ServiceDetail', { service })}
//                   >
//                     <View
//                       className="bg-white rounded-xl p-4"
//                       style={[{ width: serviceCardWidth }, styles.shadow]}
//                     >
//                       <Image
//                         source={{ uri: service.image || 'https://via.placeholder.com/150' }}
//                         className="w-full h-24 rounded-lg mb-3"
//                         resizeMode="cover"
//                       />
//                       <Text className="font-bold mb-1">{service.name}</Text>
//                       <Text className="text-gray-500 text-sm">Starting from ${service.price}</Text>
//                     </View>
//                   </TouchableOpacity>
//                 ))}
//               </View>
//             </>
//           )}

//           <Text className="text-lg font-bold mb-3">All Services</Text>
//           <View className="flex-row flex-wrap justify-between">
//             {servicesToDisplay.map((service) => (
//               <TouchableOpacity
//                 key={service.id}
//                 onPress={() => navigation.navigate('ServiceDetail', { service })}
//                 className="mb-4"
//               >
//                 <View
//                   className="bg-white rounded-xl p-4"
//                   style={[{ width: serviceCardWidth }, styles.shadow]}
//                 >
//                   <Image
//                     source={{ uri: service.image || 'https://via.placeholder.com/150' }}
//                     className="w-full h-24 rounded-lg mb-3"
//                     resizeMode="cover"
//                   />
//                   <Text className="font-bold mb-1">{service.name}</Text>
//                   <Text className="text-gray-500 text-sm">Starting from ${service.price}</Text>
//                 </View>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// }

// function ServiceDetailScreen({ route, navigation }) {
//   const { service } = route.params;
//   const [expanded, setExpanded] = useState(false);

//   return (
//     <ScrollView className="flex-1 bg-gray-50">
//       <Image
//         source={{ uri: service.image || 'https://via.placeholder.com/300' }}
//         className="w-full h-64"
//         resizeMode="cover"
//       />
      
//       <View className="p-5">
//         <View className="flex-row justify-between items-start mb-3">
//           <Text className="text-2xl font-bold">{service.name}</Text>
//           <Text className="text-xl font-bold text-green-600">${service.price}</Text>
//         </View>
        
//         <View className="flex-row items-center mb-4">
//           <MaterialIcons name="stars" size={20} color="#F59E0B" />
//           <Text className="ml-1 text-gray-700">{service.rating || '4.8'} (24 reviews)</Text>
//         </View>
        
//         <Text className="text-gray-700 mb-6">{service.description || 'No description available'}</Text>
        
//         <View className="mb-6">
//           <View className="flex-row justify-between items-center mb-2">
//             <Text className="font-bold text-lg">Service Details</Text>
//             <TouchableOpacity onPress={() => setExpanded(!expanded)}>
//               <MaterialIcons
//                 name={expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
//                 size={24}
//                 color="#4B5563"
//               />
//             </TouchableOpacity>
//           </View>
          
//           {expanded && (
//             <View className="bg-white rounded-lg p-4" style={styles.shadow}>
//               <Text className="text-gray-700 mb-3">{service.details || 'Detailed service information not available.'}</Text>
//               {service.duration && (
//                 <View className="flex-row items-center mb-2">
//                   <MaterialIcons name="access-time" size={18} color="#4B5563" />
//                   <Text className="ml-2 text-gray-700">Duration: {service.duration} minutes</Text>
//                 </View>
//               )}
//             </View>
//           )}
//         </View>
        
//         <TouchableOpacity
//           className="bg-green-600 py-4 rounded-lg items-center"
//           onPress={() => navigation.navigate('BookService', { service })}
//         >
//           <Text className="text-white font-bold">Book Now</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// }

// function BookServiceScreen({ route, navigation }) {
//   const { service } = route.params;
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [timeSlots, setTimeSlots] = useState([]);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [loadingSlots, setLoadingSlots] = useState(false);

//   useEffect(() => {
//     const fetchAvailability = async () => {
//       try {
//         setLoadingSlots(true);
//         const slots = await ServiceAPI.getAvailability(service.id, selectedDate);
        
//         // Convert API slots to our format
//         const formattedSlots = slots.map((slot, index) => ({
//           id: index + 1,
//           time: `${slot.startTime} - ${slot.endTime}`,
//           available: slot.available,
//           apiSlot: slot // Keep original slot data
//         }));
        
//         setTimeSlots(formattedSlots);
//       } catch (error) {
//         Alert.alert('Error', 'Failed to load available time slots');
//       } finally {
//         setLoadingSlots(false);
//       }
//     };

//     fetchAvailability();
//   }, [selectedDate, service.id]);

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
//         timeSlot: selectedTimeSlot.apiSlot // Use the original slot data from API
//       }
//     });
//   };

//   return (
//     <ScrollView className="flex-1 bg-gray-50 p-5">
//       <View className="bg-white rounded-xl p-5 mb-5" style={styles.shadow}>
//         <View className="flex-row items-center mb-4">
//           <Image
//             source={{ uri: service.image || 'https://via.placeholder.com/150' }}
//             className="w-16 h-16 rounded-lg mr-3"
//             resizeMode="cover"
//           />
//           <View>
//             <Text className="font-bold text-lg">{service.name}</Text>
//             <Text className="text-gray-600">${service.price}</Text>
//           </View>
//         </View>
        
//         <View className="border-t border-gray-200 pt-4">
//           <Text className="font-bold mb-3">Select Date</Text>
//           <TouchableOpacity
//             className="flex-row items-center justify-between bg-gray-100 rounded-lg p-3 mb-5"
//             onPress={showDatePicker}
//           >
//             <Text>{format(selectedDate, 'MMMM d, yyyy')}</Text>
//             <MaterialIcons name="calendar-today" size={20} color="#4B5563" />
//           </TouchableOpacity>
          
//           <Text className="font-bold mb-3">Available Time Slots</Text>
//           {loadingSlots ? (
//             <View className="py-4 items-center">
//               <Text>Loading available time slots...</Text>
//             </View>
//           ) : timeSlots.length === 0 ? (
//             <View className="py-4 items-center">
//               <Text>No available time slots for this date</Text>
//             </View>
//           ) : (
//             <View className="flex-row flex-wrap">
//               {timeSlots.map((slot) => (
//                 <TouchableOpacity
//                   key={slot.id}
//                   className={`rounded-lg p-3 mb-3 mr-3 ${selectedSlot === slot.id ? 'bg-green-100 border border-green-500' : 'bg-gray-100'} ${!slot.available && 'opacity-50'}`}
//                   style={{ minWidth: 100 }}
//                   onPress={() => slot.available && setSelectedSlot(slot.id)}
//                   disabled={!slot.available}
//                 >
//                   <Text className={`text-center ${selectedSlot === slot.id ? 'text-green-700 font-bold' : 'text-gray-700'}`}>
//                     {slot.time}
//                   </Text>
//                   {!slot.available && <Text className="text-center text-xs text-gray-500">Booked</Text>}
//                 </TouchableOpacity>
//               ))}
//             </View>
//           )}
//         </View>
//       </View>
      
//       <TouchableOpacity
//         className="bg-green-600 py-4 rounded-lg items-center"
//         onPress={handleContinue}
//         disabled={!selectedSlot}
//       >
//         <Text className="text-white font-bold">Continue</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// function CustomerDetailsScreen({ route, navigation }) {
//   const { service, bookingDetails } = route.params;
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [communicationPrefs, setCommunicationPrefs] = useState({
//     email: true,
//     sms: false
//   });
//   const [submitting, setSubmitting] = useState(false);
  
//   // Customer Address
//   const [customerAddress, setCustomerAddress] = useState({
//     street: '',
//     city: '',
//     state: '',
//     zip: ''
//   });
  
//   // Property Details
//   const [properties, setProperties] = useState([
//     {
//       id: 1,
//       name: 'Property 1',
//       street: '',
//       city: '',
//       state: '',
//       zip: '',
//       size: '',
//       areas: {
//         frontyard: false,
//         backyard: false,
//         garden: false,
//         trees: false
//       },
//       photos: []
//     }
//   ]);
  
//   const [activeProperty, setActiveProperty] = useState(1);

//   useEffect(() => {
//     // Load customer profile if available
//     const loadCustomerProfile = async () => {
//       try {
//         const profile = await ServiceAPI.getCustomerProfile();
//         if (profile) {
//           setName(profile.user?.name || '');
//           setEmail(profile.user?.email || '');
//           setPhone(profile.user?.phone || '');
          
//           if (profile.user?.address) {
//             setCustomerAddress({
//               street: profile.user.address.street || '',
//               city: profile.user.address.city || '',
//               state: profile.user.address.state || '',
//               zip: profile.user.address.zip || ''
//             });
//           }
//         }
//       } catch (error) {
//         console.log('Error loading customer profile:', error);
//       }
//     };

//     loadCustomerProfile();

//     // Request camera permissions
//     (async () => {
//       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (status !== 'granted') {
//         alert('Sorry, we need camera roll permissions to make this work!');
//       }
      
//       const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
//       if (cameraStatus.status !== 'granted') {
//         alert('Sorry, we need camera permissions to make this work!');
//       }
//     })();
//   }, []);

//   const handleAddProperty = () => {
//     const newId = properties.length + 1;
//     setProperties([
//       ...properties,
//       {
//         id: newId,
//         name: `Property ${newId}`,
//         street: '',
//         city: '',
//         state: '',
//         zip: '',
//         size: '',
//         areas: {
//           frontyard: false,
//           backyard: false,
//           garden: false,
//           trees: false
//         },
//         photos: []
//       }
//     ]);
//     setActiveProperty(newId);
//   };

//   const handleRemoveProperty = (id) => {
//     if (properties.length <= 1) {
//       Alert.alert('Cannot remove', 'You must have at least one property');
//       return;
//     }
    
//     const newProperties = properties.filter(prop => prop.id !== id);
//     setProperties(newProperties);
    
//     // Set active property to the first one if we removed the active one
//     if (activeProperty === id) {
//       setActiveProperty(newProperties[0].id);
//     }
//   };

//   const handlePropertyChange = (id, field, value) => {
//     setProperties(properties.map(prop => 
//       prop.id === id ? { ...prop, [field]: value } : prop
//     ));
//   };

//   const handleAreaToggle = (id, area) => {
//     setProperties(properties.map(prop => 
//       prop.id === id ? { 
//         ...prop, 
//         areas: { ...prop.areas, [area]: !prop.areas[area] } 
//       } : prop
//     ));
//   };

//   const handleAddPhoto = async (propertyId) => {
//     try {
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 1,
//       });

//       if (!result.canceled) {
//         setProperties(properties.map(prop => 
//           prop.id === propertyId ? { 
//             ...prop, 
//             photos: [...prop.photos, { uri: result.assets[0].uri }] 
//           } : prop
//         ));
//       }
//     } catch (error) {
//       console.error('Error picking image:', error);
//     }
//   };

//   const handleTakePhoto = async (propertyId) => {
//     try {
//       const result = await ImagePicker.launchCameraAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 1,
//       });

//       if (!result.canceled) {
//         setProperties(properties.map(prop => 
//           prop.id === propertyId ? { 
//             ...prop, 
//             photos: [...prop.photos, { uri: result.assets[0].uri }] 
//           } : prop
//         ));
//       }
//     } catch (error) {
//       console.error('Error taking photo:', error);
//     }
//   };

//   const handleRemovePhoto = (propertyId, photoIndex) => {
//     setProperties(properties.map(prop => 
//       prop.id === propertyId ? { 
//         ...prop, 
//         photos: prop.photos.filter((_, index) => index !== photoIndex) 
//       } : prop
//     ));
//   };

//   const handleConfirmBooking = async () => {
//     try {
//       setSubmitting(true);
      
//       const bookingData = {
//         service: service.id,
//         date: format(bookingDetails.date, 'yyyy-MM-dd'),
//         timeSlot: bookingDetails.timeSlot,
//         customerDetails: {
//           name,
//           email,
//           phone,
//           address: customerAddress,
//           communicationPrefs
//         },
//         properties: properties.map(prop => ({
//           address: {
//             street: prop.street,
//             city: prop.city,
//             state: prop.state,
//             zip: prop.zip
//           },
//           size: prop.size,
//           areas: Object.entries(prop.areas)
//             .filter(([_, selected]) => selected)
//             .map(([area]) => area),
//           photos: prop.photos.map(photo => photo.uri)
//         })),
//         tenant: TENANT_CONFIG.ID
//       };

//       const appointment = await ServiceAPI.createAppointment(bookingData);
      
//       navigation.navigate('BookingConfirmation', {
//         bookingData: {
//           ...appointment,
//           service // Include the full service object for display
//         }
//       });
//     } catch (error) {
//       Alert.alert('Error', 'Failed to create appointment. Please try again.');
//       console.error('Booking error:', error);
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   const activePropertyData = properties.find(prop => prop.id === activeProperty) || properties[0];

//   return (
//     <ScrollView className="flex-1 bg-gray-50 p-5">
//       <View className="bg-white rounded-xl p-5 mb-5" style={styles.shadow}>
//         <Text className="font-bold text-lg mb-4">Your Information</Text>
        
//         <View className="mb-4">
//           <Text className="text-gray-600 mb-1">Full Name</Text>
//           <TextInput
//             className="border border-gray-300 rounded-lg p-3"
//             placeholder="John Doe"
//             value={name}
//             onChangeText={setName}
//           />
//         </View>
        
//         <View className="mb-4">
//           <Text className="text-gray-600 mb-1">Email</Text>
//           <TextInput
//             className="border border-gray-300 rounded-lg p-3"
//             placeholder="john@example.com"
//             keyboardType="email-address"
//             value={email}
//             onChangeText={setEmail}
//           />
//         </View>
        
//         <View className="mb-4">
//           <Text className="text-gray-600 mb-1">Phone Number</Text>
//           <TextInput
//             className="border border-gray-300 rounded-lg p-3"
//             placeholder="(123) 456-7890"
//             keyboardType="phone-pad"
//             value={phone}
//             onChangeText={setPhone}
//           />
//         </View>
        
//         <View className="mb-4">
//           <Text className="text-gray-600 mb-1">Address</Text>
//           <TextInput
//             className="border border-gray-300 rounded-lg p-3 mb-2"
//             placeholder="Street Address"
//             value={customerAddress.street}
//             onChangeText={(text) => setCustomerAddress({...customerAddress, street: text})}
//           />
//           <View className="flex-row mb-2">
//             <TextInput
//               className="flex-1 border border-gray-300 rounded-lg p-3 mr-2"
//               placeholder="City"
//               value={customerAddress.city}
//               onChangeText={(text) => setCustomerAddress({...customerAddress, city: text})}
//             />
//             <TextInput
//               className="flex-1 border border-gray-300 rounded-lg p-3"
//               placeholder="State"
//               value={customerAddress.state}
//               onChangeText={(text) => setCustomerAddress({...customerAddress, state: text})}
//             />
//           </View>
//           <TextInput
//             className="border border-gray-300 rounded-lg p-3"
//             placeholder="ZIP Code"
//             value={customerAddress.zip}
//             onChangeText={(text) => setCustomerAddress({...customerAddress, zip: text})}
//           />
//         </View>
        
//         <View className="mb-4">
//           <Text className="text-gray-600 mb-2">Communication Preferences</Text>
//           <View className="flex-row items-center mb-2">
//             <TouchableOpacity
//               className="w-5 h-5 border border-gray-400 rounded mr-2 items-center justify-center"
//               onPress={() => setCommunicationPrefs({...communicationPrefs, email: !communicationPrefs.email})}
//             >
//               {communicationPrefs.email && <MaterialIcons name="check" size={16} color="#4B5563" />}
//             </TouchableOpacity>
//             <Text>Email</Text>
//           </View>
//           <View className="flex-row items-center">
//             <TouchableOpacity
//               className="w-5 h-5 border border-gray-400 rounded mr-2 items-center justify-center"
//               onPress={() => setCommunicationPrefs({...communicationPrefs, sms: !communicationPrefs.sms})}
//             >
//               {communicationPrefs.sms && <MaterialIcons name="check" size={16} color="#4B5563" />}
//             </TouchableOpacity>
//             <Text>SMS/Text Messages</Text>
//           </View>
//         </View>
//       </View>
      
//       <View className="bg-white rounded-xl p-5 mb-5" style={styles.shadow}>
//         <View className="flex-row justify-between items-center mb-4">
//           <Text className="font-bold text-lg">Property Details</Text>
//           <TouchableOpacity 
//             className="bg-green-600 px-3 py-1 rounded-full"
//             onPress={handleAddProperty}
//           >
//             <Text className="text-white">+ Add</Text>
//           </TouchableOpacity>
//         </View>
        
//         <ScrollView horizontal className="mb-4">
//           <View className="flex-row">
//             {properties.map(property => (
//               <TouchableOpacity
//                 key={property.id}
//                 className={`px-4 py-2 mr-2 rounded-full ${activeProperty === property.id ? 'bg-green-100 border border-green-500' : 'bg-gray-100'}`}
//                 onPress={() => setActiveProperty(property.id)}
//               >
//                 <View className="flex-row items-center">
//                   <Text>{property.name}</Text>
//                   {properties.length > 1 && (
//                     <TouchableOpacity 
//                       className="ml-2"
//                       onPress={() => handleRemoveProperty(property.id)}
//                     >
//                       <MaterialIcons name="close" size={16} color="#6B7280" />
//                     </TouchableOpacity>
//                   )}
//                 </View>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </ScrollView>
        
//         <View className="mb-4">
//           <Text className="text-gray-600 mb-1">Property Address</Text>
//           <TextInput
//             className="border border-gray-300 rounded-lg p-3 mb-2"
//             placeholder="Street Address"
//             value={activePropertyData.street}
//             onChangeText={(text) => handlePropertyChange(activeProperty, 'street', text)}
//           />
//           <View className="flex-row mb-2">
//             <TextInput
//               className="flex-1 border border-gray-300 rounded-lg p-3 mr-2"
//               placeholder="City"
//               value={activePropertyData.city}
//               onChangeText={(text) => handlePropertyChange(activeProperty, 'city', text)}
//             />
//             <TextInput
//               className="flex-1 border border-gray-300 rounded-lg p-3"
//               placeholder="State"
//               value={activePropertyData.state}
//               onChangeText={(text) => handlePropertyChange(activeProperty, 'state', text)}
//             />
//           </View>
//           <TextInput
//             className="border border-gray-300 rounded-lg p-3"
//             placeholder="ZIP Code"
//             value={activePropertyData.zip}
//             onChangeText={(text) => handlePropertyChange(activeProperty, 'zip', text)}
//           />
//         </View>
        
//         <View className="mb-4">
//           <Text className="text-gray-600 mb-1">Property Size (sq ft)</Text>
//           <TextInput
//             className="border border-gray-300 rounded-lg p-3"
//             placeholder="1500"
//             keyboardType="numeric"
//             value={activePropertyData.size}
//             onChangeText={(text) => handlePropertyChange(activeProperty, 'size', text)}
//           />
//         </View>
        
//         <View className="mb-4">
//           <Text className="text-gray-600 mb-2">Areas Needing Service</Text>
//           <View className="flex-row flex-wrap">
//             {Object.entries(activePropertyData.areas).map(([area, selected]) => (
//               <TouchableOpacity
//                 key={area}
//                 className={`px-3 py-2 mr-2 mb-2 rounded-full ${selected ? 'bg-green-100 border border-green-500' : 'bg-gray-100'}`}
//                 onPress={() => handleAreaToggle(activeProperty, area)}
//               >
//                 <Text className="capitalize">{area}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </View>
        
//         <View className="mb-4">
//           <Text className="text-gray-600 mb-2">Property Photos</Text>
//           <View className="flex-row flex-wrap">
//             {activePropertyData.photos.map((photo, index) => (
//               <View key={index} className="relative mr-2 mb-2">
//                 <Image
//                   source={{ uri: photo.uri }}
//                   className="w-20 h-20 rounded-lg"
//                 />
//                 <TouchableOpacity
//                   className="absolute -top-2 -right-2 bg-red-500 rounded-full w-5 h-5 items-center justify-center"
//                   onPress={() => handleRemovePhoto(activeProperty, index)}
//                 >
//                   <MaterialIcons name="close" size={14} color="white" />
//                 </TouchableOpacity>
//               </View>
//             ))}
            
//             <TouchableOpacity
//               className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg items-center justify-center"
//               onPress={() => {
//                 Alert.alert(
//                   'Add Photo',
//                   'Choose an option',
//                   [
//                     {
//                       text: 'Take Photo',
//                       onPress: () => handleTakePhoto(activeProperty)
//                     },
//                     {
//                       text: 'Choose from Gallery',
//                       onPress: () => handleAddPhoto(activeProperty)
//                     },
//                     {
//                       text: 'Cancel',
//                       style: 'cancel'
//                     }
//                   ]
//                 );
//               }}
//             >
//               <MaterialIcons name="add-a-photo" size={24} color="#9CA3AF" />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>
      
//       <TouchableOpacity
//         className="bg-green-600 py-4 rounded-lg items-center mb-5"
//         onPress={handleConfirmBooking}
//         disabled={submitting}
//       >
//         <Text className="text-white font-bold">
//           {submitting ? 'Processing...' : 'Confirm Booking'}
//         </Text>
//       </TouchableOpacity>
      
//       <View className="bg-white rounded-xl p-5" style={styles.shadow}>
//         <Text className="font-bold text-lg mb-3">Booking Summary</Text>
        
//         <View className="flex-row items-center mb-4">
//           <Image
//             source={{ uri: service.image || 'https://via.placeholder.com/150' }}
//             className="w-16 h-16 rounded-lg mr-3"
//             resizeMode="cover"
//           />
//           <View>
//             <Text className="font-bold">{service.name}</Text>
//             <Text className="text-gray-600">${service.price}</Text>
//           </View>
//         </View>
        
//         <View className="border-t border-gray-200 pt-3">
//           <View className="flex-row justify-between mb-2">
//             <Text className="text-gray-600">Date</Text>
//             <Text>{format(bookingDetails.date, 'MMMM d, yyyy')}</Text>
//           </View>
//           <View className="flex-row justify-between">
//             <Text className="text-gray-600">Time</Text>
//             <Text>{bookingDetails.timeSlot.startTime} - {bookingDetails.timeSlot.endTime}</Text>
//           </View>
//         </View>
//       </View>
//     </ScrollView>
//   );
// }

// function BookingConfirmationScreen({ route }) {
//   const { bookingData } = route.params;
  
//   return (
//     <View className="flex-1 bg-gray-50 items-center justify-center p-5">
//       <View className="bg-white rounded-xl p-8 items-center" style={styles.shadow}>
//         <View className="bg-green-100 rounded-full p-4 mb-5">
//           <MaterialIcons name="check" size={48} color="#16A34A" />
//         </View>
        
//         <Text className="text-2xl font-bold mb-3">Booking Confirmed!</Text>
//         <Text className="text-gray-600 text-center mb-6">
//           Your appointment for {bookingData.service.name} has been confirmed for {format(new Date(bookingData.date), 'MMMM d, yyyy')} at {bookingData.timeSlot.startTime}.
//         </Text>
        
//         <View className="w-full mb-6">
//           <View className="flex-row justify-between mb-2">
//             <Text className="text-gray-600">Booking ID</Text>
//             <Text className="font-bold">{bookingData.id}</Text>
//           </View>
//           <View className="flex-row justify-between mb-2">
//             <Text className="text-gray-600">Service</Text>
//             <Text>{bookingData.service.name}</Text>
//           </View>
//           <View className="flex-row justify-between mb-2">
//             <Text className="text-gray-600">Date & Time</Text>
//             <Text>{format(new Date(bookingData.date), 'MMMM d, yyyy')} at {bookingData.timeSlot.startTime}</Text>
//           </View>
//           <View className="flex-row justify-between">
//             <Text className="text-gray-600">Total</Text>
//             <Text className="font-bold">${bookingData.service.price}</Text>
//           </View>
//         </View>
        
//         <Text className="text-gray-500 text-center mb-6">
//           A confirmation has been sent to your email. You can view your upcoming appointments in the "My Appointments" section.
//         </Text>
        
//         <TouchableOpacity className="bg-green-600 py-3 px-6 rounded-full">
//           <Text className="text-white font-bold">Back to Home</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// function ContactScreen() {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [sending, setSending] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);

//   const handleSendMessage = () => {
//     setSending(true);
//     // Simulate sending
//     setTimeout(() => {
//       setSending(false);
//       setModalVisible(true);
//       setName('');
//       setEmail('');
//       setMessage('');
//     }, 1500);
//   };

//   return (
//     <ScrollView className="flex-1 bg-gray-50 p-5">
//       <View className="bg-white rounded-xl p-5 mb-5" style={styles.shadow}>
//         <Text className="text-2xl font-bold mb-3">Contact Us</Text>
//         <Text className="text-gray-600 mb-6">
//           Have questions or need assistance? Fill out the form below and we'll get back to you as soon as possible.
//         </Text>
        
//         <View className="mb-4">
//           <Text className="text-gray-600 mb-1">Your Name</Text>
//           <TextInput
//             className="border border-gray-300 rounded-lg p-3"
//             placeholder="John Doe"
//             value={name}
//             onChangeText={setName}
//           />
//         </View>
        
//         <View className="mb-4">
//           <Text className="text-gray-600 mb-1">Email Address</Text>
//           <TextInput
//             className="border border-gray-300 rounded-lg p-3"
//             placeholder="john@example.com"
//             keyboardType="email-address"
//             value={email}
//             onChangeText={setEmail}
//           />
//         </View>
        
//         <View className="mb-4">
//           <Text className="text-gray-600 mb-1">Message</Text>
//           <TextInput
//             className="border border-gray-300 rounded-lg p-3 h-32"
//             placeholder="Type your message here..."
//             multiline
//             value={message}
//             onChangeText={setMessage}
//           />
//         </View>
        
//         <TouchableOpacity
//           className="bg-green-600 py-3 rounded-lg items-center"
//           onPress={handleSendMessage}
//           disabled={sending || !name || !email || !message}
//         >
//           <Text className="text-white font-bold">
//             {sending ? 'Sending...' : 'Send Message'}
//           </Text>
//         </TouchableOpacity>
//       </View>
      
//       <View className="bg-white rounded-xl p-5" style={styles.shadow}>
//         <Text className="text-xl font-bold mb-3">Other Ways to Reach Us</Text>
        
//         <View className="flex-row items-center mb-4">
//           <MaterialIcons name="phone" size={24} color="#4B5563" />
//           <Text className="ml-3">(123) 456-7890</Text>
//         </View>
        
//         <View className="flex-row items-center mb-4">
//           <MaterialIcons name="email" size={24} color="#4B5563" />
//           <Text className="ml-3">support@servicebooking.com</Text>
//         </View>
        
//         <View className="flex-row items-center">
//           <MaterialIcons name="location-on" size={24} color="#4B5563" />
//           <Text className="ml-3">123 Service St, City, State 12345</Text>
//         </View>
//       </View>
      
//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => setModalVisible(false)}
//       >
//         <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
//           <View className="flex-1 bg-black bg-opacity-50 items-center justify-center">
//             <TouchableWithoutFeedback>
//               <View className="bg-white rounded-xl p-6 m-5" style={styles.shadow}>
//                 <Text className="text-xl font-bold mb-3">Message Sent!</Text>
//                 <Text className="text-gray-600 mb-5">
//                   Thank you for contacting us. We've received your message and will get back to you soon.
//                 </Text>
//                 <TouchableOpacity
//                   className="bg-green-600 py-2 px-4 rounded-full self-center"
//                   onPress={() => setModalVisible(false)}
//                 >
//                   <Text className="text-white">OK</Text>
//                 </TouchableOpacity>
//               </View>
//             </TouchableWithoutFeedback>
//           </View>
//         </TouchableWithoutFeedback>
//       </Modal>
//     </ScrollView>
//   );
// }

// const ServiceStack = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen 
//         name="ServicesHome" 
//         component={HomeScreen} 
//         options={{ headerShown: false }} 
//       />
//       <Stack.Screen 
//         name="ServiceDetail" 
//         component={ServiceDetailScreen} 
//         options={{ title: 'Service Details' }} 
//       />
//       <Stack.Screen 
//         name="BookService" 
//         component={BookServiceScreen} 
//         options={{ title: 'Book Service' }} 
//       />
//       <Stack.Screen 
//         name="CustomerDetails" 
//         component={CustomerDetailsScreen} 
//         options={{ title: 'Your Details' }} 
//       />
//       <Stack.Screen 
//         name="BookingConfirmation" 
//         component={BookingConfirmationScreen} 
//         options={{ headerShown: false }} 
//       />
//       <Stack.Screen 
//         name="Contact" 
//         component={ContactScreen} 
//         options={{ title: 'Contact Us' }} 
//       />
//     </Stack.Navigator>
//   );
// };

// export default ServiceStack;

// const styles = StyleSheet.create({
//   shadow: {
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
// });












// import React, { useState, useRef, useEffect } from 'react';
// import { 
//   View, 
//   Text, 
//   Image, 
//   ScrollView, 
//   TextInput, 
//   TouchableOpacity, 
//   Dimensions, 
//   Animated, 
//   StyleSheet,
//   Modal,
//   TouchableWithoutFeedback,
//   ActivityIndicator,
//   Alert
// } from 'react-native';
// import { FontAwesome, MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { format } from 'date-fns';
// import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
// import * as ImagePicker from 'expo-image-picker';
// import axios from 'axios';

// // Tenant configuration
// const TENANT_CONFIG = {
//   SUBDOMAIN: 'isaac-gomes-ernandes',
//   ID: '686371dc6afb07584c866517',
// };

// const Stack = createNativeStackNavigator();

// function HomeScreen({ navigation }) {
//   const { width } = Dimensions.get('window');
//   const serviceCardWidth = width * 0.44;
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredServices, setFilteredServices] = useState([]);
//   const [services, setServices] = useState([]);
//   const [popularServices, setPopularServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const scrollY = useRef(new Animated.Value(0)).current;

//   const serviceCategories = [
//     { id: 'all', name: 'All Services' },
//     { id: 'lawn', name: 'Lawn Care' },
//     { id: 'hardscape', name: 'Hardscaping' },
//     { id: 'planting', name: 'Planting' },
//     { id: 'irrigation', name: 'Irrigation' },
//     { id: 'lighting', name: 'Lighting' },
//   ];

//   const fetchServices = async (category = 'all', search = '') => {
//   try {
//     setLoading(true);
//     setError(null);
    
//     console.log('Fetching services...'); // Debug log
    
//     const response = await axios.get("http://192.168.242.12:5000/api/v1/services", {
//       headers: {
//         'X-Tenant-ID': TENANT_CONFIG.ID,
//         'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
//       },
//       params: {
//         category: category === 'all' ? undefined : category,
//         search: search || undefined,
//         sort: '-rating'
//       }
//     });

//     console.log('Full API Response:', JSON.stringify(response.data, null, 2)); // Debug log
//     console.log('First service image structure:', response.data.data[0].image); // Debug log

//     if (response.data?.success) {
//       const allServices = response.data.data.map(service => {
//         console.log('Processing service:', service._id); // Debug log
//         console.log('Service image object:', service.image); // Debug log
        
//         // Helper function to validate image URLs
//         const isValidImageUrl = (url) => {
//           if (!url || typeof url !== 'string') return false;
//           try {
//             new URL(url);
//             return url.startsWith('http');
//           } catch {
//             return false;
//           }
//         };

//         // Extract image URL from different possible locations
//         const possibleImageSources = [
//           service.image?.url,       // Check image.url first
//           service.image,             // Then check image directly (if it's a string)
//           ...(service.images || []).map(img => img.url || img) // Fallback to images array if exists
//         ].filter(Boolean); // Remove any undefined/null values

//         console.log('Possible image sources:', possibleImageSources); // Debug log

//         // Find the first valid image URL
//         let imageUrl = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'; // Default fallback
//         for (const url of possibleImageSources) {
//           if (isValidImageUrl(url)) {
//             imageUrl = url;
//             break;
//           }
//         }

//         console.log('Selected image URL:', imageUrl); // Debug log

//         return {
//           id: service._id,
//           name: service.name,
//           description: service.description,
//           price: `$${service.basePrice}`,
//           originalPrice: service.originalPrice ? `$${service.originalPrice}` : undefined,
//           rating: service.rating || 4.5, // Default if not provided
//           reviews: service.reviewsCount || Math.floor(Math.random() * 100) + 10, // Default if not provided
//           image: imageUrl,
//           category: service.category,
//           isPopular: service.rating >= 4.7,
//           isDeal: service.originalPrice && service.basePrice < service.originalPrice,
//           discount: service.originalPrice 
//             ? Math.round((1 - service.basePrice / service.originalPrice) * 100)
//             : undefined,
//           duration: service.duration
//         };
//       });

//       console.log('Processed services:', allServices); // Debug log
//       setServices(allServices);
//       setPopularServices(allServices.filter(s => s.rating >= 4.5).slice(0, 4));
//     } else {
//       setError('Failed to fetch services: Invalid response format');
//     }
//   } catch (err) {
//     console.error('Error fetching services:', err);
//     setError(err.message || 'An error occurred while fetching services');
//   } finally {
//     setLoading(false);
//   }
// };
//   useEffect(() => {
//     fetchServices();
//   }, []);

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//     if (query) {
//       const filtered = services.filter(service =>
//         service.name.toLowerCase().includes(query.toLowerCase()) ||
//         service.description.toLowerCase().includes(query.toLowerCase())
//       );
//       setFilteredServices(filtered);
//     } else {
//       setFilteredServices([]);
//     }
//   };

//   const servicesToDisplay = searchQuery ? filteredServices : services;

//   const headerHeight = scrollY.interpolate({
//     inputRange: [0, 100],
//     outputRange: [180, 100],
//     extrapolate: 'clamp',
//   });

//   const headerOpacity = scrollY.interpolate({
//     inputRange: [0, 50],
//     outputRange: [1, 0.9],
//     extrapolate: 'clamp',
//   });

//   if (loading) {
//     return (
//       <View className="flex-1 bg-gray-50 justify-center items-center">
//         <ActivityIndicator size="large" color="#16A34A" />
//         <Text className="mt-4 text-gray-600">Loading services...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View className="flex-1 bg-gray-50 justify-center items-center p-8">
//         <Ionicons name="warning-outline" size={48} color="#EF4444" />
//         <Text className="text-lg font-bold text-gray-800 mt-4">Error loading services</Text>
//         <Text className="text-gray-600 mt-2 text-center">{error}</Text>
//         <TouchableOpacity
//           className="mt-6 bg-green-600 px-6 py-3 rounded-lg"
//           onPress={() => fetchServices()}
//         >
//           <Text className="text-white font-medium">Try Again</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <View className="flex-1 bg-gray-50 pt-4">
//       <Animated.View 
//         className="absolute top-0 left-0 right-0 z-10 bg-gray-50 pt-10 px-5 pb-4"
//         style={{
//           height: headerHeight,
//           opacity: headerOpacity,
//         }}
//       >
//         <View className="mb-3 pt-7">
//           <Text className="text-green-800 font-bold text-3xl">Crafting Outdoor Beauty</Text>
//           <Text className="text-green-600 text-lg mt-1">One Service at a Time</Text>
//         </View>

//         <View className="flex-row items-center bg-white rounded-xl p-3 shadow-sm shadow-green-100 border border-gray-100">
//           <MaterialIcons name="search" size={20} color="#4B5563" />
//           <TextInput
//             placeholder="Find a Service..."
//             placeholderTextColor="#9CA3AF"
//             className="flex-1 ml-2 text-gray-700 text-base"
//             value={searchQuery}
//             onChangeText={handleSearch}
//           />
//           <View className="h-6 w-px bg-gray-200 mx-2" />
//           <TouchableOpacity className="p-1">
//             <MaterialIcons name="tune" size={20} color="#16A34A" />
//           </TouchableOpacity>
//         </View>
//       </Animated.View>

//       <ScrollView 
//         className="flex-1" 
//         showsVerticalScrollIndicator={false}
//         contentContainerStyle={{ paddingTop: 180 }}
//         onScroll={Animated.event(
//           [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//           { useNativeDriver: false }
//         )}
//         scrollEventThrottle={16}
//       >
//         <View className="p-5 pt-0">
//           <View className="flex-row justify-between items-center mb-4 mt-4">
//             <Text className="text-green-800 font-bold text-xl">
//               {searchQuery ? 'Search Results' : 'Our Services'}
//             </Text>
//             {!searchQuery && (
//               <TouchableOpacity className="flex-row items-center">
//                 <Text className="text-green-600 text-sm mr-1">See all</Text>
//                 <MaterialIcons name="chevron-right" size={16} color="#16A34A" />
//               </TouchableOpacity>
//             )}
//           </View>
          
//           {servicesToDisplay.length > 0 ? (
//             <View className="flex-row flex-wrap justify-between mb-2">
//               {servicesToDisplay.map((service) => (
//                 <TouchableOpacity
//                   key={service.id}
//                   className="mb-4 bg-white rounded-xl overflow-hidden shadow-sm shadow-green-100"
//                   style={{ width: serviceCardWidth }}
//                   activeOpacity={0.8}
//                   onPress={() => navigation.navigate('ServiceDetail', { service })}
//                 >
//                   <View className="relative">
//                     {/* <Image
//                       source={{ uri: service.image }}
//                       className="w-full h-40 rounded-t-xl"
//                       resizeMode="cover"
//                     /> */}

//                     <Image
//   source={{ 
//     uri: service.image,
//     headers: {
//       'X-Tenant-ID': TENANT_CONFIG.ID,
//       'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN
//     }
//   }}
//   className="w-full h-40 rounded-t-xl"
//   resizeMode="cover"
//   onError={(e) => {
//     console.log('Image load error:', e.nativeEvent.error);
//     console.log('Failed image URL:', service.image);
//     // Update state to show default image for this service
//     setServices(prev => prev.map(s => 
//       s.id === service.id 
//         ? {...s, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'} 
//         : s
//     ));
//   }}
// />
//                     <View className="absolute inset-0 bg-black/20 rounded-xl" />
//                     <View className="absolute bottom-0 left-0 right-0 p-3">
//                       <Text className="text-white font-semibold text-lg">{service.name}</Text>
//                     </View>
//                   </View>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           ) : searchQuery ? (
//             <View className="py-10 items-center justify-center">
//               <Text className="text-gray-500">No services found matching "{searchQuery}"</Text>
//             </View>
//           ) : null}

//           {!searchQuery && (
//             <>
//               <View className="flex-row justify-between items-center mb-4 mt-6">
//                 <Text className="text-green-800 font-bold text-xl">Popular Services</Text>
//                 <TouchableOpacity className="flex-row items-center">
//                   <Text className="text-green-600 text-sm mr-1">See all</Text>
//                   <MaterialIcons name="chevron-right" size={16} color="#16A34A" />
//                 </TouchableOpacity>
//               </View>
              
//               <ScrollView 
//                 horizontal 
//                 showsHorizontalScrollIndicator={false}
//                 className="mb-6"
//               >
//                 {popularServices.map((service) => (
//                   <TouchableOpacity
//                     key={service.id}
//                     className="bg-white rounded-xl overflow-hidden shadow-sm shadow-green-100 mr-4"
//                     style={{ width: width * 0.7 }}
//                     activeOpacity={0.8}
//                     onPress={() => navigation.navigate('ServiceDetail', { service })}
//                   >
//                     <View className="relative">
//                       <Image
//                         source={{ uri: service.image }}
//                         className="w-full h-48 rounded-t-xl"
//                         resizeMode="cover"
//                       />
//                       {service.isPopular && (
//                         <View className="absolute top-3 left-3 bg-green-600 rounded-full px-3 py-1 flex-row items-center">
//                           <FontAwesome name="star" size={13} color="yellow" className="mr-1" />
//                           <Text className="text-white text-xs font-medium">Popular</Text>
//                         </View>
//                       )}
//                       <View className="absolute bottom-0 left-0 right-0 p-4 bg-black/60">
//                         <Text className="text-white font-bold text-xl mb-1">{service.name}</Text>
//                         <View className="flex-row items-center mb-2">
//                           <FontAwesome name="star" size={16} color="#FBBF24" />
//                           <Text className="text-yellow-300 font-medium ml-1">{service.rating}</Text>
//                           <Text className="text-gray-300 text-sm ml-1">({service.reviews} reviews)</Text>
//                         </View>
//                         <Text className="text-white font-bold text-lg">{service.price}</Text>
//                       </View>
//                     </View>
//                   </TouchableOpacity>
//                 ))}
//               </ScrollView>

//               <View className="flex-row justify-between items-center mb-4">
//                 <Text className="text-green-800 font-bold text-xl">Spring Specials</Text>
//                 <TouchableOpacity className="flex-row items-center">
//                   <Text className="text-green-600 text-sm mr-1">See all</Text>
//                   <MaterialIcons name="chevron-right" size={16} color="#16A34A" />
//                 </TouchableOpacity>
//               </View>
              
//               {services.filter(s => s.discount).slice(0, 1).map(service => (
//                 <TouchableOpacity 
//                   key={service.id}
//                   className="w-full mb-8 bg-white rounded-xl overflow-hidden shadow-sm shadow-green-100"
//                   activeOpacity={0.8}
//                   onPress={() => navigation.navigate('ServiceDetail', { service })}
//                 >
//                   <View className="relative">
//                     <Image
//                       source={{ uri: service.image }}
//                       className="w-full h-48 rounded-t-xl"
//                       resizeMode="cover"
//                     />
//                     <View className="absolute top-3 left-3 bg-green-600 rounded-full px-3 py-1">
//                       <Text className="text-white text-xs font-medium">Spring Special</Text>
//                     </View>
//                     <View className="absolute bottom-0 left-0 right-0 p-4 bg-black/70">
//                       <Text className="text-white font-bold text-xl mb-1">{service.name}</Text>
//                       <View className="flex-row items-center">
//                         {service.originalPrice && (
//                           <Text className="text-gray-300 line-through mr-2">{service.originalPrice}</Text>
//                         )}
//                         <Text className="text-green-200 font-bold text-lg">
//                           {service.discount}% Off - Now {service.price}
//                         </Text>
//                       </View>
//                     </View>
//                   </View>
//                 </TouchableOpacity>
//               ))}

//               <View className="bg-green-700 rounded-xl p-5 mb-8">
//                 <Text className="text-white font-bold text-xl mb-2">Need Help With Your Project?</Text>
//                 <Text className="text-green-100 mb-4">Our landscaping experts are ready to transform your outdoor space.</Text>
//                 <TouchableOpacity 
//                   className="bg-white rounded-lg py-3 px-5 flex-row justify-center items-center"
//                   onPress={() => navigation.navigate('Contact')}
//                 >
//                   <Text className="text-green-700 font-bold text-center">Get a Free Quote</Text>
//                 </TouchableOpacity>
//               </View>
//             </>
//           )}
//         </View>
//       </ScrollView>
//     </View>
//   );
// }
// function ServiceDetailScreen({ route, navigation }) {
//   const { service } = route.params;
  
//   return (
//     <ScrollView className="flex-1 bg-gray-50">
//       <View className="p-5">
//         <View className="relative">
//           <Image
//             source={{ uri: service.image }}
//             className="w-full h-64 rounded-xl"
//             resizeMode="cover"
//           />
//           {service.discount && (
//             <View className="absolute top-3 left-3 bg-green-600 rounded-full px-3 py-1">
//               <Text className="text-white text-xs font-medium">{service.discount}</Text>
//             </View>
//           )}
//         </View>
        
//         <View className="mt-6">
//           <Text className="text-green-800 font-bold text-2xl">{service.name}</Text>
          
//           <View className="flex-row items-center mt-2">
//             <FontAwesome name="star" size={20} color="#FBBF24" />
//             <Text className="text-yellow-500 font-medium ml-1">{service.rating}</Text>
//             <Text className="text-gray-500 text-sm ml-1">({service.reviews} reviews)</Text>
//           </View>
          
//           <View className="mt-4">
//             {service.originalPrice ? (
//               <View className="flex-row items-center">
//                 <Text className="text-gray-500 line-through mr-2">{service.originalPrice}</Text>
//                 <Text className="text-green-700 font-bold text-xl">{service.price}</Text>
//               </View>
//             ) : (
//               <Text className="text-green-700 font-bold text-xl">{service.price}</Text>
//             )}
//           </View>
          
//           <Text className="mt-6 text-gray-700">
//             Professional landscaping service with high-quality materials and expert craftsmanship. 
//             Our team will transform your outdoor space into a beautiful and functional area.
//           </Text>
          
//           <TouchableOpacity 
//             className="mt-8 bg-green-600 rounded-lg py-4 px-6 flex-row justify-center items-center"
//             onPress={() => navigation.navigate('BookService', { service })}
//           >
//             <Text className="text-white font-bold text-lg">Book This Service</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </ScrollView>
//   );
// }

// function BookServiceScreen({ route, navigation }) {
//   const { service } = route.params;
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [selectedTime, setSelectedTime] = useState(new Date());
//   const [address, setAddress] = useState('');
//   const [selectedSlot, setSelectedSlot] = useState(null);

//   // Available time slots
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

//   const showTimePicker = () => {
//     DateTimePickerAndroid.open({
//       value: selectedTime,
//       onChange: (event, time) => {
//         if (time) {
//           setSelectedTime(time);
//         }
//       },
//       mode: 'time',
//       is24Hour: false,
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

//       {/* Service Summary */}
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

//       {/* Booking Form */}
//       <View className="mb-8">
//         <Text className="text-green-800 font-bold text-2xl mb-5">Schedule Your Service</Text>
        
//         <View className="bg-white rounded-2xl p-5 mb-4 shadow-lg shadow-green-200/80 border border-green-50">
//           {/* Date Picker */}
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

//           {/* Time Slot Selection */}
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

//       {/* Confirm Booking Button */}
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
// }



// function CustomerDetailsScreen({ route, navigation }) {
//   const { service, bookingDetails } = route.params;
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [communicationPrefs, setCommunicationPrefs] = useState({
//     email: true,
//     sms: false
//   });
  
//   // Customer Address
//   const [customerAddress, setCustomerAddress] = useState({
//     street: '',
//     city: '',
//     state: '',
//     zip: ''
//   });
  
//   // Property Details
//   const [properties, setProperties] = useState([
//     {
//       id: 1,
//       name: 'Property 1',
//       street: '',
//       city: '',
//       state: '',
//       zip: '',
//       size: '',
//       areas: {
//         frontyard: false,
//         backyard: false,
//         garden: false,
//         trees: false
//       },
//       photos: []
//     }
//   ]);
  
//   const [activeProperty, setActiveProperty] = useState(1);

//   useEffect(() => {
//     (async () => {
//       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (status !== 'granted') {
//         alert('Sorry, we need camera roll permissions to make this work!');
//       }
      
//       const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
//       if (cameraStatus.status !== 'granted') {
//         alert('Sorry, we need camera permissions to make this work!');
//       }
//     })();
//   }, []);

//   const handleCustomerAddressChange = (field, value) => {
//     setCustomerAddress(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };
  
//   const handlePropertyChange = (propertyId, field, value) => {
//     setProperties(prev => 
//       prev.map(prop => 
//         prop.id === propertyId ? { ...prop, [field]: value } : prop
//       )
//     );
//   };
  
//   const handleAreaToggle = (propertyId, area) => {
//     setProperties(prev => 
//       prev.map(prop => 
//         prop.id === propertyId 
//           ? { 
//               ...prop, 
//               areas: { 
//                 ...prop.areas, 
//                 [area]: !prop.areas[area] 
//               } 
//             } 
//           : prop
//       )
//     );
//   };
  
//   const addProperty = () => {
//     const newId = properties.length > 0 ? Math.max(...properties.map(p => p.id)) + 1 : 1;
//     setProperties(prev => [
//       ...prev,
//       {
//         id: newId,
//         name: `Property ${newId}`,
//         street: '',
//         city: '',
//         state: '',
//         zip: '',
//         size: '',
//         areas: {
//           frontyard: false,
//           backyard: false,
//           garden: false,
//           trees: false
//         },
//         photos: []
//       }
//     ]);
//     setActiveProperty(newId);
//   };
  
//   const removeProperty = (id) => {
//     if (properties.length <= 1) return;
//     setProperties(prev => prev.filter(prop => prop.id !== id));
//     if (activeProperty === id) {
//       setActiveProperty(properties[0].id);
//     }
//   };
  
//   const takePhoto = async (propertyId) => {
//     let result = await ImagePicker.launchCameraAsync({
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 0.7,
//     });

//     if (!result.canceled) {
//       const newPhoto = {
//         id: Date.now(),
//         uri: result.assets[0].uri
//       };
      
//       setProperties(prev => 
//         prev.map(prop => 
//           prop.id === propertyId 
//             ? { ...prop, photos: [...prop.photos, newPhoto] } 
//             : prop
//         )
//       );
//     }
//   };

//   const pickFromGallery = async (propertyId) => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 0.7,
//     });

//     if (!result.canceled) {
//       const newPhoto = {
//         id: Date.now(),
//         uri: result.assets[0].uri
//       };
      
//       setProperties(prev => 
//         prev.map(prop => 
//           prop.id === propertyId 
//             ? { ...prop, photos: [...prop.photos, newPhoto] } 
//             : prop
//         )
//       );
//     }
//   };
  
//   const removePhoto = (propertyId, photoId) => {
//     setProperties(prev => 
//       prev.map(prop => 
//         prop.id === propertyId 
//           ? { ...prop, photos: prop.photos.filter(p => p.id !== photoId) } 
//           : prop
//       )
//     );
//   };
  
//   const toggleCommunicationPref = (type) => {
//     setCommunicationPrefs(prev => ({
//       ...prev,
//       [type]: !prev[type]
//     }));
//   };
  
//   const handleConfirmBooking = () => {
//     const bookingData = {
//       service,
//       customerDetails: {
//         name,
//         email,
//         phone,
//         address: customerAddress,
//         communicationPrefs
//       },
//       properties,
//       bookingDetails
//     };
    
//     navigation.navigate('BookingConfirmation', {
//       bookingData
//     });
//   };

//   const currentProperty = properties.find(prop => prop.id === activeProperty);

//   return (
//     <ScrollView className="flex-1 bg-gray-50 p-5">
//       <View className="mb-6">
//         <Text className="text-green-800 font-bold text-2xl">Customer Details</Text>
//         <Text className="text-gray-600 mt-2">Please fill in your information</Text>
//       </View>

//       {/* Personal Information */}
//       <View className="mb-8">
//         <Text className="text-green-700 font-bold text-lg mb-4">Personal Information</Text>
        
//         <View className="space-y-4 mb-6">
//           <View>
//             <Text className="text-gray-700 mb-1 font-medium">Full Name</Text>
//             <TextInput
//               placeholder="John Doe"
//               className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800"
//               placeholderTextColor="#9CA3AF"
//               value={name}
//               onChangeText={setName}
//             />
//           </View>
          
//           <View>
//             <Text className="text-gray-700 mb-1 font-medium">Email Address</Text>
//             <TextInput
//               placeholder="your@email.com"
//               className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800"
//               placeholderTextColor="#9CA3AF"
//               keyboardType="email-address"
//               value={email}
//               onChangeText={setEmail}
//             />
//           </View>
          
//           <View>
//             <Text className="text-gray-700 mb-1 font-medium">Phone Number</Text>
//             <TextInput
//               placeholder="+1 (123) 456-7890"
//               className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800"
//               placeholderTextColor="#9CA3AF"
//               keyboardType="phone-pad"
//               value={phone}
//               onChangeText={setPhone}
//             />
//           </View>
//         </View>

//         {/* Customer Address */}
//         <Text className="text-green-700 font-bold text-lg mb-4">Your Address</Text>
//         <View className="space-y-4 mb-6">
//           <View>
//             <Text className="text-gray-700 mb-1 font-medium">Street Address</Text>
//             <TextInput
//               placeholder="123 Main St"
//               className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800"
//               placeholderTextColor="#9CA3AF"
//               value={customerAddress.street}
//               onChangeText={(text) => handleCustomerAddressChange('street', text)}
//             />
//           </View>
          
//           <View className="flex-row">
//             <View className="flex-1 mr-2">
//               <Text className="text-gray-700 mb-1 font-medium">City</Text>
//               <TextInput
//                 placeholder="City"
//                 className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800"
//                 placeholderTextColor="#9CA3AF"
//                 value={customerAddress.city}
//                 onChangeText={(text) => handleCustomerAddressChange('city', text)}
//               />
//             </View>
//             <View className="flex-1 ml-2">
//               <Text className="text-gray-700 mb-1 font-medium">State</Text>
//               <TextInput
//                 placeholder="State"
//                 className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800"
//                 placeholderTextColor="#9CA3AF"
//                 value={customerAddress.state}
//                 onChangeText={(text) => handleCustomerAddressChange('state', text)}
//               />
//             </View>
//           </View>
          
//           <View>
//             <Text className="text-gray-700 mb-1 font-medium">ZIP Code</Text>
//             <TextInput
//               placeholder="12345"
//               className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800"
//               placeholderTextColor="#9CA3AF"
//               keyboardType="number-pad"
//               value={customerAddress.zip}
//               onChangeText={(text) => handleCustomerAddressChange('zip', text)}
//             />
//           </View>
//         </View>

//         {/* Communication Preferences */}
//         <Text className="text-green-700 font-bold text-lg mb-4">Communication Preferences</Text>
//         <View className="flex-row items-center mb-2">
//           <TouchableOpacity
//             onPress={() => toggleCommunicationPref('email')}
//             className="mr-3"
//           >
//             <View className="w-6 h-6 rounded-md border border-gray-400 items-center justify-center">
//               {communicationPrefs.email && (
//                 <MaterialIcons name="check" size={20} color="#16A34A" />
//               )}
//             </View>
//           </TouchableOpacity>
//           <Text className="text-gray-700">Email</Text>
//         </View>
//         <View className="flex-row items-center">
//           <TouchableOpacity
//             onPress={() => toggleCommunicationPref('sms')}
//             className="mr-3"
//           >
//             <View className="w-6 h-6 rounded-md border border-gray-400 items-center justify-center">
//               {communicationPrefs.sms && (
//                 <MaterialIcons name="check" size={20} color="#16A34A" />
//               )}
//             </View>
//           </TouchableOpacity>
//           <Text className="text-gray-700">SMS/Text Message</Text>
//         </View>
//       </View>

//       {/* Property Details */}
//       <View className="mb-8">
//         <View className="flex-row justify-between items-center mb-4">
//           <Text className="text-green-700 font-bold text-lg">Property Details</Text>
//           <TouchableOpacity 
//             onPress={addProperty}
//             className="flex-row items-center bg-green-100 px-3 py-2 rounded-lg"
//           >
//             <Ionicons name="add" size={18} color="#16A34A" />
//             <Text className="text-green-700 ml-1">Add Property</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Property Tabs */}
//         <ScrollView 
//           horizontal 
//           showsHorizontalScrollIndicator={false}
//           className="mb-4"
//         >
//           <View className="flex-row">
//             {properties.map((property) => (
//               <TouchableOpacity
//                 key={property.id}
//                 onPress={() => setActiveProperty(property.id)}
//                 className={`px-4 py-2 mr-2 rounded-lg ${activeProperty === property.id ? 'bg-green-600' : 'bg-gray-200'}`}
//               >
//                 <Text className={`font-medium ${activeProperty === property.id ? 'text-white' : 'text-gray-700'}`}>
//                   {property.name}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </ScrollView>

//         {/* Current Property Form */}
//         {currentProperty && (
//           <View className="bg-white rounded-xl p-5 shadow-sm">
//             <View className="flex-row justify-between items-center mb-3">
//               <Text className="text-gray-500 font-medium">{currentProperty.name}</Text>
//               {properties.length > 1 && (
//                 <TouchableOpacity 
//                   onPress={() => removeProperty(currentProperty.id)}
//                   className="p-1"
//                 >
//                   <MaterialIcons name="delete" size={20} color="#EF4444" />
//                 </TouchableOpacity>
//               )}
//             </View>
            
//             <View className="space-y-4">
//               <Text className="text-gray-700 font-medium">Property Address</Text>
              
//               <View>
//                 <Text className="text-gray-600 mb-1 text-sm">Street</Text>
//                 <TextInput
//                   placeholder="123 Main St"
//                   className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-800"
//                   placeholderTextColor="#9CA3AF"
//                   value={currentProperty.street}
//                   onChangeText={(text) => handlePropertyChange(currentProperty.id, 'street', text)}
//                 />
//               </View>
              
//               <View className="flex-row">
//                 <View className="flex-1 mr-2">
//                   <Text className="text-gray-600 mb-1 text-sm">City</Text>
//                   <TextInput
//                     placeholder="City"
//                     className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-800"
//                     placeholderTextColor="#9CA3AF"
//                     value={currentProperty.city}
//                     onChangeText={(text) => handlePropertyChange(currentProperty.id, 'city', text)}
//                   />
//                 </View>
//                 <View className="flex-1 ml-2">
//                   <Text className="text-gray-600 mb-1 text-sm">State</Text>
//                   <TextInput
//                     placeholder="State"
//                     className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-800"
//                     placeholderTextColor="#9CA3AF"
//                     value={currentProperty.state}
//                     onChangeText={(text) => handlePropertyChange(currentProperty.id, 'state', text)}
//                   />
//                 </View>
//               </View>
              
//               <View>
//                 <Text className="text-gray-600 mb-1 text-sm">ZIP Code</Text>
//                 <TextInput
//                   placeholder="12345"
//                   className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-800"
//                   placeholderTextColor="#9CA3AF"
//                   keyboardType="number-pad"
//                   value={currentProperty.zip}
//                   onChangeText={(text) => handlePropertyChange(currentProperty.id, 'zip', text)}
//                 />
//               </View>
              
//               <View>
//                 <Text className="text-gray-600 mb-1 text-sm">Property Size (sq ft)</Text>
//                 <TextInput
//                   placeholder="e.g., 5000"
//                   className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-800"
//                   placeholderTextColor="#9CA3AF"
//                   keyboardType="number-pad"
//                   value={currentProperty.size}
//                   onChangeText={(text) => handlePropertyChange(currentProperty.id, 'size', text)}
//                 />
//               </View>
              
//               <View>
//                 <Text className="text-gray-700 font-medium mb-2">Areas Needing Service</Text>
//                 <View className="flex-row flex-wrap">
//                   {Object.entries(currentProperty.areas).map(([area, selected]) => (
//                     <TouchableOpacity
//                       key={area}
//                       onPress={() => handleAreaToggle(currentProperty.id, area)}
//                       className={`flex-row items-center mr-4 mb-3 ${selected ? 'bg-green-100' : 'bg-gray-100'} px-3 py-2 rounded-lg`}
//                     >
//                       <View className={`w-5 h-5 rounded-sm border ${selected ? 'border-green-500 bg-green-500' : 'border-gray-400'} items-center justify-center mr-2`}>
//                         {selected && <MaterialIcons name="check" size={16} color="white" />}
//                       </View>
//                       <Text className="text-gray-700 capitalize">{area}</Text>
//                     </TouchableOpacity>
//                   ))}
//                 </View>
//               </View>
              
//               <View>
//                 <Text className="text-gray-700 font-medium mb-2">Property Photos</Text>
//                 <Text className="text-gray-500 text-sm mb-3">Upload photos to help us understand your needs</Text>
                
//                 <View className="flex-row mb-3">
//                   <TouchableOpacity 
//                     onPress={() => takePhoto(currentProperty.id)}
//                     className="flex-row items-center bg-green-100 px-4 py-2 rounded-lg mr-3"
//                   >
//                     <MaterialCommunityIcons name="camera" size={18} color="#16A34A" />
//                     <Text className="text-green-700 ml-2">Take Photo</Text>
//                   </TouchableOpacity>
                  
//                   <TouchableOpacity 
//                     onPress={() => pickFromGallery(currentProperty.id)}
//                     className="flex-row items-center bg-gray-100 px-4 py-2 rounded-lg"
//                   >
//                     <MaterialIcons name="photo-library" size={18} color="#4B5563" />
//                     <Text className="text-gray-700 ml-2">From Gallery</Text>
//                   </TouchableOpacity>
//                 </View>
                
//                 {currentProperty.photos.length > 0 && (
//                   <ScrollView horizontal className="py-2">
//                     {currentProperty.photos.map(photo => (
//                       <View key={photo.id} className="relative mr-3">
//                         <Image
//                           source={{ uri: photo.uri }}
//                           className="w-24 h-24 rounded-lg"
//                         />
//                         <TouchableOpacity 
//                           onPress={() => removePhoto(currentProperty.id, photo.id)}
//                           className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
//                         >
//                           <MaterialIcons name="close" size={14} color="white" />
//                         </TouchableOpacity>
//                       </View>
//                     ))}
//                   </ScrollView>
//                 )}
//               </View>
//             </View>
//           </View>
//         )}
//       </View>

//       {/* Confirm Booking Button */}
//       <TouchableOpacity 
//         className="bg-green-600 rounded-lg py-4 px-6 flex-row justify-center items-center mb-8"
//         onPress={handleConfirmBooking}
//       >
//         <Text className="text-white font-bold text-lg">Confirm Booking</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// }

// function BookingConfirmationScreen({ navigation }) {
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
// }

// function ContactScreen({ navigation }) {
//   return (
//     <ScrollView className="flex-1 bg-gray-50 p-5">
//       <View className="mb-8">
//         <TouchableOpacity 
//           className="flex-row items-center mb-6 p-2 -ml-2"
//           onPress={() => navigation.goBack()}
//         >
//           <Ionicons name="chevron-back" size={28} color="#16A34A" />
//           <Text className="text-green-600 ml-1 text-lg font-medium">Back</Text>
//         </TouchableOpacity>
        
//         <View className="flex-row items-center">
//           <Ionicons name="mail-outline" size={28} color="#166534" className="mr-3" />
//           <Text className="text-green-900 font-bold text-3xl">Contact Us</Text>
//         </View>
//         <Text className="text-gray-600 mt-2 text-base">
//           Have questions? Fill out the form below and we'll get back to you soon.
//         </Text>
//       </View>
      
//       <View className="space-y-5 mb-6">
//         <View>
//           <Text className="text-gray-700 mb-2 font-medium">Your Name</Text>
//           <TextInput
//             placeholder="John Doe"
//             className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800 mb-4"
//             placeholderTextColor="#9CA3AF"
//           />
//         </View>
        
//         <View>
//           <Text className="text-gray-700 mb-2 font-medium">Email Address</Text>
//           <TextInput
//             placeholder="your@email.com"
//             className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800 mb-4"
//             placeholderTextColor="#9CA3AF"
//             keyboardType="email-address"
//           />
//         </View>
        
//         <View>
//           <Text className="text-gray-700 mb-2 font-medium">Phone Number</Text>
//           <TextInput
//             placeholder="+1 (123) 456-7890"
//             className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800 mb-5"
//             placeholderTextColor="#9CA3AF"
//             keyboardType="phone-pad"
//           />
//         </View>
        
//         <View>
//           <Text className="text-gray-700 mb-2 font-medium">Tell us about your project</Text>
//           <TextInput
//             placeholder="Describe your needs or questions..."
//             className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800 h-40 text-align-top"
//             placeholderTextColor="#9CA3AF"
//             multiline
//           />
//         </View>
//       </View>
      
//       <TouchableOpacity 
//         className="bg-green-600 rounded-xl py-5 px-6 flex-row justify-center items-center shadow-lg shadow-green-200 active:bg-green-700"
//         activeOpacity={0.8}
//       >
//         <Text className="text-white font-bold text-lg">Submit Request</Text>
//         <Ionicons name="arrow-forward" size={22} color="white" className="ml-2" />
//       </TouchableOpacity>
//       <View className="h-9"></View>
//     </ScrollView>
//   );
// }

// const ServiceStack = () => {
//   return (
//     <Stack.Navigator>
//       <Stack.Screen 
//         name="ServicesHome" 
//         component={HomeScreen} 
//         options={{ headerShown: false }} 
//       />
//       <Stack.Screen 
//         name="ServiceDetail" 
//         component={ServiceDetailScreen} 
//         options={{ title: 'Service Details' }} 
//       />
//       <Stack.Screen 
//         name="BookService" 
//         component={BookServiceScreen} 
//         options={{ title: 'Book Service' }} 
//       />
//        <Stack.Screen 
//         name="CustomerDetails" 
//         component={CustomerDetailsScreen} 
//         options={{ title: 'Your Details' }} 
//       />
//       <Stack.Screen 
//         name="BookingConfirmation" 
//         component={BookingConfirmationScreen} 
//         options={{ headerShown: false }} 
//       />
//       <Stack.Screen 
//         name="Contact" 
//         component={ContactScreen} 
//         options={{ title: 'Contact Us' }} 
//       />
//     </Stack.Navigator>
//   );
// };

// export default ServiceStack;

// const styles = StyleSheet.create({
//   shadow: {
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
// });



// src/screens/home/HomeScreen.js
import React, { useState, useRef, useEffect } from 'react';
import { 
  View, Text, Image, ScrollView, TextInput, TouchableOpacity, 
  Dimensions, Animated, ActivityIndicator, Alert, FlatList
} from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { TENANT_CONFIG } from '../config/constants';

const HomeScreen = ({ navigation }) => {
  const { width } = Dimensions.get('window');
  const serviceCardWidth = width * 0.44;
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const scrollY = useRef(new Animated.Value(0)).current;

  const serviceCategories = [
    { id: 'all', name: 'All Services' },
    { id: 'lawn', name: 'Lawn Care' },
    { id: 'hardscape', name: 'Hardscaping' },
    { id: 'planting', name: 'Planting' },
    { id: 'irrigation', name: 'Irrigation' },
    { id: 'lighting', name: 'Lighting' },
  ];

  const fetchServices = async (category = 'all', search = '') => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`${TENANT_CONFIG.API_BASE_URL}/services`, {
        headers: {
          'X-Tenant-ID': TENANT_CONFIG.ID,
          'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
        },
        params: {
          category: category === 'all' ? undefined : category,
          search: search || undefined,
          sort: '-rating'
        }
      });

      if (response.data?.success) {
        const allServices = response.data.data.map(service => {
          const isValidImageUrl = (url) => {
            if (!url || typeof url !== 'string') return false;
            try {
              new URL(url);
              return url.startsWith('http');
            } catch {
              return false;
            }
          };

          const possibleImageSources = [
            service.image?.url,
            service.image,
            ...(service.images || []).map(img => img.url || img)
          ].filter(Boolean);

          let imageUrl = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c';
          for (const url of possibleImageSources) {
            if (isValidImageUrl(url)) {
              imageUrl = url;
              break;
            }
          }

          return {
            _id: service._id,  // Ensure MongoDB _id is included
            id: service._id,   // Also include as 'id' for compatibility
            name: service.name,
            description: service.description,
            price: `$${service.basePrice}`,
            originalPrice: service.originalPrice ? `$${service.originalPrice}` : undefined,
            rating: service.rating || 4.5,
            reviews: service.reviewsCount || Math.floor(Math.random() * 100) + 10,
            image: imageUrl,
            category: service.category,
            isPopular: service.rating >= 4.7,
            isDeal: service.originalPrice && service.basePrice < service.originalPrice,
            discount: service.originalPrice 
              ? Math.round((1 - service.basePrice / service.originalPrice) * 100)
              : undefined,
            duration: service.duration
          };
        });

        setServices(allServices);
      }
    } catch (err) {
      console.error('Error fetching services:', err);
      setError(err.message || 'An error occurred while fetching services');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = services.filter(service =>
        service.name.toLowerCase().includes(query.toLowerCase()) ||
        service.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredServices(filtered);
    } else {
      setFilteredServices([]);
    }
  };

  const servicesToDisplay = searchQuery ? filteredServices : services;

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [180, 100],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0.9],
    extrapolate: 'clamp',
  });

  if (loading) {
    return (
      <View className="flex-1 bg-gray-50 justify-center items-center">
        <ActivityIndicator size="large" color="#16A34A" />
        <Text className="mt-4 text-gray-600">Loading services...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 bg-gray-50 justify-center items-center p-8">
        <Ionicons name="warning-outline" size={48} color="#EF4444" />
        <Text className="text-lg font-bold text-gray-800 mt-4">Error loading services</Text>
        <Text className="text-gray-600 mt-2 text-center">{error}</Text>
        <TouchableOpacity
          className="mt-6 bg-green-600 px-6 py-3 rounded-lg"
          onPress={() => fetchServices()}
        >
          <Text className="text-white font-medium">Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const renderServiceItem = ({ item }) => (
    <TouchableOpacity
      className="mb-4 bg-white rounded-xl overflow-hidden shadow-sm shadow-green-100"
      style={{ width: serviceCardWidth }}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('ServiceDetail', { service: item })}
    >
      <View className="relative">
        <Image
          source={{ 
            uri: item.image,
            headers: {
              'X-Tenant-ID': TENANT_CONFIG.ID,
              'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN
            }
          }}
          className="w-full h-40 rounded-t-xl"
          resizeMode="cover"
          onError={(e) => {
            console.log('Image load error:', e.nativeEvent.error);
            console.log('Failed image URL:', item.image);
            setServices(prev => prev.map(s => 
              s.id === item.id 
                ? {...s, image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'} 
                : s
            ));
          }}
        />
        <View className="absolute inset-0 bg-black/20 rounded-xl" />
        <View className="absolute bottom-0 left-0 right-0 p-3">
          <Text className="text-white font-semibold text-lg">{item.name}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className="flex-1 bg-gray-50 pt-4">
      <Animated.View 
        className="absolute top-0 left-0 right-0 z-10 bg-gray-50 pt-10 px-5 pb-4"
        style={{
          height: headerHeight,
          opacity: headerOpacity,
        }}
      >
        <View className="mb-3 pt-7">
          <Text className="text-green-800 font-bold text-3xl">Crafting Outdoor Beauty</Text>
          <Text className="text-green-600 text-lg mt-1">One Service at a Time</Text>
        </View>

        <View className="flex-row items-center bg-white rounded-xl p-3 shadow-sm shadow-green-100 border border-gray-100">
          <MaterialIcons name="search" size={20} color="#4B5563" />
          <TextInput
            placeholder="Find a Service..."
            placeholderTextColor="#9CA3AF"
            className="flex-1 ml-2 text-gray-700 text-base"
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <View className="h-6 w-px bg-gray-200 mx-2" />
          <TouchableOpacity className="p-1">
            <MaterialIcons name="tune" size={20} color="#16A34A" />
          </TouchableOpacity>
        </View>
      </Animated.View>

      <ScrollView 
        className="flex-1" 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: 180 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View className="p-5 pt-0">
          <View className="flex-row justify-between items-center mb-4 mt-4">
            <Text className="text-green-800 font-bold text-xl">
              {searchQuery ? 'Search Results' : 'Our Services'}
            </Text>
            {/* {!searchQuery && (
              <TouchableOpacity className="flex-row items-center">
                <Text className="text-green-600 text-sm mr-1">See all</Text>
                <MaterialIcons name="chevron-right" size={16} color="#16A34A" />
              </TouchableOpacity>
            )} */}
          </View>
          
          {servicesToDisplay.length > 0 ? (
            <FlatList
              data={servicesToDisplay}
              renderItem={renderServiceItem}
              keyExtractor={(item) => item.id}
              numColumns={2}
              columnWrapperStyle={{ justifyContent: 'space-between' }}
              contentContainerStyle={{ paddingBottom: 20 }}
              scrollEnabled={false} // Disable internal scrolling since we're in a ScrollView
            />
          ) : searchQuery ? (
            <View className="py-10 items-center justify-center">
              <Text className="text-gray-500">No services found matching "{searchQuery}"</Text>
            </View>
          ) : null}

          <View className="bg-green-700 rounded-xl p-5 mb-8 mt-4">
            <Text className="text-white font-bold text-xl mb-2">Need Help With Your Project?</Text>
            <Text className="text-green-100 mb-4">Our landscaping experts are ready to transform your outdoor space.</Text>
            <TouchableOpacity 
              className="bg-white rounded-lg py-3 px-5 flex-row justify-center items-center"
              onPress={() => navigation.navigate('Contact')}
            >
              <Text className="text-green-700 font-bold text-center">Get a Free Quote</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;