import React, { useState, useRef, useEffect } from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, Dimensions, Animated, StyleSheet,Modal,TouchableWithoutFeedback } from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { format } from 'date-fns';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';

const Stack = createNativeStackNavigator();

function HomeScreen({ navigation }) {
  const { width } = Dimensions.get('window');
  const serviceCardWidth = width * 0.44;
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);
  const scrollY = useRef(new Animated.Value(0)).current;

  const serviceCategories = [
    { id: 1, name: 'Lawn Maintenance', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=320&q=80' },
    { id: 2, name: 'Palm Trimming', image: 'https://i.pinimg.com/736x/64/70/d3/6470d3fdfd48d29ffd0dbc2c0160ee68.jpg' },
    { id: 3, name: 'Synthetic Turf', image: 'https://i.pinimg.com/736x/49/97/b0/4997b039f6a641af68f383e0f7bb9c3e.jpg' },
    { id: 4, name: 'Garden Design', image: 'https://i.pinimg.com/736x/e9/a0/d6/e9a0d68ead0296cb64ea2b680c2869c9.jpg' },
    { id: 5, name: 'Paver Installation', image: 'https://i.pinimg.com/736x/18/bd/5b/18bd5b474a2682e2c3d8e329e56f69d1.jpg' },
    { id: 6, name: 'Irrigation Systems', image: 'https://i.pinimg.com/736x/c9/15/a1/c915a1d8c26dfab990c32dabad3bc72a.jpg' },
  ];

  const popularServices = [
    { id: 1, name: 'Premium Lawn Care', price: '$199', rating: 4.9, reviews: 128, image: 'https://i.pinimg.com/736x/57/9a/e4/579ae4d3f89d19226bf16ce52779bd0c.jpg' },
    { id: 2, name: 'Synthetic Turf', price: '$599', rating: 4.8, reviews: 95, image: 'https://i.pinimg.com/736x/68/de/49/68de49997c07f81e362a9b710d43856a.jpg' },
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = serviceCategories.filter(service =>
        service.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredServices(filtered);
    } else {
      setFilteredServices([]);
    }
  };

  const servicesToDisplay = searchQuery ? filteredServices : serviceCategories;

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
            {!searchQuery && (
              <TouchableOpacity className="flex-row items-center">
                <Text className="text-green-600 text-sm mr-1">See all</Text>
                <MaterialIcons name="chevron-right" size={16} color="#16A34A" />
              </TouchableOpacity>
            )}
          </View>
          
          {servicesToDisplay.length > 0 ? (
            <View className="flex-row flex-wrap justify-between mb-2">
              {servicesToDisplay.map((service) => (
                <TouchableOpacity
                  key={service.id}
                  className="mb-4 bg-white rounded-xl overflow-hidden shadow-sm shadow-green-100"
                  style={{ width: serviceCardWidth }}
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('ServiceDetail', { service })}
                >
                  <View className="relative">
                    <Image
                      source={{ uri: service.image }}
                      className="w-full h-40 rounded-t-xl"
                      resizeMode="cover"
                    />
                    <View className="absolute inset-0 bg-black/20 rounded-xl" />
                    <View className="absolute bottom-0 left-0 right-0 p-3">
                      <Text className="text-white font-semibold text-lg">{service.name}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ) : searchQuery ? (
            <View className="py-10 items-center justify-center">
              <Text className="text-gray-500">No services found matching "{searchQuery}"</Text>
            </View>
          ) : null}

          {!searchQuery && (
            <>
              <View className="flex-row justify-between items-center mb-4 mt-6">
                <Text className="text-green-800 font-bold text-xl">Popular Services</Text>
                <TouchableOpacity className="flex-row items-center">
                  <Text className="text-green-600 text-sm mr-1">See all</Text>
                  <MaterialIcons name="chevron-right" size={16} color="#16A34A" />
                </TouchableOpacity>
              </View>
              
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                className="mb-6"
              >
                {popularServices.map((service) => (
                  <TouchableOpacity
                    key={service.id}
                    className="bg-white rounded-xl overflow-hidden shadow-sm shadow-green-100 mr-4"
                    style={{ width: width * 0.7 }}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate('ServiceDetail', { service })}
                  >
                    <View className="relative">
                      <Image
                        source={{ uri: service.image }}
                        className="w-full h-48 rounded-t-xl"
                        resizeMode="cover"
                      />
                      {service.id === 2 && (
                        <View className="absolute top-3 left-3 bg-green-600 rounded-full px-3 py-1 flex-row items-center">
                          <FontAwesome name="star" size={13} color="yellow" className="mr-1" />
                          <Text className="text-white text-xs font-medium">Popular</Text>
                        </View>
                      )}
                      <View className="absolute bottom-0 left-0 right-0 p-4 bg-black/60">
                        <Text className="text-white font-bold text-xl mb-1">{service.name}</Text>
                        <View className="flex-row items-center mb-2">
                          <FontAwesome name="star" size={16} color="#FBBF24" />
                          <Text className="text-yellow-300 font-medium ml-1">{service.rating}</Text>
                          <Text className="text-gray-300 text-sm ml-1">({service.reviews} reviews)</Text>
                        </View>
                        <Text className="text-white font-bold text-lg">{service.price}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              <View className="flex-row justify-between items-center mb-4">
                <Text className="text-green-800 font-bold text-xl">Spring Specials</Text>
                <TouchableOpacity className="flex-row items-center">
                  <Text className="text-green-600 text-sm mr-1">See all</Text>
                  <MaterialIcons name="chevron-right" size={16} color="#16A34A" />
                </TouchableOpacity>
              </View>
              
              <TouchableOpacity 
                className="w-full mb-8 bg-white rounded-xl overflow-hidden shadow-sm shadow-green-100"
                activeOpacity={0.8}
                onPress={() => navigation.navigate('ServiceDetail', { 
                  service: {
                    id: 7,
                    name: 'Palm Trimming Service',
                    price: '$199',
                    originalPrice: '$249',
                    rating: 4.7,
                    reviews: 86,
                    image: 'https://i.pinimg.com/736x/7f/19/ef/7f19efd4c591705de2f93d9c7cf76d33.jpg',
                    discount: '20% Off'
                  }
                })}
              >
                <View className="relative">
                  <Image
                    source={{ uri: 'https://i.pinimg.com/736x/7f/19/ef/7f19efd4c591705de2f93d9c7cf76d33.jpg' }}
                    className="w-full h-48 rounded-t-xl"
                    resizeMode="cover"
                  />
                  <View className="absolute top-3 left-3 bg-green-600 rounded-full px-3 py-1">
                    <Text className="text-white text-xs font-medium">Spring Special</Text>
                  </View>
                  <View className="absolute bottom-0 left-0 right-0 p-4 bg-black/70">
                    <Text className="text-white font-bold text-xl mb-1">Palm Trimming Service</Text>
                    <View className="flex-row items-center">
                      <Text className="text-gray-300 line-through mr-2">$249</Text>
                      <Text className="text-green-200 font-bold text-lg">20% Off - Now $199</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>

              <View className="bg-green-700 rounded-xl p-5 mb-8">
                <Text className="text-white font-bold text-xl mb-2">Need Help With Your Project?</Text>
                <Text className="text-green-100 mb-4">Our landscaping experts are ready to transform your outdoor space.</Text>
                <TouchableOpacity 
                  className="bg-white rounded-lg py-3 px-5 flex-row justify-center items-center"
                  onPress={() => navigation.navigate('Contact')}
                >
                  <Text className="text-green-700 font-bold text-center">Get a Free Quote</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

function ServiceDetailScreen({ route, navigation }) {
  const { service } = route.params;
  
  return (
    <ScrollView className="flex-1 bg-gray-50">
      <View className="p-5">
        <View className="relative">
          <Image
            source={{ uri: service.image }}
            className="w-full h-64 rounded-xl"
            resizeMode="cover"
          />
          {service.discount && (
            <View className="absolute top-3 left-3 bg-green-600 rounded-full px-3 py-1">
              <Text className="text-white text-xs font-medium">{service.discount}</Text>
            </View>
          )}
        </View>
        
        <View className="mt-6">
          <Text className="text-green-800 font-bold text-2xl">{service.name}</Text>
          
          <View className="flex-row items-center mt-2">
            <FontAwesome name="star" size={20} color="#FBBF24" />
            <Text className="text-yellow-500 font-medium ml-1">{service.rating}</Text>
            <Text className="text-gray-500 text-sm ml-1">({service.reviews} reviews)</Text>
          </View>
          
          <View className="mt-4">
            {service.originalPrice ? (
              <View className="flex-row items-center">
                <Text className="text-gray-500 line-through mr-2">{service.originalPrice}</Text>
                <Text className="text-green-700 font-bold text-xl">{service.price}</Text>
              </View>
            ) : (
              <Text className="text-green-700 font-bold text-xl">{service.price}</Text>
            )}
          </View>
          
          <Text className="mt-6 text-gray-700">
            Professional landscaping service with high-quality materials and expert craftsmanship. 
            Our team will transform your outdoor space into a beautiful and functional area.
          </Text>
          
          <TouchableOpacity 
            className="mt-8 bg-green-600 rounded-lg py-4 px-6 flex-row justify-center items-center"
            onPress={() => navigation.navigate('BookService', { service })}
          >
            <Text className="text-white font-bold text-lg">Book This Service</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

function BookServiceScreen({ route, navigation }) {
  const { service } = route.params;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [address, setAddress] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Available time slots
  const timeSlots = [
    { id: 1, time: '08:00 AM - 10:00 AM', available: true },
    { id: 2, time: '10:00 AM - 12:00 PM', available: true },
    { id: 3, time: '12:00 PM - 02:00 PM', available: false },
    { id: 4, time: '02:00 PM - 04:00 PM', available: true },
    { id: 5, time: '04:00 PM - 06:00 PM', available: true },
  ];

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: selectedDate,
      onChange: (event, date) => {
        if (date) {
          setSelectedDate(date);
        }
      },
      mode: 'date',
      minimumDate: new Date(),
    });
  };

  const showTimePicker = () => {
    DateTimePickerAndroid.open({
      value: selectedTime,
      onChange: (event, time) => {
        if (time) {
          setSelectedTime(time);
        }
      },
      mode: 'time',
      is24Hour: false,
    });
  };


  const handleContinue = () => {
    if (!selectedSlot) {
      Alert.alert('Please select a time slot');
      return;
    }
    
    const selectedTimeSlot = timeSlots.find(slot => slot.id === selectedSlot);
    
    navigation.navigate('CustomerDetails', {
      service,
      bookingDetails: {
        date: selectedDate,
        timeSlot: selectedTimeSlot.time
      }
    });
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

      {/* Service Summary */}
      <View className="bg-white rounded-2xl p-5 mb-6 shadow-lg shadow-green-200/80 border border-green-50">
        <View className="flex-row items-center">
          <View className="relative">
            <Image
              source={{ uri: service.image }}
              className="w-24 h-24 rounded-xl"
              resizeMode="cover"
            />
            {service.isPopular && (
              <View className="absolute -top-2 -right-2 bg-green-600 px-2 py-1 rounded-full">
                <Text className="text-white text-xs font-bold">Popular</Text>
              </View>
            )}
          </View>
          
          <View className="ml-4 flex-1">
            <View className="flex-row justify-between items-start">
              <Text className="text-green-800 font-bold text-lg flex-1">{service.name}</Text>
              {service.isDeal && (
                <View className="bg-green-100 px-2 py-1 rounded-md ml-2">
                  <Text className="text-green-700 text-xs font-bold">Special Deal</Text>
                </View>
              )}
            </View>
            
            <View className="flex-row items-center mt-1">
              <View className="flex-row items-center">
                <FontAwesome name="star" size={16} color="#FBBF24" />
                <Text className="text-yellow-500 font-medium ml-1">{service.rating}</Text>
                <Text className="text-gray-500 text-sm ml-1">({service.reviews} reviews)</Text>
              </View>
            </View>
            
            <View className="flex-row justify-between items-center mt-2">
              <Text className="text-green-700 font-bold text-lg">{service.price}</Text>
              {service.originalPrice && (
                <Text className="text-gray-400 text-sm line-through mr-2">${service.originalPrice}</Text>
              )}
              {service.discount && (
                <View className="bg-red-100 px-2 py-1 rounded-md">
                  <Text className="text-red-600 text-xs font-bold">Save {service.discount}%</Text>
                </View>
              )}
            </View>
            
            {service.duration && (
              <View className="flex-row items-center mt-2">
                <MaterialIcons name="access-time" size={16} color="#6B7280" />
                <Text className="text-gray-500 text-sm ml-1">{service.duration} mins</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Booking Form */}
      <View className="mb-8">
        <Text className="text-green-800 font-bold text-2xl mb-5">Schedule Your Service</Text>
        
        <View className="bg-white rounded-2xl p-5 mb-4 shadow-lg shadow-green-200/80 border border-green-50">
          {/* Date Picker */}
          <TouchableOpacity 
            className="flex-row items-center mb-4 py-3 border-b border-gray-100"
            onPress={showDatePicker}
            activeOpacity={0.7}
          >
            <View className="bg-green-100 p-2 rounded-full mr-3">
              <MaterialIcons name="event" size={20} color="#16A34A" />
            </View>
            <Text className={`flex-1 text-base ${selectedDate ? 'text-gray-800 font-medium' : 'text-gray-400'}`}>
              {selectedDate ? format(selectedDate, 'MMMM do, yyyy') : 'Select Date'}
            </Text>
            <MaterialIcons name="keyboard-arrow-right" size={24} color="#9CA3AF" />
          </TouchableOpacity>

          {/* Time Slot Selection */}
          <View className="mb-4">
            <Text className="text-gray-700 font-medium mb-3">Available Time Slots</Text>
            <View className="flex-row flex-wrap -mx-1">
              {timeSlots.map((slot) => (
                <TouchableOpacity
                  key={slot.id}
                  className={`w-1/2 px-1 mb-2 ${!slot.available ? 'opacity-50' : ''}`}
                  disabled={!slot.available}
                  onPress={() => setSelectedSlot(slot.id)}
                >
                  <View className={`p-3 rounded-lg border ${selectedSlot === slot.id ? 'bg-green-100 border-green-500' : 'bg-gray-50 border-gray-200'}`}>
                    <Text className={`text-center ${selectedSlot === slot.id ? 'text-green-700 font-bold' : 'text-gray-700'}`}>
                      {slot.time}
                    </Text>
                    {!slot.available && (
                      <Text className="text-center text-xs text-red-500 mt-1">Booked</Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          
        </View>
      </View>

      {/* Confirm Booking Button */}
      <TouchableOpacity 
        className="bg-green-600 rounded-lg py-4 px-6 flex-row justify-center items-center mb-8"
        onPress={handleContinue}
        disabled={!selectedSlot}
        style={!selectedSlot ? { opacity: 0.6 } : {}}
      >
        <Text className="text-white font-bold text-lg">Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}



function CustomerDetailsScreen({ route, navigation }) {
  const { service, bookingDetails } = route.params;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [communicationPrefs, setCommunicationPrefs] = useState({
    email: true,
    sms: false
  });
  
  // Customer Address
  const [customerAddress, setCustomerAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: ''
  });
  
  // Property Details
  const [properties, setProperties] = useState([
    {
      id: 1,
      name: 'Property 1',
      street: '',
      city: '',
      state: '',
      zip: '',
      size: '',
      areas: {
        frontyard: false,
        backyard: false,
        garden: false,
        trees: false
      },
      photos: []
    }
  ]);
  
  const [activeProperty, setActiveProperty] = useState(1);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
      
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      if (cameraStatus.status !== 'granted') {
        alert('Sorry, we need camera permissions to make this work!');
      }
    })();
  }, []);

  const handleCustomerAddressChange = (field, value) => {
    setCustomerAddress(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const handlePropertyChange = (propertyId, field, value) => {
    setProperties(prev => 
      prev.map(prop => 
        prop.id === propertyId ? { ...prop, [field]: value } : prop
      )
    );
  };
  
  const handleAreaToggle = (propertyId, area) => {
    setProperties(prev => 
      prev.map(prop => 
        prop.id === propertyId 
          ? { 
              ...prop, 
              areas: { 
                ...prop.areas, 
                [area]: !prop.areas[area] 
              } 
            } 
          : prop
      )
    );
  };
  
  const addProperty = () => {
    const newId = properties.length > 0 ? Math.max(...properties.map(p => p.id)) + 1 : 1;
    setProperties(prev => [
      ...prev,
      {
        id: newId,
        name: `Property ${newId}`,
        street: '',
        city: '',
        state: '',
        zip: '',
        size: '',
        areas: {
          frontyard: false,
          backyard: false,
          garden: false,
          trees: false
        },
        photos: []
      }
    ]);
    setActiveProperty(newId);
  };
  
  const removeProperty = (id) => {
    if (properties.length <= 1) return;
    setProperties(prev => prev.filter(prop => prop.id !== id));
    if (activeProperty === id) {
      setActiveProperty(properties[0].id);
    }
  };
  
  const takePhoto = async (propertyId) => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      const newPhoto = {
        id: Date.now(),
        uri: result.assets[0].uri
      };
      
      setProperties(prev => 
        prev.map(prop => 
          prop.id === propertyId 
            ? { ...prop, photos: [...prop.photos, newPhoto] } 
            : prop
        )
      );
    }
  };

  const pickFromGallery = async (propertyId) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled) {
      const newPhoto = {
        id: Date.now(),
        uri: result.assets[0].uri
      };
      
      setProperties(prev => 
        prev.map(prop => 
          prop.id === propertyId 
            ? { ...prop, photos: [...prop.photos, newPhoto] } 
            : prop
        )
      );
    }
  };
  
  const removePhoto = (propertyId, photoId) => {
    setProperties(prev => 
      prev.map(prop => 
        prop.id === propertyId 
          ? { ...prop, photos: prop.photos.filter(p => p.id !== photoId) } 
          : prop
      )
    );
  };
  
  const toggleCommunicationPref = (type) => {
    setCommunicationPrefs(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };
  
  const handleConfirmBooking = () => {
    const bookingData = {
      service,
      customerDetails: {
        name,
        email,
        phone,
        address: customerAddress,
        communicationPrefs
      },
      properties,
      bookingDetails
    };
    
    navigation.navigate('BookingConfirmation', {
      bookingData
    });
  };

  const currentProperty = properties.find(prop => prop.id === activeProperty);

  return (
    <ScrollView className="flex-1 bg-gray-50 p-5">
      <View className="mb-6">
        <Text className="text-green-800 font-bold text-2xl">Customer Details</Text>
        <Text className="text-gray-600 mt-2">Please fill in your information</Text>
      </View>

      {/* Personal Information */}
      <View className="mb-8">
        <Text className="text-green-700 font-bold text-lg mb-4">Personal Information</Text>
        
        <View className="space-y-4 mb-6">
          <View>
            <Text className="text-gray-700 mb-1 font-medium">Full Name</Text>
            <TextInput
              placeholder="John Doe"
              className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800"
              placeholderTextColor="#9CA3AF"
              value={name}
              onChangeText={setName}
            />
          </View>
          
          <View>
            <Text className="text-gray-700 mb-1 font-medium">Email Address</Text>
            <TextInput
              placeholder="your@email.com"
              className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          
          <View>
            <Text className="text-gray-700 mb-1 font-medium">Phone Number</Text>
            <TextInput
              placeholder="+1 (123) 456-7890"
              className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>
        </View>

        {/* Customer Address */}
        <Text className="text-green-700 font-bold text-lg mb-4">Your Address</Text>
        <View className="space-y-4 mb-6">
          <View>
            <Text className="text-gray-700 mb-1 font-medium">Street Address</Text>
            <TextInput
              placeholder="123 Main St"
              className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800"
              placeholderTextColor="#9CA3AF"
              value={customerAddress.street}
              onChangeText={(text) => handleCustomerAddressChange('street', text)}
            />
          </View>
          
          <View className="flex-row">
            <View className="flex-1 mr-2">
              <Text className="text-gray-700 mb-1 font-medium">City</Text>
              <TextInput
                placeholder="City"
                className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800"
                placeholderTextColor="#9CA3AF"
                value={customerAddress.city}
                onChangeText={(text) => handleCustomerAddressChange('city', text)}
              />
            </View>
            <View className="flex-1 ml-2">
              <Text className="text-gray-700 mb-1 font-medium">State</Text>
              <TextInput
                placeholder="State"
                className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800"
                placeholderTextColor="#9CA3AF"
                value={customerAddress.state}
                onChangeText={(text) => handleCustomerAddressChange('state', text)}
              />
            </View>
          </View>
          
          <View>
            <Text className="text-gray-700 mb-1 font-medium">ZIP Code</Text>
            <TextInput
              placeholder="12345"
              className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800"
              placeholderTextColor="#9CA3AF"
              keyboardType="number-pad"
              value={customerAddress.zip}
              onChangeText={(text) => handleCustomerAddressChange('zip', text)}
            />
          </View>
        </View>

        {/* Communication Preferences */}
        <Text className="text-green-700 font-bold text-lg mb-4">Communication Preferences</Text>
        <View className="flex-row items-center mb-2">
          <TouchableOpacity
            onPress={() => toggleCommunicationPref('email')}
            className="mr-3"
          >
            <View className="w-6 h-6 rounded-md border border-gray-400 items-center justify-center">
              {communicationPrefs.email && (
                <MaterialIcons name="check" size={20} color="#16A34A" />
              )}
            </View>
          </TouchableOpacity>
          <Text className="text-gray-700">Email</Text>
        </View>
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => toggleCommunicationPref('sms')}
            className="mr-3"
          >
            <View className="w-6 h-6 rounded-md border border-gray-400 items-center justify-center">
              {communicationPrefs.sms && (
                <MaterialIcons name="check" size={20} color="#16A34A" />
              )}
            </View>
          </TouchableOpacity>
          <Text className="text-gray-700">SMS/Text Message</Text>
        </View>
      </View>

      {/* Property Details */}
      <View className="mb-8">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-green-700 font-bold text-lg">Property Details</Text>
          <TouchableOpacity 
            onPress={addProperty}
            className="flex-row items-center bg-green-100 px-3 py-2 rounded-lg"
          >
            <Ionicons name="add" size={18} color="#16A34A" />
            <Text className="text-green-700 ml-1">Add Property</Text>
          </TouchableOpacity>
        </View>

        {/* Property Tabs */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          <View className="flex-row">
            {properties.map((property) => (
              <TouchableOpacity
                key={property.id}
                onPress={() => setActiveProperty(property.id)}
                className={`px-4 py-2 mr-2 rounded-lg ${activeProperty === property.id ? 'bg-green-600' : 'bg-gray-200'}`}
              >
                <Text className={`font-medium ${activeProperty === property.id ? 'text-white' : 'text-gray-700'}`}>
                  {property.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {/* Current Property Form */}
        {currentProperty && (
          <View className="bg-white rounded-xl p-5 shadow-sm">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-gray-500 font-medium">{currentProperty.name}</Text>
              {properties.length > 1 && (
                <TouchableOpacity 
                  onPress={() => removeProperty(currentProperty.id)}
                  className="p-1"
                >
                  <MaterialIcons name="delete" size={20} color="#EF4444" />
                </TouchableOpacity>
              )}
            </View>
            
            <View className="space-y-4">
              <Text className="text-gray-700 font-medium">Property Address</Text>
              
              <View>
                <Text className="text-gray-600 mb-1 text-sm">Street</Text>
                <TextInput
                  placeholder="123 Main St"
                  className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-800"
                  placeholderTextColor="#9CA3AF"
                  value={currentProperty.street}
                  onChangeText={(text) => handlePropertyChange(currentProperty.id, 'street', text)}
                />
              </View>
              
              <View className="flex-row">
                <View className="flex-1 mr-2">
                  <Text className="text-gray-600 mb-1 text-sm">City</Text>
                  <TextInput
                    placeholder="City"
                    className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-800"
                    placeholderTextColor="#9CA3AF"
                    value={currentProperty.city}
                    onChangeText={(text) => handlePropertyChange(currentProperty.id, 'city', text)}
                  />
                </View>
                <View className="flex-1 ml-2">
                  <Text className="text-gray-600 mb-1 text-sm">State</Text>
                  <TextInput
                    placeholder="State"
                    className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-800"
                    placeholderTextColor="#9CA3AF"
                    value={currentProperty.state}
                    onChangeText={(text) => handlePropertyChange(currentProperty.id, 'state', text)}
                  />
                </View>
              </View>
              
              <View>
                <Text className="text-gray-600 mb-1 text-sm">ZIP Code</Text>
                <TextInput
                  placeholder="12345"
                  className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-800"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="number-pad"
                  value={currentProperty.zip}
                  onChangeText={(text) => handlePropertyChange(currentProperty.id, 'zip', text)}
                />
              </View>
              
              <View>
                <Text className="text-gray-600 mb-1 text-sm">Property Size (sq ft)</Text>
                <TextInput
                  placeholder="e.g., 5000"
                  className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-800"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="number-pad"
                  value={currentProperty.size}
                  onChangeText={(text) => handlePropertyChange(currentProperty.id, 'size', text)}
                />
              </View>
              
              <View>
                <Text className="text-gray-700 font-medium mb-2">Areas Needing Service</Text>
                <View className="flex-row flex-wrap">
                  {Object.entries(currentProperty.areas).map(([area, selected]) => (
                    <TouchableOpacity
                      key={area}
                      onPress={() => handleAreaToggle(currentProperty.id, area)}
                      className={`flex-row items-center mr-4 mb-3 ${selected ? 'bg-green-100' : 'bg-gray-100'} px-3 py-2 rounded-lg`}
                    >
                      <View className={`w-5 h-5 rounded-sm border ${selected ? 'border-green-500 bg-green-500' : 'border-gray-400'} items-center justify-center mr-2`}>
                        {selected && <MaterialIcons name="check" size={16} color="white" />}
                      </View>
                      <Text className="text-gray-700 capitalize">{area}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              
              <View>
                <Text className="text-gray-700 font-medium mb-2">Property Photos</Text>
                <Text className="text-gray-500 text-sm mb-3">Upload photos to help us understand your needs</Text>
                
                <View className="flex-row mb-3">
                  <TouchableOpacity 
                    onPress={() => takePhoto(currentProperty.id)}
                    className="flex-row items-center bg-green-100 px-4 py-2 rounded-lg mr-3"
                  >
                    <MaterialCommunityIcons name="camera" size={18} color="#16A34A" />
                    <Text className="text-green-700 ml-2">Take Photo</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity 
                    onPress={() => pickFromGallery(currentProperty.id)}
                    className="flex-row items-center bg-gray-100 px-4 py-2 rounded-lg"
                  >
                    <MaterialIcons name="photo-library" size={18} color="#4B5563" />
                    <Text className="text-gray-700 ml-2">From Gallery</Text>
                  </TouchableOpacity>
                </View>
                
                {currentProperty.photos.length > 0 && (
                  <ScrollView horizontal className="py-2">
                    {currentProperty.photos.map(photo => (
                      <View key={photo.id} className="relative mr-3">
                        <Image
                          source={{ uri: photo.uri }}
                          className="w-24 h-24 rounded-lg"
                        />
                        <TouchableOpacity 
                          onPress={() => removePhoto(currentProperty.id, photo.id)}
                          className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                        >
                          <MaterialIcons name="close" size={14} color="white" />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </ScrollView>
                )}
              </View>
            </View>
          </View>
        )}
      </View>

      {/* Confirm Booking Button */}
      <TouchableOpacity 
        className="bg-green-600 rounded-lg py-4 px-6 flex-row justify-center items-center mb-8"
        onPress={handleConfirmBooking}
      >
        <Text className="text-white font-bold text-lg">Confirm Booking</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

function BookingConfirmationScreen({ navigation }) {
  return (
    <View className="flex-1 bg-gray-50 items-center justify-center p-8">
      <View className="bg-white rounded-2xl p-8 items-center shadow-sm shadow-green-100 w-full max-w-md">
        <View className="bg-green-100 rounded-full p-5 mb-6">
          <View className="bg-green-200 rounded-full p-4">
            <MaterialCommunityIcons name="check-circle" size={40} color="#16A34A" />
          </View>
        </View>
        
        <Text className="text-green-800 font-bold text-2xl text-center mb-3">Booking Confirmed!</Text>
        <Text className="text-gray-600 text-center mb-6">
          Your service has been successfully booked. Our team will contact you shortly to confirm the details.
        </Text>
        
        <TouchableOpacity 
          className="bg-green-600 rounded-lg py-3 px-6 w-full items-center"
          onPress={() => navigation.popToTop()}
        >
          <Text className="text-white font-bold text-lg">Back to Home</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function ContactScreen({ navigation }) {
  return (
    <ScrollView className="flex-1 bg-gray-50 p-5">
      <View className="mb-8">
        <TouchableOpacity 
          className="flex-row items-center mb-6 p-2 -ml-2"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={28} color="#16A34A" />
          <Text className="text-green-600 ml-1 text-lg font-medium">Back</Text>
        </TouchableOpacity>
        
        <View className="flex-row items-center">
          <Ionicons name="mail-outline" size={28} color="#166534" className="mr-3" />
          <Text className="text-green-900 font-bold text-3xl">Contact Us</Text>
        </View>
        <Text className="text-gray-600 mt-2 text-base">
          Have questions? Fill out the form below and we'll get back to you soon.
        </Text>
      </View>
      
      <View className="space-y-5 mb-6">
        <View>
          <Text className="text-gray-700 mb-2 font-medium">Your Name</Text>
          <TextInput
            placeholder="John Doe"
            className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800 mb-4"
            placeholderTextColor="#9CA3AF"
          />
        </View>
        
        <View>
          <Text className="text-gray-700 mb-2 font-medium">Email Address</Text>
          <TextInput
            placeholder="your@email.com"
            className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800 mb-4"
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
          />
        </View>
        
        <View>
          <Text className="text-gray-700 mb-2 font-medium">Phone Number</Text>
          <TextInput
            placeholder="+1 (123) 456-7890"
            className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800 mb-5"
            placeholderTextColor="#9CA3AF"
            keyboardType="phone-pad"
          />
        </View>
        
        <View>
          <Text className="text-gray-700 mb-2 font-medium">Tell us about your project</Text>
          <TextInput
            placeholder="Describe your needs or questions..."
            className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800 h-40 text-align-top"
            placeholderTextColor="#9CA3AF"
            multiline
          />
        </View>
      </View>
      
      <TouchableOpacity 
        className="bg-green-600 rounded-xl py-5 px-6 flex-row justify-center items-center shadow-lg shadow-green-200 active:bg-green-700"
        activeOpacity={0.8}
      >
        <Text className="text-white font-bold text-lg">Submit Request</Text>
        <Ionicons name="arrow-forward" size={22} color="white" className="ml-2" />
      </TouchableOpacity>
      <View className="h-9"></View>
    </ScrollView>
  );
}

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

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});