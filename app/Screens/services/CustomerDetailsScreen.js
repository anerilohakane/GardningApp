// // src/screens/services/CustomerDetailsScreen.js
// import React, { useState, useEffect } from 'react';
// import { 
//   View, Text, Image, ScrollView, TextInput, TouchableOpacity 
// } from 'react-native';
// import { MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import * as ImagePicker from 'expo-image-picker';

// const CustomerDetailsScreen = ({ route, navigation }) => {
//   const { service, bookingDetails } = route.params;
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [phone, setPhone] = useState('');
//   const [communicationPrefs, setCommunicationPrefs] = useState({
//     email: true,
//     sms: false
//   });
  
//   const [customerAddress, setCustomerAddress] = useState({
//     street: '',
//     city: '',
//     state: '',
//     zip: ''
//   });
  
//   const [properties, setProperties] = useState([
//     {
//       id: 1,
//       name: 'Property 1',
//       street: '',
//       city: '',
//       state: '',
//       zip: '',
//       size: '',
//       areas: {
//         frontyard: false,
//         backyard: false,
//         garden: false,
//         trees: false
//       },
//       photos: []
//     }
//   ]);
  
//   const [activeProperty, setActiveProperty] = useState(1);

//   useEffect(() => {
//     (async () => {
//       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (status !== 'granted') {
//         alert('Sorry, we need camera roll permissions to make this work!');
//       }
      
//       const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
//       if (cameraStatus.status !== 'granted') {
//         alert('Sorry, we need camera permissions to make this work!');
//       }
//     })();
//   }, []);

//   const handleCustomerAddressChange = (field, value) => {
//     setCustomerAddress(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };
  
//   const handlePropertyChange = (propertyId, field, value) => {
//     setProperties(prev => 
//       prev.map(prop => 
//         prop.id === propertyId ? { ...prop, [field]: value } : prop
//       )
//     );
//   };
  
//   const handleAreaToggle = (propertyId, area) => {
//     setProperties(prev => 
//       prev.map(prop => 
//         prop.id === propertyId 
//           ? { ...prop, areas: { ...prop.areas, [area]: !prop.areas[area] } } 
//           : prop
//       )
//     );
//   };
  
//   const addProperty = () => {
//     const newId = properties.length > 0 ? Math.max(...properties.map(p => p.id)) + 1 : 1;
//     setProperties(prev => [
//       ...prev,
//       {
//         id: newId,
//         name: `Property ${newId}`,
//         street: '',
//         city: '',
//         state: '',
//         zip: '',
//         size: '',
//         areas: {
//           frontyard: false,
//           backyard: false,
//           garden: false,
//           trees: false
//         },
//         photos: []
//       }
//     ]);
//     setActiveProperty(newId);
//   };
  
//   const removeProperty = (id) => {
//     if (properties.length <= 1) return;
//     setProperties(prev => prev.filter(prop => prop.id !== id));
//     if (activeProperty === id) {
//       setActiveProperty(properties[0].id);
//     }
//   };
  
//   const takePhoto = async (propertyId) => {
//     let result = await ImagePicker.launchCameraAsync({
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 0.7,
//     });

//     if (!result.canceled) {
//       const newPhoto = {
//         id: Date.now(),
//         uri: result.assets[0].uri
//       };
      
//       setProperties(prev => 
//         prev.map(prop => 
//           prop.id === propertyId 
//             ? { ...prop, photos: [...prop.photos, newPhoto] } 
//             : prop
//         )
//       );
//     }
//   };

//   const pickFromGallery = async (propertyId) => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 0.7,
//     });

//     if (!result.canceled) {
//       const newPhoto = {
//         id: Date.now(),
//         uri: result.assets[0].uri
//       };
      
//       setProperties(prev => 
//         prev.map(prop => 
//           prop.id === propertyId 
//             ? { ...prop, photos: [...prop.photos, newPhoto] } 
//             : prop
//         )
//       );
//     }
//   };
  
//   const removePhoto = (propertyId, photoId) => {
//     setProperties(prev => 
//       prev.map(prop => 
//         prop.id === propertyId 
//           ? { ...prop, photos: prop.photos.filter(p => p.id !== photoId) } 
//           : prop
//       )
//     );
//   };
  
//   const toggleCommunicationPref = (type) => {
//     setCommunicationPrefs(prev => ({
//       ...prev,
//       [type]: !prev[type]
//     }));
//   };
  
//   const handleConfirmBooking = () => {
//     const bookingData = {
//       service,
//       customerDetails: {
//         name,
//         email,
//         phone,
//         address: customerAddress,
//         communicationPrefs
//       },
//       properties,
//       bookingDetails
//     };
    
//     navigation.navigate('BookingConfirmation', {
//       bookingData
//     });
//   };

//   const currentProperty = properties.find(prop => prop.id === activeProperty);

//   return (
//     <ScrollView className="flex-1 bg-gray-50 p-5">
//       <View className="mb-6">
//         <Text className="text-green-800 font-bold text-2xl">Customer Details</Text>
//         <Text className="text-gray-600 mt-2">Please fill in your information</Text>
//       </View>

//       <View className="mb-8">
//         <Text className="text-green-700 font-bold text-lg mb-4">Personal Information</Text>
        
//         <View className="space-y-4 mb-6">
//           <View>
//             <Text className="text-gray-700 mb-1 font-medium">Full Name</Text>
//             <TextInput
//               placeholder="John Doe"
//               className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800"
//               placeholderTextColor="#9CA3AF"
//               value={name}
//               onChangeText={setName}
//             />
//           </View>
          
//           <View>
//             <Text className="text-gray-700 mb-1 font-medium">Email Address</Text>
//             <TextInput
//               placeholder="your@email.com"
//               className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800"
//               placeholderTextColor="#9CA3AF"
//               keyboardType="email-address"
//               value={email}
//               onChangeText={setEmail}
//             />
//           </View>
          
//           <View>
//             <Text className="text-gray-700 mb-1 font-medium">Phone Number</Text>
//             <TextInput
//               placeholder="+1 (123) 456-7890"
//               className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800"
//               placeholderTextColor="#9CA3AF"
//               keyboardType="phone-pad"
//               value={phone}
//               onChangeText={setPhone}
//             />
//           </View>
//         </View>

//         <Text className="text-green-700 font-bold text-lg mb-4">Your Address</Text>
//         <View className="space-y-4 mb-6">
//           <View>
//             <Text className="text-gray-700 mb-1 font-medium">Street Address</Text>
//             <TextInput
//               placeholder="123 Main St"
//               className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800"
//               placeholderTextColor="#9CA3AF"
//               value={customerAddress.street}
//               onChangeText={(text) => handleCustomerAddressChange('street', text)}
//             />
//           </View>
          
//           <View className="flex-row">
//             <View className="flex-1 mr-2">
//               <Text className="text-gray-700 mb-1 font-medium">City</Text>
//               <TextInput
//                 placeholder="City"
//                 className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800"
//                 placeholderTextColor="#9CA3AF"
//                 value={customerAddress.city}
//                 onChangeText={(text) => handleCustomerAddressChange('city', text)}
//               />
//             </View>
//             <View className="flex-1 ml-2">
//               <Text className="text-gray-700 mb-1 font-medium">State</Text>
//               <TextInput
//                 placeholder="State"
//                 className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800"
//                 placeholderTextColor="#9CA3AF"
//                 value={customerAddress.state}
//                 onChangeText={(text) => handleCustomerAddressChange('state', text)}
//               />
//             </View>
//           </View>
          
//           <View>
//             <Text className="text-gray-700 mb-1 font-medium">ZIP Code</Text>
//             <TextInput
//               placeholder="12345"
//               className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800"
//               placeholderTextColor="#9CA3AF"
//               keyboardType="number-pad"
//               value={customerAddress.zip}
//               onChangeText={(text) => handleCustomerAddressChange('zip', text)}
//             />
//           </View>
//         </View>

//         <Text className="text-green-700 font-bold text-lg mb-4">Communication Preferences</Text>
//         <View className="flex-row items-center mb-2">
//           <TouchableOpacity
//             onPress={() => toggleCommunicationPref('email')}
//             className="mr-3"
//           >
//             <View className="w-6 h-6 rounded-md border border-gray-400 items-center justify-center">
//               {communicationPrefs.email && (
//                 <MaterialIcons name="check" size={20} color="#16A34A" />
//               )}
//             </View>
//           </TouchableOpacity>
//           <Text className="text-gray-700">Email</Text>
//         </View>
//         <View className="flex-row items-center">
//           <TouchableOpacity
//             onPress={() => toggleCommunicationPref('sms')}
//             className="mr-3"
//           >
//             <View className="w-6 h-6 rounded-md border border-gray-400 items-center justify-center">
//               {communicationPrefs.sms && (
//                 <MaterialIcons name="check" size={20} color="#16A34A" />
//               )}
//             </View>
//           </TouchableOpacity>
//           <Text className="text-gray-700">SMS/Text Message</Text>
//         </View>
//       </View>

//       <View className="mb-8">
//         <View className="flex-row justify-between items-center mb-4">
//           <Text className="text-green-700 font-bold text-lg">Property Details</Text>
//           <TouchableOpacity 
//             onPress={addProperty}
//             className="flex-row items-center bg-green-100 px-3 py-2 rounded-lg"
//           >
//             <Ionicons name="add" size={18} color="#16A34A" />
//             <Text className="text-green-700 ml-1">Add Property</Text>
//           </TouchableOpacity>
//         </View>

//         <ScrollView 
//           horizontal 
//           showsHorizontalScrollIndicator={false}
//           className="mb-4"
//         >
//           <View className="flex-row">
//             {properties.map((property) => (
//               <TouchableOpacity
//                 key={property.id}
//                 onPress={() => setActiveProperty(property.id)}
//                 className={`px-4 py-2 mr-2 rounded-lg ${activeProperty === property.id ? 'bg-green-600' : 'bg-gray-200'}`}
//               >
//                 <Text className={`font-medium ${activeProperty === property.id ? 'text-white' : 'text-gray-700'}`}>
//                   {property.name}
//                 </Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         </ScrollView>

//         {currentProperty && (
//           <View className="bg-white rounded-xl p-5 shadow-sm">
//             <View className="flex-row justify-between items-center mb-3">
//               <Text className="text-gray-500 font-medium">{currentProperty.name}</Text>
//               {properties.length > 1 && (
//                 <TouchableOpacity 
//                   onPress={() => removeProperty(currentProperty.id)}
//                   className="p-1"
//                 >
//                   <MaterialIcons name="delete" size={20} color="#EF4444" />
//                 </TouchableOpacity>
//               )}
//             </View>
            
//             <View className="space-y-4">
//               <Text className="text-gray-700 font-medium">Property Address</Text>
              
//               <View>
//                 <Text className="text-gray-600 mb-1 text-sm">Street</Text>
//                 <TextInput
//                   placeholder="123 Main St"
//                   className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-800"
//                   placeholderTextColor="#9CA3AF"
//                   value={currentProperty.street}
//                   onChangeText={(text) => handlePropertyChange(currentProperty.id, 'street', text)}
//                 />
//               </View>
              
//               <View className="flex-row">
//                 <View className="flex-1 mr-2">
//                   <Text className="text-gray-600 mb-1 text-sm">City</Text>
//                   <TextInput
//                     placeholder="City"
//                     className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-800"
//                     placeholderTextColor="#9CA3AF"
//                     value={currentProperty.city}
//                     onChangeText={(text) => handlePropertyChange(currentProperty.id, 'city', text)}
//                   />
//                 </View>
//                 <View className="flex-1 ml-2">
//                   <Text className="text-gray-600 mb-1 text-sm">State</Text>
//                   <TextInput
//                     placeholder="State"
//                     className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-800"
//                     placeholderTextColor="#9CA3AF"
//                     value={currentProperty.state}
//                     onChangeText={(text) => handlePropertyChange(currentProperty.id, 'state', text)}
//                   />
//                 </View>
//               </View>
              
//               <View>
//                 <Text className="text-gray-600 mb-1 text-sm">ZIP Code</Text>
//                 <TextInput
//                   placeholder="12345"
//                   className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-800"
//                   placeholderTextColor="#9CA3AF"
//                   keyboardType="number-pad"
//                   value={currentProperty.zip}
//                   onChangeText={(text) => handlePropertyChange(currentProperty.id, 'zip', text)}
//                 />
//               </View>
              
//               <View>
//                 <Text className="text-gray-600 mb-1 text-sm">Property Size (sq ft)</Text>
//                 <TextInput
//                   placeholder="e.g., 5000"
//                   className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-800"
//                   placeholderTextColor="#9CA3AF"
//                   keyboardType="number-pad"
//                   value={currentProperty.size}
//                   onChangeText={(text) => handlePropertyChange(currentProperty.id, 'size', text)}
//                 />
//               </View>
              
//               <View>
//                 <Text className="text-gray-700 font-medium mb-2">Areas Needing Service</Text>
//                 <View className="flex-row flex-wrap">
//                   {Object.entries(currentProperty.areas).map(([area, selected]) => (
//                     <TouchableOpacity
//                       key={area}
//                       onPress={() => handleAreaToggle(currentProperty.id, area)}
//                       className={`flex-row items-center mr-4 mb-3 ${selected ? 'bg-green-100' : 'bg-gray-100'} px-3 py-2 rounded-lg`}
//                     >
//                       <View className={`w-5 h-5 rounded-sm border ${selected ? 'border-green-500 bg-green-500' : 'border-gray-400'} items-center justify-center mr-2`}>
//                         {selected && <MaterialIcons name="check" size={16} color="white" />}
//                       </View>
//                       <Text className="text-gray-700 capitalize">{area}</Text>
//                     </TouchableOpacity>
//                   ))}
//                 </View>
//               </View>
              
//               <View>
//                 <Text className="text-gray-700 font-medium mb-2">Property Photos</Text>
//                 <Text className="text-gray-500 text-sm mb-3">Upload photos to help us understand your needs</Text>
                
//                 <View className="flex-row mb-3">
//                   <TouchableOpacity 
//                     onPress={() => takePhoto(currentProperty.id)}
//                     className="flex-row items-center bg-green-100 px-4 py-2 rounded-lg mr-3"
//                   >
//                     <MaterialCommunityIcons name="camera" size={18} color="#16A34A" />
//                     <Text className="text-green-700 ml-2">Take Photo</Text>
//                   </TouchableOpacity>
                  
//                   <TouchableOpacity 
//                     onPress={() => pickFromGallery(currentProperty.id)}
//                     className="flex-row items-center bg-gray-100 px-4 py-2 rounded-lg"
//                   >
//                     <MaterialIcons name="photo-library" size={18} color="#4B5563" />
//                     <Text className="text-gray-700 ml-2">From Gallery</Text>
//                   </TouchableOpacity>
//                 </View>
                
//                 {currentProperty.photos.length > 0 && (
//                   <ScrollView horizontal className="py-2">
//                     {currentProperty.photos.map(photo => (
//                       <View key={photo.id} className="relative mr-3">
//                         <Image
//                           source={{ uri: photo.uri }}
//                           className="w-24 h-24 rounded-lg"
//                         />
//                         <TouchableOpacity 
//                           onPress={() => removePhoto(currentProperty.id, photo.id)}
//                           className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
//                         >
//                           <MaterialIcons name="close" size={14} color="white" />
//                         </TouchableOpacity>
//                       </View>
//                     ))}
//                   </ScrollView>
//                 )}
//               </View>
//             </View>
//           </View>
//         )}
//       </View>

//       <TouchableOpacity 
//         className="bg-green-600 rounded-lg py-4 px-6 flex-row justify-center items-center mb-8"
//         onPress={handleConfirmBooking}
//       >
//         <Text className="text-white font-bold text-lg">Confirm Booking</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// export default CustomerDetailsScreen;




import React, { useState, useEffect } from 'react';
import { 
  View, Text, Image, ScrollView, TextInput, TouchableOpacity, Alert, ActivityIndicator 
} from 'react-native';
import { MaterialIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { TENANT_CONFIG } from '../../config/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';

const CustomerDetailsScreen = ({ route, navigation }) => {
  const { service, bookingDetails } = route.params;
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [communicationPrefs, setCommunicationPrefs] = useState({
    email: true,
    sms: false
  });
  const [customerAddress, setCustomerAddress] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'USA'
  });
  const [properties, setProperties] = useState([]);
  const [activeProperty, setActiveProperty] = useState(1);
  const [token, setToken] = useState(null);

  // Fetch initial customer data
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        setLoading(true);
        const storedToken = await AsyncStorage.getItem('token');
        setToken(storedToken);
        
        if (!storedToken) {
          console.log('No token found, user not authenticated');
          return;
        }

        console.log('Fetching customer profile...');
        const response = await fetch(`${TENANT_CONFIG.API_BASE_URL}/customers/me`, {
          headers: {
            'Authorization': `Bearer ${storedToken}`,
            'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
            'X-Tenant-ID': TENANT_CONFIG.ID,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Profile fetch error:', errorData);
          throw new Error(errorData.message || 'Failed to fetch profile');
        }

        const { data } = await response.json();
        console.log('Customer profile data:', data);

        // Populate form with existing customer data
        if (data.user) {
          setName(data.user.name || '');
          setEmail(data.user.email || '');
          setPhone(data.user.phone || '');
        }

        if (data.address) {
          setCustomerAddress({
            street: data.address.street || '',
            city: data.address.city || '',
            state: data.address.state || '',
            zipCode: data.address.zipCode || '',
            country: data.address.country || 'USA'
          });
        }

        if (data.propertyDetails && data.propertyDetails.length > 0) {
          setProperties(data.propertyDetails.map((prop, index) => ({
            id: index + 1,
            name: prop.name || `Property ${index + 1}`,
            propertyAddress: {
              street: prop.propertyAddress?.street || '',
              city: prop.propertyAddress?.city || '',
              state: prop.propertyAddress?.state || '',
              zipCode: prop.propertyAddress?.zipCode || '',
              country: prop.propertyAddress?.country || 'USA'
            },
            size: prop.size || '',
            features: {
              hasFrontYard: prop.features?.hasFrontYard || false,
              hasBackYard: prop.features?.hasBackYard || false,
              hasGarden: prop.features?.hasGarden || false,
              hasTrees: prop.features?.hasTrees || false
            },
            images: prop.images?.map(img => ({
              id: img._id,
              uri: img.url,
              publicId: img.publicId
            })) || [],
            accessInstructions: prop.accessInstructions || ''
          })));
        } else {
          // Default empty property if none exists
          setProperties([{
            id: 1,
            name: 'Primary Property',
            propertyAddress: {
              street: '',
              city: '',
              state: '',
              zipCode: '',
              country: 'USA'
            },
            size: '',
            features: {
              hasFrontYard: false,
              hasBackYard: false,
              hasGarden: false,
              hasTrees: false
            },
            images: [],
            accessInstructions: ''
          }]);
        }

      } catch (error) {
        console.error('Error fetching customer data:', error);
        Alert.alert('Error', 'Failed to load customer data');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomerData();
  }, []);

  // Helper functions
  const handleCustomerAddressChange = (field, value) => {
    setCustomerAddress(prev => ({ ...prev, [field]: value }));
  };
  
  const handlePropertyChange = (propertyId, field, value) => {
    if (field === 'street' || field === 'city' || field === 'state' || field === 'zipCode' || field === 'country') {
      setProperties(prev => 
        prev.map(prop => 
          prop.id === propertyId 
            ? { ...prop, propertyAddress: { ...prop.propertyAddress, [field]: value } } 
            : prop
        )
      );
    } else {
      setProperties(prev => 
        prev.map(prop => 
          prop.id === propertyId ? { ...prop, [field]: value } : prop
        )
      );
    }
  };
  
  const handleFeatureToggle = (propertyId, feature) => {
    setProperties(prev => 
      prev.map(prop => 
        prop.id === propertyId 
          ? { ...prop, features: { ...prop.features, [feature]: !prop.features[feature] } } 
          : prop
      )
    );
  };
  
  const addProperty = () => {
    const newId = properties.length > 0 ? Math.max(...properties.map(p => p.id)) + 1 : 1;
    setProperties(prev => [
      ...prev,
      {
        id: newId,
        name: `Property ${newId}`,
        propertyAddress: {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: 'USA'
        },
        size: '',
        features: {
          hasFrontYard: false,
          hasBackYard: false,
          hasGarden: false,
          hasTrees: false
        },
        images: [],
        accessInstructions: ''
      }
    ]);
    setActiveProperty(newId);
  };
  
  const removeProperty = (id) => {
    if (properties.length <= 1) return;
    setProperties(prev => prev.filter(prop => prop.id !== id));
    if (activeProperty === id) {
      setActiveProperty(properties[0].id);
    }
  };

  // Image handling functions
  const uploadImage = async (uri) => {
  console.log('Uploading image:', uri);
  setUploading(true);
  
  try {
    // 1. Get the token from AsyncStorage
    const token = await AsyncStorage.getItem('token');
    if (!token) throw new Error('Authentication token not found');

    // 2. Decode the token to get customer ID
    const decoded = jwtDecode(token);
    const customerId = decoded.id;
    
    if (!customerId) throw new Error('Customer ID not found in token');

    // 3. Prepare form data
    const filename = uri.split('/').pop();
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : 'image/jpeg';

    const formData = new FormData();
    formData.append('images', {
      uri: uri,
      name: filename,
      type: type
    });

    // 4. Create the correct endpoint URL
    const endpoint = `${TENANT_CONFIG.API_BASE_URL}/customers/${customerId}/propertyDetails/${activeProperty}/images`;
    console.log('Uploading to:', endpoint);

    // 5. Make the upload request
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
        'X-Tenant-ID': TENANT_CONFIG.ID,
      },
      body: formData
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Upload failed: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Upload successful:', data);
    return data.data[0];
  } catch (error) {
    console.error('Upload error:', error);
    Alert.alert('Upload Failed', error.message || 'Failed to upload image');
    throw error;
  } finally {
    setUploading(false);
  }
};

  const takePhoto = async () => {
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      });

      if (!result.canceled) {
        const uploadedImage = await uploadImage(result.assets[0].uri);
        setProperties(prev => 
          prev.map(prop => 
            prop.id === activeProperty 
              ? { ...prop, images: [...prop.images, {
                  id: uploadedImage._id,
                  uri: uploadedImage.url,
                  publicId: uploadedImage.publicId
                }] 
              } 
              : prop
          )
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to upload photo');
    }
  };

  const pickFromGallery = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.7,
      });

      if (!result.canceled) {
        const uploadedImage = await uploadImage(result.assets[0].uri);
        setProperties(prev => 
          prev.map(prop => 
            prop.id === activeProperty 
              ? { ...prop, images: [...prop.images, {
                  id: uploadedImage._id,
                  uri: uploadedImage.url,
                  publicId: uploadedImage.publicId
                }] 
              } 
              : prop
          )
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to upload photo');
    }
  };

  const removePhoto = async (photoId) => {
    try {
      setUploading(true);
      console.log('Deleting photo:', photoId);
      
      const response = await fetch(`${TENANT_CONFIG.API_BASE_URL}/customers/properties/${properties.findIndex(p => p.id === activeProperty)}/images/${photoId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
          'X-Tenant-ID': TENANT_CONFIG.ID,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Delete error response:', errorData);
        throw new Error(errorData.message || 'Failed to delete image');
      }

      setProperties(prev => 
        prev.map(prop => 
          prop.id === activeProperty 
            ? { ...prop, images: prop.images.filter(p => p.id !== photoId) } 
            : prop
        )
      );
    } catch (error) {
      console.error('Delete error:', error);
      Alert.alert('Error', 'Failed to delete photo');
    } finally {
      setUploading(false);
    }
  };

  const toggleCommunicationPref = (type) => {
    setCommunicationPrefs(prev => ({ ...prev, [type]: !prev[type] }));
  };
  
  const handleConfirmBooking = async () => {
    try {
      setLoading(true);
      
      // First update the customer profile
      console.log('Updating customer profile...');
      const updateResponse = await fetch(`${TENANT_CONFIG.API_BASE_URL}/customers/me`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
          'X-Tenant-ID': TENANT_CONFIG.ID,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            name,
            email,
            phone
          },
          address: customerAddress,
          propertyDetails: properties.map(prop => ({
            name: prop.name,
            propertyAddress: {
              street: prop.propertyAddress.street,
              city: prop.propertyAddress.city,
              state: prop.propertyAddress.state,
              zipCode: prop.propertyAddress.zipCode,
              country: prop.propertyAddress.country
            },
            size: prop.size,
            features: prop.features,
            accessInstructions: prop.accessInstructions
          })),
          notificationPreferences: communicationPrefs
        })
      });

      if (!updateResponse.ok) {
        const errorData = await updateResponse.json();
        console.error('Profile update error:', errorData);
        throw new Error(errorData.message || 'Failed to update profile');
      }

      // Then navigate to confirmation with all data
      const bookingData = {
        service,
        customerDetails: {
          name,
          email,
          phone,
          address: customerAddress,
          notificationPreferences: communicationPrefs
        },
        properties,
        bookingDetails
      };
      
      console.log('Booking data prepared:', bookingData);
      navigation.navigate('BookingConfirmation', { bookingData });
    } catch (error) {
      console.error('Booking error:', error);
      Alert.alert('Error', 'Failed to confirm booking');
    } finally {
      setLoading(false);
    }
  };

  const currentProperty = properties.find(prop => prop.id === activeProperty);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-50">
        <ActivityIndicator size="large" color="#16A34A" />
        <Text className="mt-4 text-gray-600">Loading your information...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-50 p-5">
      {/* Header Section */}
      <View className="mb-6">
        <Text className="text-green-800 font-bold text-2xl">Customer Details</Text>
        <Text className="text-gray-600 mt-2">Please fill in your information</Text>
      </View>

      {/* Personal Information Section */}
      <View className="mb-8">
        <Text className="text-green-700 font-bold text-lg mb-4">Personal Information</Text>
        <View className="space-y-4 mb-6">
          <View>
            <Text className="text-gray-700 mb-1 font-medium">Full Name</Text>
            <TextInput
              placeholder="John Doe"
              className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800"
              placeholderTextColor="#9CA3AF"
              value={name}
              onChangeText={setName}
            />
          </View>
          
          <View>
            <Text className="text-gray-700 mb-1 font-medium">Email Address</Text>
            <TextInput
              placeholder="your@email.com"
              className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800"
              placeholderTextColor="#9CA3AF"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          
          <View>
            <Text className="text-gray-700 mb-1 font-medium">Phone Number</Text>
            <TextInput
              placeholder="+1 (123) 456-7890"
              className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800"
              placeholderTextColor="#9CA3AF"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
          </View>
        </View>

        {/* Address Section */}
        <Text className="text-green-700 font-bold text-lg mb-4">Your Address</Text>
        <View className="space-y-4 mb-6">
          <View>
            <Text className="text-gray-700 mb-1 font-medium">Street</Text>
            <TextInput
              placeholder="123 Main St"
              className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800"
              placeholderTextColor="#9CA3AF"
              value={customerAddress.street}
              onChangeText={(text) => handleCustomerAddressChange('street', text)}
            />
          </View>
          
          <View className="flex-row">
            <View className="flex-1 mr-2">
              <Text className="text-gray-700 mb-1 font-medium">City</Text>
              <TextInput
                placeholder="City"
                className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800"
                placeholderTextColor="#9CA3AF"
                value={customerAddress.city}
                onChangeText={(text) => handleCustomerAddressChange('city', text)}
              />
            </View>
            <View className="flex-1 ml-2">
              <Text className="text-gray-700 mb-1 font-medium">State</Text>
              <TextInput
                placeholder="State"
                className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800"
                placeholderTextColor="#9CA3AF"
                value={customerAddress.state}
                onChangeText={(text) => handleCustomerAddressChange('state', text)}
              />
            </View>
          </View>
          
          <View>
            <Text className="text-gray-700 mb-1 font-medium">ZIP Code</Text>
            <TextInput
              placeholder="12345"
              className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800"
              placeholderTextColor="#9CA3AF"
              keyboardType="number-pad"
              value={customerAddress.zipCode}
              onChangeText={(text) => handleCustomerAddressChange('zipCode', text)}
            />
          </View>
           <View>
              <Text className="text-gray-700 mb-1 font-medium">Country</Text>
              <TextInput
                placeholder="Country"
                className="bg-white p-4 rounded-xl border border-gray-300 text-gray-800"
                placeholderTextColor="#9CA3AF"
                value={customerAddress.country}
                onChangeText={(text) => handleCustomerAddressChange('country', text)}
              />
            </View>
        </View>

        {/* Communication Preferences */}
        <Text className="text-green-700 font-bold text-lg mb-4">Communication Preferences</Text>
        <View className="flex-row items-center mb-2">
          <TouchableOpacity
            onPress={() => toggleCommunicationPref('email')}
            className="mr-3"
          >
            <View className="w-6 h-6 rounded-md border border-gray-400 items-center justify-center">
              {communicationPrefs.email && (
                <MaterialIcons name="check" size={20} color="#16A34A" />
              )}
            </View>
          </TouchableOpacity>
          <Text className="text-gray-700">Email</Text>
        </View>
        <View className="flex-row items-center">
          <TouchableOpacity
            onPress={() => toggleCommunicationPref('sms')}
            className="mr-3"
          >
            <View className="w-6 h-6 rounded-md border border-gray-400 items-center justify-center">
              {communicationPrefs.sms && (
                <MaterialIcons name="check" size={20} color="#16A34A" />
              )}
            </View>
          </TouchableOpacity>
          <Text className="text-gray-700">SMS/Text Message</Text>
        </View>
      </View>

      {/* Property Details Section */}
      <View className="mb-8">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-green-700 font-bold text-lg">Property Details</Text>
          <TouchableOpacity 
            onPress={addProperty}
            className="flex-row items-center bg-green-100 px-3 py-2 rounded-lg"
          >
            <Ionicons name="add" size={18} color="#16A34A" />
            <Text className="text-green-700 ml-1">Add Property</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="mb-4"
        >
          <View className="flex-row">
            {properties.map((property) => (
              <TouchableOpacity
                key={property.id}
                onPress={() => setActiveProperty(property.id)}
                className={`px-4 py-2 mr-2 rounded-lg ${activeProperty === property.id ? 'bg-green-600' : 'bg-gray-200'}`}
              >
                <Text className={`font-medium ${activeProperty === property.id ? 'text-white' : 'text-gray-700'}`}>
                  {property.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        {currentProperty && (
          <View className="bg-white rounded-xl p-5 shadow-sm">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-gray-500 font-medium">{currentProperty.name}</Text>
              {properties.length > 1 && (
                <TouchableOpacity 
                  onPress={() => removeProperty(currentProperty.id)}
                  className="p-1"
                >
                  <MaterialIcons name="delete" size={20} color="#EF4444" />
                </TouchableOpacity>
              )}
            </View>
            
            <View className="space-y-4">
              <Text className="text-gray-700 font-medium">Property Address</Text>
              
              <View>
                <Text className="text-gray-600 mb-1 text-sm">Street</Text>
                <TextInput
                  placeholder="123 Main St"
                  className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-800"
                  placeholderTextColor="#9CA3AF"
                  value={currentProperty.propertyAddress.street}
                  onChangeText={(text) => handlePropertyChange(currentProperty.id, 'street', text)}
                />
              </View>
              
              <View className="flex-row">
                <View className="flex-1 mr-2">
                  <Text className="text-gray-600 mb-1 text-sm">City</Text>
                  <TextInput
                    placeholder="City"
                    className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-800"
                    placeholderTextColor="#9CA3AF"
                    value={currentProperty.propertyAddress.city}
                    onChangeText={(text) => handlePropertyChange(currentProperty.id, 'city', text)}
                  />
                </View>
                <View className="flex-1 ml-2">
                  <Text className="text-gray-600 mb-1 text-sm">State</Text>
                  <TextInput
                    placeholder="State"
                    className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-800"
                    placeholderTextColor="#9CA3AF"
                    value={currentProperty.propertyAddress.state}
                    onChangeText={(text) => handlePropertyChange(currentProperty.id, 'state', text)}
                  />
                </View>
              </View>
              
              <View>
                <Text className="text-gray-600 mb-1 text-sm">ZIP Code</Text>
                <TextInput
                  placeholder="12345"
                  className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-800"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="number-pad"
                  value={currentProperty.propertyAddress.zipCode}
                  onChangeText={(text) => handlePropertyChange(currentProperty.id, 'zipCode', text)}
                />
              </View>

               <View>
              <Text className="text-gray-600 mb-1 text-sm">Country</Text>
              <TextInput
                placeholder="Country"
                className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-800"
                placeholderTextColor="#9CA3AF"
                value={currentProperty.propertyAddress.country}
                onChangeText={(text) => handlePropertyChange(currentProperty.id,'country', text)}
              />
            </View>
              
              <View>
                <Text className="text-gray-600 mb-1 text-sm">Property Size (sq ft)</Text>
                <TextInput
                  placeholder="e.g., 5000"
                  className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-800"
                  placeholderTextColor="#9CA3AF"
                  keyboardType="number-pad"
                  value={currentProperty.size}
                  onChangeText={(text) => handlePropertyChange(currentProperty.id, 'size', text)}
                />
              </View>
              
              <View>
                <Text className="text-gray-700 font-medium mb-2">Property Features</Text>
                <View className="flex-row flex-wrap">
                  {Object.entries(currentProperty.features).map(([feature, selected]) => (
                    <TouchableOpacity
                      key={feature}
                      onPress={() => handleFeatureToggle(currentProperty.id, feature)}
                      className={`flex-row items-center mr-4 mb-3 ${selected ? 'bg-green-100' : 'bg-gray-100'} px-3 py-2 rounded-lg`}
                    >
                      <View className={`w-5 h-5 rounded-sm border ${selected ? 'border-green-500 bg-green-500' : 'border-gray-400'} items-center justify-center mr-2`}>
                        {selected && <MaterialIcons name="check" size={16} color="white" />}
                      </View>
                      <Text className="text-gray-700 capitalize">
                        {feature.replace('has', '').replace(/([A-Z])/g, ' $1').trim()}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View>
                <Text className="text-gray-600 mb-1 text-sm">Access Instructions</Text>
                <TextInput
                  placeholder="Gate code, lockbox location, etc."
                  className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-gray-800"
                  placeholderTextColor="#9CA3AF"
                  multiline
                  numberOfLines={3}
                  value={currentProperty.accessInstructions}
                  onChangeText={(text) => handlePropertyChange(currentProperty.id, 'accessInstructions', text)}
                />
              </View>
              
              <View>
                <Text className="text-gray-700 font-medium mb-2">Property Photos</Text>
                <Text className="text-gray-500 text-sm mb-3">Upload photos to help us understand your needs</Text>
                
                {uploading ? (
                  <View className="py-4 items-center">
                    <ActivityIndicator size="small" color="#16A34A" />
                    <Text className="text-gray-600 mt-2">Uploading image...</Text>
                  </View>
                ) : (
                  <>
                    <View className="flex-row mb-3">
                      <TouchableOpacity 
                        onPress={takePhoto}
                        className="flex-row items-center bg-green-100 px-4 py-2 rounded-lg mr-3"
                      >
                        <MaterialCommunityIcons name="camera" size={18} color="#16A34A" />
                        <Text className="text-green-700 ml-2">Take Photo</Text>
                      </TouchableOpacity>
                      
                      <TouchableOpacity 
                        onPress={pickFromGallery}
                        className="flex-row items-center bg-gray-100 px-4 py-2 rounded-lg"
                      >
                        <MaterialIcons name="photo-library" size={18} color="#4B5563" />
                        <Text className="text-gray-700 ml-2">From Gallery</Text>
                      </TouchableOpacity>
                    </View>
                    
                    {currentProperty.images.length > 0 && (
                      <ScrollView horizontal className="py-2">
                        {currentProperty.images.map(photo => (
                          <View key={photo.id} className="relative mr-3">
                            <Image
                              source={{ uri: photo.uri }}
                              className="w-24 h-24 rounded-lg"
                            />
                            <TouchableOpacity 
                              onPress={() => removePhoto(photo.id)}
                              className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1"
                            >
                              <MaterialIcons name="close" size={14} color="white" />
                            </TouchableOpacity>
                          </View>
                        ))}
                      </ScrollView>
                    )}
                  </>
                )}
              </View>
            </View>
          </View>
        )}
      </View>

      {/* Confirm Booking Button */}
      <TouchableOpacity 
        className="bg-green-600 rounded-lg py-4 px-6 flex-row justify-center items-center mb-8"
        onPress={handleConfirmBooking}
        disabled={loading || uploading}
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-bold text-lg">Confirm Booking</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CustomerDetailsScreen;