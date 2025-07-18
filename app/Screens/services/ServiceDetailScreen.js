// src/screens/services/ServiceDetailScreen.js
import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const ServiceDetailScreen = ({ route, navigation }) => {
  const { service } = route.params;
  
  // Add this handler function
  const handleBookService = () => {
    console.log('Booking service:', {
      id: service._id || service.id,
      name: service.name
    });
    
    if (!service._id && !service.id) {
      Alert.alert('Error', 'Service information is incomplete');
      return;
    }

    navigation.navigate('BookService', { 
      service: {
        ...service,
         _id: service._id || service.id,  // Map id to _id if needed
      id: service._id || service.id    // And id exists for compatibility
      }
    });
  };
  
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
        onPress={handleBookService}  // Now using the handler function
      >
        <Text className="text-white font-bold text-lg">Book This Service</Text>
      </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ServiceDetailScreen;