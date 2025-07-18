// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
// import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
// import * as ImagePicker from 'expo-image-picker';
// import { useNavigation } from '@react-navigation/native';

// const RequestEstimateScreen = () => {
//   const navigation = useNavigation();
//   const [selectedService, setSelectedService] = useState(null);
//   const [street, setStreet] = useState('');
//   const [city, setCity] = useState('');
//   const [state, setState] = useState('');
//   const [zipCode, setZipCode] = useState('');
//   const [propertySize, setPropertySize] = useState('');
//   const [additionalDetails, setAdditionalDetails] = useState('');
//   const [budgetFrom, setBudgetFrom] = useState('');
//   const [budgetTo, setBudgetTo] = useState('');
//   const [propertyImages, setPropertyImages] = useState([]);
//   const [showServiceDropdown, setShowServiceDropdown] = useState(false);

//   const services = [
//     { label: 'Lawn Mowing', value: 'lawn_mowing' },
//     { label: 'Fertilization', value: 'fertilization' },
//     { label: 'Aeration', value: 'aeration' },
//     { label: 'Landscape Design', value: 'landscape_design' },
//   ];

//   const pickImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setPropertyImages([...propertyImages, result.assets[0].uri]);
//     }
//   };

//   const takePhoto = async () => {
//     let result = await ImagePicker.launchCameraAsync({
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setPropertyImages([...propertyImages, result.assets[0].uri]);
//     }
//   };

//   const handleSubmit = () => {
//     if (!selectedService || !street || !city || !state || !zipCode || !budgetFrom || !budgetTo) return;

//     const propertyAddress = `${street}, ${city}, ${state} ${zipCode}`;
    
//     const estimateData = {
//       service: services.find(s => s.value === selectedService)?.label,
//       propertyAddress,
//       propertySize,
//       budgetRange: `${budgetFrom}-${budgetTo}`,
//     };

//     // Reset form
//     setSelectedService(null);
//     setStreet('');
//     setCity('');
//     setState('');
//     setZipCode('');
//     setPropertySize('');
//     setAdditionalDetails('');
//     setBudgetFrom('');
//     setBudgetTo('');
//     setPropertyImages([]);

//     // Navigate to MyEstimates with reset action
//     navigation.navigate('MyEstimates', { 
//       newEstimate: {
//         service: services.find(s => s.value === selectedService)?.label,
//         propertyAddress,
//         budgetRange: `${budgetFrom}-${budgetTo}`
//       }
//     });
//   };

//   return (
//     <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
//       {/* <Text style={styles.header}>Request Estimate</Text> */}
      
//       {/* Service Selection */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Select Service</Text>
//         <TouchableOpacity 
//           style={styles.dropdownButton}
//           onPress={() => setShowServiceDropdown(!showServiceDropdown)}
//         >
//           <Text style={styles.dropdownText}>
//             {services.find(s => s.value === selectedService)?.label || 'Select a service...'}
//           </Text>
//           <MaterialIcons 
//             name={showServiceDropdown ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
//             size={24} 
//             color="#666" 
//           />
//         </TouchableOpacity>
        
//         {showServiceDropdown && (
//           <View style={styles.dropdownMenu}>
//             {services.map(service => (
//               <TouchableOpacity
//                 key={service.value}
//                 style={styles.dropdownItem}
//                 onPress={() => {
//                   setSelectedService(service.value);
//                   setShowServiceDropdown(false);
//                 }}
//               >
//                 <Text>{service.label}</Text>
//               </TouchableOpacity>
//             ))}
//           </View>
//         )}
//       </View>

//       {/* Property Address */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Property Address</Text>
        
//         <Text style={styles.subLabel}>Street</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter street address"
//           value={street}
//           onChangeText={setStreet}
//         />
        
//         <View style={styles.row}>
//           <View style={[styles.column, { flex: 2 }]}>
//             <Text style={styles.subLabel}>City</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="City"
//               value={city}
//               onChangeText={setCity}
//             />
//           </View>
          
//           <View style={[styles.column, { flex: 1, marginLeft: 10 }]}>
//             <Text style={styles.subLabel}>State</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="State"
//               value={state}
//               onChangeText={setState}
//               maxLength={2}
//               autoCapitalize="characters"
//             />
//           </View>
//         </View>
        
//         <Text style={styles.subLabel}>Zip Code</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Zip code"
//           keyboardType="numeric"
//           value={zipCode}
//           onChangeText={setZipCode}
//           maxLength={5}
//         />
//       </View>

//       {/* Property Size */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Property Size</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter property size in square feet"
//           keyboardType="numeric"
//           value={propertySize}
//           onChangeText={setPropertySize}
//         />
//       </View>

//       {/* Additional Property Details */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Additional Property Details</Text>
//         <TextInput
//           style={[styles.input, styles.textArea]}
//           multiline
//           numberOfLines={4}
//           placeholder="Any additional details about your property (landscape features, special requirements, etc.)"
//           value={additionalDetails}
//           onChangeText={setAdditionalDetails}
//         />
//       </View>

//       {/* Budget Range */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Budget Range ($)</Text>
//         <View style={styles.budgetContainer}>
//           <TextInput
//             style={[styles.input, styles.budgetInput]}
//             placeholder="From"
//             keyboardType="numeric"
//             value={budgetFrom}
//             onChangeText={setBudgetFrom}
//           />
//           <Text style={styles.budgetSeparator}>to</Text>
//           <TextInput
//             style={[styles.input, styles.budgetInput]}
//             placeholder="To"
//             keyboardType="numeric"
//             value={budgetTo}
//             onChangeText={setBudgetTo}
//           />
//         </View>
//       </View>

//       {/* Property Photos */}
//       <View style={styles.inputContainer}>
//         <Text style={styles.label}>Property Photos</Text>
//         <View style={styles.photoButtons}>
//           <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
//             <FontAwesome name="photo" size={20} color="#fff" />
//             <Text style={styles.photoButtonText}>Gallery</Text>
//           </TouchableOpacity>
//           <TouchableOpacity style={styles.photoButton} onPress={takePhoto}>
//             <FontAwesome name="camera" size={20} color="#fff" />
//             <Text style={styles.photoButtonText}>Camera</Text>
//           </TouchableOpacity>
//         </View>
        
//         {/* Display selected images */}
//         <ScrollView horizontal style={styles.imagesContainer}>
//           {propertyImages.map((uri, index) => (
//             <View key={index} style={styles.imageWrapper}>
//               <Image source={{ uri }} style={styles.image} />
//               <TouchableOpacity 
//                 style={styles.deleteImageButton} 
//                 onPress={() => setPropertyImages(propertyImages.filter((_, i) => i !== index))}
//               >
//                 <MaterialIcons name="close" size={16} color="#fff" />
//               </TouchableOpacity>
//             </View>
//           ))}
//         </ScrollView>
//       </View>

//       {/* Submit Button */}
//       <TouchableOpacity 
//         style={[
//           styles.submitButton,
//           (!selectedService || !street || !city || !state || !zipCode || !budgetFrom || !budgetTo) && styles.disabledButton
//         ]} 
//         onPress={handleSubmit}
//         disabled={!selectedService || !street || !city || !state || !zipCode || !budgetFrom || !budgetTo}
//       >
//         <Text style={styles.submitButtonText}>Submit Estimate Request</Text>
//       </TouchableOpacity>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F9FAFB',
//   },
//   contentContainer: {
//     padding: 20,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     color: '#111827',
//   },
//   inputContainer: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: '500',
//     marginBottom: 8,
//     color: '#374151',
//   },
//   subLabel: {
//     fontSize: 14,
//     color: '#6B7280',
//     marginBottom: 4,
//     marginTop: 8,
//   },
//   dropdownButton: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 12,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     borderRadius: 8,
//     backgroundColor: '#fff',
//   },
//   dropdownText: {
//     fontSize: 16,
//     color: '#111827',
//   },
//   dropdownMenu: {
//     marginTop: 4,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     borderRadius: 8,
//     backgroundColor: '#fff',
//   },
//   dropdownItem: {
//     padding: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#F3F4F6',
//   },
//   input: {
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//     color: '#111827',
//   },
//   textArea: {
//     height: 100,
//     textAlignVertical: 'top',
//   },
//   row: {
//     flexDirection: 'row',
//   },
//   column: {
//     flexDirection: 'column',
//   },
//   budgetContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   budgetInput: {
//     flex: 1,
//   },
//   budgetSeparator: {
//     marginHorizontal: 10,
//     color: '#6B7280',
//   },
//   photoButtons: {
//     flexDirection: 'row',
//     marginBottom: 10,
//   },
//   photoButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#10B981',
//     paddingVertical: 10,
//     paddingHorizontal: 15,
//     borderRadius: 8,
//     marginRight: 10,
//   },
//   photoButtonText: {
//     color: '#fff',
//     marginLeft: 8,
//     fontWeight: '500',
//   },
//   imagesContainer: {
//     marginTop: 10,
//   },
//   imageWrapper: {
//     position: 'relative',
//     marginRight: 10,
//   },
//   image: {
//     width: 100,
//     height: 100,
//     borderRadius: 8,
//   },
//   deleteImageButton: {
//     position: 'absolute',
//     top: 5,
//     right: 5,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     borderRadius: 10,
//     width: 20,
//     height: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   submitButton: {
//     backgroundColor: '#10B981',
//     padding: 16,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   disabledButton: {
//     backgroundColor: '#9CA3AF',
//   },
//   submitButtonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 16,
//   },
// });

// export default RequestEstimateScreen;

















import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, Alert, Platform } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { TENANT_CONFIG } from '../config/constants';

const RequestEstimateScreen = () => {
  const navigation = useNavigation();
  const [selectedService, setSelectedService] = useState(null);
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [propertySize, setPropertySize] = useState('');
  const [additionalDetails, setAdditionalDetails] = useState('');
  const [budgetFrom, setBudgetFrom] = useState('');
  const [budgetTo, setBudgetTo] = useState('');
  const [propertyImages, setPropertyImages] = useState([]);
  const [showServiceDropdown, setShowServiceDropdown] = useState(false);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch services on component mount
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(`${TENANT_CONFIG.API_BASE_URL}/services`, {
          headers: {
            'Authorization': `Bearer ${token}`,
             'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
            'x-tenant-id': TENANT_CONFIG.ID
          }
        });
        setServices(response.data.data.map(service => ({
          label: service.name,
          value: service._id
        })));
      } catch (error) {
        console.error('Error fetching services:', error);
        Alert.alert('Error', 'Failed to load services');
      }
    };

    fetchServices();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPropertyImages([...propertyImages, result.assets[0].uri]);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPropertyImages([...propertyImages, result.assets[0].uri]);
    }
  };

  const uploadImages = async (estimateId) => {
    const token = await AsyncStorage.getItem('token');
    
    const uploadPromises = propertyImages.map(async (uri) => {
      const formData = new FormData();
      
      // Extract filename from URI
      const filename = uri.split('/').pop();
      
      // Determine file type (simplified approach for React Native)
      let fileType = 'image/jpeg'; // default to jpeg
      if (uri.endsWith('.png')) fileType = 'image/png';
      if (uri.endsWith('.gif')) fileType = 'image/gif';
      
      formData.append('photos', {
        uri,
        name: filename,
        type: fileType
      });
      
      try {
        const response = await axios.post(
          `${TENANT_CONFIG.API_BASE_URL}/estimates/${estimateId}/photos`,
          formData,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
               'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
              'x-tenant-id': TENANT_CONFIG.ID
            }
          }
        );
        return response.data;
      } catch (error) {
        console.error('Error uploading image:', error);
        return null;
      }
    });
    
    return Promise.all(uploadPromises);
  };

  const handleSubmit = async () => {
    if (!selectedService || !street || !city || !state || !zipCode || !budgetFrom || !budgetTo) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    setLoading(true);

    try {
      const token = await AsyncStorage.getItem('token');
      
      // Prepare the estimate data
      const estimateData = {
        tenantId: TENANT_CONFIG.ID,
        services: [{
          service: selectedService,
          quantity: 1
        }],
        property: {
          address: {
            street,
            city,
            state,
            zipCode
          },
          size: propertySize ? parseInt(propertySize) : undefined,
          details: additionalDetails
        },
        budget: {
          min: parseInt(budgetFrom),
          max: parseInt(budgetTo)
        }
      };

      // Create the estimate
      const response = await axios.post(
        `${TENANT_CONFIG.API_BASE_URL}/estimates/request`,
        estimateData,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
            'x-tenant-id': TENANT_CONFIG.ID
          }
        }
      );

      const estimate = response.data.data;

      // Upload images if any
      if (propertyImages.length > 0) {
        await uploadImages(estimate._id);
      }

      // Reset form
      setSelectedService(null);
      setStreet('');
      setCity('');
      setState('');
      setZipCode('');
      setPropertySize('');
      setAdditionalDetails('');
      setBudgetFrom('');
      setBudgetTo('');
      setPropertyImages([]);

      // Navigate to MyEstimates with the new estimate
      navigation.navigate('MyEstimates', { 
        newEstimate: {
          service: services.find(s => s.value === selectedService)?.label,
          propertyAddress: `${street}, ${city}, ${state} ${zipCode}`,
          budgetRange: `${budgetFrom}-${budgetTo}`,
          estimateNumber: estimate.estimateNumber,
          status: estimate.status
        }
      });

    } catch (error) {
      console.error('Error creating estimate:', error);
      Alert.alert('Error', 'Failed to submit estimate. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Service Selection */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Select Service</Text>
        <TouchableOpacity 
          style={styles.dropdownButton}
          onPress={() => setShowServiceDropdown(!showServiceDropdown)}
        >
          <Text style={styles.dropdownText}>
            {services.find(s => s.value === selectedService)?.label || 'Select a service...'}
          </Text>
          <MaterialIcons 
            name={showServiceDropdown ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
            size={24} 
            color="#666" 
          />
        </TouchableOpacity>
        
        {showServiceDropdown && (
          <View style={styles.dropdownMenu}>
            {services.map(service => (
              <TouchableOpacity
                key={service.value}
                style={styles.dropdownItem}
                onPress={() => {
                  setSelectedService(service.value);
                  setShowServiceDropdown(false);
                }}
              >
                <Text>{service.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      {/* Property Address */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Property Address</Text>
        
        <Text style={styles.subLabel}>Street</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter street address"
          value={street}
          onChangeText={setStreet}
        />
        
        <View style={styles.row}>
          <View style={[styles.column, { flex: 2 }]}>
            <Text style={styles.subLabel}>City</Text>
            <TextInput
              style={styles.input}
              placeholder="City"
              value={city}
              onChangeText={setCity}
            />
          </View>
          
          <View style={[styles.column, { flex: 1, marginLeft: 10 }]}>
            <Text style={styles.subLabel}>State</Text>
            <TextInput
              style={styles.input}
              placeholder="State"
              value={state}
              onChangeText={setState}
              maxLength={2}
              autoCapitalize="characters"
            />
          </View>
        </View>
        
        <Text style={styles.subLabel}>Zip Code</Text>
        <TextInput
          style={styles.input}
          placeholder="Zip code"
          keyboardType="numeric"
          value={zipCode}
          onChangeText={setZipCode}
          maxLength={5}
        />
      </View>

      {/* Property Size */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Property Size</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter property size in square feet"
          keyboardType="numeric"
          value={propertySize}
          onChangeText={setPropertySize}
        />
      </View>

      {/* Additional Property Details */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Additional Property Details</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          multiline
          numberOfLines={4}
          placeholder="Any additional details about your property (landscape features, special requirements, etc.)"
          value={additionalDetails}
          onChangeText={setAdditionalDetails}
        />
      </View>

      {/* Budget Range */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Budget Range ($)</Text>
        <View style={styles.budgetContainer}>
          <TextInput
            style={[styles.input, styles.budgetInput]}
            placeholder="From"
            keyboardType="numeric"
            value={budgetFrom}
            onChangeText={setBudgetFrom}
          />
          <Text style={styles.budgetSeparator}>to</Text>
          <TextInput
            style={[styles.input, styles.budgetInput]}
            placeholder="To"
            keyboardType="numeric"
            value={budgetTo}
            onChangeText={setBudgetTo}
          />
        </View>
      </View>

      {/* Property Photos */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Property Photos</Text>
        <View style={styles.photoButtons}>
          <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
            <FontAwesome name="photo" size={20} color="#fff" />
            <Text style={styles.photoButtonText}>Gallery</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.photoButton} onPress={takePhoto}>
            <FontAwesome name="camera" size={20} color="#fff" />
            <Text style={styles.photoButtonText}>Camera</Text>
          </TouchableOpacity>
        </View>
        
        {/* Display selected images */}
        <ScrollView horizontal style={styles.imagesContainer}>
          {propertyImages.map((uri, index) => (
            <View key={index} style={styles.imageWrapper}>
              <Image source={{ uri }} style={styles.image} />
              <TouchableOpacity 
                style={styles.deleteImageButton} 
                onPress={() => setPropertyImages(propertyImages.filter((_, i) => i !== index))}
              >
                <MaterialIcons name="close" size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Submit Button */}
      <TouchableOpacity 
        style={[
          styles.submitButton,
          (!selectedService || !street || !city || !state || !zipCode || !budgetFrom || !budgetTo) && styles.disabledButton
        ]} 
        onPress={handleSubmit}
        disabled={!selectedService || !street || !city || !state || !zipCode || !budgetFrom || !budgetTo || loading}
      >
        <Text style={styles.submitButtonText}>
          {loading ? 'Submitting...' : 'Submit Estimate Request'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#111827',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#374151',
  },
  subLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
    marginTop: 8,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  dropdownText: {
    fontSize: 16,
    color: '#111827',
  },
  dropdownMenu: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#111827',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  budgetContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  budgetInput: {
    flex: 1,
  },
  budgetSeparator: {
    marginHorizontal: 10,
    color: '#6B7280',
  },
  photoButtons: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  photoButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#10B981',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginRight: 10,
  },
  photoButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontWeight: '500',
  },
  imagesContainer: {
    marginTop: 10,
  },
  imageWrapper: {
    position: 'relative',
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  deleteImageButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#10B981',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#9CA3AF',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default RequestEstimateScreen;