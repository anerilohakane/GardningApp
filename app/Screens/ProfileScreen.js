import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Modal, 
  TextInput, 
  Alert,
  Platform
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const ProfileScreen = ({ navigation }) => {
  // User data state
  const [user, setUser] = useState({
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (559) 123-967',
    address: 'San Francisco, CA',
    rating: 4.8,
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    status: 'Premium Gardener'
  });

  // Gardens data state
  const [gardens, setGardens] = useState([
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
  const [services, setServices] = useState([
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
  ];

  // Edit modal state
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editField, setEditField] = useState('');
  const [editValue, setEditValue] = useState('');

  // Image picker permission
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  // Open edit modal
  const openEditModal = (field, value) => {
    setEditField(field);
    setEditValue(value);
    setEditModalVisible(true);
  };

  // Save edited value
  const saveEdit = () => {
    setUser(prev => ({ ...prev, [editField]: editValue }));
    setEditModalVisible(false);
    Alert.alert('Success', 'Profile updated successfully!');
  };

  // Handle garden press
  const handleGardenPress = (garden) => {
    navigation.navigate('GardenDetail', { 
      garden,
      onUpdate: (updatedGarden) => {
        setGardens(gardens.map(g => g.id === updatedGarden.id ? updatedGarden : g));
      },
      onDelete: (gardenId) => {
        setGardens(gardens.filter(g => g.id !== gardenId));
      }
    });
  };

  // Handle service press
  const handleServicePress = (service) => {
    navigation.navigate('ServiceDetail', { 
      service,
      onUpdate: (updatedService) => {
        setServices(services.map(s => s.id === updatedService.id ? updatedService : s));
      }
    });
  };

  // Handle add garden
  const handleAddGarden = () => {
    navigation.navigate('AddGarden', {
      onAddGarden: (newGarden) => {
        setGardens([...gardens, { ...newGarden, id: Math.max(...gardens.map(g => g.id)) + 1 }]);
      }
    });
  };

  // Handle view all services
  const handleViewAllServices = () => {
    navigation.navigate('ServiceHistory', { services });
  };

  // Handle settings item press
  const handleSettingsPress = (screen) => {
    navigation.navigate(screen);
  };

  // Handle change profile photo
  const handleChangePhoto = async () => {
    Alert.alert(
      'Change Profile Photo',
      'Choose an option',
      [
        {
          text: 'Take Photo',
          onPress: () => launchCamera(
            { mediaType: 'photo', quality: 0.8 },
            (response) => {
              if (!response.didCancel && !response.errorCode) {
                setUser({ ...user, avatar: response.assets[0].uri });
              }
            }
          )
        },
        {
          text: 'Choose from Library',
          onPress: () => launchImageLibrary(
            { mediaType: 'photo', quality: 0.8 },
            (response) => {
              if (!response.didCancel && !response.errorCode) {
                setUser({ ...user, avatar: response.assets[0].uri });
              }
            }
          )
        },
        {
          text: 'Cancel',
          style: 'cancel'
        }
      ]
    );
  };

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

  return (
    <ScrollView
      className="bg-green-50 p-4"
      showsVerticalScrollIndicator={false}
    >
      <View className="h-14"></View>

      {/* Profile Header */}
      <View className="flex-row items-center mb-8 p-6 bg-white rounded-3xl shadow shadow-black/10">
        <View className="relative">
          <Image
            source={{ uri: user.avatar }}
            className="w-28 h-28 rounded-full mr-4 border-4 border-green-100"
          />
          <TouchableOpacity 
            className="absolute bottom-0 right-4 bg-green-500 p-2 rounded-full shadow shadow-black/20"
            onPress={handleChangePhoto}
          >
            <Icon name="camera" size={16} color="white" />
          </TouchableOpacity>
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

      {/* Contact Info Card */}
      <View className="bg-white rounded-3xl p-6 mb-6 shadow shadow-black/5 border border-green-100">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-bold text-gray-800">Contact Information</Text>
          <TouchableOpacity 
            className="p-1"
            onPress={() => openEditModal('name', user.name)}
          >
            <Icon name="pencil" size={16} color="#6b7280" />
          </TouchableOpacity>
        </View>

        <View className="gap-4">
          <View className="flex-row items-center">
            <View className="bg-green-100 p-3 rounded-xl mr-3">
              <Icon name="envelope" size={18} color="#10b981" />
            </View>
            <View>
              <Text className="text-gray-500 text-xs">Email</Text>
              <TouchableOpacity onPress={() => openEditModal('email', user.email)}>
                <Text className="text-gray-800 font-medium">{user.email}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex-row items-center">
            <View className="bg-green-100 p-3 rounded-xl mr-3">
              <Icon name="phone" size={18} color="#10b981" />
            </View>
            <View>
              <Text className="text-gray-500 text-xs">Phone</Text>
              <TouchableOpacity onPress={() => openEditModal('phone', user.phone)}>
                <Text className="text-gray-800 font-medium">{user.phone}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View className="flex-row items-center">
            <View className="bg-green-100 p-3 rounded-xl mr-3">
              <Icon name="map-marker" size={18} color="#10b981" />
            </View>
            <View>
              <Text className="text-gray-500 text-xs">Address</Text>
              <TouchableOpacity onPress={() => openEditModal('address', user.address)}>
                <Text className="text-gray-800 font-medium">{user.address}</Text>
              </TouchableOpacity>
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
            onPress={handleAddGarden}
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
              onPress={() => handleGardenPress(garden)}
            >
              <Image
                source={{ uri: garden.image }}
                className="w-full h-40"
              />
              <View className="p-4">
                <View className="flex-row justify-between items-start mb-2">
                  <Text className="text-lg font-bold text-gray-800">{garden.name}</Text>
                  <View className={
                    `px-2 py-1 rounded-full ${
                      garden.status === 'Active' ? 'bg-green-100' : 'bg-amber-100'
                    }`
                  }>
                    <Text className={
                      `text-xs font-medium ${
                        garden.status === 'Active' ? 'text-green-700' : 'text-amber-700'
                      }`
                    }>
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
                  <Text className={
                    `font-bold ${
                      garden.condition === 'Well Maintained' ? 'text-green-600' : 'text-amber-600'
                    }`
                  }>
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
          <TouchableOpacity onPress={handleViewAllServices}>
            <Text className="text-green-500 font-medium">View All</Text>
          </TouchableOpacity>
        </View>

        {services.map(service => (
          <TouchableOpacity 
            key={service.id}
            className="bg-green-50 rounded-lg p-4 mb-3 border border-green-100"
            onPress={() => handleServicePress(service)}
          >
            <View className="flex-row justify-between items-center mb-2">
              <View className="flex-row items-center">
                <View className="bg-green-500 p-2 rounded-lg mr-3">
                  <Icon name={service.icon} size={16} color="white" />
                </View>
                <Text className="font-bold text-gray-800">{service.name}</Text>
              </View>
              <View className={
                `px-2 py-1 rounded-full ${
                  service.status === 'Completed' ? 'bg-green-100' : 
                  service.status === 'Scheduled' ? 'bg-purple-100' : 'bg-gray-100'
                }`
              }>
                <Text className={
                  `text-xs font-medium ${
                    service.status === 'Completed' ? 'text-green-700' : 
                    service.status === 'Scheduled' ? 'text-purple-700' : 'text-gray-700'
                  }`
                }>
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
            <View className={
              `w-12 h-12 rounded-xl items-center justify-center mr-4 ${
                item.color === 'bg-purple-100' ? 'bg-purple-100' :
                item.color === 'bg-blue-100' ? 'bg-blue-100' :
                item.color === 'bg-amber-100' ? 'bg-amber-100' :
                item.color === 'bg-green-100' ? 'bg-green-100' : 'bg-gray-100'
              }`
            }>
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

      {/* Edit Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/50 p-4">
          <View className="bg-white rounded-xl p-6 w-full max-w-md">
            <Text className="text-xl font-bold text-gray-800 mb-4">Edit {editField}</Text>
            
            <TextInput
              className="border border-gray-300 rounded-lg p-3 mb-4"
              value={editValue}
              onChangeText={setEditValue}
              placeholder={`Enter new ${editField}`}
            />
            
            <View className="flex-row justify-end gap-3">
              <TouchableOpacity 
                className="px-4 py-2 rounded-lg"
                onPress={() => setEditModalVisible(false)}
              >
                <Text className="text-gray-500 font-medium">Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                className="bg-green-500 px-4 py-2 rounded-lg"
                onPress={saveEdit}
              >
                <Text className="text-white font-medium">Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ProfileScreen;