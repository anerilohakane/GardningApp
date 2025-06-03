import React, { useState, useRef } from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, Dimensions, Animated, StyleSheet } from 'react-native';
import { FontAwesome, MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { format } from 'date-fns';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

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
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [attachments, setAttachments] = useState([]);
  const [gardenNotes, setGardenNotes] = useState('');
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

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAttachments([...attachments, {
        uri: result.assets[0].uri,
        type: 'image/jpeg',
        name: `garden_photo_${attachments.length + 1}.jpg`
      }]);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAttachments([...attachments, {
        uri: result.assets[0].uri,
        type: 'image/jpeg',
        name: `garden_photo_${attachments.length + 1}.jpg`
      }]);
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/msword', 
              'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
      });
      
      if (!result.canceled) {
        setAttachments([...attachments, {
          uri: result.assets[0].uri,
          type: result.assets[0].mimeType,
          name: result.assets[0].name
        }]);
      }
    } catch (err) {
      console.log('Error picking document:', err);
    }
  };

  const removeAttachment = (index) => {
    const newAttachments = [...attachments];
    newAttachments.splice(index, 1);
    setAttachments(newAttachments);
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

          {/* Location Input */}
          <View className="flex-row items-start py-3">
            <View className="bg-green-100 p-2 rounded-full mr-3 mt-1">
              <MaterialIcons name="location-on" size={20} color="#16A34A" />
            </View>
            <TextInput
              placeholder="Service Address"
              placeholderTextColor="#9CA3AF"
              value={address}
              onChangeText={setAddress}
              className="flex-1 text-gray-700 text-base"
              multiline
              style={{ 
                minHeight: 24,
                textAlignVertical: 'top'
              }}
            />
          </View>
        </View>
      </View>

      {/* Customer Info */}
      <View className="mb-8">
        <Text className="text-green-800 font-bold text-2xl mb-5">Your Information</Text>
        
        <View className="bg-white rounded-2xl p-5 shadow-lg shadow-green-200/80 border border-green-50">
          <View className="flex-row items-center mb-4 py-2 border-b border-gray-100">
            <View className="bg-green-100 p-2 rounded-full mr-3">
              <MaterialIcons name="person" size={20} color="#16A34A" />
            </View>
            <TextInput
              placeholder="Full Name"
              placeholderTextColor="#9CA3AF"
              value={name}
              onChangeText={setName}
              className="flex-1 text-gray-700 text-base"
            />
          </View>
        </View>
      </View>

      {/* Garden Photos Section */}
      <View className="mb-8">
        <Text className="text-green-800 font-bold text-2xl mb-5">Share Your Garden Details</Text>
        
        <View className="bg-white rounded-2xl p-5 shadow-lg shadow-green-200/80 border border-green-50">
          <Text className="text-gray-700 font-medium mb-3">Upload Garden Photos</Text>
          <Text className="text-gray-500 text-sm mb-4">
            Help us understand your space better by uploading photos of your garden/yard.
          </Text>

          {/* Photo Upload Buttons */}
          <View className="flex-row justify-between mb-4">
            {/* Take Photo Button */}
            <TouchableOpacity 
              className="flex-1 mr-2 border-2 border-dashed border-green-400 rounded-xl p-4 items-center justify-center bg-green-50"
              activeOpacity={0.7}
              onPress={takePhoto}
            >
              <MaterialCommunityIcons name="camera" size={28} color="#16A34A" />
              <Text className="text-green-700 font-medium mt-2 text-center text-sm">
                Take Photo
              </Text>
            </TouchableOpacity>
            
            {/* Choose from Gallery */}
            <TouchableOpacity 
              className="flex-1 ml-2 border-2 border-dashed border-green-400 rounded-xl p-4 items-center justify-center bg-green-50"
              activeOpacity={0.7}
              onPress={pickImage}
            >
              <MaterialIcons name="photo-library" size={28} color="#16A34A" />
              <Text className="text-green-700 font-medium mt-2 text-center text-sm">
                Choose Photo
              </Text>
            </TouchableOpacity>
          </View>

          {/* File Upload Button */}
          <TouchableOpacity 
            className="border-2 border-dashed border-green-400 rounded-xl p-4 items-center justify-center bg-green-50 mb-4"
            activeOpacity={0.7}
            onPress={pickDocument}
          >
            <MaterialIcons name="attach-file" size={28} color="#16A34A" />
            <Text className="text-green-700 font-medium mt-2 text-center">
              Upload Documents (PDF, DOC)
            </Text>
            <Text className="text-gray-500 text-xs mt-1">
              Site plans, sketches, or reference materials
            </Text>
          </TouchableOpacity>

          {/* Preview of Selected Files */}
          {attachments.length > 0 && (
            <View className="mt-2">
              <Text className="text-gray-600 mb-2">Attachments ({attachments.length}):</Text>
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                className="pb-2"
              >
                {attachments.map((file, index) => (
                  <View key={index} className="mr-3 relative">
                    {file.type?.startsWith('image/') ? (
                      <Image 
                        source={{ uri: file.uri }} 
                        className="w-24 h-24 rounded-lg"
                      />
                    ) : (
                      <View className="w-24 h-24 bg-gray-100 rounded-lg items-center justify-center border border-gray-200">
                        <MaterialIcons name="insert-drive-file" size={32} color="#6B7280" />
                        <Text className="text-xs text-gray-500 mt-1 px-1 text-center" numberOfLines={1}>
                          {file.name.length > 10 ? `${file.name.substring(0, 7)}...${file.name.split('.').pop()}` : file.name}
                        </Text>
                      </View>
                    )}
                    <TouchableOpacity 
                      className="absolute -top-2 -right-2 bg-red-500 rounded-full w-6 h-6 items-center justify-center"
                      onPress={() => removeAttachment(index)}
                    >
                      <Ionicons name="close" size={16} color="white" />
                    </TouchableOpacity>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Notes Field */}
          <View className="mt-4">
            <Text className="text-gray-700 mb-2">Additional Notes</Text>
            <TextInput
              placeholder="Any special instructions or details about your garden..."
              placeholderTextColor="#9CA3AF"
              value={gardenNotes}
              onChangeText={setGardenNotes}
              className="bg-gray-50 p-4 rounded-xl border border-gray-200 text-gray-700 h-32 text-align-top"
              multiline
            />
          </View>
        </View>
      </View>

      {/* Confirm Booking Button */}
      <TouchableOpacity 
        className="bg-green-600 rounded-lg py-4 px-6 flex-row justify-center items-center mb-8"
        onPress={() => navigation.navigate('BookingConfirmation')}
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