import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  Alert, 
  ActivityIndicator, 
  TextInput,
  Dimensions 
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { launchImageLibrary } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const { width } = Dimensions.get('window');

const DEFAULT_GARDEN = {
  id: Date.now(),
  name: 'My Beautiful Garden',
  address: '123 Green St, Gardenville',
  size: '500',
  sizeUnit: 'sq ft',
  plants: 12,
  status: 'Active',
  condition: 'Well Maintained',
  sunlight: 'Partial Sun',
  soilType: 'Loamy',
  lastWatered: new Date().toISOString().split('T')[0],
  notes: '',
  image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  createdAt: new Date().toISOString()
};

const GardenDetail = ({ route = {}, navigation }) => {
  const [currentGarden, setCurrentGarden] = useState(DEFAULT_GARDEN);
  const [imageLoading, setImageLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (route.params?.garden) {
      setCurrentGarden(route.params.garden);
    } else if (route.params?.isNew) {
      setIsEditing(true);
    }
    setIsReady(true);
  }, [route.params]);

  const validateForm = () => {
    const errors = {};
    if (!currentGarden.name.trim()) errors.name = 'Name is required';
    if (!currentGarden.address.trim()) errors.address = 'Address is required';
    if (isNaN(Number(currentGarden.size)) || Number(currentGarden.size) <= 0) errors.size = 'Invalid size';
    if (isNaN(Number(currentGarden.plants)) || Number(currentGarden.plants) <= 0) errors.plants = 'Invalid plant count';
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = () => {
    if (!validateForm()) return;
    
    const updatedGarden = {
      ...currentGarden,
      lastUpdated: new Date().toISOString()
    };
    
    if (route.params?.isNew) {
      route.params?.onAdd?.(updatedGarden) || Alert.alert('Success', 'New garden added');
    } else {
      route.params?.onUpdate?.(updatedGarden) || Alert.alert('Success', 'Changes saved');
    }
    navigation.goBack();
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Garden',
      'Are you sure you want to permanently delete this garden?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          onPress: () => {
            route.params?.onDelete?.(currentGarden.id) || Alert.alert('Success', 'Garden deleted');
            navigation.goBack();
          },
          style: 'destructive' 
        }
      ]
    );
  };

  const handleChangeImage = () => {
    launchImageLibrary(
      { 
        mediaType: 'photo', 
        quality: 0.8,
        includeBase64: false,
        maxWidth: 1000,
        maxHeight: 1000
      },
      (response) => {
        if (!response.didCancel && !response.errorCode && response.assets?.[0]?.uri) {
          setCurrentGarden({ 
            ...currentGarden, 
            image: response.assets[0].uri 
          });
          setImageLoading(true);
        }
      }
    );
  };

  const handleImageError = () => {
    setImageLoading(false);
    setCurrentGarden(prev => ({
      ...prev,
      image: DEFAULT_GARDEN.image
    }));
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (isEditing) setValidationErrors({});
  };

  const handleFieldChange = (field, value) => {
    setCurrentGarden(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not recorded';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      handleFieldChange('lastWatered', selectedDate.toISOString().split('T')[0]);
    }
  };

  if (!isReady) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#4ade80" />
      </View>
    );
  }

  const statusColors = {
    'Active': 'bg-green-100 border-green-500 text-green-800',
    'Needs Care': 'bg-yellow-100 border-yellow-500 text-yellow-800',
    'Dormant': 'bg-blue-100 border-blue-500 text-blue-800'
  };

  const statusIcons = {
    'Active': 'check-circle',
    'Needs Care': 'exclamation-circle',
    'Dormant': 'moon'
  };

  return (
    <ScrollView className="bg-gray-50">
      {/* Header */}
      <View className="pt-12 pb-4 px-6 flex-row justify-between items-center bg-green-600 shadow-md">
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          className="p-2 rounded-full bg-green-700"
        >
          <Icon name="arrow-left" size={20} color="white" />
        </TouchableOpacity>
        
        <Text className="text-xl font-bold text-white text-center flex-1">
          {isEditing ? (route.params?.isNew ? 'Create Garden' : 'Edit Garden') : 'Garden Details'}
        </Text>
        
        {!route.params?.isNew && (
          <TouchableOpacity 
            onPress={toggleEdit}
            className="p-2 rounded-full bg-green-700"
          >
            <Icon 
              name={isEditing ? "times" : "pencil"} 
              size={20} 
              color="white" 
            />
          </TouchableOpacity>
        )}
      </View>

      {/* Content Container */}
      <View className="px-4 pb-8 top-12">
        {/* Garden Image */}
        <View className="relative -mt-8 mb-6 rounded-xl overflow-hidden shadow-xl">
          {imageLoading && (
            <View className="absolute inset-0 justify-center items-center bg-gray-200 z-10">
              <ActivityIndicator size="large" color="#4ade80" />
            </View>
          )}
          
          <Image
            source={{ uri: currentGarden.image }}
            className="w-full h-72"
            resizeMode="cover"
            onError={handleImageError}
            onLoad={() => setImageLoading(false)}
          />
          
          {/* Image Overlay */}
          <View className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
            <Text className="text-white text-2xl font-bold">{currentGarden.name}</Text>
            <Text className="text-green-100">{currentGarden.address}</Text>
          </View>
          
          {isEditing && (
            <TouchableOpacity 
              className="absolute top-4 right-4 bg-white p-3 rounded-full shadow-lg"
              onPress={handleChangeImage}
            >
              <Icon name="camera" size={18} color="#4ade80" />
            </TouchableOpacity>
          )}
        </View>
        
        {/* Status Badge */}
        {!isEditing && (
          <View className={`flex-row items-center self-start px-4 py-2 rounded-full mb-6 ${statusColors[currentGarden.status]} border`}>
            <Icon 
              name={statusIcons[currentGarden.status]} 
              size={16} 
              color={currentGarden.status === 'Active' ? '#16a34a' : currentGarden.status === 'Needs Care' ? '#ca8a04' : '#2563eb'} 
              className="mr-2"
            />
            <Text className="font-medium">{currentGarden.status}</Text>
          </View>
        )}
        
        {/* Basic Information Card */}
        <View className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-100">
          <View className="flex-row items-center mb-4 pb-2 border-b border-gray-100">
            <View className="bg-green-100 p-2 rounded-lg mr-3">
              <Icon name="info-circle" size={18} color="#4ade80" />
            </View>
            <Text className="text-lg font-semibold text-gray-800">Basic Information</Text>
          </View>
          
          <View className="mb-5">
            <Text className="text-gray-500 mb-1 text-sm font-medium">Garden Name</Text>
            {isEditing ? (
              <>
                <TextInput
                  className={`border rounded-lg p-3 ${validationErrors.name ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                  value={currentGarden.name}
                  onChangeText={(text) => handleFieldChange('name', text)}
                  placeholder="Enter garden name"
                />
                {validationErrors.name && (
                  <Text className="text-red-500 text-xs mt-1">{validationErrors.name}</Text>
                )}
              </>
            ) : (
              <Text className="text-gray-800 text-lg font-medium">{currentGarden.name}</Text>
            )}
          </View>
          
          <View className="mb-5">
            <Text className="text-gray-500 mb-1 text-sm font-medium">Address</Text>
            {isEditing ? (
              <>
                <TextInput
                  className={`border rounded-lg p-3 ${validationErrors.address ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                  value={currentGarden.address}
                  onChangeText={(text) => handleFieldChange('address', text)}
                  placeholder="Enter garden address"
                  multiline
                />
                {validationErrors.address && (
                  <Text className="text-red-500 text-xs mt-1">{validationErrors.address}</Text>
                )}
              </>
            ) : (
              <Text className="text-gray-800 text-lg">{currentGarden.address}</Text>
            )}
          </View>
          
          <View className="flex-row mb-4">
            <View className="flex-1 mr-3">
              <Text className="text-gray-500 mb-1 text-sm font-medium">Size</Text>
              {isEditing ? (
                <View className="flex-row items-center">
                  <TextInput
                    className={`border rounded-lg p-3 flex-1 ${validationErrors.size ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                    value={currentGarden.size}
                    onChangeText={(text) => handleFieldChange('size', text)}
                    placeholder="Size"
                    keyboardType="numeric"
                  />
                  <Picker
                    selectedValue={currentGarden.sizeUnit}
                    onValueChange={(itemValue) => handleFieldChange('sizeUnit', itemValue)}
                    className="ml-2 flex-1"
                    dropdownIconColor="#4ade80"
                    mode="dropdown"
                  >
                    <Picker.Item label="sq ft" value="sq ft" />
                    <Picker.Item label="sq m" value="sq m" />
                    <Picker.Item label="acres" value="acres" />
                  </Picker>
                </View>
              ) : (
                <Text className="text-gray-800 text-lg">
                  {currentGarden.size} <Text className="text-gray-500">{currentGarden.sizeUnit}</Text>
                </Text>
              )}
              {validationErrors.size && (
                <Text className="text-red-500 text-xs mt-1">{validationErrors.size}</Text>
              )}
            </View>
            
            <View className="flex-1 ml-3">
              <Text className="text-gray-500 mb-1 text-sm font-medium">Plants</Text>
              {isEditing ? (
                <>
                  <TextInput
                    className={`border rounded-lg p-3 ${validationErrors.plants ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                    value={String(currentGarden.plants)}
                    onChangeText={(text) => handleFieldChange('plants', parseInt(text) || 0)}
                    placeholder="Number of plants"
                    keyboardType="numeric"
                  />
                  {validationErrors.plants && (
                    <Text className="text-red-500 text-xs mt-1">{validationErrors.plants}</Text>
                  )}
                </>
              ) : (
                <Text className="text-gray-800 text-lg">{currentGarden.plants}</Text>
              )}
            </View>
          </View>
        </View>

        {/* Garden Status Card */}
        <View className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-100">
          <View className="flex-row items-center mb-4 pb-2 border-b border-gray-100">
            <View className="bg-green-100 p-2 rounded-lg mr-3">
              <Icon name="heartbeat" size={18} color="#4ade80" />
            </View>
            <Text className="text-lg font-semibold text-gray-800">Garden Status</Text>
          </View>
          
          <View className="mb-5">
            <Text className="text-gray-500 mb-2 text-sm font-medium">Current Status</Text>
            {isEditing ? (
              <View className="flex-row justify-between">
                <TouchableOpacity
                  className={`px-4 py-3 rounded-lg border flex-1 mr-2 items-center ${currentGarden.status === 'Active' ? 'bg-green-100 border-green-500' : 'bg-gray-50 border-gray-200'}`}
                  onPress={() => handleFieldChange('status', 'Active')}
                >
                  <Text className={currentGarden.status === 'Active' ? 'text-green-800 font-medium' : 'text-gray-700'}>
                    Active
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`px-4 py-3 rounded-lg border flex-1 mx-2 items-center ${currentGarden.status === 'Needs Care' ? 'bg-yellow-100 border-yellow-500' : 'bg-gray-50 border-gray-200'}`}
                  onPress={() => handleFieldChange('status', 'Needs Care')}
                >
                  <Text className={currentGarden.status === 'Needs Care' ? 'text-yellow-800 font-medium' : 'text-gray-700'}>
                    Needs Care
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className={`px-4 py-3 rounded-lg border flex-1 ml-2 items-center ${currentGarden.status === 'Dormant' ? 'bg-blue-100 border-blue-500' : 'bg-gray-50 border-gray-200'}`}
                  onPress={() => handleFieldChange('status', 'Dormant')}
                >
                  <Text className={currentGarden.status === 'Dormant' ? 'text-blue-800 font-medium' : 'text-gray-700'}>
                    Dormant
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View className="flex-row items-center">
                <Icon 
                  name={statusIcons[currentGarden.status]} 
                  size={20} 
                  color={currentGarden.status === 'Active' ? '#16a34a' : currentGarden.status === 'Needs Care' ? '#ca8a04' : '#2563eb'} 
                  className="mr-2"
                />
                <Text className="text-gray-800 text-lg">{currentGarden.status}</Text>
              </View>
            )}
          </View>
          
          <View className="mb-5">
            <Text className="text-gray-500 mb-1 text-sm font-medium">Condition</Text>
            {isEditing ? (
              <TextInput
                className="border border-gray-200 rounded-lg p-3"
                value={currentGarden.condition}
                onChangeText={(text) => handleFieldChange('condition', text)}
                placeholder="Describe garden condition"
              />
            ) : (
              <Text className="text-gray-800 text-lg">{currentGarden.condition}</Text>
            )}
          </View>
          
          {isEditing && (
            <>
              <View className="mb-5">
                <Text className="text-gray-500 mb-1 text-sm font-medium">Sunlight</Text>
                <View className="border border-gray-200 rounded-lg overflow-hidden">
                  <Picker
                    selectedValue={currentGarden.sunlight}
                    onValueChange={(itemValue) => handleFieldChange('sunlight', itemValue)}
                    dropdownIconColor="#4ade80"
                  >
                    <Picker.Item label="Full Sun" value="Full Sun" />
                    <Picker.Item label="Partial Sun" value="Partial Sun" />
                    <Picker.Item label="Shade" value="Shade" />
                  </Picker>
                </View>
              </View>
              
              <View className="mb-5">
                <Text className="text-gray-500 mb-1 text-sm font-medium">Soil Type</Text>
                <View className="border border-gray-200 rounded-lg overflow-hidden">
                  <Picker
                    selectedValue={currentGarden.soilType}
                    onValueChange={(itemValue) => handleFieldChange('soilType', itemValue)}
                    dropdownIconColor="#4ade80"
                  >
                    <Picker.Item label="Clay" value="Clay" />
                    <Picker.Item label="Sandy" value="Sandy" />
                    <Picker.Item label="Loamy" value="Loamy" />
                    <Picker.Item label="Peaty" value="Peaty" />
                    <Picker.Item label="Chalky" value="Chalky" />
                  </Picker>
                </View>
              </View>
              
              <View className="mb-4">
                <Text className="text-gray-500 mb-1 text-sm font-medium">Last Watered</Text>
                <TouchableOpacity 
                  className="border border-gray-200 rounded-lg p-3 flex-row justify-between items-center"
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text className="text-gray-800">{currentGarden.lastWatered || 'Select date'}</Text>
                  <Icon name="calendar" size={16} color="#4ade80" />
                </TouchableOpacity>
                {showDatePicker && (
                  <DateTimePicker
                    value={new Date(currentGarden.lastWatered || new Date())}
                    mode="date"
                    display="default"
                    onChange={onDateChange}
                  />
                )}
              </View>
            </>
          )}
        </View>

        {/* Notes Card */}
        <View className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-gray-100">
          <View className="flex-row items-center mb-4 pb-2 border-b border-gray-100">
            <View className="bg-green-100 p-2 rounded-lg mr-3">
              <Icon name="sticky-note" size={18} color="#4ade80" />
            </View>
            <Text className="text-lg font-semibold text-gray-800">Notes</Text>
          </View>
          {isEditing ? (
            <TextInput
              className="border border-gray-200 rounded-lg p-3 h-32 text-align-top"
              value={currentGarden.notes}
              onChangeText={(text) => handleFieldChange('notes', text)}
              placeholder="Add any notes about your garden..."
              multiline
            />
          ) : (
            <Text className={`text-gray-800 text-lg ${!currentGarden.notes && 'text-gray-400 italic'}`}>
              {currentGarden.notes || 'No notes added'}
            </Text>
          )}
        </View>

        {/* Metadata */}
        {!isEditing && (
          <View className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <View className="flex-row items-center mb-3 pb-2 border-b border-gray-100">
              <View className="bg-green-100 p-2 rounded-lg mr-3">
                <Icon name="history" size={18} color="#4ade80" />
              </View>
              <Text className="text-lg font-semibold text-gray-800">History</Text>
            </View>
            <Text className="text-gray-500 text-sm mb-1">Created: {formatDate(currentGarden.createdAt)}</Text>
            {currentGarden.lastUpdated && (
              <Text className="text-gray-500 text-sm">Last Updated: {formatDate(currentGarden.lastUpdated)}</Text>
            )}
          </View>
        )}

        {/* Action Buttons */}
        {isEditing && (
          <View className="flex-row justify-between mt-6">
            {!route.params?.isNew && (
              <TouchableOpacity 
                className="bg-red-500 py-4 px-6 rounded-full flex-row items-center shadow-md"
                onPress={handleDelete}
                activeOpacity={0.8}
              >
                <Icon name="trash" size={16} color="white" className="mr-2" />
                <Text className="text-white font-medium">Delete</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              className="bg-green-500 py-4 px-8 rounded-full flex-row items-center shadow-md ml-auto"
              onPress={handleSave}
              activeOpacity={0.8}
            >
              <Icon name="save" size={16} color="white" className="mr-2" />
              <Text className="text-white font-medium">{route.params?.isNew ? 'Create' : 'Save'}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
      <View className="px-4 pb-8"></View>
    </ScrollView>
  );
};

export default GardenDetail;