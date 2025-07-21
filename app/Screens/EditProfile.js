import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { TENANT_CONFIG } from '../config/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfileScreen = ({ navigation,route }) => {
    const { onProfileUpdated } = route.params || {};

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [token, setToken] = useState(null);
  const [formData, setFormData] = useState({
    user: {
      name: '',
      email: '',
      phone: ''
    },
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'USA'
    }
  });

  // Get token from AsyncStorage
  const getToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken !== null) {
        setToken(storedToken);
        return storedToken;
      }
      return null;
    } catch (error) {
      console.error('Error retrieving token:', error);
      return null;
    }
  };

  // Fetch profile data from backend
  const fetchProfileData = async () => {
    try {
      setLoading(true);
      const authToken = token || await getToken();
      
      if (!authToken) {
        throw new Error('Authentication token not found');
      }

      const response = await axios.get(`${TENANT_CONFIG.API_BASE_URL}/customers/me`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
          'X-Tenant-ID': TENANT_CONFIG.ID,
        }
      });
      
      const profileData = response.data.data;
      
      // Update form state with API data
      setFormData({
        user: {
          name: profileData.user?.name || '',
          email: profileData.user?.email || '',
          phone: profileData.user?.phone || ''
        },
        address: {
          street: profileData.address?.street || '',
          city: profileData.address?.city || '',
          state: profileData.address?.state || '',
          zipCode: profileData.address?.zipCode || '',
          country: profileData.address?.country || 'USA'
        }
      });
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching profile:', err);
      setLoading(false);
      Alert.alert('Error', 'Failed to load profile data');
    }
  };

  // Handle form input changes
  const handleChange = (field, value, nestedObject = null) => {
    if (nestedObject) {
      setFormData(prev => ({
        ...prev,
        [nestedObject]: {
          ...prev[nestedObject],
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  // Update profile data
 const handleSubmit = async () => {
  try {
    setUpdating(true);
    const authToken = token || await getToken();
    
    if (!authToken) {
      throw new Error('Authentication token not found');
    }

    // Prepare the data to send - make sure structure matches backend expectations
    const updateData = {
      user: {
        name: formData.user.name,
        email: formData.user.email,
        phone: formData.user.phone  // Now nested under user
      },
      address: formData.address
    };

    console.log('Sending update:', updateData);  // Debug log

    const response = await axios.put(
      `${TENANT_CONFIG.API_BASE_URL}/customers/me`,
      updateData,
      {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
          'X-Tenant-ID': TENANT_CONFIG.ID,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('Update response:', response.data);  // Debug log

    setUpdating(false);
    Alert.alert('Success', 'Profile updated successfully');
    if (onProfileUpdated) {
      onProfileUpdated(); // Call the callback to refresh profile
    }
    navigation.goBack();
  } catch (err) {
    console.error('Error updating profile:', err);
    console.error('Error details:', err.response?.data);  // More detailed error log
    setUpdating(false);
    Alert.alert(
      'Error',
      err.response?.data?.message || 'Failed to update profile'
    );
  }
};
  useEffect(() => {
    const initialize = async () => {
      await getToken();
      fetchProfileData();
    };
    initialize();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#10b981" />
      </View>
    );
  }

  return (
    <ScrollView className="bg-white p-4">
      <View className="mb-6">
        {/* <Text className="text-2xl font-bold text-gray-800 mb-6">Edit Profile</Text> */}
        
        {/* Personal Information */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-700 mb-3">Personal Information</Text>
          
          <View className="mb-3">
            <Text className="text-gray-600 mb-1">Full Name</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 bg-white"
              value={formData.user.name}
              onChangeText={(text) => handleChange('name', text, 'user')}
              placeholder="Enter your full name"
            />
          </View>
          
          <View className="mb-3">
            <Text className="text-gray-600 mb-1">Email</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 bg-gray-100"
              value={formData.user.email}
              editable={false}
              selectTextOnFocus={false}
              placeholder="Your email address"
            />
          </View>
          
          <View className="mb-3">
            <Text className="text-gray-600 mb-1">Phone Number</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 bg-white"
              value={formData.user.phone}
              onChangeText={(text) => handleChange('phone', text, 'user')}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />
          </View>
        </View>
        
        {/* Address Information */}
        <View className="mb-6">
          <Text className="text-lg font-semibold text-gray-700 mb-3">Address Information</Text>
          
          <View className="mb-3">
            <Text className="text-gray-600 mb-1">Street Address</Text>
            <TextInput
              className="border border-gray-300 rounded-lg p-3 bg-white"
              value={formData.address.street}
              onChangeText={(text) => handleChange('street', text, 'address')}
              placeholder="Enter street address"
            />
          </View>
          
          <View className="flex-row mb-3">
            <View className="flex-1 mr-2">
              <Text className="text-gray-600 mb-1">City</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3 bg-white"
                value={formData.address.city}
                onChangeText={(text) => handleChange('city', text, 'address')}
                placeholder="City"
              />
            </View>
            <View className="flex-1 ml-2">
              <Text className="text-gray-600 mb-1">State</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3 bg-white"
                value={formData.address.state}
                onChangeText={(text) => handleChange('state', text, 'address')}
                placeholder="State"
              />
            </View>
          </View>
          
          <View className="flex-row mb-3">
            <View className="flex-1 mr-2">
              <Text className="text-gray-600 mb-1">ZIP Code</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3 bg-white"
                value={formData.address.zipCode}
                onChangeText={(text) => handleChange('zipCode', text, 'address')}
                placeholder="ZIP code"
                keyboardType="numeric"
              />
            </View>
            <View className="flex-1 ml-2">
              <Text className="text-gray-600 mb-1">Country</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3 bg-white"
                value={formData.address.country}
                onChangeText={(text) => handleChange('country', text, 'address')}
                placeholder="Country"
              />
            </View>
          </View>
        </View>
        
        {/* Save Button */}
        <TouchableOpacity
          className="bg-green-500 py-4 rounded-lg items-center justify-center"
          onPress={handleSubmit}
          disabled={updating}
        >
          {updating ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-white font-bold text-lg">Save Changes</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default EditProfileScreen;