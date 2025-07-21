import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  Pressable,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TENANT_CONFIG } from '../../config/constants';
import { format } from 'date-fns';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const statusOptions = ['Scheduled', 'In Progress', 'Completed', 'Cancelled', 'Rescheduled'];

const EditAppointmentScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { appointmentId, onGoBack } = route.params;

  const [loading, setLoading] = useState(true);
  const [editedAppointment, setEditedAppointment] = useState({
    date: new Date(),
    timeSlot: { startTime: '', endTime: '' },
    status: 'Scheduled',
    notes: { internal: '' }
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [loadingTimeSlots, setLoadingTimeSlots] = useState(false);
  const [uploadingPhotos, setUploadingPhotos] = useState(false);
  const [photoType, setPhotoType] = useState('beforeService');
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [isStatusSaved, setIsStatusSaved] = useState(true);

  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        const response = await axios.get(
          `${TENANT_CONFIG.API_BASE_URL}/appointments/${appointmentId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
              'X-Tenant-ID': TENANT_CONFIG.ID
            }
          }
        );
        
        const data = response.data.data;
        setAppointmentDetails(data);
        setEditedAppointment({
          date: new Date(data.date),
          timeSlot: data.timeSlot || { startTime: '', endTime: '' },
          status: data.status || 'Scheduled',
          notes: data.notes || { internal: '' }
        });
      } catch (error) {
        Alert.alert('Error', 'Failed to load appointment details');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentDetails();
  }, [appointmentId]);

  const handleDateChange = async (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const newDate = selectedDate;
      setEditedAppointment(prev => ({
        ...prev,
        date: newDate,
        timeSlot: { startTime: '', endTime: '' }
      }));
      
      if (appointmentDetails?.service?._id) {
        await fetchTimeSlots(appointmentDetails.service._id, newDate);
      }
    }
  };

  const fetchTimeSlots = async (serviceId, date) => {
    try {
      setLoadingTimeSlots(true);
      const token = await AsyncStorage.getItem('token');
      
      const response = await axios.get(
        `${TENANT_CONFIG.API_BASE_URL}/appointments/availability`,
        {
          params: {
            serviceId,
            date: format(date, 'yyyy-MM-dd')
          },
          headers: {
            'Authorization': `Bearer ${token}`,
            'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
            'X-Tenant-ID': TENANT_CONFIG.ID
          }
        }
      );

      setTimeSlots(response.data.data || []);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch time slots');
    } finally {
      setLoadingTimeSlots(false);
    }
  };

  const handleTimeSlotSelect = (slot) => {
    setEditedAppointment(prev => ({
      ...prev,
      timeSlot: {
        startTime: slot.startTime,
        endTime: slot.endTime
      }
    }));
  };

  const pickImages = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.8,
        aspect: [4, 3],
      });

      if (!result.canceled) {
        const photos = result.assets.map((asset, index) => ({
          uri: asset.uri,
          type: asset.mimeType || 'image/jpeg',
          name: asset.fileName || `photo_${Date.now()}_${index}.jpg`
        }));
        setSelectedPhotos(prev => [...prev, ...photos]);
      }
    } catch (error) {
      console.error('Error picking images:', error);
      Alert.alert('Error', 'Failed to pick images');
    }
  };

  const uploadPhotos = async () => {
    if (selectedPhotos.length === 0) {
      Alert.alert('Error', 'Please select at least one photo');
      return;
    }

    try {
      setUploadingPhotos(true);
      const token = await AsyncStorage.getItem('token');
      
      const photosWithBase64 = await Promise.all(
        selectedPhotos.map(async (photo) => {
          const base64 = await FileSystem.readAsStringAsync(photo.uri, {
            encoding: FileSystem.EncodingType.Base64,
          });
          return {
            name: photo.name,
            contentType: photo.type,
            data: base64,
          };
        })
      );

      const response = await fetch(
        `${TENANT_CONFIG.API_BASE_URL}/appointments/${appointmentId}/photos`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
            'X-Tenant-ID': TENANT_CONFIG.ID,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            photos: photosWithBase64,
            photoType: photoType
          }),
        }
      );

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || 'Upload failed');
      }

      if (responseData.success) {
        Alert.alert('Success', 'Photos uploaded successfully');
        setSelectedPhotos([]);
        const token = await AsyncStorage.getItem('token');
        const res = await axios.get(
          `${TENANT_CONFIG.API_BASE_URL}/appointments/${appointmentId}`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
              'X-Tenant-ID': TENANT_CONFIG.ID
            }
          }
        );
        setAppointmentDetails(res.data.data);
      }
    } catch (error) {
      console.error('Upload error:', error);
      Alert.alert('Upload Failed', error.message || 'Failed to upload photos');
    } finally {
      setUploadingPhotos(false);
    }
  };

  const handleStatusChange = (status) => {
    setEditedAppointment(prev => ({
      ...prev,
      status
    }));
    setIsStatusSaved(false);
  };

  const handleSave = async () => {
  try {
    setLoading(true);
    const token = await AsyncStorage.getItem('token');
    
    const response = await axios.put(
      `${TENANT_CONFIG.API_BASE_URL}/appointments/${appointmentId}`,
      {
        date: format(editedAppointment.date, 'yyyy-MM-dd'),
        timeSlot: editedAppointment.timeSlot,
        status: editedAppointment.status,
        notes: editedAppointment.notes
      },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
          'X-Tenant-ID': TENANT_CONFIG.ID
        }
      }
    );

    if (response.data.success) {
      setIsStatusSaved(true);
      Alert.alert('Success', 'Appointment updated!', [
        {
          text: 'OK',
          onPress: () => {
            // Call the onGoBack callback if it exists
            onGoBack?.();
            // Navigate to appointment list screen
            navigation.navigate('AppointmentList'); // Replace with your actual screen name
          }
        }
      ]);
      
      // Optional: Refresh the appointment details
      const res = await axios.get(
        `${TENANT_CONFIG.API_BASE_URL}/appointments/${appointmentId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
            'X-Tenant-ID': TENANT_CONFIG.ID
          }
        }
      );
      setAppointmentDetails(res.data.data);
    }
  } catch (error) {
    Alert.alert('Error', 'Failed to update appointment');
  } finally {
    setLoading(false);
  }
};

  if (loading || !appointmentDetails) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}
         contentContainerStyle={styles.scrollContent}>
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Date</Text>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowDatePicker(true)}
          >
            <Text>{format(editedAppointment.date, 'yyyy-MM-dd')}</Text>
            <Ionicons name="calendar" size={20} color="#6B7280" />
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={editedAppointment.date}
              mode="date"
              onChange={handleDateChange}
            />
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Time Slot</Text>
          <View style={styles.timeSlotContainer}>
            <Text style={styles.timeSlotText}>
              {editedAppointment.timeSlot.startTime 
                ? `${editedAppointment.timeSlot.startTime} - ${editedAppointment.timeSlot.endTime}`
                : 'No time slot selected'}
            </Text>
            {timeSlots.length > 0 && (
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                style={styles.timeSlotScroll}
                contentContainerStyle={styles.timeSlotScrollContent}
              >
                {timeSlots.map((slot, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.timeSlotItem,
                      !slot.available && styles.timeSlotUnavailable,
                      editedAppointment.timeSlot.startTime === slot.startTime && 
                      styles.timeSlotSelected
                    ]}
                    onPress={() => slot.available && handleTimeSlotSelect(slot)}
                    disabled={!slot.available}
                  >
                    <Text style={[
                      styles.timeSlotItemText,
                      !slot.available && styles.timeSlotUnavailableText,
                      editedAppointment.timeSlot.startTime === slot.startTime && 
                      styles.timeSlotSelectedText
                    ]}>
                      {slot.startTime}-{slot.endTime}
                    </Text>
                    {!slot.available && (
                      <Text style={styles.timeSlotUnavailableLabel}>Booked</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Status</Text>
          <View style={styles.statusOptions}>
            {statusOptions.map(status => (
              <TouchableOpacity
                key={status}
                style={[
                  styles.statusOption,
                  editedAppointment.status === status && styles.selectedStatusOption,
                  status === 'Scheduled' ? styles.scheduledStatus :
                  status === 'In Progress' ? styles.inProgressStatus :
                  status === 'Completed' ? styles.completedStatus :
                  status === 'Cancelled' ? styles.cancelledStatus :
                  styles.rescheduledStatus
                ]}
                onPress={() => handleStatusChange(status)}
              >
                <Text style={styles.statusOptionText}>{status}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {!isStatusSaved && (
            <Text style={styles.statusSaveNote}>
              Please save the appointment to update the status
            </Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Internal Notes</Text>
          <TextInput
            style={styles.notesInput}
            value={editedAppointment.notes.internal}
            onChangeText={(text) => setEditedAppointment(prev => ({
              ...prev,
              notes: { ...prev.notes, internal: text }
            }))}
            placeholder="Internal notes"
            multiline
          />
        </View>

        {editedAppointment.status === 'Completed' && isStatusSaved && (
  <>
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>Photo Type</Text>
      <View style={styles.photoTypeOptions}>
        <TouchableOpacity
          style={[
            styles.photoTypeOption,
            photoType === 'beforeService' && styles.selectedPhotoType
          ]}
          onPress={() => setPhotoType('beforeService')}
        >
          <Text>Before Service</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.photoTypeOption,
            photoType === 'afterService' && styles.selectedPhotoType
          ]}
          onPress={() => setPhotoType('afterService')}
        >
          <Text>After Service</Text>
        </TouchableOpacity>
      </View>
    </View>

    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>Photos</Text>
      
      {appointmentDetails.photos?.[photoType]?.length > 0 && (
        <>
          <Text style={styles.subLabel}>Existing {photoType} photos:</Text>
          <View style={styles.photoScrollContainer}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.photoScrollContent}
            >
              {appointmentDetails.photos[photoType].map((photo, index) => (
                <View key={`existing-${index}`} style={styles.photoItem}>
                  <Image
                    source={{ uri: photo.url }}
                    style={styles.photoThumbnail}
                    resizeMode="cover"
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        </>
      )}

      {selectedPhotos.length > 0 && (
        <>
          <Text style={styles.subLabel}>New photos to upload:</Text>
          <View style={styles.photoScrollContainer}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.photoScrollContent}
            >
              {selectedPhotos.map((photo, index) => (
                <View key={`new-${index}`} style={styles.photoItem}>
                  <Image
                    source={{ uri: photo.uri }}
                    style={styles.photoThumbnail}
                    resizeMode="cover"
                  />
                </View>
              ))}
            </ScrollView>
          </View>
        </>
      )}

      <View style={styles.photoButtons}>
        <Pressable
          style={[styles.photoButton, styles.pickPhotoButton]}
          onPress={pickImages}
          disabled={uploadingPhotos}
        >
          <Text style={styles.photoButtonText}>
            {selectedPhotos.length > 0 ? 'Add More Photos' : 'Pick Photos'}
          </Text>
        </Pressable>
        {selectedPhotos.length > 0 && (
          <Pressable
            style={[styles.photoButton, styles.uploadPhotoButton]}
            onPress={uploadPhotos}
            disabled={uploadingPhotos}
          >
            {uploadingPhotos ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.photoButtonText}>Upload Photos</Text>
            )}
          </Pressable>
        )}
      </View>
    </View>
  </>
)}
      </ScrollView>

      <View style={styles.footer}>
        <Pressable
          style={styles.saveButton}
          onPress={handleSave}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.saveButtonText}>Save Changes</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 80, // Space for the footer button
  },
  scrollContent: {
  paddingBottom: 100, // Extra space at bottom
},
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    fontWeight: '500',
  },
  subLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeSlotContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
  },
  timeSlotText: {
    fontSize: 16,
    marginBottom: 8,
  },
  timeSlotScroll: {
    marginTop: 8,
  },
  timeSlotScrollContent: {
    paddingBottom: 8,
  },
  timeSlotItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 8,
    alignItems: 'center',
  },
  timeSlotItemText: {
    fontSize: 14,
  },
  timeSlotUnavailable: {
    backgroundColor: '#f5f5f5',
    borderColor: '#eee',
  },
  timeSlotUnavailableText: {
    color: '#999',
  },
  timeSlotUnavailableLabel: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  timeSlotSelected: {
    borderColor: '#4CAF50',
    backgroundColor: '#f0f9f0',
  },
  timeSlotSelectedText: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  statusOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  statusOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  selectedStatusOption: {
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  statusOptionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  statusSaveNote: {
    fontSize: 12,
    color: '#ff9800',
    marginTop: 8,
    fontStyle: 'italic',
  },
  scheduledStatus: {
    backgroundColor: '#17a2b8',
  },
  inProgressStatus: {
    backgroundColor: '#ffc107',
  },
  completedStatus: {
    backgroundColor: '#28a745',
  },
  cancelledStatus: {
    backgroundColor: '#dc3545',
  },
  rescheduledStatus: {
    backgroundColor: '#6610f2',
  },
  notesInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    height: 100,
    textAlignVertical: 'top',
  },
  photoTypeOptions: {
    flexDirection: 'row',
    gap: 8,
  },
  photoTypeOption: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
  },
  selectedPhotoType: {
    borderColor: '#4CAF50',
    backgroundColor: '#f0f9f0',
  },
  photosContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  photoThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  photoButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  photoButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickPhotoButton: {
    backgroundColor: '#F3F4F6',
  },
  uploadPhotoButton: {
    backgroundColor: '#4CAF50',
  },
  photoButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  // Add these to your StyleSheet
photoScrollContainer: {
  height: 100, // Fixed height for the scroll container
  marginBottom: 12,
},
photoScrollContent: {
  alignItems: 'center', // Center photos vertically
},
photoItem: {
  marginRight: 10,
  width: 90,
  height: 90,
},
photoThumbnail: {
  width: '100%',
  height: '100%',
  borderRadius: 8,
},
  footer: {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  padding: 16,
  backgroundColor: '#fff',
  borderTopWidth: 1,
  borderTopColor: '#eee',
  elevation: 10, // For Android shadow
  shadowColor: '#000', // For iOS shadow
  shadowOffset: { width: 0, height: -2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
},
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditAppointmentScreen;