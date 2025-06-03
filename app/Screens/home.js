import React, { useState, useRef } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Dimensions, FlatList, Animated, Platform, Linking } from 'react-native';
import { FontAwesome, MaterialIcons, Feather, MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

// Enhanced mock data
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
  { id: 'full', name: 'Full Service' },
  { id: 'seasonal', name: 'Seasonal' },
  { id: 'health', name: 'Lawn Health' },
  { id: 'premium', name: 'Premium' },
];

const Header = ({ scrollY }) => {
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [Platform.OS === 'ios' ? 360 : 320, 100],
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

  const opacity = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [1, 0],
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
          style={{ opacity, textShadowColor: 'rgba(0,0,0,0.5)', textShadowRadius: 2, textShadowOffset: { width: 1, height: 1 } }}
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
        <Animated.View 
          className="flex-row items-center" 
          style={{ opacity }}
        >
          <MaterialIcons name="location-on" size={16} color="#fff" />
          <Text className="text-white text-sm ml-1">Austin, TX • 78°F Sunny</Text>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

const NextService = ({ services, onPress }) => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [expandedService, setExpandedService] = useState(null);
  
  const toggleExpand = (id) => {
    setExpandedService(expandedService === id ? null : id);
  };

  const handleServiceAction = (action, serviceId) => {
    if (action === 'details') {
      const service = services.find(s => s.id === serviceId);
      onPress('ServiceDetails', { service });
    } else if (action === 'reschedule') {
      const service = services.find(s => s.id === serviceId);
      onPress('Reschedule', { service });
    } else {
      onPress(action);
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
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold text-gray-900">My Services</Text>
        <TouchableOpacity 
          onPress={() => handleServiceAction('all-services')}
          className="flex-row items-center"
        >
          <Text className="text-emerald-600 text-sm font-medium">See All</Text>
          <MaterialIcons name="chevron-right" size={16} color="#059669" />
        </TouchableOpacity>
      </View>
      
      <View className="flex-row border-b border-gray-100 mb-4">
        <TouchableOpacity 
          className={`pb-3 px-4 ${activeTab === 'upcoming' ? 'border-b-2 border-emerald-500' : ''}`}
          onPress={() => setActiveTab('upcoming')}
        >
          <Text className={`font-medium ${activeTab === 'upcoming' ? 'text-emerald-600 font-semibold' : 'text-gray-500'}`}>
            Upcoming
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          className={`pb-3 px-4 ${activeTab === 'history' ? 'border-b-2 border-emerald-500' : ''}`}
          onPress={() => setActiveTab('history')}
        >
          <Text className={`font-medium ${activeTab === 'history' ? 'text-emerald-600 font-semibold' : 'text-gray-500'}`}>
            History
          </Text>
        </TouchableOpacity>
      </View>
      
      {activeTab === 'upcoming' ? (
        <View>
          {upcomingServices.map((service) => (
            <View 
              key={service.id}
              className="bg-gray-50 rounded-xl p-3 mb-3 overflow-hidden"
            >
              <TouchableOpacity 
                className="flex-row items-center"
                onPress={() => toggleExpand(service.id)}
              >
                <Image
                  source={{ uri: service.image }}
                  className="w-12 h-12 rounded-lg"
                />
                <View className="flex-1 ml-3">
                  <View className="flex-row justify-between items-center">
                    <Text className="font-semibold text-gray-900">{service.service}</Text>
                    <View className={`px-2 py-1 rounded-full ${service.status === 'confirmed' ? 'bg-emerald-100' : 'bg-blue-100'}`}>
                      <Text className={`text-xs font-medium ${service.status === 'confirmed' ? 'text-emerald-800' : 'text-blue-800'}`}>
                        {service.status === 'confirmed' ? 'Confirmed' : 'Scheduled'}
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row items-center mt-1">
                    <Feather name="clock" size={14} color="#6B7280" />
                    <Text className="text-gray-500 text-xs ml-1">{service.date} • {service.time}</Text>
                  </View>
                </View>
                <MaterialIcons 
                  name={expandedService === service.id ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
                  size={18} 
                  color="#6B7280" 
                />
              </TouchableOpacity>
              
              {expandedService === service.id && (
                <View className="mt-3 pt-3 border-t border-gray-100">
                  <View className="flex-row items-center mb-2">
                    <MaterialIcons name="location-on" size={14} color="#6B7280" />
                    <Text className="text-gray-700 text-xs ml-1">{service.address}</Text>
                  </View>
                  <View className="flex-row items-center mb-2">
                    <Feather name="clock" size={14} color="#6B7280" />
                    <Text className="text-gray-700 text-xs ml-1">{service.duration} service</Text>
                  </View>
                  <View className="flex-row items-center">
                    <View className="w-4 h-4 rounded-full bg-emerald-500 justify-center items-center mr-1">
                      <Text className="text-white text-xs" style={{ fontSize: 8 }}>T</Text>
                    </View>
                    <Text className="text-gray-700 text-xs ml-1">Assigned to {service.team}</Text>
                  </View>
                  
                  <View className="flex-row mt-4">
                    <TouchableOpacity 
                      className="flex-1 bg-white border border-emerald-500 rounded-lg py-2 items-center mr-2"
                      onPress={() => handleServiceAction('reschedule', service.id)}
                    >
                      <Text className="text-emerald-600 text-sm font-medium">Reschedule</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      className="flex-1 bg-emerald-500 rounded-lg py-2 items-center"
                      onPress={() => handleServiceAction('details', service.id)}
                    >
                      <Text className="text-white text-sm font-medium">Details</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>
      ) : (
        <View className="items-center justify-center py-8">
          <Image 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4076/4076478.png' }} 
            className="w-24 h-24 opacity-30 mb-4"
          />
          <Text className="text-gray-400 font-medium">No past services yet</Text>
          <Text className="text-gray-300 text-sm mt-1">Your completed services will appear here</Text>
        </View>
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
      screen: 'Estimate',
      color: 'bg-emerald-100'
    },
    {
      id: '2',
      icon: <MaterialIcons name="event" size={24} color="#3B82F6" />,
      title: 'Book Service',
      screen: 'Booking',
      color: 'bg-blue-100'
    },
    {
      id: '3',
      icon: <MaterialIcons name="collections" size={24} color="#F59E0B" />,
      title: 'Gallery',
      screen: 'Schedule',
      color: 'bg-amber-100'
    },
    // {
    //   id: '4',
    //   icon: <MaterialIcons name="account-balance-wallet" size={24} color="#8B5CF6" />,
    //   title: 'Make Payment',
    //   screen: 'Payment',
    //   color: 'bg-purple-100'
    // },
    // {
    //   id: '5',
    //   icon: <MaterialIcons name="chat" size={24} color="#EC4899" />,
    //   title: 'Contact Support',
    //   screen: 'Support',
    //   color: 'bg-pink-100'
    // },
    // {
    //   id: '6',
    //   icon: <MaterialIcons name="call" size={24} color="#EF4444" />,
    //   title: 'Emergency Call',
    //   screen: 'Emergency',
    //   color: 'bg-red-100'
    // },
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

const SeasonalServices = ({ onServicePress }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const filteredServices = activeCategory === 'all' 
    ? servicesData 
    : servicesData.filter(service => 
        service.category.toLowerCase().includes(activeCategory.toLowerCase())
      );

  return (
    <View className="bg-white rounded-2xl mx-4 my-2 p-5 shadow-sm" style={{
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.035,
      shadowRadius: 3,
      elevation: 3
    }}>
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-xl font-bold text-gray-900">Popular Services</Text>
        <TouchableOpacity 
          onPress={() => onServicePress('ServiceList')}
          className="flex-row items-center"
        >
          <Text className="text-emerald-600 text-sm font-medium">View All</Text>
          <MaterialIcons name="chevron-right" size={16} color="#059669" />
        </TouchableOpacity>
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        className="mb-4"
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
      
      <FlatList
        data={filteredServices}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingRight: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity 
            className="w-64 rounded-xl overflow-hidden mr-4 bg-white"
            onPress={() => onServicePress('ServiceDetails', { service: item })}
            activeOpacity={0.8}
            style={{
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.02,
              shadowRadius: 2,
              elevation: 0.5
            }}
          >
            <Image
              source={{ uri: item.image }}
              className="w-full h-40"
            />
            <View className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-sm">
              <FontAwesome name="star" size={16} color="#F59E0B" />
            </View>
            <View className="p-4">
              <Text className="font-bold text-gray-900">{item.title}</Text>
              <Text className="text-gray-500 text-xs mt-1">{item.description}</Text>
              
              <View className="flex-row items-center mt-3">
                <View className="flex-row items-center">
                  <FontAwesome name="star" size={14} color="#F59E0B" />
                  <Text className="text-gray-700 text-xs ml-1">{item.rating}</Text>
                  <Text className="text-gray-400 text-xs ml-1">({item.reviews})</Text>
                </View>
                <Text className="text-gray-400 text-xs mx-2">•</Text>
                <Text className="text-gray-400 text-xs">{item.duration}</Text>
              </View>
              
              <View className="flex-row justify-between items-center mt-4">
                <Text className="text-emerald-600 font-bold text-base">{item.price}</Text>
                <TouchableOpacity 
                  className="bg-emerald-500 px-3 py-2 rounded-full"
                  onPress={() => onServicePress('Booking', { service: item })}
                >
                  <Text className="text-white text-xs font-medium">Book Now</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

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
        <TouchableOpacity 
          onPress={() => onReviewPress('Reviews')}
          className="flex-row items-center"
        >
          <Text className="text-emerald-600 text-sm font-medium">See All</Text>
          <MaterialIcons name="chevron-right" size={16} color="#059669" />
        </TouchableOpacity>
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
            onPress={() => onReviewPress('ReviewDetails', { review: item })}
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

const HomeScreen = () => {
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  
  const handleServicePress = (screen, params) => {
    navigation.navigate(screen, params);
  };
  
  const handleActionPress = (screen, params) => {
    navigation.navigate(screen, params);
  };
  
  const handleReviewPress = (screen, params) => {
    navigation.navigate(screen, params);
  };

  return (
    <View className="flex-1 bg-gray-50">
      <Animated.ScrollView
        contentContainerStyle={{ paddingBottom: 120 }}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        <Header scrollY={scrollY} />
        <NextService 
          services={upcomingServices} 
          onPress={handleActionPress} 
        />
        <QuickActions onActionPress={handleActionPress} />
        <SeasonalServices onServicePress={handleServicePress} />
        <ReviewSection onReviewPress={handleReviewPress} />
        <ContactCard onActionPress={handleActionPress} />
      </Animated.ScrollView>
    </View>
  );
};

export default HomeScreen;