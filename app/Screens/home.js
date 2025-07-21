import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions, FlatList, Animated, Platform, Linking,ActivityIndicator } from 'react-native';
import { FontAwesome, MaterialIcons, Feather, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TENANT_CONFIG } from '../config/constants';


const { width, height } = Dimensions.get('window');

// Tenant information
const tenantInfo = {
  // name: "isaac-gomes-ernandes",
  // logo: "https://i.pinimg.com/736x/57/9a/e4/579ae4d3f89d19226bf16ce52779bd0c.jpg",
  slogan: "Premium Landscaping Services"
};

// Enhanced mock data
const defaultServicesData = [
  {
    id: '1',
    title: 'Premium Lawn Care',
    image: 'https://i.pinimg.com/736x/8d/f6/f1/8df6f12adc1bc5c0117aae821b2e9b3e.jpg',
    price: '$99',
    description: 'Complete lawn maintenance package with edging and trimming',
    rating: 4.8,
    reviews: 124,
    duration: '2 hours',
    category: 'Full Service'
  },
  {
    id: '2',
    title: 'Spring Cleanup',
    image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&q=80&w=800',
    price: '$149',
    description: 'Get your yard ready for spring with debris removal',
    rating: 4.9,
    reviews: 87,
    duration: '3 hours',
    category: 'Seasonal'
  },
  {
    id: '3',
    title: 'Aeration Service',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    price: '$79',
    description: 'Improve your lawn health with core aeration',
    rating: 4.7,
    reviews: 56,
    duration: '1.5 hours',
    category: 'Lawn Health'
  },
  {
    id: '4',
    title: 'Fertilization',
    image: 'https://i.pinimg.com/736x/39/aa/ee/39aaee1425200aee0ccfe8505dd9d096.jpg',
    price: '$59',
    description: 'Professional-grade nutrient boost for your lawn',
    rating: 4.6,
    reviews: 42,
    duration: '1 hour',
    category: 'Lawn Health'
  },
  {
    id: '5',
    title: 'Landscape Design',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800',
    price: '$299',
    description: 'Custom landscape design for your property',
    rating: 4.9,
    reviews: 63,
    duration: '4 hours',
    category: 'Premium'
  },
];

const servicesData = [
  {
    id: '1',
    title: 'Premium Lawn Care',
    image: 'https://i.pinimg.com/736x/8d/f6/f1/8df6f12adc1bc5c0117aae821b2e9b3e.jpg',
    price: '$99',
    description: 'Complete lawn maintenance package with edging and trimming',
    rating: 4.8,
    reviews: 124,
    duration: '2 hours',
    category: 'Full Service'
  },
  {
    id: '2',
    title: 'Spring Cleanup',
    image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&q=80&w=800',
    price: '$149',
    description: 'Get your yard ready for spring with debris removal',
    rating: 4.9,
    reviews: 87,
    duration: '3 hours',
    category: 'Seasonal'
  },
  {
    id: '3',
    title: 'Aeration Service',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    price: '$79',
    description: 'Improve your lawn health with core aeration',
    rating: 4.7,
    reviews: 56,
    duration: '1.5 hours',
    category: 'Lawn Health'
  },
  {
    id: '4',
    title: 'Fertilization',
    image: 'https://i.pinimg.com/736x/39/aa/ee/39aaee1425200aee0ccfe8505dd9d096.jpg',
    price: '$59',
    description: 'Professional-grade nutrient boost for your lawn',
    rating: 4.6,
    reviews: 42,
    duration: '1 hour',
    category: 'Lawn Health'
  },
  {
    id: '5',
    title: 'Landscape Design',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=800',
    price: '$299',
    description: 'Custom landscape design for your property',
    rating: 4.9,
    reviews: 63,
    duration: '4 hours',
    category: 'Premium'
  },
];

const reviewsData = [
  {
    id: '1',
    beforeImage: 'https://i.pinimg.com/736x/88/18/f9/8818f99219ab86330f91fbd303e0cdf5.jpg',
    afterImage: 'https://i.pinimg.com/736x/51/1e/02/511e02f928ef053cb7704d92bc6872ff.jpg',
    rating: 5,
    text: 'Amazing service! Our lawn looks fantastic. The team was punctual and professional. Will definitely use again!',
    date: '5 days ago',
    customer: 'John D.',
    location: 'Austin, TX',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    id: '2',
    beforeImage: 'https://i.pinimg.com/736x/62/b8/d9/62b8d9f8547158a040835120aa2dc7ae.jpg',
    afterImage: 'https://i.pinimg.com/736x/23/54/c9/2354c9d364a93a0364cd047e56b6d663.jpg',
    rating: 4,
    text: 'Great job on the spring cleanup. Very professional crew. They even cleaned up leaves I forgot to mention!',
    date: '2 weeks ago',
    customer: 'Sarah M.',
    location: 'Dallas, TX',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    id: '3',
    beforeImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=800',
    afterImage: 'https://i.pinimg.com/736x/90/b7/d4/90b7d4d28e92340764eec045a6e81bcd.jpg',
    rating: 5,
    text: 'The aeration service made a huge difference! My grass is greener and healthier than ever before.',
    date: '3 weeks ago',
    customer: 'Michael T.',
    location: 'Houston, TX',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
  },
];

const upcomingServices = [
  {
    id: '1',
    service: 'Lawn Mowing',
    address: '123 Garden Street, Austin, TX',
    date: 'Tomorrow',
    time: '9:00 AM',
    duration: '2 hours',
    team: 'Green Thumb Team',
    status: 'confirmed',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: '2',
    service: 'Fertilization',
    address: '123 Garden Street, Austin, TX',
    date: 'Next Monday',
    time: '11:00 AM',
    duration: '1 hour',
    team: 'Lawn Care Specialists',
    status: 'scheduled',
    image: 'https://i.pinimg.com/736x/39/aa/ee/39aaee1425200aee0ccfe8505dd9d096.jpg'
  }
];

const serviceCategories = [
  { id: 'all', name: 'All Services' },
  { id: 'landscaping design', name: 'Landscaping Design' },
  { id: 'seasonal', name: 'Seasonal' },
  { id: 'gardening', name: 'Gardening' },
  { id: 'lawn maintenance', name: 'Lawn Maintenance' },
  { id: 'tree service', name: 'Tree Service' },
  { id: 'irrigation', name: 'Irrigation' },
  { id: 'other', name: 'Other' },
];

const Header = ({ scrollY }) => {
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [Platform.OS === 'ios' ? 300 : 260, 100],
    extrapolate: 'clamp'
  });

  const titleSize = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [32, 22],
    extrapolate: 'clamp'
  });

  const titleMargin = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [16, 8],
    extrapolate: 'clamp'
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.7],
    extrapolate: 'clamp'
  });


 return (
    <Animated.View className="w-full overflow-hidden" style={{ height: headerHeight }}>
      <Animated.Image
        source={{ uri: 'https://images.unsplash.com/photo-1557429287-b2e26467fc2b?auto=format&fit=crop&q=80&w=1600' }}
        className="absolute w-full h-full"
        style={{ opacity: imageOpacity }}
      />
      <LinearGradient
        colors={['rgba(0,0,0,0.8)', 'transparent', 'rgba(0,0,0,0.6)']}
        className="absolute w-full h-full"
      />

      <View className="relative z-10 px-6 justify-end flex-1 pb-8">
        <Animated.Text 
          className="text-white text-base mb-1" 
          style={{ 
            textShadowColor: 'rgba(0,0,0,0.5)', 
            textShadowRadius: 2, 
            textShadowOffset: { width: 1, height: 1 } 
          }}
        >
          Welcome Back 👋
        </Animated.Text>
        <Animated.Text 
          className="text-white font-bold leading-9" 
          style={{ 
            fontSize: titleSize, 
            marginBottom: titleMargin,
            textShadowColor: 'rgba(0,0,0,0.5)',
            textShadowRadius: 2,
            textShadowOffset: { width: 1, height: 1 }
          }}
        >
          Transform Your Outdoor Space
        </Animated.Text>
        {/* <View className="flex-row items-center">
          <MaterialIcons name="location-on" size={16} color="#fff" />
          <Text className="text-white text-sm ml-1">Austin, TX • 78°F Sunny</Text>
        </View> */}
      </View>
    </Animated.View>
  );
};

const ServicesList = ({ services, loading, onBookNow }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => 
        service.category?.toLowerCase().includes(activeCategory.toLowerCase()) ||
        (service.category === 'Landscaping Design' && activeCategory === 'landscaping design') ||
        (service.category === 'Seasonal' && activeCategory === 'seasonal') ||
        (service.category === 'Gardening' && activeCategory === 'gardening') ||
        (service.category === 'Lawn Maintenance' && activeCategory === 'lawn maintenance') ||
         (service.category === 'Tree Service' && activeCategory === 'tree service') ||
          (service.category === 'Irrigation' && activeCategory === 'irrigation') ||
           (service.category === 'Other' && activeCategory === 'other')
      );

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Landscaping Design': return 'bg-blue-500';       // Blue
    case 'Seasonal': return 'bg-orange-500';              // Orange
    case 'Gardening': return 'bg-green-500';              // Green
    case 'Lawn Maintenance': return 'bg-emerald-500';     // Emerald
    case 'Tree Service': return 'bg-yellow-500';          // Yellow
    case 'Irrigation': return 'bg-indigo-500';            // Indigo
    case 'Other': return 'bg-pink-500';                   // Pink
    default: return 'bg-gray-500';                        // Default gray
    }
  };

  if (loading) {
    return (
      <View className="bg-white rounded-2xl mx-4 my-2 p-5 shadow-sm" style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.035,
        shadowRadius: 3,
        elevation: 3
      }}>
        <Text className="text-2xl font-extrabold text-gray-900 mb-6">Our Premium Services</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-2">
          {[1, 2, 3].map((_, index) => (
            <View key={index} className="w-64 bg-white rounded-2xl mr-4 p-4" style={styles.loadingCard}>
              <View className="w-full h-32 bg-gray-100 rounded-xl mb-4" />
              <View className="w-3/4 h-4 bg-gray-100 rounded mb-2" />
              <View className="w-1/2 h-3 bg-gray-100 rounded mb-4" />
              <View className="w-full h-8 bg-gray-100 rounded-lg" />
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }

  if (!services || services.length === 0) {
    return (
      <View className="bg-white rounded-2xl mx-4 my-2 p-5 shadow-sm" style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.035,
        shadowRadius: 3,
        elevation: 3
      }}>
        <Text className="text-2xl font-extrabold text-gray-900 mb-6">Our Premium Services</Text>
        <View className="bg-white rounded-2xl p-8 items-center justify-center">
          <MaterialIcons name="error-outline" size={40} color="#9CA3AF" />
          <Text className="text-gray-500 mt-4 text-center">No services available at the moment</Text>
        </View>
      </View>
    );
  }

  return (
    <View className="bg-white rounded-2xl mx-4 my-2 p-5 shadow-sm" style={{
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.035,
      shadowRadius: 3,
      elevation: 3
    }}>
      <View className="flex-row justify-between items-center mb-6">
        <View>
          <Text className="text-2xl font-extrabold text-gray-900">Our Premium Services</Text>
          <Text className="text-emerald-500 text-sm mt-1">Swipe to explore our services</Text>
        </View>
      </View>

      {/* Category Filter Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        className="mb-4 pl-2"
        contentContainerStyle={{ paddingRight: 20 }}
      >
        {serviceCategories.map(category => (
          <TouchableOpacity
            key={category.id}
            onPress={() => setActiveCategory(category.id)}
            className={`mr-2 px-3 py-1 rounded-full ${activeCategory === category.id ? 'bg-emerald-500' : 'bg-gray-100'}`}
          >
            <Text className={`text-sm ${activeCategory === category.id ? 'text-white font-medium' : 'text-gray-700'}`}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {filteredServices.length === 0 ? (
        <View className="bg-white rounded-2xl p-8 items-center justify-center">
          <MaterialCommunityIcons name="magnify-close" size={40} color="#9CA3AF" />
          <Text className="text-gray-500 mt-4 text-center">
            No services available for "{serviceCategories.find(c => c.id === activeCategory)?.name || 'this category'}"
          </Text>
          <TouchableOpacity
            onPress={() => setActiveCategory('all')}
            className="mt-4 bg-emerald-100 px-4 py-2 rounded-lg"
          >
            <Text className="text-emerald-800 font-medium">View All Services</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="pl-2"
          contentContainerStyle={{ paddingRight: 20 }}
        >
          {filteredServices.map((item) => (
            <View 
              key={item._id || item.id}
              className="w-64 bg-white rounded-2xl mr-4 overflow-hidden"
              style={styles.serviceCard}
            >
              <View className="relative">
                <Image
                  source={{ uri: (typeof item.image === 'string' ? item.image : item.image?.url) || 'https://via.placeholder.com/150' }}
                  className="w-full h-40"
                  style={{ resizeMode: 'cover' }}
                />
                <LinearGradient
                  colors={['rgba(0,0,0,0.7)', 'transparent']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 0, y: 1 }}
                  className="absolute w-full h-1/3 top-0"
                />
                <View className="absolute top-3 left-3 bg-white bg-opacity-90 rounded-full px-2 py-1 flex-row items-center">
                  <FontAwesome name="star" size={12} color="#F59E0B" />
                  <Text className="text-gray-800 text-xs font-bold ml-1">{item.rating || 4.5}</Text>
                </View>
                {item.category && (
                  <View className={`absolute bottom-3 left-3 ${getCategoryColor(item.category)} px-2 py-1 rounded-full`}>
                    <Text className="text-white text-xs font-medium">{item.category}</Text>
                  </View>
                )}
              </View>
              
              <View className="p-4">
                <Text className="font-bold text-gray-900 text-lg mb-1">{item.name || item.title}</Text>
                <Text className="text-gray-500 text-sm mb-3" numberOfLines={2}>{item.description}</Text>
                
                <View className="flex-row items-center mb-4">
                  <View className="flex-row items-center">
                    <MaterialCommunityIcons name="clock-outline" size={14} color="#6B7280" />
                    <Text className="text-gray-500 text-xs ml-1">{item.duration || '1 hour'}</Text>
                  </View>
                </View>
                
                <View className="flex-row-reverse">
                  <TouchableOpacity 
                    className="bg-emerald-500 px-4 py-2 rounded-lg flex-row items-center justify-center"
                    style={styles.greenButton}
                   onPress={() => onBookNow('BookService', item)}
                    activeOpacity={0.8}
                  >
                    <Text className="text-white text-sm font-semibold">Book Now</Text>
                    <MaterialIcons name="arrow-forward" size={16} color="white" style={{ marginLeft: 8 }} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const QuickActions = ({ onActionPress }) => {
  const actions = [
    {
      id: '1',
      icon: <MaterialIcons name="content-paste" size={24} color="#10B981" />,
      title: 'Request Estimate',
      screen: 'RequestEstimateScreen',
      color: 'bg-emerald-100'
    },
    {
      id: '2',
      icon: <MaterialIcons name="event" size={24} color="#3B82F6" />,
      title: 'Book Service',
      screen: 'Services',
      color: 'bg-blue-100'
    },
    {
      id: '3',
      icon: <MaterialIcons name="collections" size={24} color="#F59E0B" />,
      title: 'Gallery',
      screen: 'Gallery',
      color: 'bg-amber-100'
    },
  ];

  return (
    <View className="bg-white rounded-2xl mx-4 my-2 p-5 shadow-sm" style={{
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 6,
      elevation: 3
    }}>
      <Text className="text-xl font-bold text-gray-900 mb-5">Quick Actions</Text>
      <View className="flex-row flex-wrap justify-between">
        {actions.map((action) => (
          <TouchableOpacity
            key={action.id}
            className="w-[30%] items-center mb-5"
            onPress={() => onActionPress(action.screen)}
            activeOpacity={0.7}
          >
            <View className={`${action.color} w-14 h-14 rounded-xl justify-center items-center mb-2 shadow-sm`} style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.1,
              shadowRadius: 3
            }}>
              {action.icon}
            </View>
            <Text className="text-gray-700 text-xs text-center font-medium">{action.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

// const SeasonalServices = ({ onServicePress }) => {
//   const [activeCategory, setActiveCategory] = useState('all');
  
//   const filteredServices = activeCategory === 'all' 
//     ? servicesData 
//     : servicesData.filter(service => 
//         service.category.toLowerCase().includes(activeCategory.toLowerCase())
//       );

//   return (
//     <View className="bg-white rounded-2xl mx-4 my-2 p-5 shadow-sm" style={{
//       shadowColor: '#000',
//       shadowOffset: { width: 0, height: 2 },
//       shadowOpacity: 0.035,
//       shadowRadius: 3,
//       elevation: 3
//     }}>
//       <View className="flex-row justify-between items-center mb-4">
//         <Text className="text-xl font-bold text-gray-900">Popular Services</Text>
//         <TouchableOpacity 
//           onPress={() => onServicePress('Services')}
//           className="flex-row items-center"
//         >
//           <Text className="text-emerald-600 text-sm font-medium">View All</Text>
//           <MaterialIcons name="chevron-right" size={16} color="#059669" />
//         </TouchableOpacity>
//       </View>
      
//       <ScrollView 
//         horizontal 
//         showsHorizontalScrollIndicator={false}
//         className="mb-4"
//         contentContainerStyle={{ paddingRight: 20 }}
//       >
//         {serviceCategories.map(category => (
//           <TouchableOpacity
//             key={category.id}
//             onPress={() => setActiveCategory(category.id)}
//             className={`mr-2 px-3 py-1 rounded-full ${activeCategory === category.id ? 'bg-emerald-500' : 'bg-gray-100'}`}
//           >
//             <Text className={`text-sm ${activeCategory === category.id ? 'text-white font-medium' : 'text-gray-700'}`}>
//               {category.name}
//             </Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>
      
//       <FlatList
//         data={filteredServices}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         keyExtractor={(item) => item.id}
//         contentContainerStyle={{ paddingRight: 16 }}
//         renderItem={({ item }) => (
//           <View 
//             className="w-64 rounded-xl overflow-hidden mr-4 bg-white"
//             style={{
//               shadowColor: '#000',
//               shadowOffset: { width: 0, height: 1 },
//               shadowOpacity: 0.02,
//               shadowRadius: 2,
//               elevation: 0.5
//             }}
//           >
//             <Image
//               source={{ uri: item.image }}
//               className="w-full h-40"
//             />
//             <View className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm">
//               <FontAwesome name="star" size={16} color="#F59E0B" />
//             </View>
//             <View className="p-4">
//               <Text className="font-bold text-gray-900">{item.title}</Text>
//               <Text className="text-gray-500 text-xs mt-1">{item.description}</Text>
              
//               <View className="flex-row items-center mt-3">
//                 <View className="flex-row items-center">
//                   <FontAwesome name="star" size={14} color="#F59E0B" />
//                   <Text className="text-gray-700 text-xs ml-1">{item.rating}</Text>
//                   <Text className="text-gray-400 text-xs ml-1">({item.reviews})</Text>
//                 </View>
//                 <Text className="text-gray-400 text-xs mx-2">•</Text>
//                 <Text className="text-gray-400 text-xs">{item.duration}</Text>
//               </View>
              
//               <View className="flex-row justify-between items-center mt-4">
//                 <Text className="text-emerald-600 font-bold text-base">{item.price}</Text>
//               </View>
//             </View>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

const ReviewSection = ({ onReviewPress }) => {
  return (
    <View className="bg-white rounded-2xl mx-4 my-2 p-5" style={{
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.03,
      shadowRadius: 3,
      elevation: 2
    }}>
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold text-gray-900">Customer Stories</Text>
        {/* <TouchableOpacity 
          onPress={() => onReviewPress('Reviews')}
          className="flex-row items-center"
        >
          <Text className="text-emerald-600 text-sm font-medium">See All</Text>
          <MaterialIcons name="chevron-right" size={16} color="#059669" />
        </TouchableOpacity> */}
      </View>
      
      <FlatList
        data={reviewsData}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingRight: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity 
            className="w-80 rounded-xl overflow-hidden mr-4 bg-white"
            // onPress={() => onReviewPress('ReviewDetails', { review: item })}
            activeOpacity={0.9}
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.05,
              shadowRadius: 3
            }}
          >
            <View className="flex-row h-40">
              <View className="flex-1 relative">
                <Image
                  source={{ uri: item.beforeImage }}
                  className="w-full h-full"
                />
                <View className="absolute bottom-2 left-2 bg-black bg-opacity-50 px-2 py-1 rounded">
                  <Text className="text-white text-xs">Before</Text>
                </View>
              </View>
              <View className="w-1 bg-gradient-to-b from-emerald-400 to-emerald-600" />
              <View className="flex-1 relative">
                <Image
                  source={{ uri: item.afterImage }}
                  className="w-full h-full"
                />
                <View className="absolute bottom-2 right-2 bg-black bg-opacity-50 px-2 py-1 rounded">
                  <Text className="text-white text-xs">After</Text>
                </View>
              </View>
            </View>
            <View className="p-4">
              <View className="flex-row mb-2">
                {[...Array(5)].map((_, i) => (
                  <FontAwesome 
                    key={i} 
                    name="star" 
                    size={16} 
                    color={i < item.rating ? "#F59E0B" : "#D1D5DB"} 
                  />
                ))}
              </View>
              <Text className="text-gray-700 mb-3" numberOfLines={3} style={{ lineHeight: 18 }}>{item.text}</Text>
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center">
                  <Image
                    source={{ uri: item.avatar }}
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <View>
                    <Text className="font-medium text-gray-900">{item.customer}</Text>
                    <Text className="text-gray-400 text-xs">{item.location}</Text>
                  </View>
                </View>
                <Text className="text-gray-400 text-xs">{item.date}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const ContactCard = ({ onActionPress }) => {
  const handleContactAction = (action) => {
    if (action === 'call') {
      Linking.openURL('tel:+15125551234');
    } else if (action === 'chat') {
      onActionPress('SupportChat');
    } else if (action === 'email') {
      Linking.openURL('mailto:support@lawncare.com');
    } else {
      onActionPress(action);
    }
  };

  return (
    <View className="bg-white rounded-2xl mx-4 my-2 p-5 shadow-sm" style={{
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 6,
      elevation: 3
    }}>
      <Text className="text-xl font-bold text-gray-900 mb-5">Need Help?</Text>
      <View className="flex-row justify-between">
        <TouchableOpacity 
          className="items-center w-[30%]"
          onPress={() => handleContactAction('call')}
        >
          <View className="bg-blue-50 w-14 h-14 rounded-xl justify-center items-center mb-2 shadow-sm" style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 3
          }}>
            <MaterialIcons name="call" size={24} color="#3B82F6" />
          </View>
          <Text className="text-gray-700 text-xs text-center font-medium">Call Us</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="items-center w-[30%]"
          onPress={() => handleContactAction('chat')}
        >
          <View className="bg-emerald-50 w-14 h-14 rounded-xl justify-center items-center mb-2 shadow-sm" style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 3
          }}>
            <MaterialIcons name="chat" size={24} color="#10B981" />
          </View>
          <Text className="text-gray-700 text-xs text-center font-medium">Live Chat</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="items-center w-[30%]"
          onPress={() => handleContactAction('email')}
        >
          <View className="bg-purple-50 w-14 h-14 rounded-xl justify-center items-center mb-2 shadow-sm" style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 3
          }}>
            <MaterialIcons name="email" size={24} color="#8B5CF6" />
          </View>
          <Text className="text-gray-700 text-xs text-center font-medium">Email</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


const fetchTenantLogo = async () => {
  try {
    const response = await fetch(`${TENANT_CONFIG.API_BASE_URL}/logo`, {
      headers: {
        'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
        'X-Tenant-ID': TENANT_CONFIG.ID
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch tenant logo');
    }
    
    const data = await response.json();
    return data.data.url;
  } catch (error) {
    console.error('Error fetching tenant logo:', error);
    return "https://i.pinimg.com/736x/57/9a/e4/579ae4d3f89d19226bf16ce52779bd0c.jpg"; // Fallback logo
  }
};


const fetchServices = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${TENANT_CONFIG.API_BASE_URL}/services`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-Tenant-ID': TENANT_CONFIG.ID,
        'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching services:', error);
    return null; // Return null to indicate error
  }
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const [tenantData, setTenantData] = useState({
    logo: "https://i.pinimg.com/736x/57/9a/e4/579ae4d3f89d19226bf16ce52779bd0c.jpg",
    name: TENANT_CONFIG.SUBDOMAIN,
    slogan: tenantInfo.slogan
  });
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Load tenant logo
        const logoUrl = await fetchTenantLogo();
        setTenantData(prev => ({
          ...prev,
          logo: logoUrl || prev.logo,
          name: formatSubdomain(TENANT_CONFIG.SUBDOMAIN)
        }));

        // Load services
        setLoading(true);
        const servicesData = await fetchServices();
        setServices(servicesData || defaultServicesData);
      } catch (error) {
        console.error('Error loading data:', error);
        setServices(defaultServicesData);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const formatSubdomain = (subdomain) => {
    return subdomain
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
 const handleBookNow = (screen, item) => {
  if (screen === 'BookService') {
    // Normalize the service object
    const service = {
      id: item.id || item._id,
      name: item.name || item.title,
      image: item.image,
      price: item.price,
      description: item.description,
      rating: item.rating,
      reviews: item.reviews,
      duration: item.duration,
      category: item.category,
      // add any other fields you need
    };
    navigation.navigate('Services', {
      screen: 'BookService',
      params: { service }
    });
  } else {
    navigation.navigate(screen, item);
  }
};
  
  const handleActionPress = (screen, params) => {
    navigation.navigate(screen, params);
  };
  
  const handleReviewPress = (screen, params) => {
    navigation.navigate(screen, params);
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Fixed Tenant Header */}
      <View className="absolute top-0 left-0 right-0 z-50 pt-10 px-6 pb-3 bg-white shadow-sm" style={styles.fixedHeader}>
        <View className="flex-row items-center">
          <View className="bg-white p-1 rounded-full shadow-lg" style={styles.logoShadow}>
            <Image
              source={{ uri: tenantData.logo }}
              className="w-10 h-10 rounded-full border-2 border-white"
            />
          </View>
          <View className="ml-3">
            <Text className="text-gray-900 font-bold text-lg">{tenantData.name}</Text>
            <Text className="text-emerald-600 text-xs">{tenantData.slogan}</Text>
          </View>
        </View>
      </View>

      {/* Scrollable Content */}
      <Animated.ScrollView
        contentContainerStyle={{ 
          paddingTop: Platform.OS === 'ios' ? 90 : 80,
          paddingBottom: 120 
        }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        <Header scrollY={scrollY} />
        <ServicesList 
          services={services} 
          loading={loading}
          onBookNow={handleBookNow} 
        />
        <QuickActions onActionPress={handleActionPress} />
        {/* <SeasonalServices 
          services={services} 
          loading={loading}
          onServicePress={handleActionPress} 
        /> */}
        <ReviewSection onReviewPress={handleReviewPress} />
        <ContactCard onActionPress={handleActionPress} />
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  fixedHeader: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
    paddingTop: 40,  
    paddingBottom: 20,  
    height: 95  
  },
  logoShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3
  },
   loadingCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#f3f4f6'
  },
  serviceCard: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4
  },
  gradientButton: {
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3
  },
  greenButton: {
    backgroundColor: '#10B981',
    shadowColor: '#10B981',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    minWidth: 100,
  }
});

export default HomeScreen;