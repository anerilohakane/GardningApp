import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, Animated, Easing, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import DateTimePicker from '@react-native-community/datetimepicker';

const { width } = Dimensions.get('window');

const ServiceDetail = ({ route = {}, navigation = {} }) => {
  // Default service data
  const defaultService = {
    id: Date.now(),
    name: 'New Service',
    date: new Date(),
    status: 'Scheduled',
    rating: 3,
    price: '$0.00',
    icon: 'cog',
    notes: '',
    category: 'Maintenance'
  };

  const { service = defaultService, onUpdate = () => {} } = route.params || {};
  const [currentService, setCurrentService] = useState(service);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [scaleValue] = useState(new Animated.Value(1));

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true
      })
    ]).start();
  };

  const handleSave = () => {
    animateButton();
    setTimeout(() => {
      onUpdate(currentService);
      navigation.goBack?.();
    }, 200);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setCurrentService(prev => ({
        ...prev,
        date: selectedDate
      }));
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const newDate = new Date(currentService.date);
      newDate.setHours(selectedTime.getHours());
      newDate.setMinutes(selectedTime.getMinutes());
      setCurrentService(prev => ({
        ...prev,
        date: newDate
      }));
    }
  };

  const renderStars = () => {
    return Array(5).fill(0).map((_, i) => (
      <TouchableOpacity 
        key={i}
        onPress={() => setCurrentService({ ...currentService, rating: i + 1 })}
        className="mx-1"
        activeOpacity={0.7}
      >
        <Icon 
          name={i < currentService.rating ? "star" : "star-o"} 
          size={width > 400 ? 36 : 32} 
          color={i < currentService.rating ? "#f59e0b" : "#e5e7eb"} 
          style={{
            textShadowColor: i < currentService.rating ? 'rgba(245, 158, 11, 0.4)' : 'transparent',
            textShadowOffset: { width: 0, height: 0 },
            textShadowRadius: 10
          }}
        />
      </TouchableOpacity>
    ));
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const statusColors = {
    Scheduled: { bg: 'bg-purple-100', border: 'border-purple-300', text: 'text-purple-800', icon: 'calendar-check-o', activeBg: 'bg-purple-600' },
    Completed: { bg: 'bg-green-100', border: 'border-green-300', text: 'text-green-800', icon: 'check-circle', activeBg: 'bg-green-600' },
    Cancelled: { bg: 'bg-red-100', border: 'border-red-300', text: 'text-red-800', icon: 'times-circle', activeBg: 'bg-red-600' }
  };

  const categories = ['Maintenance', 'Repair', 'Inspection', 'Installation', 'Consultation'];

  return (
    <ScrollView className="bg-gray-50 p-4" contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Main Card */}
      <View className="bg-white rounded-2xl p-6 mb-6 shadow-sm shadow-black/5 border border-gray-100">
        
        {/* Service Header */}
        <View className="flex-row items-center mb-6">
          <View className="bg-blue-600 p-4 rounded-xl mr-4 shadow-sm shadow-blue-800/20">
            <Icon name={currentService.icon} size={28} color="white" />
          </View>
          <View className="flex-1">
            <TextInput
              className="text-2xl font-bold text-gray-900 mb-1"
              value={currentService.name}
              onChangeText={(text) => setCurrentService({ ...currentService, name: text })}
              placeholder="Service Name"
              placeholderTextColor="#9ca3af"
            />
            <Text className="text-sm text-gray-500">Service ID: {currentService.id}</Text>
          </View>
        </View>

        {/* Divider */}
        <View className="border-b border-gray-100 mb-6" />

        {/* Category Selection */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-3">Category</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false} 
            className="mb-3"
            contentContainerStyle={{ paddingRight: 20 }}
          >
            <View className="flex-row space-x-2">
              {categories.map((category) => (
                <TouchableOpacity
                  key={category}
                  className={`px-4 py-2 rounded-full border ${
                    currentService.category === category 
                      ? 'bg-blue-600 border-blue-700 shadow-sm shadow-blue-800/20' 
                      : 'bg-gray-100 border-gray-200'
                  }`}
                  onPress={() => setCurrentService({ ...currentService, category })}
                >
                  <Text className={`font-medium ${
                    currentService.category === category ? 'text-white' : 'text-gray-700'
                  }`}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Date & Time Picker */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-3">Schedule</Text>
          <View className={`${width > 400 ? 'flex-row space-x-3' : 'space-y-3'} mb-3`}>
            <TouchableOpacity
              className="flex-1 bg-gray-50 p-3 rounded-xl flex-row items-center justify-between border border-gray-200 active:bg-gray-100"
              onPress={() => setShowDatePicker(true)}
              activeOpacity={0.7}
            >
              <View className="flex-row items-center">
                <View className="bg-blue-100 p-2 rounded-lg mr-3">
                  <Icon name="calendar" size={16} color="#2563eb" />
                </View>
                <Text className="text-gray-800 font-medium">
                  {formatDate(currentService.date)}
                </Text>
              </View>
              <Icon name="chevron-down" size={14} color="#6b7280" />
            </TouchableOpacity>
            
            <TouchableOpacity
              className="flex-1 bg-gray-50 p-3 rounded-xl flex-row items-center justify-between border border-gray-200 active:bg-gray-100"
              onPress={() => setShowTimePicker(true)}
              activeOpacity={0.7}
            >
              <View className="flex-row items-center">
                <View className="bg-blue-100 p-2 rounded-lg mr-3">
                  <Icon name="clock-o" size={16} color="#2563eb" />
                </View>
                <Text className="text-gray-800 font-medium">
                  {formatTime(currentService.date)}
                </Text>
              </View>
              <Icon name="chevron-down" size={14} color="#6b7280" />
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <DateTimePicker
              value={currentService.date}
              mode="date"
              display="spinner"
              onChange={handleDateChange}
            />
          )}

          {showTimePicker && (
            <DateTimePicker
              value={currentService.date}
              mode="time"
              display="spinner"
              onChange={handleTimeChange}
            />
          )}
        </View>

        {/* Status Selection */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-3">Status</Text>
          <View className={`${width > 400 ? 'flex-row' : ''} border border-gray-200 rounded-xl overflow-hidden bg-gray-50 shadow-inner`}>
            {['Scheduled', 'Completed', 'Cancelled'].map((status) => (
              <TouchableOpacity
                key={status}
                className={`flex-1 py-3 items-center transition-colors ${
                  currentService.status === status 
                    ? `${statusColors[status].activeBg} ${statusColors[status].border} shadow-sm`
                    : 'bg-white border-gray-200'
                } ${width > 400 ? 'border-r last:border-r-0' : 'border-b last:border-b-0'}`}
                onPress={() => setCurrentService({ ...currentService, status })}
                activeOpacity={0.7}
              >
                <View className="flex-row items-center">
                  <Icon 
                    name={statusColors[status].icon}
                    size={16} 
                    color={currentService.status === status ? 'white' : statusColors[status].text.replace('text-', '#').replace('-', '')} 
                    className="mr-2"
                  />
                  <Text className={`font-medium ${
                    currentService.status === status ? 'text-white' : statusColors[status].text
                  }`}>
                    {status}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Rating */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-3">Rating</Text>
          <View className="bg-amber-50 p-4 rounded-xl border border-amber-100">
            <View className="flex-row justify-center mb-2">
              {renderStars()}
            </View>
            <View className="bg-white rounded-lg p-2 shadow-sm shadow-amber-200/30">
              <Text className="text-center text-amber-700 font-medium text-sm">
                {currentService.rating} out of 5 stars
              </Text>
            </View>
          </View>
        </View>

        {/* Price Input */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-900 mb-3">Price</Text>
          <View className="relative">
            <TextInput
              className="border border-gray-200 rounded-xl p-4 pl-12 text-lg font-medium bg-white shadow-sm focus:border-blue-500"
              value={currentService.price}
              onChangeText={(text) => setCurrentService({ ...currentService, price: text })}
              keyboardType="numeric"
              placeholder="0.00"
            />
            <View className="absolute left-3 top-4 bg-blue-100 p-2 rounded-lg">
              <Icon 
                name="dollar" 
                size={16} 
                color="#2563eb"
              />
            </View>
          </View>
        </View>

        {/* Notes */}
        <View className="mb-8">
          <Text className="text-lg font-semibold text-gray-900 mb-3">Notes</Text>
          <TextInput
            className="border border-gray-200 rounded-xl p-4 h-32 text-gray-800 bg-white shadow-sm focus:border-blue-500"
            value={currentService.notes}
            onChangeText={(text) => setCurrentService({ ...currentService, notes: text })}
            multiline
            placeholder="Add any additional notes..."
            placeholderTextColor="#9ca3af"
          />
        </View>

        {/* Action Buttons */}
        <View className={`${width > 400 ? 'flex-row space-x-4' : 'space-y-3'}`}>
          <TouchableOpacity 
            className={`${width > 400 ? 'flex-1' : ''} bg-gray-100 py-4 rounded-xl items-center border border-gray-200 active:bg-gray-200`}
            onPress={() => navigation.goBack?.()}
            activeOpacity={0.7}
          >
            <Text className="text-gray-800 font-medium text-lg">Cancel</Text>
          </TouchableOpacity>
          <Animated.View style={{ transform: [{ scale: scaleValue }], flex: width > 400 ? 1 : 'auto' }}>
            <TouchableOpacity 
              className="bg-blue-600 py-4 rounded-xl items-center shadow-sm shadow-blue-800/30 active:bg-blue-700"
              onPress={handleSave}
              activeOpacity={0.7}
            >
              <Text className="text-white font-medium text-lg">Save Changes</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ServiceDetail;