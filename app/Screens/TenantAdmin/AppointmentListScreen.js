// import React, { useState, useEffect } from 'react';
// import { 
//   View, 
//   Text, 
//   StyleSheet, 
//   TouchableOpacity, 
//   FlatList,
//   ActivityIndicator,
//   RefreshControl,
//   Alert,
//   Dimensions,
//   Platform,
//   Modal,
//   TextInput,
//   ScrollView,
//   Image,
//   Pressable
// } from 'react-native';
// import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { TENANT_CONFIG } from '../../config/constants';
// import { format, parseISO } from 'date-fns';
// import { LinearGradient } from 'expo-linear-gradient';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import * as ImagePicker from 'expo-image-picker';
// import * as FileSystem from 'expo-file-system';

// const { width } = Dimensions.get('window');
// const isIOS = Platform.OS === 'ios';

// const statusOptions = ['Scheduled', 'In Progress', 'Completed', 'Cancelled', 'Rescheduled'];
// const packageTypeOptions = ['Basic', 'Standard', 'Premium'];
// const recurringTypeOptions = ['One-time', 'Weekly', 'Bi-weekly', 'Monthly', 'Quarterly', 'Annually'];

// const AppointmentListScreen = () => {
//   const navigation = useNavigation();
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [selectedAppointment, setSelectedAppointment] = useState(null);
//   const [viewModalVisible, setViewModalVisible] = useState(false);
//   const [editModalVisible, setEditModalVisible] = useState(false);
//   const [editedAppointment, setEditedAppointment] = useState({
//     date: new Date(),
//     timeSlot: { startTime: '', endTime: '' },
//     status: 'Scheduled',
//     packageType: 'Standard',
//     recurringType: 'One-time',
//     notes: {
//       customer: '',
//       professional: '',
//       internal: ''
//     }
//   });
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [showTimeSlotModal, setShowTimeSlotModal] = useState(false);
//   const [timeSlots, setTimeSlots] = useState([]);
//   const [loadingTimeSlots, setLoadingTimeSlots] = useState(false);
//   const [uploadingPhotos, setUploadingPhotos] = useState(false);
//   const [photoType, setPhotoType] = useState('beforeService');
//   const [selectedPhotos, setSelectedPhotos] = useState([]);

//   useEffect(() => {
//     fetchAppointments();
//     (async () => {
//       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Permission required', 'We need camera roll permissions to upload photos');
//       }
//     })();
//   }, []);

//   const fetchAppointments = async () => {
//     try {
//       setRefreshing(true);
//       const token = await AsyncStorage.getItem('token');
      
//       const response = await axios.get(`${TENANT_CONFIG.API_BASE_URL}/appointments`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
//           'X-Tenant-ID': TENANT_CONFIG.ID
//         }
//       });

//       const transformedAppointments = response.data.data.map(appointment => ({
//         id: appointment._id,
//         appointmentId: appointment._id,
//         customerName: appointment.customer?.user?.name || 'Unknown Customer',
//         service: appointment.service?.name || 'Service',
//         date: format(parseISO(appointment.date), 'yyyy-MM-dd'),
//         timeSlot: appointment.timeSlot || { startTime: '10:00', endTime: '11:00' },
//         status: appointment.status || 'Scheduled',
//         packageType: appointment.packageType || 'Standard',
//         recurringType: appointment.recurringType || 'One-time',
//         address: appointment.address || 'No address provided',
//         notes: appointment.notes || { customer: '', professional: '', internal: '' },
//         photos: appointment.photos || { beforeService: [], afterService: [] },
//         originalData: appointment
//       }));

//       setAppointments(transformedAppointments);
//     } catch (error) {
//       console.error('Error fetching appointments:', error);
//       Alert.alert('Error', 'Failed to fetch appointments');
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   const fetchTimeSlots = async (serviceId, date) => {
//     try {
//       setLoadingTimeSlots(true);
//       const token = await AsyncStorage.getItem('token');
      
//       const response = await axios.get(`${TENANT_CONFIG.API_BASE_URL}/appointments/availability`, {
//         params: {
//           serviceId,
//           date: format(date, 'yyyy-MM-dd')
//         },
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
//           'X-Tenant-ID': TENANT_CONFIG.ID
//         }
//       });

//       setTimeSlots(response.data.data || []);
//     } catch (error) {
//       console.error('Error fetching time slots:', error);
//       Alert.alert('Error', 'Failed to fetch available time slots');
//     } finally {
//       setLoadingTimeSlots(false);
//     }
//   };

//   const handleViewAppointment = (appointment) => {
//     setSelectedAppointment(appointment);
//     setViewModalVisible(true);
//   };

//   const handleEditAppointment = (appointment) => {
//     setSelectedAppointment(appointment);
//     setEditedAppointment({
//       date: new Date(appointment.date),
//       timeSlot: appointment.timeSlot,
//       status: appointment.status,
//       packageType: appointment.packageType,
//       recurringType: appointment.recurringType,
//       notes: appointment.notes
//     });
//     setEditModalVisible(true);
//     setSelectedPhotos([]);
//     setPhotoType('beforeService');
//   };

//   const handleDateChange = async (event, selectedDate) => {
//     setShowDatePicker(false);
//     if (selectedDate) {
//       const newDate = selectedDate;
//       setEditedAppointment(prev => ({
//         ...prev,
//         date: newDate,
//         timeSlot: { startTime: '', endTime: '' } // Reset time slot when date changes
//       }));
      
//       // Fetch time slots for the new date
//       if (selectedAppointment?.originalData?.service?._id) {
//         await fetchTimeSlots(selectedAppointment.originalData.service._id, newDate);
//         setShowTimeSlotModal(true);
//       }
//     }
//   };

//   const handleTimeSlotSelect = (slot) => {
//     setEditedAppointment(prev => ({
//       ...prev,
//       timeSlot: {
//         startTime: slot.startTime,
//         endTime: slot.endTime
//       }
//     }));
//     setShowTimeSlotModal(false);
//   };

//   const pickImages = async () => {
//     try {
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: ImagePicker.MediaTypeOptions.Images,
//         allowsMultipleSelection: true,
//         quality: 0.8,
//         aspect: [4, 3],
//       });

//       if (!result.canceled) {
//         const photos = result.assets.map((asset, index) => ({
//           uri: asset.uri,
//           type: asset.mimeType || 'image/jpeg',
//           name: asset.fileName || `photo_${Date.now()}_${index}.jpg`
//         }));
//         setSelectedPhotos(prev => [...prev, ...photos]);
//       }
//     } catch (error) {
//       console.error('Error picking images:', error);
//       Alert.alert('Error', 'Failed to pick images');
//     }
//   };

//    const uploadPhotos = async () => {
//     if (selectedPhotos.length === 0) {
//       Alert.alert('Error', 'Please select at least one photo');
//       return;
//     }

//     try {
//       setUploadingPhotos(true);
//       const token = await AsyncStorage.getItem('token');
      
//       // Convert selected photos to base64
//       const photosWithBase64 = await Promise.all(
//         selectedPhotos.map(async (photo) => {
//           const base64 = await FileSystem.readAsStringAsync(photo.uri, {
//             encoding: FileSystem.EncodingType.Base64,
//           });
//           return {
//             name: photo.name,
//             contentType: photo.type,
//             data: base64,
//           };
//         })
//       );

//       const response = await fetch(
//         `${TENANT_CONFIG.API_BASE_URL}/appointments/${selectedAppointment.id}/photos`,
//         {
//           method: 'POST',
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
//             'X-Tenant-ID': TENANT_CONFIG.ID,
//             'Content-Type': 'application/json',
//           },
//           body: JSON.stringify({
//             photos: photosWithBase64,
//             photoType: photoType
//           }),
//         }
//       );

//       const responseData = await response.json();

//       if (!response.ok) {
//         throw new Error(responseData.error || 'Upload failed');
//       }

//       if (responseData.success) {
//         Alert.alert('Success', 'Photos uploaded successfully');
//         // Update the local state to show the new photos immediately
//         const updatedAppointment = {
//           ...selectedAppointment,
//           photos: {
//             ...selectedAppointment.photos,
//             [photoType]: [
//               ...(selectedAppointment.photos[photoType] || []),
//               ...responseData.data // Assuming the API returns the uploaded photos
//             ]
//           }
//         };
//         setSelectedAppointment(updatedAppointment);
        
//         // Update the appointments list
//         setAppointments(appointments.map(app => 
//           app.id === selectedAppointment.id ? updatedAppointment : app
//         ));
        
//         setSelectedPhotos([]);
//       }
//     } catch (error) {
//       console.error('Upload error:', error);
//       Alert.alert('Upload Failed', error.message || 'Failed to upload photos');
//     } finally {
//       setUploadingPhotos(false);
//     }
//   };

//   const updateAppointment = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
      
//       const response = await axios.put(
//         `${TENANT_CONFIG.API_BASE_URL}/appointments/${selectedAppointment.id}`,
//         {
//           date: format(editedAppointment.date, 'yyyy-MM-dd'),
//           timeSlot: editedAppointment.timeSlot,
//           status: editedAppointment.status,
//           notes: editedAppointment.notes
//         },
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
//             'X-Tenant-ID': TENANT_CONFIG.ID
//           }
//         }
//       );

//       if (response.data.success) {
//         Alert.alert('Success', 'Appointment updated successfully');
//         fetchAppointments();
//         setEditModalVisible(false);
//       } else {
//         throw new Error(response.data.error || 'Failed to update appointment');
//       }
//     } catch (error) {
//       console.error('Error updating appointment:', error);
//       Alert.alert('Error', error.response?.data?.error || 'Failed to update appointment');
//     }
//   };

//   const renderAppointmentItem = ({ item }) => (
//     <View style={styles.appointmentCard}>
//       <LinearGradient
//         colors={['#ffffff', '#f8f9fa']}
//         start={[0, 0]}
//         end={[1, 1]}
//         style={styles.cardBackground}
//       >
//         <View style={styles.appointmentHeader}>
//           <View style={styles.customerInfo}>
//             <Ionicons name="person-circle" size={24} color="#495057" />
//             <Text style={styles.customerName}>{item.customerName}</Text>
//           </View>
//           <View style={[
//             styles.statusBadge, 
//             item.status === 'Scheduled' ? styles.scheduledStatus :
//             item.status === 'In Progress' ? styles.inProgressStatus :
//             item.status === 'Completed' ? styles.completedStatus :
//             item.status === 'Cancelled' ? styles.cancelledStatus :
//             styles.rescheduledStatus
//           ]}>
//             <Text style={styles.statusText}>{item.status}</Text>
//           </View>
//         </View>
        
//         <View style={styles.detailRow}>
//           <MaterialIcons name="design-services" size={18} color="#6c757d" />
//           <Text style={styles.serviceText}>{item.service}</Text>
//         </View>
        
//         <View style={styles.detailRow}>
//           <Ionicons name="calendar" size={16} color="#6c757d" />
//           <Text style={styles.detailText}>{item.date}</Text>
//           <Ionicons name="time" size={16} color="#6c757d" style={styles.iconSpacing} />
//           <Text style={styles.detailText}>{item.timeSlot.startTime} - {item.timeSlot.endTime}</Text>
//         </View>

//         <View style={styles.detailRow}>
//           <Ionicons name="cube" size={16} color="#6c757d" />
//           <Text style={styles.detailText}>{item.packageType} Package</Text>
//         </View>
        
//         <View style={styles.actionButtons}>
//           <TouchableOpacity 
//             style={[styles.actionButton, styles.viewButton]}
//             onPress={() => handleViewAppointment(item)}
//           >
//             <FontAwesome name="eye" size={14} color="#fff" />
//             <Text style={styles.actionButtonText}>View</Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity 
//             style={[styles.actionButton, styles.editButton]}
//             onPress={() => handleEditAppointment(item)}
//           >
//             <MaterialIcons name="edit" size={14} color="#fff" />
//             <Text style={styles.actionButtonText}>Edit</Text>
//           </TouchableOpacity>
//         </View>
//       </LinearGradient>
//     </View>
//   );

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#4CAF50" />
//         <Text style={styles.loadingText}>Loading Appointments...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <LinearGradient
//         colors={['#4CAF50', '#2E7D32']}
//         style={styles.header}
//       >
//         <Text style={styles.headerTitle}>Appointments</Text>
//         <TouchableOpacity style={styles.refreshButton} onPress={fetchAppointments}>
//           <Ionicons name="refresh" size={24} color="#fff" />
//         </TouchableOpacity>
//       </LinearGradient>
      
//       <FlatList
//         data={appointments}
//         renderItem={renderAppointmentItem}
//         keyExtractor={item => item.id}
//         contentContainerStyle={styles.listContent}
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={fetchAppointments}
//             colors={['#4CAF50']}
//             tintColor="#4CAF50"
//           />
//         }
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Ionicons name="calendar" size={48} color="#adb5bd" />
//             <Text style={styles.emptyText}>No Appointments Found</Text>
//             <Text style={styles.emptySubtext}>Pull to refresh or create a new appointment</Text>
//           </View>
//         }
//       />

//       {/* View Appointment Modal */}
//       <Modal
//         visible={viewModalVisible}
//         animationType="slide"
//         transparent={false}
//         onRequestClose={() => setViewModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalHeader}>
//             <Text style={styles.modalTitle}>Appointment Details</Text>
//             <TouchableOpacity onPress={() => setViewModalVisible(false)}>
//               <Ionicons name="close" size={24} color="#6B7280" />
//             </TouchableOpacity>
//           </View>

//           <ScrollView style={styles.modalContent}>
//             {selectedAppointment && (
//               <>
//                 <View style={styles.detailSection}>
//                   <Text style={styles.detailLabel}>Customer:</Text>
//                   <Text style={styles.detailValue}>{selectedAppointment.customerName}</Text>
//                 </View>

//                 <View style={styles.detailSection}>
//                   <Text style={styles.detailLabel}>Service:</Text>
//                   <Text style={styles.detailValue}>{selectedAppointment.service}</Text>
//                 </View>

//                 <View style={styles.detailSection}>
//                   <Text style={styles.detailLabel}>Date:</Text>
//                   <Text style={styles.detailValue}>{selectedAppointment.date}</Text>
//                 </View>

//                 <View style={styles.detailSection}>
//                   <Text style={styles.detailLabel}>Time Slot:</Text>
//                   <Text style={styles.detailValue}>
//                     {selectedAppointment.timeSlot.startTime} - {selectedAppointment.timeSlot.endTime}
//                   </Text>
//                 </View>

//                 <View style={styles.detailSection}>
//                   <Text style={styles.detailLabel}>Status:</Text>
//                   <View style={[
//                     styles.statusBadge, 
//                     selectedAppointment.status === 'Scheduled' ? styles.scheduledStatus :
//                     selectedAppointment.status === 'In Progress' ? styles.inProgressStatus :
//                     selectedAppointment.status === 'Completed' ? styles.completedStatus :
//                     selectedAppointment.status === 'Cancelled' ? styles.cancelledStatus :
//                     styles.rescheduledStatus,
//                     { marginLeft: 0 }
//                   ]}>
//                     <Text style={styles.statusText}>{selectedAppointment.status}</Text>
//                   </View>
//                 </View>

//                 <View style={styles.detailSection}>
//                   <Text style={styles.detailLabel}>Package Type:</Text>
//                   <Text style={styles.detailValue}>{selectedAppointment.packageType}</Text>
//                 </View>

//                 <View style={styles.detailSection}>
//                   <Text style={styles.detailLabel}>Recurring Type:</Text>
//                   <Text style={styles.detailValue}>{selectedAppointment.recurringType}</Text>
//                 </View>

//                 <View style={styles.detailSection}>
//                   <Text style={styles.detailLabel}>Address:</Text>
//                   <Text style={styles.detailValue}>{selectedAppointment.address}</Text>
//                 </View>

               

//                 {selectedAppointment.notes?.internal && (
//                   <View style={styles.detailSection}>
//                     <Text style={styles.detailLabel}>Notes:</Text>
//                     <Text style={styles.detailValue}>{selectedAppointment.notes.internal}</Text>
//                   </View>
//                 )}

//                 {selectedAppointment.photos?.beforeService?.length > 0 && (
//                   <View style={styles.detailSection}>
//                     <Text style={styles.detailLabel}>Before Service Photos:</Text>
//                     <View style={styles.photosContainer}>
//                       {selectedAppointment.photos.beforeService.map((photo, index) => (
//                         <Image
//                           key={`before-${index}`}
//                           source={{ uri: photo.url }}
//                           style={styles.photoThumbnail}
//                         />
//                       ))}
//                     </View>
//                   </View>
//                 )}

//                 {selectedAppointment.photos?.afterService?.length > 0 && (
//                   <View style={styles.detailSection}>
//                     <Text style={styles.detailLabel}>After Service Photos:</Text>
//                     <View style={styles.photosContainer}>
//                       {selectedAppointment.photos.afterService.map((photo, index) => (
//                         <Image
//                           key={`after-${index}`}
//                           source={{ uri: photo.url }}
//                           style={styles.photoThumbnail}
//                         />
//                       ))}
//                     </View>
//                   </View>
//                 )}
//               </>
//             )}
//           </ScrollView>

//           <View style={styles.modalFooter}>
//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={() => setViewModalVisible(false)}
//             >
//               <Text style={styles.closeButtonText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       {/* Edit Appointment Modal */}
//       <Modal
//         visible={editModalVisible}
//         animationType="slide"
//         transparent={false}
//         onRequestClose={() => setEditModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalHeader}>
//             <Text style={styles.modalTitle}>Edit Appointment</Text>
//             <TouchableOpacity onPress={() => setEditModalVisible(false)}>
//               <Ionicons name="close" size={24} color="#6B7280" />
//             </TouchableOpacity>
//           </View>

//           <ScrollView style={styles.modalContent}>
//             {selectedAppointment && (
//               <>
//                 <View style={styles.inputGroup}>
//                   <Text style={styles.inputLabel}>Date</Text>
//                   <TouchableOpacity
//                     style={styles.dateInput}
//                     onPress={() => setShowDatePicker(true)}
//                   >
//                     <Text>{format(editedAppointment.date, 'yyyy-MM-dd')}</Text>
//                     <Ionicons name="calendar" size={20} color="#6B7280" style={styles.inputIcon} />
//                   </TouchableOpacity>
//                   {showDatePicker && (
//                     <DateTimePicker
//                       value={editedAppointment.date}
//                       mode="date"
//                       display="default"
//                       onChange={handleDateChange}
//                     />
//                   )}
//                 </View>

//                 <View style={styles.inputGroup}>
//                   <Text style={styles.inputLabel}>Time Slot</Text>
//                   <TouchableOpacity
//                     style={styles.dateInput}
//                     onPress={() => {
//                       if (selectedAppointment?.originalData?.service?._id) {
//                         fetchTimeSlots(
//                           selectedAppointment.originalData.service._id, 
//                           editedAppointment.date
//                         );
//                         setShowTimeSlotModal(true);
//                       }
//                     }}
//                     disabled={!selectedAppointment?.originalData?.service?._id}
//                   >
//                     {editedAppointment.timeSlot.startTime ? (
//                       <Text>
//                         {editedAppointment.timeSlot.startTime} - {editedAppointment.timeSlot.endTime}
//                       </Text>
//                     ) : (
//                       <Text style={styles.placeholderText}>Select time slot</Text>
//                     )}
//                     <Ionicons name="time" size={20} color="#6B7280" style={styles.inputIcon} />
//                   </TouchableOpacity>
//                 </View>

//                 <View style={styles.inputGroup}>
//                   <Text style={styles.inputLabel}>Status</Text>
//                   <View style={styles.statusOptions}>
//                     {statusOptions.map(status => (
//                       <TouchableOpacity
//                         key={status}
//                         style={[
//                           styles.statusOption,
//                           editedAppointment.status === status && styles.selectedStatusOption,
//                           status === 'Scheduled' ? styles.scheduledStatus :
//                           status === 'In Progress' ? styles.inProgressStatus :
//                           status === 'Completed' ? styles.completedStatus :
//                           status === 'Cancelled' ? styles.cancelledStatus :
//                           styles.rescheduledStatus
//                         ]}
//                         onPress={() => setEditedAppointment(prev => ({
//                           ...prev,
//                           status
//                         }))}
//                       >
//                         <Text style={styles.statusOptionText}>{status}</Text>
//                       </TouchableOpacity>
//                     ))}
//                   </View>
//                 </View>

//                 <View style={styles.inputGroup}>
//                   <Text style={styles.inputLabel}>Internal Notes</Text>
//                   <TextInput
//                     style={styles.notesInput}
//                     value={editedAppointment.notes.internal}
//                     onChangeText={(text) => setEditedAppointment(prev => ({
//                       ...prev,
//                       notes: {
//                         ...prev.notes,
//                         internal: text
//                       }
//                     }))}
//                     placeholder="Internal notes"
//                     multiline
//                   />
//                 </View>

//                  {editedAppointment.status === 'Completed' && (
//     <>
//       <View style={styles.inputGroup}>
//         <Text style={styles.inputLabel}>Photo Type</Text>
//         <View style={styles.photoTypeOptions}>
//           <TouchableOpacity
//             style={[
//               styles.photoTypeOption,
//               photoType === 'beforeService' && styles.selectedPhotoType
//             ]}
//             onPress={() => setPhotoType('beforeService')}
//           >
//             <Text>Before Service</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={[
//               styles.photoTypeOption,
//               photoType === 'afterService' && styles.selectedPhotoType
//             ]}
//             onPress={() => setPhotoType('afterService')}
//           >
//             <Text>After Service</Text>
//           </TouchableOpacity>
//         </View>
//       </View>

//       <View style={styles.inputGroup}>
//         <Text style={styles.inputLabel}>Photos</Text>
        
//         {/* Show existing photos */}
//         {selectedAppointment.photos?.[photoType]?.length > 0 && (
//           <>
//             <Text style={styles.subLabel}>Existing {photoType} photos:</Text>
//             <View style={styles.photosContainer}>
//               {selectedAppointment.photos[photoType].map((photo, index) => (
//                 <Image
//                   key={`existing-${index}`}
//                   source={{ uri: photo.url }}
//                   style={styles.photoThumbnail}
//                 />
//               ))}
//             </View>
//           </>
//         )}

//         {/* Show selected new photos */}
//         {selectedPhotos.length > 0 && (
//           <>
//             <Text style={styles.subLabel}>New photos to upload:</Text>
//             <View style={styles.photosContainer}>
//               {selectedPhotos.map((photo, index) => (
//                 <Image
//                   key={`new-${index}`}
//                   source={{ uri: photo.uri }}
//                   style={styles.photoThumbnail}
//                 />
//               ))}
//             </View>
//           </>
//         )}

//         <View style={styles.photoButtons}>
//           <Pressable
//             style={[styles.photoButton, styles.pickPhotoButton]}
//             onPress={pickImages}
//             disabled={uploadingPhotos}
//           >
//             <Text style={styles.photoButtonText}>
//               {selectedPhotos.length > 0 ? 'Add More Photos' : 'Pick Photos'}
//             </Text>
//           </Pressable>
//           {selectedPhotos.length > 0 && (
//             <Pressable
//               style={[styles.photoButton, styles.uploadPhotoButton]}
//               onPress={uploadPhotos}
//               disabled={uploadingPhotos}
//             >
//               {uploadingPhotos ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <Text style={styles.photoButtonText}>Upload Photos</Text>
//               )}
//             </Pressable>
//           )}
//         </View>
//       </View>
//     </>
//   )}
//               </>
//             )}
//           </ScrollView>

//           <View style={styles.modalFooter}>
//             <TouchableOpacity
//               style={styles.saveButton}
//               onPress={updateAppointment}
//               disabled={uploadingPhotos || !editedAppointment.timeSlot.startTime}
//             >
//               <Text style={styles.saveButtonText}>Save Changes</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.cancelButton}
//               onPress={() => setEditModalVisible(false)}
//               disabled={uploadingPhotos}
//             >
//               <Text style={styles.cancelButtonText}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       {/* Time Slot Selection Modal */}
//       <Modal
//         visible={showTimeSlotModal}
//         animationType="slide"
//         transparent={false}
//         onRequestClose={() => setShowTimeSlotModal(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalHeader}>
//             <Text style={styles.modalTitle}>Select Time Slot</Text>
//             <TouchableOpacity onPress={() => setShowTimeSlotModal(false)}>
//               <Ionicons name="close" size={24} color="#6B7280" />
//             </TouchableOpacity>
//           </View>

//           <ScrollView style={styles.modalContent}>
//             {loadingTimeSlots ? (
//               <ActivityIndicator size="large" color="#4CAF50" />
//             ) : (
//               <>
//                 <Text style={styles.timeSlotDate}>
//                   {format(editedAppointment.date, 'EEEE, MMMM d, yyyy')}
//                 </Text>
//                 {timeSlots.length > 0 ? (
//                   timeSlots.map((slot, index) => (
//                     <TouchableOpacity
//                       key={index}
//                       style={[
//                         styles.timeSlotItem,
//                         !slot.available && styles.timeSlotUnavailable,
//                         editedAppointment.timeSlot.startTime === slot.startTime && 
//                         editedAppointment.timeSlot.endTime === slot.endTime && 
//                         styles.timeSlotSelected
//                       ]}
//                       onPress={() => slot.available && handleTimeSlotSelect(slot)}
//                       disabled={!slot.available}
//                     >
//                       <Text style={[
//                         styles.timeSlotText,
//                         !slot.available && styles.timeSlotUnavailableText,
//                         editedAppointment.timeSlot.startTime === slot.startTime && 
//                         editedAppointment.timeSlot.endTime === slot.endTime && 
//                         styles.timeSlotSelectedText
//                       ]}>
//                         {slot.startTime} - {slot.endTime}
//                       </Text>
//                       {!slot.available && (
//                         <Text style={styles.timeSlotUnavailableLabel}>Booked</Text>
//                       )}
//                     </TouchableOpacity>
//                   ))
//                 ) : (
//                   <Text style={styles.noSlotsText}>No available time slots for this date</Text>
//                 )}
//               </>
//             )}
//           </ScrollView>

//           <View style={styles.modalFooter}>
//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={() => setShowTimeSlotModal(false)}
//             >
//               <Text style={styles.closeButtonText}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f9fa',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f8f9fa',
//   },
//   loadingText: {
//     marginTop: 16,
//     color: '#495057',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   header: {
//     padding: 20,
//     paddingTop: 50,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 5,
//     zIndex: 10,
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#fff',
//     textShadowColor: 'rgba(0,0,0,0.2)',
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 2,
//   },
//   refreshButton: {
//     padding: 8,
//   },
//   listContent: {
//     padding: 16,
//     paddingBottom: 20,
//   },
//   appointmentCard: {
//     borderRadius: 12,
//     marginBottom: 16,
//     overflow: 'hidden',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   cardBackground: {
//     padding: 20,
//   },
//   appointmentHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   customerInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//     marginRight: 10,
//   },
//   customerName: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#343a40',
//     marginLeft: 10,
//   },
//   statusBadge: {
//     paddingVertical: 5,
//     paddingHorizontal: 12,
//     borderRadius: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   statusText: {
//     fontSize: 12,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   scheduledStatus: {
//     backgroundColor: '#17a2b8', // cyan
//   },
//   inProgressStatus: {
//     backgroundColor: '#ffc107', // yellow
//   },
//   completedStatus: {
//     backgroundColor: '#28a745', // green
//   },
//   cancelledStatus: {
//     backgroundColor: '#dc3545', // red
//   },
//   rescheduledStatus: {
//     backgroundColor: '#6610f2', // purple
//   },
//   detailRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   serviceText: {
//     fontSize: 16,
//     color: '#495057',
//     marginLeft: 8,
//     fontWeight: '500',
//   },
//   detailText: {
//     fontSize: 14,
//     color: '#6c757d',
//     marginLeft: 8,
//   },
//   iconSpacing: {
//     marginLeft: 15,
//   },
//   actionButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 15,
//   },
//   actionButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 8,
//     paddingHorizontal: 15,
//     borderRadius: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//     minWidth: 80,
//     justifyContent: 'center',
//   },
//   viewButton: {
//     backgroundColor: '#17a2b8',
//   },
//   editButton: {
//     backgroundColor: '#ffc107',
//   },
//   actionButtonText: {
//     color: '#fff',
//     marginLeft: 6,
//     fontWeight: '500',
//     fontSize: 13,
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 40,
//     backgroundColor: 'rgba(255,255,255,0.8)',
//     borderRadius: 12,
//     marginTop: 50,
//   },
//   emptyText: {
//     fontSize: 20,
//     color: '#495057',
//     marginTop: 16,
//     fontWeight: '600',
//   },
//   emptySubtext: {
//     fontSize: 14,
//     color: '#6c757d',
//     marginTop: 8,
//     textAlign: 'center',
//   },
//   modalContainer: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E7EB',
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#111827',
//   },
//   modalContent: {
//     padding: 16,
//   },
//   modalFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 16,
//     borderTopWidth: 1,
//     borderTopColor: '#E5E7EB',
//   },
//   detailSection: {
//     marginBottom: 20,
//   },
//   detailLabel: {
//     fontSize: 14,
//     color: '#6B7280',
//     marginBottom: 4,
//   },
//   detailValue: {
//     fontSize: 16,
//     color: '#111827',
//   },
//   photosContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginTop: 8,
//   },
//   photoThumbnail: {
//     width: 80,
//     height: 80,
//     borderRadius: 8,
//     marginRight: 8,
//     marginBottom: 8,
//   },
//   closeButton: {
//     backgroundColor: '#4CAF50',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     flex: 1,
//   },
//   closeButtonText: {
//     color: '#FFFFFF',
//     fontWeight: '600',
//   },
//   inputGroup: {
//     marginBottom: 20,
//   },
//   inputLabel: {
//     fontSize: 14,
//     color: '#6B7280',
//     marginBottom: 8,
//   },
//   dateInput: {
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 12,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   inputIcon: {
//     marginLeft: 10,
//   },
//   placeholderText: {
//     color: '#9CA3AF',
//   },
//   statusOptions: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 8,
//   },
//   statusOption: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//   },
//   selectedStatusOption: {
//     borderWidth: 2,
//     borderColor: '#4CAF50',
//   },
//   statusOptionText: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#FFFFFF',
//   },
//   notesInput: {
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     borderRadius: 8,
//     padding: 12,
//     height: 100,
//     textAlignVertical: 'top',
//   },
//   photoTypeOptions: {
//     flexDirection: 'row',
//     gap: 8,
//     marginBottom: 12,
//   },
//   photoTypeOption: {
//     flex: 1,
//     padding: 12,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   selectedPhotoType: {
//     borderColor: '#4CAF50',
//     backgroundColor: '#F0F9F0',
//   },
//   photoButtons: {
//     flexDirection: 'row',
//     gap: 8,
//     marginTop: 8,
//   },
//   photoButton: {
//     flex: 1,
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   pickPhotoButton: {
//     backgroundColor: '#F3F4F6',
//   },
//   uploadPhotoButton: {
//     backgroundColor: '#4CAF50',
//   },
//   photoButtonText: {
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   saveButton: {
//     backgroundColor: '#4CAF50',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     flex: 1,
//     marginRight: 8,
//   },
//   saveButtonText: {
//     color: '#FFFFFF',
//     fontWeight: '600',
//   },
//   cancelButton: {
//     backgroundColor: '#F3F4F6',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     flex: 1,
//     marginLeft: 8,
//   },
//   cancelButtonText: {
//     color: '#6B7280',
//     fontWeight: '600',
//   },
//   timeSlotItem: {
//     padding: 16,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     borderRadius: 8,
//     marginBottom: 8,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   timeSlotText: {
//     fontSize: 16,
//     color: '#111827',
//   },
//   timeSlotUnavailable: {
//     backgroundColor: '#F3F4F6',
//     borderColor: '#F3F4F6',
//   },
//   timeSlotUnavailableText: {
//     color: '#9CA3AF',
//   },
//   timeSlotUnavailableLabel: {
//     color: '#9CA3AF',
//     fontSize: 12,
//   },
//   timeSlotSelected: {
//     borderColor: '#4CAF50',
//     backgroundColor: '#F0F9F0',
//   },
//   timeSlotSelectedText: {
//     color: '#4CAF50',
//     fontWeight: '600',
//   },
//   timeSlotDate: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#111827',
//     marginBottom: 16,
//     textAlign: 'center',
//   },
//   noSlotsText: {
//     textAlign: 'center',
//     color: '#6B7280',
//     marginTop: 20,
//   },
// });

// export default AppointmentListScreen;





















// import React, { useState, useEffect } from 'react';
// import { 
//   View, 
//   Text, 
//   StyleSheet, 
//   TouchableOpacity, 
//   FlatList,
//   ActivityIndicator,
//   RefreshControl,
//   Alert,
//   Dimensions,
//   Platform,
//   Modal,
//   TextInput,
//   ScrollView,
//   Image,
//   Pressable
// } from 'react-native';
// import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { TENANT_CONFIG } from '../../config/constants';
// import { format, parseISO } from 'date-fns';
// import { LinearGradient } from 'expo-linear-gradient';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import * as ImagePicker from 'expo-image-picker';
// import * as FileSystem from 'expo-file-system';

// const { width } = Dimensions.get('window');
// const isIOS = Platform.OS === 'ios';

// const statusOptions = ['Pending', 'Assigned', 'Completed'];

// const AppointmentListScreen = () => {
//   const navigation = useNavigation();
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [selectedAppointment, setSelectedAppointment] = useState(null);
//   const [viewModalVisible, setViewModalVisible] = useState(false);
//   const [editModalVisible, setEditModalVisible] = useState(false);
//   const [editedAppointment, setEditedAppointment] = useState({
//     date: new Date(),
//     time: '10:00',
//     status: 'Pending',
//     notes: ''
//   });
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [showTimePicker, setShowTimePicker] = useState(false);
//   const [uploadingPhotos, setUploadingPhotos] = useState(false);
//   const [photoType, setPhotoType] = useState('beforeService');
//   const [selectedPhotos, setSelectedPhotos] = useState([]);

//   useEffect(() => {
//     fetchAppointments();
//     (async () => {
//       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Permission required', 'We need camera roll permissions to upload photos');
//       }
//     })();
//   }, []);

//   const fetchAppointments = async () => {
//     try {
//       setRefreshing(true);
//       const token = await AsyncStorage.getItem('token');
      
//       const response = await axios.get(`${TENANT_CONFIG.API_BASE_URL}/appointments`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
//           'X-Tenant-ID': TENANT_CONFIG.ID
//         }
//       });

//       const transformedAppointments = response.data.data.map(appointment => ({
//         id: appointment._id,
//         appointmentId: appointment._id,
//         customerName: appointment.customer?.user?.name || 'Unknown Customer',
//         service: appointment.service?.name || 'Service',
//         date: format(parseISO(appointment.date), 'yyyy-MM-dd'),
//         time: appointment.time || '10:00',
//         status: appointment.status || 'Pending',
//         address: appointment.address || 'No address provided',
//         notes: appointment.notes || '',
//         photos: appointment.photos || { beforeService: [], afterService: [] },
//         originalData: appointment
//       }));

//       setAppointments(transformedAppointments);
//     } catch (error) {
//       console.error('Error fetching appointments:', error);
//       Alert.alert('Error', 'Failed to fetch appointments');
//     } finally {
//       setLoading(false);
//       setRefreshing(false);
//     }
//   };

//   const handleViewAppointment = (appointment) => {
//     setSelectedAppointment(appointment);
//     setViewModalVisible(true);
//   };

//   const handleEditAppointment = (appointment) => {
//     setSelectedAppointment(appointment);
//     setEditedAppointment({
//       date: new Date(appointment.date),
//       time: appointment.time,
//       status: appointment.status,
//       notes: appointment.notes
//     });
//     setEditModalVisible(true);
//     setSelectedPhotos([]);
//     setPhotoType('beforeService');
//   };

//   const handleDateChange = (event, selectedDate) => {
//     setShowDatePicker(false);
//     if (selectedDate) {
//       setEditedAppointment(prev => ({
//         ...prev,
//         date: selectedDate
//       }));
//     }
//   };

//   const handleTimeChange = (event, selectedTime) => {
//     setShowTimePicker(false);
//     if (selectedTime) {
//       const formattedTime = format(selectedTime, 'HH:mm');
//       setEditedAppointment(prev => ({
//         ...prev,
//         time: formattedTime
//       }));
//     }
//   };

//   const pickImages = async () => {
//   try {
//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsMultipleSelection: true,
//       quality: 0.8,
//       aspect: [4, 3],
//     });

//     if (!result.canceled) {
//       const photos = result.assets.map((asset, index) => ({
//         uri: asset.uri,
//         type: asset.mimeType || 'image/jpeg', // Use mimeType if available
//         name: asset.fileName || `photo_${Date.now()}_${index}.jpg`
//       }));
//       setSelectedPhotos(prev => [...prev, ...photos]);
//     }
//   } catch (error) {
//     console.error('Error picking images:', error);
//     Alert.alert('Error', 'Failed to pick images');
//   }
// };

//  const uploadPhotos = async () => {
//   if (selectedPhotos.length === 0) {
//     Alert.alert('Error', 'Please select at least one photo');
//     return;
//   }

//   try {
//     setUploadingPhotos(true);
//     const token = await AsyncStorage.getItem('token');
    
//     // Convert selected photos to base64
//     const photosWithBase64 = await Promise.all(
//       selectedPhotos.map(async (photo) => {
//         const base64 = await FileSystem.readAsStringAsync(photo.uri, {
//           encoding: FileSystem.EncodingType.Base64,
//         });
//         return {
//           name: photo.name,
//           contentType: photo.type,
//           data: base64,
//         };
//       })
//     );

//     const response = await fetch(
//       `${TENANT_CONFIG.API_BASE_URL}/appointments/${selectedAppointment.id}/photos`,
//       {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
//           'X-Tenant-ID': TENANT_CONFIG.ID,
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           photos: photosWithBase64,
//           photoType: photoType
//         }),
//       }
//     );

//     const responseData = await response.json();

//     if (!response.ok) {
//       throw new Error(responseData.error || 'Upload failed');
//     }

//     if (responseData.success) {
//       Alert.alert('Success', 'Photos uploaded successfully');
//       fetchAppointments();
//       setSelectedPhotos([]);
//     }
//   } catch (error) {
//     console.error('Upload error:', error);
//     Alert.alert('Upload Failed', error.message || 'Failed to upload photos');
//   } finally {
//     setUploadingPhotos(false);
//   }
// };
//   const updateAppointment = async () => {
//     try {
//       const token = await AsyncStorage.getItem('token');
      
//       const response = await axios.put(
//         `${TENANT_CONFIG.API_BASE_URL}/appointments/${selectedAppointment.id}`,
//         {
//           date: format(editedAppointment.date, 'yyyy-MM-dd'),
//           time: editedAppointment.time,
//           status: editedAppointment.status,
//           notes: editedAppointment.notes
//         },
//         {
//           headers: {
//             'Authorization': `Bearer ${token}`,
//             'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
//             'X-Tenant-ID': TENANT_CONFIG.ID
//           }
//         }
//       );

//       if (response.data.success) {
//         Alert.alert('Success', 'Appointment updated successfully');
//         fetchAppointments();
//         setEditModalVisible(false);
//       } else {
//         throw new Error(response.data.error || 'Failed to update appointment');
//       }
//     } catch (error) {
//       console.error('Error updating appointment:', error);
//       Alert.alert('Error', error.response?.data?.error || 'Failed to update appointment');
//     }
//   };

//   const renderAppointmentItem = ({ item }) => (
//     <View style={styles.appointmentCard}>
//       <LinearGradient
//         colors={['#ffffff', '#f8f9fa']}
//         start={[0, 0]}
//         end={[1, 1]}
//         style={styles.cardBackground}
//       >
//         <View style={styles.appointmentHeader}>
//           <View style={styles.customerInfo}>
//             <Ionicons name="person-circle" size={24} color="#495057" />
//             <Text style={styles.customerName}>{item.customerName}</Text>
//           </View>
//           <View style={[
//             styles.statusBadge, 
//             item.status === 'Pending' ? styles.pendingStatus :
//             item.status === 'Assigned' ? styles.assignedStatus :
//             styles.completedStatus
//           ]}>
//             <Text style={styles.statusText}>{item.status}</Text>
//           </View>
//         </View>
        
//         <View style={styles.detailRow}>
//           <MaterialIcons name="design-services" size={18} color="#6c757d" />
//           <Text style={styles.serviceText}>{item.service}</Text>
//         </View>
        
//         <View style={styles.detailRow}>
//           <Ionicons name="calendar" size={16} color="#6c757d" />
//           <Text style={styles.detailText}>{item.date}</Text>
//           <Ionicons name="time" size={16} color="#6c757d" style={styles.iconSpacing} />
//           <Text style={styles.detailText}>{item.time}</Text>
//         </View>
        
//         <View style={styles.actionButtons}>
//           <TouchableOpacity 
//             style={[styles.actionButton, styles.viewButton]}
//             onPress={() => handleViewAppointment(item)}
//           >
//             <FontAwesome name="eye" size={14} color="#fff" />
//             <Text style={styles.actionButtonText}>View</Text>
//           </TouchableOpacity>
          
//           <TouchableOpacity 
//             style={[styles.actionButton, styles.editButton]}
//             onPress={() => handleEditAppointment(item)}
//           >
//             <MaterialIcons name="edit" size={14} color="#fff" />
//             <Text style={styles.actionButtonText}>Edit</Text>
//           </TouchableOpacity>
//         </View>
//       </LinearGradient>
//     </View>
//   );

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#4CAF50" />
//         <Text style={styles.loadingText}>Loading Appointments...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <LinearGradient
//         colors={['#4CAF50', '#2E7D32']}
//         style={styles.header}
//       >
//         <Text style={styles.headerTitle}>Appointments</Text>
//         <TouchableOpacity style={styles.refreshButton} onPress={fetchAppointments}>
//           <Ionicons name="refresh" size={24} color="#fff" />
//         </TouchableOpacity>
//       </LinearGradient>
      
//       <FlatList
//         data={appointments}
//         renderItem={renderAppointmentItem}
//         keyExtractor={item => item.id}
//         contentContainerStyle={styles.listContent}
//         showsVerticalScrollIndicator={false}
//         refreshControl={
//           <RefreshControl
//             refreshing={refreshing}
//             onRefresh={fetchAppointments}
//             colors={['#4CAF50']}
//             tintColor="#4CAF50"
//           />
//         }
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Ionicons name="calendar" size={48} color="#adb5bd" />
//             <Text style={styles.emptyText}>No Appointments Found</Text>
//             <Text style={styles.emptySubtext}>Pull to refresh or create a new appointment</Text>
//           </View>
//         }
//       />

//       {/* View Appointment Modal */}
//       <Modal
//         visible={viewModalVisible}
//         animationType="slide"
//         transparent={false}
//         onRequestClose={() => setViewModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalHeader}>
//             <Text style={styles.modalTitle}>Appointment Details</Text>
//             <TouchableOpacity onPress={() => setViewModalVisible(false)}>
//               <Ionicons name="close" size={24} color="#6B7280" />
//             </TouchableOpacity>
//           </View>

//           <ScrollView style={styles.modalContent}>
//             {selectedAppointment && (
//               <>
//                 <View style={styles.detailSection}>
//                   <Text style={styles.detailLabel}>Customer:</Text>
//                   <Text style={styles.detailValue}>{selectedAppointment.customerName}</Text>
//                 </View>

//                 <View style={styles.detailSection}>
//                   <Text style={styles.detailLabel}>Service:</Text>
//                   <Text style={styles.detailValue}>{selectedAppointment.service}</Text>
//                 </View>

//                 <View style={styles.detailSection}>
//                   <Text style={styles.detailLabel}>Date:</Text>
//                   <Text style={styles.detailValue}>{selectedAppointment.date}</Text>
//                 </View>

//                 <View style={styles.detailSection}>
//                   <Text style={styles.detailLabel}>Time:</Text>
//                   <Text style={styles.detailValue}>{selectedAppointment.time}</Text>
//                 </View>

//                 <View style={styles.detailSection}>
//                   <Text style={styles.detailLabel}>Status:</Text>
//                   <View style={[
//                     styles.statusBadge, 
//                     selectedAppointment.status === 'Pending' ? styles.pendingStatus :
//                     selectedAppointment.status === 'Assigned' ? styles.assignedStatus :
//                     styles.completedStatus,
//                     { marginLeft: 0 }
//                   ]}>
//                     <Text style={styles.statusText}>{selectedAppointment.status}</Text>
//                   </View>
//                 </View>

//                 <View style={styles.detailSection}>
//                   <Text style={styles.detailLabel}>Address:</Text>
//                   <Text style={styles.detailValue}>{selectedAppointment.address}</Text>
//                 </View>

//                 {selectedAppointment.notes && (
//                   <View style={styles.detailSection}>
//                     <Text style={styles.detailLabel}>Notes:</Text>
//                     <Text style={styles.detailValue}>{selectedAppointment.notes}</Text>
//                   </View>
//                 )}

//                 {selectedAppointment.photos?.beforeService?.length > 0 && (
//                   <View style={styles.detailSection}>
//                     <Text style={styles.detailLabel}>Before Service Photos:</Text>
//                     <View style={styles.photosContainer}>
//                       {selectedAppointment.photos.beforeService.map((photo, index) => (
//                         <Image
//                           key={`before-${index}`}
//                           source={{ uri: photo.url }}
//                           style={styles.photoThumbnail}
//                         />
//                       ))}
//                     </View>
//                   </View>
//                 )}

//                 {selectedAppointment.photos?.afterService?.length > 0 && (
//                   <View style={styles.detailSection}>
//                     <Text style={styles.detailLabel}>After Service Photos:</Text>
//                     <View style={styles.photosContainer}>
//                       {selectedAppointment.photos.afterService.map((photo, index) => (
//                         <Image
//                           key={`after-${index}`}
//                           source={{ uri: photo.url }}
//                           style={styles.photoThumbnail}
//                         />
//                       ))}
//                     </View>
//                   </View>
//                 )}
//               </>
//             )}
//           </ScrollView>

//           <View style={styles.modalFooter}>
//             <TouchableOpacity
//               style={styles.closeButton}
//               onPress={() => setViewModalVisible(false)}
//             >
//               <Text style={styles.closeButtonText}>Close</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>

//       {/* Edit Appointment Modal */}
//       <Modal
//         visible={editModalVisible}
//         animationType="slide"
//         transparent={false}
//         onRequestClose={() => setEditModalVisible(false)}
//       >
//         <View style={styles.modalContainer}>
//           <View style={styles.modalHeader}>
//             <Text style={styles.modalTitle}>Edit Appointment</Text>
//             <TouchableOpacity onPress={() => setEditModalVisible(false)}>
//               <Ionicons name="close" size={24} color="#6B7280" />
//             </TouchableOpacity>
//           </View>

//           <ScrollView style={styles.modalContent}>
//             {selectedAppointment && (
//               <>
//                 <View style={styles.inputGroup}>
//                   <Text style={styles.inputLabel}>Date</Text>
//                   <TouchableOpacity
//                     style={styles.dateInput}
//                     onPress={() => setShowDatePicker(true)}
//                   >
//                     <Text>{format(editedAppointment.date, 'yyyy-MM-dd')}</Text>
//                   </TouchableOpacity>
//                   {showDatePicker && (
//                     <DateTimePicker
//                       value={editedAppointment.date}
//                       mode="date"
//                       display="default"
//                       onChange={handleDateChange}
//                     />
//                   )}
//                 </View>

//                 <View style={styles.inputGroup}>
//                   <Text style={styles.inputLabel}>Time</Text>
//                   <TouchableOpacity
//                     style={styles.dateInput}
//                     onPress={() => setShowTimePicker(true)}
//                   >
//                     <Text>{editedAppointment.time}</Text>
//                   </TouchableOpacity>
//                   {showTimePicker && (
//                     <DateTimePicker
//                       value={new Date(`1970-01-01T${editedAppointment.time}:00`)}
//                       mode="time"
//                       display="default"
//                       onChange={handleTimeChange}
//                     />
//                   )}
//                 </View>

//                 <View style={styles.inputGroup}>
//                   <Text style={styles.inputLabel}>Status</Text>
//                   <View style={styles.statusOptions}>
//                     {statusOptions.map(status => (
//                       <TouchableOpacity
//                         key={status}
//                         style={[
//                           styles.statusOption,
//                           editedAppointment.status === status && styles.selectedStatusOption,
//                           status === 'Pending' ? styles.pendingStatus :
//                           status === 'Assigned' ? styles.assignedStatus :
//                           styles.completedStatus
//                         ]}
//                         onPress={() => setEditedAppointment(prev => ({
//                           ...prev,
//                           status
//                         }))}
//                       >
//                         <Text style={styles.statusOptionText}>{status}</Text>
//                       </TouchableOpacity>
//                     ))}
//                   </View>
//                 </View>

//                 <View style={styles.inputGroup}>
//                   <Text style={styles.inputLabel}>Notes</Text>
//                   <TextInput
//                     style={styles.notesInput}
//                     value={editedAppointment.notes}
//                     onChangeText={(text) => setEditedAppointment(prev => ({
//                       ...prev,
//                       notes: text
//                     }))}
//                     placeholder="Add any notes about this appointment"
//                     multiline
//                     numberOfLines={4}
//                   />
//                 </View>

//                 {editedAppointment.status === 'Completed' && (
//                   <>
//                     <View style={styles.inputGroup}>
//                       <Text style={styles.inputLabel}>Photo Type</Text>
//                       <View style={styles.photoTypeOptions}>
//                         <TouchableOpacity
//                           style={[
//                             styles.photoTypeOption,
//                             photoType === 'beforeService' && styles.selectedPhotoType
//                           ]}
//                           onPress={() => setPhotoType('beforeService')}
//                         >
//                           <Text>Before Service</Text>
//                         </TouchableOpacity>
//                         <TouchableOpacity
//                           style={[
//                             styles.photoTypeOption,
//                             photoType === 'afterService' && styles.selectedPhotoType
//                           ]}
//                           onPress={() => setPhotoType('afterService')}
//                         >
//                           <Text>After Service</Text>
//                         </TouchableOpacity>
//                       </View>
//                     </View>

//                     <View style={styles.inputGroup}>
//                       <Text style={styles.inputLabel}>Selected Photos ({selectedPhotos.length})</Text>
//                       <View style={styles.photosContainer}>
//                         {selectedPhotos.map((photo, index) => (
//                           <Image
//                             key={`selected-${index}`}
//                             source={{ uri: photo.uri }}
//                             style={styles.photoThumbnail}
//                           />
//                         ))}
//                       </View>
//                       <View style={styles.photoButtons}>
//                         <Pressable
//                           style={[styles.photoButton, styles.pickPhotoButton]}
//                           onPress={pickImages}
//                           disabled={uploadingPhotos}
//                         >
//                           <Text style={styles.photoButtonText}>
//                             {selectedPhotos.length > 0 ? 'Add More Photos' : 'Pick Photos'}
//                           </Text>
//                         </Pressable>
//                         {selectedPhotos.length > 0 && (
//                           <Pressable
//                             style={[styles.photoButton, styles.uploadPhotoButton]}
//                             onPress={uploadPhotos}
//                             disabled={uploadingPhotos}
//                           >
//                             {uploadingPhotos ? (
//                               <ActivityIndicator color="#fff" />
//                             ) : (
//                               <Text style={styles.photoButtonText}>Upload Photos</Text>
//                             )}
//                           </Pressable>
//                         )}
//                       </View>
//                     </View>
//                   </>
//                 )}
//               </>
//             )}
//           </ScrollView>

//           <View style={styles.modalFooter}>
//             <TouchableOpacity
//               style={styles.saveButton}
//               onPress={updateAppointment}
//               disabled={uploadingPhotos}
//             >
//               <Text style={styles.saveButtonText}>Save Changes</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={styles.cancelButton}
//               onPress={() => setEditModalVisible(false)}
//               disabled={uploadingPhotos}
//             >
//               <Text style={styles.cancelButtonText}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f8f9fa',
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#f8f9fa',
//   },
//   loadingText: {
//     marginTop: 16,
//     color: '#495057',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   header: {
//     padding: 20,
//     paddingTop: 50,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 5,
//     zIndex: 10,
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#fff',
//     textShadowColor: 'rgba(0,0,0,0.2)',
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 2,
//   },
//   refreshButton: {
//     padding: 8,
//   },
//   listContent: {
//     padding: 16,
//     paddingBottom: 20,
//   },
//   appointmentCard: {
//     borderRadius: 12,
//     marginBottom: 16,
//     overflow: 'hidden',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   cardBackground: {
//     padding: 20,
//   },
//   appointmentHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 15,
//   },
//   customerInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     flex: 1,
//     marginRight: 10,
//   },
//   customerName: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#343a40',
//     marginLeft: 10,
//   },
//   statusBadge: {
//     paddingVertical: 5,
//     paddingHorizontal: 12,
//     borderRadius: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   statusText: {
//     fontSize: 12,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   pendingStatus: {
//     backgroundColor: '#ffc107',
//   },
//   assignedStatus: {
//     backgroundColor: '#17a2b8',
//   },
//   completedStatus: {
//     backgroundColor: '#28a745',
//   },
//   detailRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   serviceText: {
//     fontSize: 16,
//     color: '#495057',
//     marginLeft: 8,
//     fontWeight: '500',
//   },
//   detailText: {
//     fontSize: 14,
//     color: '#6c757d',
//     marginLeft: 8,
//   },
//   iconSpacing: {
//     marginLeft: 15,
//   },
//   actionButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 15,
//   },
//   actionButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 8,
//     paddingHorizontal: 15,
//     borderRadius: 20,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//     elevation: 2,
//     minWidth: 80,
//     justifyContent: 'center',
//   },
//   viewButton: {
//     backgroundColor: '#17a2b8',
//   },
//   editButton: {
//     backgroundColor: '#ffc107',
//   },
//   actionButtonText: {
//     color: '#fff',
//     marginLeft: 6,
//     fontWeight: '500',
//     fontSize: 13,
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 40,
//     backgroundColor: 'rgba(255,255,255,0.8)',
//     borderRadius: 12,
//     marginTop: 50,
//   },
//   emptyText: {
//     fontSize: 20,
//     color: '#495057',
//     marginTop: 16,
//     fontWeight: '600',
//   },
//   emptySubtext: {
//     fontSize: 14,
//     color: '#6c757d',
//     marginTop: 8,
//     textAlign: 'center',
//   },
//   modalContainer: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//   },
//   modalHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#E5E7EB',
//   },
//   modalTitle: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#111827',
//   },
//   modalContent: {
//     padding: 16,
//   },
//   modalFooter: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 16,
//     borderTopWidth: 1,
//     borderTopColor: '#E5E7EB',
//   },
//   detailSection: {
//     marginBottom: 20,
//   },
//   detailLabel: {
//     fontSize: 14,
//     color: '#6B7280',
//     marginBottom: 4,
//   },
//   detailValue: {
//     fontSize: 16,
//     color: '#111827',
//   },
//   photosContainer: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginTop: 8,
//   },
//   photoThumbnail: {
//     width: 80,
//     height: 80,
//     borderRadius: 8,
//     marginRight: 8,
//     marginBottom: 8,
//   },
//   closeButton: {
//     backgroundColor: '#4CAF50',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     flex: 1,
//   },
//   closeButtonText: {
//     color: '#FFFFFF',
//     fontWeight: '600',
//   },
//   inputGroup: {
//     marginBottom: 20,
//   },
//   inputLabel: {
//     fontSize: 14,
//     color: '#6B7280',
//     marginBottom: 8,
//   },
//   dateInput: {
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 12,
//   },
//   statusOptions: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     gap: 8,
//   },
//   statusOption: {
//     paddingHorizontal: 16,
//     paddingVertical: 8,
//     borderRadius: 8,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//   },
//   selectedStatusOption: {
//     borderWidth: 2,
//     borderColor: '#4CAF50',
//   },
//   statusOptionText: {
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#FFFFFF',
//   },
//   notesInput: {
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     borderRadius: 8,
//     padding: 12,
//     height: 100,
//     textAlignVertical: 'top',
//   },
//   photoTypeOptions: {
//     flexDirection: 'row',
//     gap: 8,
//     marginBottom: 12,
//   },
//   photoTypeOption: {
//     flex: 1,
//     padding: 12,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   selectedPhotoType: {
//     borderColor: '#4CAF50',
//     backgroundColor: '#F0F9F0',
//   },
//   photoButtons: {
//     flexDirection: 'row',
//     gap: 8,
//     marginTop: 8,
//   },
//   photoButton: {
//     flex: 1,
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   pickPhotoButton: {
//     backgroundColor: '#F3F4F6',
//   },
//   uploadPhotoButton: {
//     backgroundColor: '#4CAF50',
//   },
//   photoButtonText: {
//     fontSize: 14,
//     fontWeight: '500',
//   },
//   saveButton: {
//     backgroundColor: '#4CAF50',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     flex: 1,
//     marginRight: 8,
//   },
//   saveButtonText: {
//     color: '#FFFFFF',
//     fontWeight: '600',
//   },
//   cancelButton: {
//     backgroundColor: '#F3F4F6',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     flex: 1,
//     marginLeft: 8,
//   },
//   cancelButtonText: {
//     color: '#6B7280',
//     fontWeight: '600',
//   },
// });

// export default AppointmentListScreen;






import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList,
  ActivityIndicator,
  Alert,
  Modal,
  ScrollView,
  Image,
  Dimensions,
  TextInput,
  Platform
} from 'react-native';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TENANT_CONFIG } from '../../config/constants';
import { format, parseISO } from 'date-fns';
import RNPickerSelect from 'react-native-picker-select';

const { width, height } = Dimensions.get('window');

const AppointmentListScreen = () => {
  const navigation = useNavigation();
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [services, setServices] = useState([]);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [modalContentHeight, setModalContentHeight] = useState(height * 0.7);

  const statusOptions = [
    { label: 'All Statuses', value: null },
    { label: 'Scheduled', value: 'Scheduled' },
    { label: 'In Progress', value: 'In Progress' },
    { label: 'Completed', value: 'Completed' },
    { label: 'Cancelled', value: 'Cancelled' },
    { label: 'Rescheduled', value: 'Rescheduled' },
  ];

  useEffect(() => {
    fetchAppointments();
    fetchServices();
  }, []);

  useEffect(() => {
    filterAppointments();
  }, [appointments, searchQuery, selectedStatus, selectedService]);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      
      const response = await axios.get(`${TENANT_CONFIG.API_BASE_URL}/appointments`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
          'X-Tenant-ID': TENANT_CONFIG.ID
        }
      });

      const transformedAppointments = response.data.data.map(appointment => ({
        id: appointment._id,
        customerName: appointment.customer?.user?.name || 'Unknown Customer',
        service: appointment.service?.name || 'Service',
        serviceId: appointment.service?._id || null,
        date: format(parseISO(appointment.date), 'yyyy-MM-dd'),
        timeSlot: appointment.timeSlot || { startTime: '10:00', endTime: '11:00' },
        status: appointment.status || 'Scheduled',
        packageType: appointment.packageType || 'Standard',
        recurringType: appointment.recurringType || 'One-time',
        address: appointment.customer?.address || appointment.address || 'No address provided',
        notes: appointment.notes || { customer: '', professional: '', internal: '' },
        photos: appointment.photos || { beforeService: [], afterService: [] }
      }));

      setAppointments(transformedAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      Alert.alert('Error', 'Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  const fetchServices = async () => {
    try {
      setServicesLoading(true);
      const token = await AsyncStorage.getItem('token');
      
      const response = await axios.get(`${TENANT_CONFIG.API_BASE_URL}/services`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
          'X-Tenant-ID': TENANT_CONFIG.ID
        }
      });

      const transformedServices = response.data.data.map(service => ({
        label: service.name,
        value: service._id
      }));

      setServices([{ label: 'All Services', value: null }, ...transformedServices]);
    } catch (error) {
      console.error('Error fetching services:', error);
      Alert.alert('Error', 'Failed to fetch services');
    } finally {
      setServicesLoading(false);
    }
  };

  const filterAppointments = () => {
    let filtered = [...appointments];

    if (searchQuery) {
      filtered = filtered.filter(appointment => 
        appointment.customerName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedStatus) {
      filtered = filtered.filter(appointment => 
        appointment.status === selectedStatus
      );
    }

    if (selectedService) {
      filtered = filtered.filter(appointment => 
        appointment.serviceId === selectedService
      );
    }

    setFilteredAppointments(filtered);
  };

  const handleViewAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setViewModalVisible(true);
    
    // Calculate dynamic height based on content
    const baseHeight = 500; // Base height for all content except photos
    const hasBeforePhotos = appointment.photos?.beforeService?.length > 0;
    const hasAfterPhotos = appointment.photos?.afterService?.length > 0;
    
    let calculatedHeight = baseHeight;
    if (hasBeforePhotos) calculatedHeight += 150;
    if (hasAfterPhotos) calculatedHeight += 150;
    
    setModalContentHeight(Math.min(calculatedHeight, height * 0.8));
  };

  const handleEditAppointment = (appointment) => {
    navigation.navigate('EditAppointment', { 
      appointmentId: appointment.id,
      onGoBack: fetchAppointments
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Scheduled': return '#4CAF50';
      case 'In Progress': return '#FFA000';
      case 'Completed': return '#1976D2';
      case 'Cancelled': return '#D32F2F';
      case 'Rescheduled': return '#7B1FA2';
      default: return '#455A64';
    }
  };

  const formatAddress = (address) => {
    if (typeof address === 'string') return address;
    if (!address) return 'No address provided';
    
    const { street, city, state, zipCode, country } = address;
    return `${street}, ${city}, ${state} ${zipCode}, ${country}`;
  };

  const renderAppointmentItem = ({ item }) => (
    <View style={styles.appointmentCard}>
      <View style={styles.cardContent}>
        <View style={styles.cardHeader}>
          <View style={styles.customerInfo}>
            <Ionicons name="person-circle" size={24} color="#424242" />
            <Text style={styles.customerName} numberOfLines={1}>{item.customerName}</Text>
          </View>
          <View style={[
            styles.statusBadge, 
            { backgroundColor: getStatusColor(item.status) }
          ]}>
            <Text style={styles.statusText}>
              {item.status}
            </Text>
          </View>
        </View>
        
        <View style={styles.serviceRow}>
          <MaterialIcons name="design-services" size={18} color="#6c757d" />
          <Text style={styles.serviceText} numberOfLines={1}>{item.service}</Text>
        </View>
        
        <View style={styles.timeRow}>
          <View style={styles.timeItem}>
            <Ionicons name="calendar" size={16} color="#6c757d" />
            <Text style={styles.detailText}>{item.date}</Text>
          </View>
          <View style={styles.timeItem}>
            <Ionicons name="time" size={16} color="#6c757d" />
            <Text style={styles.detailText}>{item.timeSlot.startTime} - {item.timeSlot.endTime}</Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.viewButton]}
            onPress={() => handleViewAppointment(item)}
          >
            <FontAwesome name="eye" size={14} color="#fff" />
            <Text style={styles.actionButtonText}>Details</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.editButton]}
            onPress={() => handleEditAppointment(item)}
          >
            <MaterialIcons name="edit" size={14} color="#fff" />
            <Text style={styles.actionButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  if (loading || servicesLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Appointments</Text>
      </View>
      
      {/* Search and Filter Section */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#9E9E9E" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by customer name"
            placeholderTextColor="#9E9E9E"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        
        <View style={styles.filterRow}>
          <View style={styles.filterItem}>
            <RNPickerSelect
              onValueChange={(value) => setSelectedStatus(value)}
              items={statusOptions}
              value={selectedStatus}
              placeholder={{ label: 'Select status...', value: null }}
              style={pickerSelectStyles}
              Icon={() => <Ionicons name="chevron-down" size={16} color="#9E9E9E" />}
              useNativeAndroidPickerStyle={false}
            />
          </View>
          
          <View style={styles.filterItem}>
            <RNPickerSelect
              onValueChange={(value) => setSelectedService(value)}
              items={services}
              value={selectedService}
              placeholder={{ label: 'Select service...', value: null }}
              style={pickerSelectStyles}
              Icon={() => <Ionicons name="chevron-down" size={16} color="#9E9E9E" />}
              useNativeAndroidPickerStyle={false}
            />
          </View>
        </View>
      </View>

      <FlatList
        data={filteredAppointments}
        renderItem={renderAppointmentItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar" size={48} color="#e0e0e0" />
            <Text style={styles.emptyText}>No Appointments Found</Text>
            <Text style={styles.emptySubtext}>Try adjusting your search or filters</Text>
          </View>
        }
      />

      {/* View Appointment Modal */}
      <Modal
        visible={viewModalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setViewModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Appointment Details</Text>
            <TouchableOpacity onPress={() => setViewModalVisible(false)}>
              <Ionicons name="close" size={28} color="#fff" />
            </TouchableOpacity>
          </View>

          <ScrollView 
            style={[styles.modalContent, { maxHeight: modalContentHeight }]}
            contentContainerStyle={styles.modalContentContainer}
          >
            {selectedAppointment && (
              <>
                <View style={styles.detailSection}>
                  <View style={styles.labelContainer}>
                    <Ionicons name="person-circle" size={20} color="#4CAF50" />
                    <Text style={styles.detailLabel}>CUSTOMER</Text>
                  </View>
                  <View style={styles.detailValueBox}>
                    <Text style={styles.detailValue}>{selectedAppointment.customerName}</Text>
                  </View>
                </View>

                <View style={styles.detailSection}>
                  <View style={styles.labelContainer}>
                    <MaterialIcons name="design-services" size={20} color="#4CAF50" />
                    <Text style={styles.detailLabel}>SERVICE</Text>
                  </View>
                  <View style={styles.detailValueBox}>
                    <Text style={styles.detailValue}>{selectedAppointment.service}</Text>
                  </View>
                </View>

                <View style={styles.detailRow}>
                  <View style={[styles.detailSection, { flex: 1, marginRight: 10 }]}>
                    <View style={styles.labelContainer}>
                      <Ionicons name="calendar" size={20} color="#4CAF50" />
                      <Text style={styles.detailLabel}>DATE</Text>
                    </View>
                    <View style={styles.detailValueBox}>
                      <Text style={styles.detailValue}>{selectedAppointment.date}</Text>
                    </View>
                  </View>

                  <View style={[styles.detailSection, { flex: 1 }]}>
                    <View style={styles.labelContainer}>
                      <Ionicons name="time" size={20} color="#4CAF50" />
                      <Text style={styles.detailLabel}>TIME</Text>
                    </View>
                    <View style={styles.detailValueBox}>
                      <Text style={styles.detailValue}>
                        {selectedAppointment.timeSlot.startTime} - {selectedAppointment.timeSlot.endTime}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.detailSection}>
                  <View style={styles.labelContainer}>
                    <MaterialIcons name="pending-actions" size={20} color="#4CAF50" />
                    <Text style={styles.detailLabel}>STATUS</Text>
                  </View>
                  <View style={styles.detailValueBox}>
                    <View style={styles.statusContainer}>
                      <View style={[
                        styles.statusPill, 
                        { backgroundColor: getStatusColor(selectedAppointment.status) }
                      ]}>
                        <Text style={styles.statusPillText}>
                          {selectedAppointment.status}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View style={styles.detailSection}>
                  <View style={styles.labelContainer}>
                    <Ionicons name="location" size={20} color="#4CAF50" />
                    <Text style={styles.detailLabel}>ADDRESS</Text>
                  </View>
                  <View style={styles.detailValueBox}>
                    <Text style={styles.detailValue}>
                      {formatAddress(selectedAppointment.address)}
                    </Text>
                  </View>
                </View>

                <View style={styles.detailRow}>
                  <View style={[styles.detailSection, { flex: 1, marginRight: 10 }]}>
                    <View style={styles.labelContainer}>
                      <MaterialIcons name="inventory" size={20} color="#4CAF50" />
                      <Text style={styles.detailLabel}>PACKAGE TYPE</Text>
                    </View>
                    <View style={styles.detailValueBox}>
                      <Text style={styles.detailValue}>{selectedAppointment.packageType}</Text>
                    </View>
                  </View>

                  <View style={[styles.detailSection, { flex: 1 }]}>
                    <View style={styles.labelContainer}>
                      <MaterialIcons name="repeat" size={20} color="#4CAF50" />
                      <Text style={styles.detailLabel}>RECURRING</Text>
                    </View>
                    <View style={styles.detailValueBox}>
                      <Text style={styles.detailValue}>
                        {selectedAppointment.recurringType === 'One-time' ? 'No' : 'Yes'}
                      </Text>
                    </View>
                  </View>
                </View>

                {selectedAppointment.notes?.internal && (
                  <View style={styles.detailSection}>
                    <View style={styles.labelContainer}>
                      <Ionicons name="document-text" size={20} color="#4CAF50" />
                      <Text style={styles.detailLabel}>NOTES</Text>
                    </View>
                    <View style={styles.notesBox}>
                      <Text style={styles.notesText}>{selectedAppointment.notes.internal}</Text>
                    </View>
                  </View>
                )}

                {selectedAppointment.photos?.beforeService?.length > 0 && (
                  <View style={styles.detailSection}>
                    <View style={styles.labelContainer}>
                      <Ionicons name="images" size={20} color="#4CAF50" />
                      <Text style={styles.detailLabel}>BEFORE SERVICE PHOTOS</Text>
                    </View>
                    <ScrollView 
                      horizontal 
                      showsHorizontalScrollIndicator={false}
                      style={styles.photosScrollView}
                    >
                      {selectedAppointment.photos.beforeService.map((photo, index) => (
                        <Image
                          key={`before-${index}`}
                          source={{ uri: photo.url }}
                          style={styles.photoThumbnail}
                        />
                      ))}
                    </ScrollView>
                  </View>
                )}

                {selectedAppointment.photos?.afterService?.length > 0 && (
                  <View style={styles.detailSection}>
                    <View style={styles.labelContainer}>
                      <Ionicons name="images" size={20} color="#4CAF50" />
                      <Text style={styles.detailLabel}>AFTER SERVICE PHOTOS</Text>
                    </View>
                    <ScrollView 
                      horizontal 
                      showsHorizontalScrollIndicator={false}
                      style={styles.photosScrollView}
                    >
                      {selectedAppointment.photos.afterService.map((photo, index) => (
                        <Image
                          key={`after-${index}`}
                          source={{ uri: photo.url }}
                          style={styles.photoThumbnail}
                        />
                      ))}
                    </ScrollView>
                  </View>
                )}
              </>
            )}
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setViewModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 12,
    paddingRight: 30,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    color: '#424242',
    backgroundColor: '#f5f5f5',
    height: 40,
  },
  inputAndroid: {
    fontSize: 14,
    paddingVertical: 8,
    paddingHorizontal: 12,
    paddingRight: 30,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    color: '#424242',
    backgroundColor: '#f5f5f5',
    height: 40,
  },
  iconContainer: {
    top: Platform.OS === 'ios' ? 10 : 8,
    right: 10,
  },
  placeholder: {
    color: '#9E9E9E',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 16,
    color: '#616161',
    fontSize: 16,
    fontWeight: '500',
  },
  header: {
    padding: 15,
    paddingTop: 45,
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 0.5,
  },
  searchContainer: {
    padding: 12,
    paddingBottom: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#424242',
    fontSize: 14,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterItem: {
    width: '48%',
  },
  listContent: {
    padding: 12,
    paddingBottom: 20,
  },
  appointmentCard: {
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardContent: {
    padding: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#424242',
    flexShrink: 1,
    marginLeft: 10,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    textTransform: 'uppercase',
    color: '#fff',
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  serviceText: {
    fontSize: 15,
    color: '#616161',
    marginLeft: 8,
    fontWeight: '500',
    flexShrink: 1,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  timeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    width: '48%',
  },
  detailText: {
    fontSize: 13,
    color: '#757575',
    marginLeft: 6,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    width: '48%',
    justifyContent: 'center',
  },
  viewButton: {
    backgroundColor: '#4CAF50',
  },
  editButton: {
    backgroundColor: '#2196F3',
  },
  actionButtonText: {
    color: '#fff',
    marginLeft: 6,
    fontWeight: '500',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 50,
    marginHorizontal: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#616161',
    marginTop: 16,
    fontWeight: '600',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9e9e9e',
    marginTop: 8,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    padding: 20,
    paddingTop: 50,
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 0.5,
  },
  modalContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  modalContentContainer: {
    paddingBottom: 20,
  },
  modalFooter: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  detailSection: {
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#616161',
    marginLeft: 8,
    fontWeight: '600',
  },
  detailValueBox: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
  },
  detailValue: {
    fontSize: 16,
    color: '#424242',
  },
  statusContainer: {
    marginTop: 0,
  },
  statusPill: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  statusPillText: {
    fontSize: 13,
    fontWeight: '600',
    textTransform: 'uppercase',
    color: '#fff',
  },
  notesBox: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
  },
  notesText: {
    fontSize: 14,
    color: '#616161',
    lineHeight: 20,
  },
  photosScrollView: {
    marginTop: 8,
  },
  photoThumbnail: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#EEEEEE',
  },
  closeButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default AppointmentListScreen;