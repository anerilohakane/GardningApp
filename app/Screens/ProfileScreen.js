import React, { useState } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ProfileScreen = ({ navigation }) => {
  // User data state
  const [user] = useState({
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (559) 123-967',
    address: 'San Francisco, CA',
    rating: 4.8,
    status: 'Premium Gardener'
  });

  // Get initials from name
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Gardens data state
  const [gardens] = useState([
    {
      id: 1,
      name: 'Backyard Oasis',
      address: '122 Garden Lane, San Francisco',
      size: '2,500 sq ft',
      plants: 12,
      status: 'Active',
      rating: 5,
      condition: 'Well Maintained',
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    },
    {
      id: 2,
      name: 'Urban Garden',
      address: '455 Park Avenue, New York',
      size: '1,600 sq ft',
      plants: 8,
      status: 'Needs Care',
      rating: 4,
      condition: 'Needs Watering',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
    }
  ]);

  // Services data state
  const [services] = useState([
    {
      id: 1,
      name: 'Lawn Mowing',
      date: 'May 15, 2023 • 10:30 AM',
      status: 'Completed',
      rating: 5,
      price: '$120.00',
      icon: 'leaf'
    },
    {
      id: 2,
      name: 'Tree Trimming',
      date: 'May 10, 2023 • 2:00 PM',
      status: 'Scheduled',
      rating: 4,
      price: '$250.00',
      icon: 'tree'
    },
    {
      id: 3,
      name: 'Garden Maintenance',
      date: 'May 7, 2023 • 9:00 AM',
      status: 'Completed',
      rating: 4,
      price: '$180.00',
      icon: 'pagelines'
    }
  ]);

  // Settings menu items
  const settingsItems = [
    { label: 'Notification Settings', icon: 'bell', color: 'bg-purple-100', iconColor: 'text-purple-600', screen: 'NotificationSettings' },
    { label: 'Payment Methods', icon: 'credit-card', color: 'bg-blue-100', iconColor: 'text-blue-600', screen: 'PaymentMethods' },
    { label: 'Language Preferences', icon: 'language', color: 'bg-amber-100', iconColor: 'text-amber-600', screen: 'LanguageSettings' },
    { label: 'Help & Support', icon: 'question-circle', color: 'bg-green-100', iconColor: 'text-green-600', screen: 'HelpSupport' },
    { label: 'Terms of Service', icon: 'file-text', color: 'bg-gray-100', iconColor: 'text-gray-600', screen: 'TermsOfService' },
    { label: 'Privacy Policy', icon: 'lock', color: 'bg-green-100', iconColor: 'text-green-600', screen: 'PrivacyPolicy' },
    { label: 'Logout', icon: 'sign-out', color: 'bg-red-100', iconColor: 'text-red-600', screen: 'Logout' }
  ];

  // Render star ratings
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<Icon key={i} name="star" size={14} color="#f59e0b" className="mr-1" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<Icon key={i} name="star-half" size={14} color="#f59e0b" className="mr-1" />);
      } else {
        stars.push(<Icon key={i} name="star" size={14} color="#e5e7eb" className="mr-1" />);
      }
    }
    
    return stars;
  };

  const handleSettingsPress = (screen) => {
    if (screen === 'Logout') {
      Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
          {
            text: 'Cancel',
            style: 'cancel'
          },
          {
            text: 'Logout',
            style: 'destructive',
            onPress: () => {
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            }
          }
        ]
      );
    } else if (screen === 'PrivacyPolicy') {
      navigation.navigate('HomeTab', { screen: 'PrivacyPolicy' });
    } else if (screen === 'HelpSupport') {
      navigation.navigate('HomeTab', { screen: 'HelpSupport' });
    } else {
      navigation.navigate(screen);
    }
  };

  return (
    <ScrollView
      className="bg-green-50 p-4"
      showsVerticalScrollIndicator={false}
    >
      <View className="h-14"></View>

      {/* Profile Header - Shows only initials */}
      <View className="flex-row items-center mb-8 p-6 bg-white rounded-3xl shadow shadow-black/10">
        <View className="relative">
          <View className="w-28 h-28 rounded-full mr-4 border-4 border-green-100 bg-green-500 items-center justify-center">
            <Text className="text-white text-4xl font-bold">
              {getInitials(user.name)}
            </Text>
          </View>
        </View>
        <View className="flex-1">
          <Text className="text-2xl font-bold text-gray-800 mb-1">{user.name}</Text>
          <Text className="text-green-600 text-sm mb-3 font-medium">{user.status}</Text>

          <View className="flex-row gap-2">
            <View className="flex-row items-center bg-amber-100 px-3 py-1 rounded-full">
              <Icon name="star" size={14} color="#f59e0b" className="mr-1" />
              <Text className="text-gray-700 text-xs">{user.rating}</Text>
            </View>
            <View className="flex-row items-center bg-green-100 px-3 py-1 rounded-full">
              <Icon name="check" size={14} color="#10b981" className="mr-1" />
              <Text className="text-gray-700 text-xs">Verified</Text>
            </View>
            <View className="flex-row items-center bg-blue-100 px-3 py-1 rounded-full">
              <Icon name="leaf" size={14} color="#3b82f6" className="mr-1" />
              <Text className="text-gray-700 text-xs">Pro</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Contact Info Card - Non-editable */}
      <View className="bg-white rounded-3xl p-6 mb-6 shadow shadow-black/5 border border-green-100">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-bold text-gray-800">Contact Information</Text>
        </View>

        <View className="gap-4">
          <View className="flex-row items-center">
            <View className="bg-green-100 p-3 rounded-xl mr-3">
              <Icon name="envelope" size={18} color="#10b981" />
            </View>
            <View>
              <Text className="text-gray-500 text-xs">Email</Text>
              <Text className="text-gray-800 font-medium">{user.email}</Text>
            </View>
          </View>

          <View className="flex-row items-center">
            <View className="bg-green-100 p-3 rounded-xl mr-3">
              <Icon name="phone" size={18} color="#10b981" />
            </View>
            <View>
              <Text className="text-gray-500 text-xs">Phone</Text>
              <Text className="text-gray-800 font-medium">{user.phone}</Text>
            </View>
          </View>

          <View className="flex-row items-center">
            <View className="bg-green-100 p-3 rounded-xl mr-3">
              <Icon name="map-marker" size={18} color="#10b981" />
            </View>
            <View>
              <Text className="text-gray-500 text-xs">Address</Text>
              <Text className="text-gray-800 font-medium">{user.address}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* My Gardens Section */}
      <View className="mb-6">
        <View className="flex-row justify-between items-center mb-4 px-1">
          <Text className="text-xl font-bold text-gray-800">My Gardens</Text>
          <TouchableOpacity 
            className="bg-green-500 py-2 px-4 rounded-full flex-row items-center shadow shadow-black/20"
            onPress={() => navigation.navigate('AddGarden')}
          >
            <Icon name="plus" size={14} color="white" className="mr-2" />
            <Text className="text-white font-semibold">Add Garden</Text>
          </TouchableOpacity>
        </View>

        {/* Garden Cards */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
          {gardens.map(garden => (
            <TouchableOpacity 
              key={garden.id}
              className="bg-white rounded-xl mr-4 overflow-hidden w-72 border border-green-100"
              onPress={() => navigation.navigate('GardenDetail', { garden })}
            >
              <Image
                source={{ uri: garden.image }}
                className="w-full h-40"
              />
              <View className="p-4">
                <View className="flex-row justify-between items-start mb-2">
                  <Text className="text-lg font-bold text-gray-800">{garden.name}</Text>
                  <View className={`px-2 py-1 rounded-full ${
                    garden.status === 'Active' ? 'bg-green-100' : 'bg-amber-100'
                  }`}>
                    <Text className={`text-xs font-medium ${
                      garden.status === 'Active' ? 'text-green-700' : 'text-amber-700'
                    }`}>
                      {garden.status}
                    </Text>
                  </View>
                </View>
                <Text className="text-gray-500 text-sm mb-3">{garden.address}</Text>

                <View className="flex-row justify-between items-center mb-3">
                  <View className="flex-row items-center">
                    <Icon name="expand" size={14} color="#6b7280" className="mr-2" />
                    <Text className="text-gray-500 text-sm">{garden.size}</Text>
                  </View>
                  <View className="flex-row items-center">
                    <Icon name="leaf" size={14} color="#10b981" className="mr-2" />
                    <Text className="text-gray-500 text-sm">{garden.plants} Plants</Text>
                  </View>
                </View>

                <View className="flex-row justify-between items-center pt-3 border-t border-gray-100">
                  <View className="flex-row">
                    {renderStars(garden.rating)}
                  </View>
                  <Text className={`font-bold ${
                    garden.condition === 'Well Maintained' ? 'text-green-600' : 'text-amber-600'
                  }`}>
                    {garden.condition}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Recent Services Section */}
      <View className="bg-white rounded-3xl p-6 mb-6 shadow shadow-black/5 border border-green-100">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-bold text-gray-800">Recent Services</Text>
          <TouchableOpacity onPress={() => navigation.navigate('ServiceHistory')}>
            <Text className="text-green-500 font-medium">View All</Text>
          </TouchableOpacity>
        </View>

        {services.map(service => (
          <TouchableOpacity 
            key={service.id}
            className="bg-green-50 rounded-lg p-4 mb-3 border border-green-100"
            onPress={() => navigation.navigate('ServiceDetail', { service })}
          >
            <View className="flex-row justify-between items-center mb-2">
              <View className="flex-row items-center">
                <View className="bg-green-500 p-2 rounded-lg mr-3">
                  <Icon name={service.icon} size={16} color="white" />
                </View>
                <Text className="font-bold text-gray-800">{service.name}</Text>
              </View>
              <View className={`px-2 py-1 rounded-full ${
                service.status === 'Completed' ? 'bg-green-100' : 
                service.status === 'Scheduled' ? 'bg-purple-100' : 'bg-gray-100'
              }`}>
                <Text className={`text-xs font-medium ${
                  service.status === 'Completed' ? 'text-green-700' : 
                  service.status === 'Scheduled' ? 'text-purple-700' : 'text-gray-700'
                }`}>
                  {service.status}
                </Text>
              </View>
            </View>
            <Text className="text-gray-500 text-sm mb-3">{service.date}</Text>
            <View className="flex-row justify-between items-center">
              <View className="flex-row">
                {renderStars(service.rating)}
              </View>
              <Text className="text-green-500 font-bold">{service.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Settings Section */}
      <View className="bg-white rounded-3xl p-6 mb-8 shadow shadow-black/5 border border-green-100">
        <Text className="text-xl font-bold text-gray-800 mb-4">Settings</Text>

        {settingsItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            className="flex-row items-center py-4 border-b border-gray-100 active:opacity-70"
            activeOpacity={0.7}
            onPress={() => handleSettingsPress(item.screen)}
          >
            <View className={`w-12 h-12 rounded-xl items-center justify-center mr-4 ${
              item.color === 'bg-purple-100' ? 'bg-purple-100' :
              item.color === 'bg-blue-100' ? 'bg-blue-100' :
              item.color === 'bg-amber-100' ? 'bg-amber-100' :
              item.color === 'bg-green-100' ? 'bg-green-100' : 'bg-gray-100'
            }`}>
              <Icon name={item.icon} size={18} color={
                item.iconColor === 'text-purple-600' ? '#9333ea' :
                item.iconColor === 'text-blue-600' ? '#2563eb' :
                item.iconColor === 'text-amber-600' ? '#d97706' :
                item.iconColor === 'text-green-600' ? '#059669' : '#6b7280'
              } />
            </View>
            <Text className="flex-1 text-gray-700 font-medium">{item.label}</Text>
            <Icon name="angle-right" size={16} color="#9ca3af" />
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;














// import React, { useState, useEffect } from 'react';
// import { 
//   View, 
//   Text, 
//   ScrollView, 
//   TouchableOpacity, 
//   Image,
//   Alert,
//   ActivityIndicator
// } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import axios from 'axios';
// import { TENANT_CONFIG } from '../config/constants';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const ProfileScreen = ({ navigation }) => {
//   // State for user data, gardens, services, and loading
//   const [user, setUser] = useState({
//     name: '',
//     email: '',
//     phone: '',
//     address: '',
//     rating: 0,
//     status: ''
//   });
//   const [gardens, setGardens] = useState([]);
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // API base URL
//   const API_URL = 'https://your-api-domain.com/api/v1'; // Replace with your actual API URL

//   // Get user token from AsyncStorage
//   const getToken = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
//       return token;
//     } catch (error) {
//       console.error('Error getting token:', error);
//       return null;
//     }
//   };

//   // Fetch profile data from API
//    const fetchProfileData = async () => {
//     try {
//       setLoading(true);
//       const token = await getToken();
      
//       if (!token) {
//         navigation.reset({
//           index: 0,
//           routes: [{ name: 'Login' }],
//         });
//         return;
//       }

//       const config = {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//           'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
//           'X-Tenant-ID': TENANT_CONFIG.ID
//         }
//       };

//       const profileResponse = await axios.get("http://192.168.0.110:5000/api/v1/customers/me", config);
//       const profileData = profileResponse.data.data;
      
//       setUser({
//         name: profileData.user.name,
//         email: profileData.user.email,
//         phone: profileData.user.phone || '+1 (000) 000-0000',
//         address: profileData.user.address || 'Not specified',
//         rating: profileData.rating || 0,
//         status: profileData.status || 'Standard Customer'
//       });

//       const gardensResponse = await axios.get(`${API_URL}/gardens`, config);
//       setGardens(gardensResponse.data.data || []);

//       const servicesData = profileData.appointments?.map(appointment => ({
//         id: appointment._id,
//         name: appointment.serviceType || 'Garden Service',
//         date: new Date(appointment.date).toLocaleDateString('en-US', {
//           month: 'short',
//           day: 'numeric',
//           year: 'numeric',
//           hour: '2-digit',
//           minute: '2-digit'
//         }),
//         status: appointment.status || 'Scheduled',
//         rating: appointment.rating || 0,
//         price: `$${appointment.price?.toFixed(2) || '0.00'}`,
//         icon: getServiceIcon(appointment.serviceType)
//       }));
//       setServices(servicesData || []);

//       setLoading(false);
//     } catch (error) {
//       console.error('Error fetching profile data:', error);
//       setError(error.message);
//       setLoading(false);
      
//       if (error.response?.status === 401) {
//         await AsyncStorage.removeItem('token');
//         navigation.reset({
//           index: 0,
//           routes: [{ name: 'Login' }],
//         });
//       }
//     }
//   };

//   // Helper function to get icon based on service type
//   const getServiceIcon = (serviceType) => {
//     if (!serviceType) return 'leaf';
    
//     const service = serviceType.toLowerCase();
//     if (service.includes('lawn')) return 'leaf';
//     if (service.includes('tree')) return 'tree';
//     if (service.includes('garden')) return 'pagelines';
//     if (service.includes('plant')) return 'envira';
//     return 'leaf';
//   };

//   // Fetch data on component mount
//   useEffect(() => {
//     const unsubscribe = navigation.addListener('focus', () => {
//       fetchProfileData();
//     });

//     return unsubscribe;
//   }, [navigation]);

//   // Get initials from name
//   const getInitials = (name) => {
//     if (!name) return '';
//     return name.split(' ').map(n => n[0]).join('').toUpperCase();
//   };

//   // Settings menu items
//   const settingsItems = [
//     { label: 'Notification Settings', icon: 'bell', color: 'bg-purple-100', iconColor: 'text-purple-600', screen: 'NotificationSettings' },
//     { label: 'Payment Methods', icon: 'credit-card', color: 'bg-blue-100', iconColor: 'text-blue-600', screen: 'PaymentMethods' },
//     { label: 'Language Preferences', icon: 'language', color: 'bg-amber-100', iconColor: 'text-amber-600', screen: 'LanguageSettings' },
//     { label: 'Help & Support', icon: 'question-circle', color: 'bg-green-100', iconColor: 'text-green-600', screen: 'HelpSupport' },
//     { label: 'Terms of Service', icon: 'file-text', color: 'bg-gray-100', iconColor: 'text-gray-600', screen: 'TermsOfService' },
//     { label: 'Privacy Policy', icon: 'lock', color: 'bg-green-100', iconColor: 'text-green-600', screen: 'PrivacyPolicy' },
//     { label: 'Logout', icon: 'sign-out', color: 'bg-red-100', iconColor: 'text-red-600', screen: 'Logout' }
//   ];

//   // Render star ratings
//   const renderStars = (rating) => {
//     const stars = [];
//     const fullStars = Math.floor(rating);
//     const hasHalfStar = rating % 1 !== 0;
    
//     for (let i = 1; i <= 5; i++) {
//       if (i <= fullStars) {
//         stars.push(<Icon key={i} name="star" size={14} color="#f59e0b" className="mr-1" />);
//       } else if (i === fullStars + 1 && hasHalfStar) {
//         stars.push(<Icon key={i} name="star-half" size={14} color="#f59e0b" className="mr-1" />);
//       } else {
//         stars.push(<Icon key={i} name="star" size={14} color="#e5e7eb" className="mr-1" />);
//       }
//     }
    
//     return stars;
//   };

//   const handleSettingsPress = async (screen) => {
//     if (screen === 'Logout') {
//       Alert.alert(
//         'Logout',
//         'Are you sure you want to logout?',
//         [
//           {
//             text: 'Cancel',
//             style: 'cancel'
//           },
//           {
//             text: 'Logout',
//             style: 'destructive',
//             onPress: async () => {
//               await AsyncStorage.removeItem('userToken');
//               navigation.reset({
//                 index: 0,
//                 routes: [{ name: 'Login' }],
//               });
//             }
//           }
//         ]
//       );
//     } else if (screen === 'PrivacyPolicy') {
//       navigation.navigate('HomeTab', { screen: 'PrivacyPolicy' });
//     } else if (screen === 'HelpSupport') {
//       navigation.navigate('HomeTab', { screen: 'HelpSupport' });
//     } else {
//       navigation.navigate(screen);
//     }
//   };

//   if (loading) {
//     return (
//       <View className="flex-1 items-center justify-center bg-green-50">
//         <ActivityIndicator size="large" color="#10b981" />
//         <Text className="mt-4 text-gray-600">Loading your profile...</Text>
//       </View>
//     );
//   }

//   if (error) {
//     return (
//       <View className="flex-1 items-center justify-center bg-green-50 p-4">
//         <Icon name="exclamation-triangle" size={40} color="#ef4444" />
//         <Text className="text-lg text-gray-800 mt-4 text-center">Failed to load profile data</Text>
//         <Text className="text-gray-600 mt-2 text-center">{error}</Text>
//         <TouchableOpacity 
//           className="mt-6 bg-green-500 py-3 px-6 rounded-full"
//           onPress={fetchProfileData}
//         >
//           <Text className="text-white font-semibold">Try Again</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   }

//   return (
//     <ScrollView
//       className="bg-green-50 p-4"
//       showsVerticalScrollIndicator={false}
//     >
//       <View className="h-14"></View>

//       {/* Profile Header - Shows only initials */}
//       <View className="flex-row items-center mb-8 p-6 bg-white rounded-3xl shadow shadow-black/10">
//         <View className="relative">
//           <View className="w-28 h-28 rounded-full mr-4 border-4 border-green-100 bg-green-500 items-center justify-center">
//             <Text className="text-white text-4xl font-bold">
//               {getInitials(user.name)}
//             </Text>
//           </View>
//         </View>
//         <View className="flex-1">
//           <Text className="text-2xl font-bold text-gray-800 mb-1">{user.name}</Text>
//           <Text className="text-green-600 text-sm mb-3 font-medium">{user.status}</Text>

//           <View className="flex-row gap-2">
//             <View className="flex-row items-center bg-amber-100 px-3 py-1 rounded-full">
//               <Icon name="star" size={14} color="#f59e0b" className="mr-1" />
//               <Text className="text-gray-700 text-xs">{user.rating}</Text>
//             </View>
//             <View className="flex-row items-center bg-green-100 px-3 py-1 rounded-full">
//               <Icon name="check" size={14} color="#10b981" className="mr-1" />
//               <Text className="text-gray-700 text-xs">Verified</Text>
//             </View>
//             {user.status.toLowerCase().includes('premium') && (
//               <View className="flex-row items-center bg-blue-100 px-3 py-1 rounded-full">
//                 <Icon name="leaf" size={14} color="#3b82f6" className="mr-1" />
//                 <Text className="text-gray-700 text-xs">Pro</Text>
//               </View>
//             )}
//           </View>
//         </View>
//       </View>

//       {/* Contact Info Card - Non-editable */}
//       <View className="bg-white rounded-3xl p-6 mb-6 shadow shadow-black/5 border border-green-100">
//         <View className="flex-row justify-between items-center mb-4">
//           <Text className="text-xl font-bold text-gray-800">Contact Information</Text>
//         </View>

//         <View className="gap-4">
//           <View className="flex-row items-center">
//             <View className="bg-green-100 p-3 rounded-xl mr-3">
//               <Icon name="envelope" size={18} color="#10b981" />
//             </View>
//             <View>
//               <Text className="text-gray-500 text-xs">Email</Text>
//               <Text className="text-gray-800 font-medium">{user.email}</Text>
//             </View>
//           </View>

//           <View className="flex-row items-center">
//             <View className="bg-green-100 p-3 rounded-xl mr-3">
//               <Icon name="phone" size={18} color="#10b981" />
//             </View>
//             <View>
//               <Text className="text-gray-500 text-xs">Phone</Text>
//               <Text className="text-gray-800 font-medium">{user.phone}</Text>
//             </View>
//           </View>

//           <View className="flex-row items-center">
//             <View className="bg-green-100 p-3 rounded-xl mr-3">
//               <Icon name="map-marker" size={18} color="#10b981" />
//             </View>
//             <View>
//               <Text className="text-gray-500 text-xs">Address</Text>
//               <Text className="text-gray-800 font-medium">{user.address}</Text>
//             </View>
//           </View>
//         </View>
//       </View>

//       {/* My Gardens Section */}
//       <View className="mb-6">
//         <View className="flex-row justify-between items-center mb-4 px-1">
//           <Text className="text-xl font-bold text-gray-800">My Gardens</Text>
//           <TouchableOpacity 
//             className="bg-green-500 py-2 px-4 rounded-full flex-row items-center shadow shadow-black/20"
//             onPress={() => navigation.navigate('AddGarden')}
//           >
//             <Icon name="plus" size={14} color="white" className="mr-2" />
//             <Text className="text-white font-semibold">Add Garden</Text>
//           </TouchableOpacity>
//         </View>

//         {/* Garden Cards */}
//         {gardens.length > 0 ? (
//           <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mb-4">
//             {gardens.map(garden => (
//               <TouchableOpacity 
//                 key={garden._id || garden.id}
//                 className="bg-white rounded-xl mr-4 overflow-hidden w-72 border border-green-100"
//                 onPress={() => navigation.navigate('GardenDetail', { garden })}
//               >
//                 <Image
//                   source={{ uri: garden.image || 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80' }}
//                   className="w-full h-40"
//                 />
//                 <View className="p-4">
//                   <View className="flex-row justify-between items-start mb-2">
//                     <Text className="text-lg font-bold text-gray-800">{garden.name || 'My Garden'}</Text>
//                     <View className={`px-2 py-1 rounded-full ${
//                       garden.status === 'Active' ? 'bg-green-100' : 'bg-amber-100'
//                     }`}>
//                       <Text className={`text-xs font-medium ${
//                         garden.status === 'Active' ? 'text-green-700' : 'text-amber-700'
//                       }`}>
//                         {garden.status || 'Active'}
//                       </Text>
//                     </View>
//                   </View>
//                   <Text className="text-gray-500 text-sm mb-3">{garden.address || 'No address specified'}</Text>

//                   <View className="flex-row justify-between items-center mb-3">
//                     <View className="flex-row items-center">
//                       <Icon name="expand" size={14} color="#6b7280" className="mr-2" />
//                       <Text className="text-gray-500 text-sm">{garden.size || 'Size not specified'}</Text>
//                     </View>
//                     <View className="flex-row items-center">
//                       <Icon name="leaf" size={14} color="#10b981" className="mr-2" />
//                       <Text className="text-gray-500 text-sm">{garden.plants || 0} Plants</Text>
//                     </View>
//                   </View>

//                   <View className="flex-row justify-between items-center pt-3 border-t border-gray-100">
//                     <View className="flex-row">
//                       {renderStars(garden.rating || 0)}
//                     </View>
//                     <Text className={`font-bold ${
//                       garden.condition === 'Well Maintained' ? 'text-green-600' : 'text-amber-600'
//                     }`}>
//                       {garden.condition || 'Well Maintained'}
//                     </Text>
//                   </View>
//                 </View>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         ) : (
//           <View className="bg-white rounded-xl p-6 items-center border border-green-100">
//             <Icon name="leaf" size={40} color="#d1d5db" />
//             <Text className="text-gray-500 mt-4 text-center">You don't have any gardens yet</Text>
//             <TouchableOpacity 
//               className="mt-4 bg-green-500 py-2 px-4 rounded-full"
//               onPress={() => navigation.navigate('AddGarden')}
//             >
//               <Text className="text-white font-semibold">Add Your First Garden</Text>
//             </TouchableOpacity>
//           </View>
//         )}
//       </View>

//       {/* Recent Services Section */}
//       <View className="bg-white rounded-3xl p-6 mb-6 shadow shadow-black/5 border border-green-100">
//         <View className="flex-row justify-between items-center mb-4">
//           <Text className="text-xl font-bold text-gray-800">Recent Services</Text>
//           <TouchableOpacity onPress={() => navigation.navigate('ServiceHistory')}>
//             <Text className="text-green-500 font-medium">View All</Text>
//           </TouchableOpacity>
//         </View>

//         {services.length > 0 ? (
//           services.map(service => (
//             <TouchableOpacity 
//               key={service.id}
//               className="bg-green-50 rounded-lg p-4 mb-3 border border-green-100"
//               onPress={() => navigation.navigate('ServiceDetail', { service })}
//             >
//               <View className="flex-row justify-between items-center mb-2">
//                 <View className="flex-row items-center">
//                   <View className="bg-green-500 p-2 rounded-lg mr-3">
//                     <Icon name={service.icon} size={16} color="white" />
//                   </View>
//                   <Text className="font-bold text-gray-800">{service.name}</Text>
//                 </View>
//                 <View className={`px-2 py-1 rounded-full ${
//                   service.status === 'Completed' ? 'bg-green-100' : 
//                   service.status === 'Scheduled' ? 'bg-purple-100' : 'bg-gray-100'
//                 }`}>
//                   <Text className={`text-xs font-medium ${
//                     service.status === 'Completed' ? 'text-green-700' : 
//                     service.status === 'Scheduled' ? 'text-purple-700' : 'text-gray-700'
//                   }`}>
//                     {service.status}
//                   </Text>
//                 </View>
//               </View>
//               <Text className="text-gray-500 text-sm mb-3">{service.date}</Text>
//               <View className="flex-row justify-between items-center">
//                 <View className="flex-row">
//                   {renderStars(service.rating)}
//                 </View>
//                 <Text className="text-green-500 font-bold">{service.price}</Text>
//               </View>
//             </TouchableOpacity>
//           ))
//         ) : (
//           <View className="bg-green-50 rounded-lg p-6 items-center border border-green-100">
//             <Icon name="calendar" size={40} color="#d1d5db" />
//             <Text className="text-gray-500 mt-4 text-center">No recent services found</Text>
//           </View>
//         )}
//       </View>

//       {/* Settings Section */}
//       <View className="bg-white rounded-3xl p-6 mb-8 shadow shadow-black/5 border border-green-100">
//         <Text className="text-xl font-bold text-gray-800 mb-4">Settings</Text>

//         {settingsItems.map((item, index) => (
//           <TouchableOpacity
//             key={index}
//             className="flex-row items-center py-4 border-b border-gray-100 active:opacity-70"
//             activeOpacity={0.7}
//             onPress={() => handleSettingsPress(item.screen)}
//           >
//             <View className={`w-12 h-12 rounded-xl items-center justify-center mr-4 ${
//               item.color === 'bg-purple-100' ? 'bg-purple-100' :
//               item.color === 'bg-blue-100' ? 'bg-blue-100' :
//               item.color === 'bg-amber-100' ? 'bg-amber-100' :
//               item.color === 'bg-green-100' ? 'bg-green-100' : 'bg-gray-100'
//             }`}>
//               <Icon name={item.icon} size={18} color={
//                 item.iconColor === 'text-purple-600' ? '#9333ea' :
//                 item.iconColor === 'text-blue-600' ? '#2563eb' :
//                 item.iconColor === 'text-amber-600' ? '#d97706' :
//                 item.iconColor === 'text-green-600' ? '#059669' : '#6b7280'
//               } />
//             </View>
//             <Text className="flex-1 text-gray-700 font-medium">{item.label}</Text>
//             <Icon name="angle-right" size={16} color="#9ca3af" />
//           </TouchableOpacity>
//         ))}
//       </View>
//     </ScrollView>
//   );
// };

// export default ProfileScreen;