// // src/screens/common/ContactScreen.js
// import React from 'react';
// import { View, Text, ScrollView, TextInput, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// const ContactScreen = ({ navigation }) => {
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
// };

// export default ContactScreen;



// src/screens/common/ContactScreen.js
import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { TENANT_CONFIG } from '../../config/constants';

const ContactScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.firstName || !formData.email || !formData.message) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${TENANT_CONFIG.API_BASE_URL}/api/contact`,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message
        },
        {
          headers: {
            'X-Tenant-ID': TENANT_CONFIG.ID,
            'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN
          }
        }
      );

      if (response.data.message === 'Email sent successfully!') {
        Alert.alert('Success', 'Your message has been sent successfully!');
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      Alert.alert(
        'Error',
        error.response?.data?.error || 'Failed to send message. Please try again later.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Split name input into first and last name
  const handleNameChange = (text) => {
    const names = text.split(' ');
    setFormData(prev => ({
      ...prev,
      firstName: names[0] || '',
      lastName: names.slice(1).join(' ') || ''
    }));
  };

  const fullName = `${formData.firstName} ${formData.lastName}`.trim();

  return (
    <ScrollView className="flex-1 bg-gray-50 p-5">
      <View className="mb-8">
        {/* <TouchableOpacity 
          className="flex-row items-center mb-6 p-2 -ml-2"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={28} color="#16A34A" />
          <Text className="text-green-600 ml-1 text-lg font-medium">Back</Text>
        </TouchableOpacity> */}
        
        {/* <View className="flex-row items-center">
          <Ionicons name="mail-outline" size={28} color="#166534" className="mr-3" />
          <Text className="text-green-900 font-bold text-3xl">Contact Us</Text>
        </View> */}
        <Text className="text-gray-600 mt-2 text-base">
          Have questions? Fill out the form below and we'll get back to you soon.
        </Text>
      </View>
      
      <View className="space-y-5 mb-6">
        <View>
          <Text className="text-gray-700 mb-2 font-medium">Your Name*</Text>
          <TextInput
            placeholder="John Doe"
            value={fullName}
            onChangeText={handleNameChange}
            className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800 mb-4"
            placeholderTextColor="#9CA3AF"
          />
        </View>
        
        <View>
          <Text className="text-gray-700 mb-2 font-medium">Email Address*</Text>
          <TextInput
            placeholder="your@email.com"
            value={formData.email}
            onChangeText={(text) => handleChange('email', text)}
            className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800 mb-4"
            placeholderTextColor="#9CA3AF"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        
        <View>
          <Text className="text-gray-700 mb-2 font-medium">Phone Number</Text>
          <TextInput
            placeholder="+1 (123) 456-7890"
            value={formData.phone}
            onChangeText={(text) => handleChange('phone', text)}
            className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800 mb-5"
            placeholderTextColor="#9CA3AF"
            keyboardType="phone-pad"
          />
        </View>
        
        <View>
          <Text className="text-gray-700 mb-2 font-medium">Service Interested In</Text>
          <TextInput
            placeholder="Lawn care, landscaping, etc."
            value={formData.service}
            onChangeText={(text) => handleChange('service', text)}
            className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800 mb-4"
            placeholderTextColor="#9CA3AF"
          />
        </View>
        
        <View>
          <Text className="text-gray-700 mb-2 font-medium">Your Message*</Text>
          <TextInput
            placeholder="Describe your needs or questions..."
            value={formData.message}
            onChangeText={(text) => handleChange('message', text)}
            className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800 h-40 text-align-top"
            placeholderTextColor="#9CA3AF"
            multiline
          />
        </View>
      </View>
      
      <TouchableOpacity 
        className={`rounded-xl py-5 px-6 flex-row justify-center items-center shadow-lg ${isSubmitting ? 'bg-green-400' : 'bg-green-600'} shadow-green-200 active:bg-green-700`}
        activeOpacity={0.8}
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        <Text className="text-white font-bold text-lg">
          {isSubmitting ? 'Sending...' : 'Submit Request'}
        </Text>
        {!isSubmitting && (
          <Ionicons name="arrow-forward" size={22} color="white" className="ml-2" />
        )}
      </TouchableOpacity>
      <View className="h-9"></View>
    </ScrollView>
  );
};

export default ContactScreen;