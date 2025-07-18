import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  RefreshControl,
  ActivityIndicator,
  Modal,
  TextInput,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TENANT_CONFIG } from '../config/constants';
import DateTimePicker from '@react-native-community/datetimepicker';

const AppointmentList = () => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);
  const [rescheduleModalVisible, setRescheduleModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [rescheduleReason, setRescheduleReason] = useState('');

  // Get token from AsyncStorage
  const getToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('token');
      return storedToken;
    } catch (error) {
      console.error('Error retrieving token:', error);
      return null;
    }
  };

  // Fetch appointments from backend
  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      const authToken = await getToken();
      
      if (!authToken) {
        throw new Error('Authentication token not found');
      }

      const response = await axios.get(`${TENANT_CONFIG.API_BASE_URL}/appointments/my-appointments`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
          'X-Tenant-ID': TENANT_CONFIG.ID
        }
      });
      
      const transformedAppointments = response.data.data.map(appointment => ({
        id: appointment._id,
        date: new Date(appointment.date).toLocaleDateString('en-US'),
        time: new Date(appointment.date).toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit'
        }),
        status: appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1),
        service: appointment.service?.name || 'Service',
        category: appointment.service?.category || 'Not Specified',
        rawData: appointment
      }));
      
      setAppointments(transformedAppointments);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError(err.response?.data?.message || 'Failed to load appointments');
      setLoading(false);
    }
  };

  // Cancel appointment
  const handleCancel = async (appointmentId) => {
    Alert.alert(
      'Cancel Appointment',
      'Are you sure you want to cancel this appointment?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              const authToken = await getToken();
              const response = await axios.delete(
                `${TENANT_CONFIG.API_BASE_URL}/appointments/${appointmentId}`,
                {
                  headers: {
                    'Authorization': `Bearer ${authToken}`,
                    'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
                    'X-Tenant-ID': TENANT_CONFIG.ID
                  }
                }
              );
              
              setAppointments(prev => prev.filter(app => app.id !== appointmentId));
              Alert.alert('Success', 'Appointment cancelled successfully');
            } catch (err) {
              console.error('Error cancelling appointment:', err);
              let errorMessage = 'Failed to cancel appointment';
              
              if (err.response) {
                if (err.response.status === 403) {
                  errorMessage = 'You are not authorized to cancel this appointment';
                } 
                else if (err.response.status === 400) {
                  errorMessage = err.response.data.message || 
                    'Appointments can only be canceled at least 24 hours before';
                }
                else if (err.response.data?.message) {
                  errorMessage = err.response.data.message;
                }
              }
              
              Alert.alert('Error', errorMessage);
            }
          },
        },
      ]
    );
  };

  // Handle reschedule button click
  const handleRescheduleClick = (appointment) => {
    setSelectedAppointment(appointment);
    setSelectedDate(new Date(appointment.rawData.date));
    setSelectedTimeSlot(null);
    setRescheduleReason('');
    setRescheduleModalVisible(true);
    fetchTimeSlots(new Date(appointment.rawData.date), appointment.rawData.service._id);
  };

  // Fetch available time slots
  const fetchTimeSlots = async (date, serviceId) => {
    try {
      setLoadingSlots(true);
      const dateString = date.toISOString().split('T')[0];
      const authToken = await getToken();
      
      const response = await axios.get(
        `${TENANT_CONFIG.API_BASE_URL}/appointments/availability?serviceId=${serviceId}&date=${dateString}`,
        {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
            'X-Tenant-ID': TENANT_CONFIG.ID
          }
        }
      );

      setTimeSlots(response.data.data || []);
    } catch (err) {
      console.error('Error fetching time slots:', err);
      Alert.alert('Error', 'Failed to load available time slots');
      setTimeSlots([]);
    } finally {
      setLoadingSlots(false);
    }
  };

  // Handle date change
  const handleDateChange = (event, date) => {
    if (date) {
      setSelectedDate(date);
      setShowDatePicker(false);
      setSelectedTimeSlot(null);
      fetchTimeSlots(date, selectedAppointment.rawData.service._id);
    }
  };

  // Confirm reschedule
  const confirmReschedule = async () => {
    if (!selectedTimeSlot) {
      Alert.alert('Please select a time slot');
      return;
    }

    try {
      const authToken = await getToken();
      const payload = {
        requestedDate: selectedDate.toISOString().split('T')[0],
        requestedTime: `${selectedTimeSlot.startTime} - ${selectedTimeSlot.endTime}`,
        reason: rescheduleReason
      };

      const response = await axios.put(
        `${TENANT_CONFIG.API_BASE_URL}/appointments/${selectedAppointment.id}/reschedule-request`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
            'X-Tenant-ID': TENANT_CONFIG.ID,
            'Content-Type': 'application/json'
          }
        }
      );

      Alert.alert('Success', 'Appointment rescheduled successfully');
      setRescheduleModalVisible(false);
      fetchAppointments(); // Refresh the list
    } catch (err) {
      console.error('Error rescheduling appointment:', err);
      Alert.alert(
        'Error', 
        err.response?.data?.message || 'Failed to reschedule appointment'
      );
    }
  };

  // Format time for display
  const formatTimeDisplay = (startTime, endTime) => {
    const format = (time) => {
      const [hours, minutes] = time.split(':');
      const hour = parseInt(hours, 10);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const hour12 = hour % 12 || 12;
      return `${hour12}:${minutes} ${ampm}`;
    };
    return `${format(startTime)} - ${format(endTime)}`;
  };

  // Refresh data
  const onRefresh = () => {
    setRefreshing(true);
    fetchAppointments().finally(() => setRefreshing(false));
  };

  // Initial data fetch
  useEffect(() => {
    fetchAppointments();
  }, []);

  // Render appointment item
  const renderAppointmentItem = ({ item }) => (
    <View style={styles.appointmentCard}>
      <View style={styles.cardHeader}>
        <View style={styles.professionalInfo}>
          <Text style={styles.serviceName}>{item.service}</Text>
          <Text style={styles.categoryName}>{item.category}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.detailRow}>
          <Ionicons name="calendar" size={18} color="#555" />
          <Text style={styles.detailText}>{item.date} at {item.time}</Text>
        </View>
      </View>

      <View style={styles.cardFooter}>
        <TouchableOpacity
          style={[styles.actionButton, styles.rescheduleButton, 
                 (item.status === 'Completed' || item.status === 'Cancelled') && styles.disabledButton]}
          onPress={() => handleRescheduleClick(item)}
          disabled={item.status === 'Completed' || item.status === 'Cancelled'}
        >
          <Text style={styles.buttonText}>Reschedule</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, styles.cancelButton, 
                 (item.status === 'Completed' || item.status === 'Cancelled') && styles.disabledButton]}
          onPress={() => handleCancel(item.id)}
          disabled={item.status === 'Completed' || item.status === 'Cancelled'}
        >
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // Get status color
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed': return '#4CAF50';
      case 'pending': return '#FFC107';
      case 'completed': return '#9E9E9E';
      case 'cancelled': return '#F44336';
      default: return '#2196F3';
    }
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={fetchAppointments}
        >
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>My Appointments</Text>

      <FlatList
        data={appointments}
        renderItem={renderAppointmentItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#4CAF50']}
            tintColor="#4CAF50"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar-outline" size={50} color="#CCCCCC" />
            <Text style={styles.emptyText}>No appointments scheduled</Text>
          </View>
        }
      />

      {/* Reschedule Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={rescheduleModalVisible}
        onRequestClose={() => setRescheduleModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Reschedule Appointment</Text>
            
            <TouchableOpacity 
              style={styles.datePickerButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.datePickerText}>
                {selectedDate.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Text>
              <Ionicons name="calendar" size={20} color="#4CAF50" />
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={selectedDate}
                mode="date"
                minimumDate={new Date()}
                onChange={handleDateChange}
              />
            )}

            <Text style={styles.sectionTitle}>Available Time Slots</Text>
            
            {loadingSlots ? (
              <ActivityIndicator size="small" color="#4CAF50" />
            ) : (
              <ScrollView style={styles.timeSlotsContainer}>
                {timeSlots.map((slot, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.timeSlotButton,
                      selectedTimeSlot?.startTime === slot.startTime && 
                      selectedTimeSlot?.endTime === slot.endTime
                        ? styles.selectedTimeSlot
                        : !slot.available && styles.unavailableTimeSlot
                    ]}
                    onPress={() => slot.available && setSelectedTimeSlot(slot)}
                    disabled={!slot.available}
                  >
                    <Text style={[
                      styles.timeSlotText,
                      selectedTimeSlot?.startTime === slot.startTime && 
                      selectedTimeSlot?.endTime === slot.endTime
                        ? styles.selectedTimeSlotText
                        : !slot.available && styles.unavailableTimeSlotText
                    ]}>
                      {formatTimeDisplay(slot.startTime, slot.endTime)}
                    </Text>
                    {!slot.available && (
                      <Text style={styles.bookedText}>Booked</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}

            <Text style={styles.sectionTitle}>Reason (Optional)</Text>
            <TextInput
              style={styles.reasonInput}
              placeholder="Enter reason for rescheduling"
              value={rescheduleReason}
              onChangeText={setRescheduleReason}
              multiline
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setRescheduleModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={confirmReschedule}
                disabled={!selectedTimeSlot}
              >
                <Text style={styles.modalButtonText}>Confirm Reschedule</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#F44336',
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginHorizontal: 20,
    marginBottom: 15,
  },
  listContainer: {
    paddingHorizontal: 15,
    paddingBottom: 20,
  },
  appointmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    justifyContent: 'space-between',
  },
  professionalInfo: {
    flex: 1,
  },
  professionalName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  serviceName: {
    // fontSize: 14,
    // color: '#666',
    // marginTop: 2,
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  categoryName:{
fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
  cardBody: {
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#555',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rescheduleButton: {
    backgroundColor: '#2196F3',
    marginRight: 8,
  },
  cancelButton: {
    backgroundColor: '#D32F2F',
    marginLeft: 8,
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
  },
  emptyText: {
    marginTop: 15,
    fontSize: 16,
    color: '#999',
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  datePickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 15,
  },
  datePickerText: {
    fontSize: 16,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#555',
  },
  timeSlotsContainer: {
    maxHeight: 150,
    marginBottom: 15,
  },
  timeSlotButton: {
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f9f9f9',
  },
  selectedTimeSlot: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  unavailableTimeSlot: {
    backgroundColor: '#f0f0f0',
    borderColor: '#e0e0e0',
  },
  timeSlotText: {
    textAlign: 'center',
    color: '#333',
  },
  selectedTimeSlotText: {
    color: 'white',
    fontWeight: 'bold',
  },
  unavailableTimeSlotText: {
    color: '#999',
  },
  bookedText: {
    textAlign: 'center',
    fontSize: 12,
    color: '#f44336',
    marginTop: 4,
  },
  reasonInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    minHeight: 80,
    marginBottom: 15,
    textAlignVertical: 'top',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  modalcancelButton: {
    backgroundColor: '#f0f0f0',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
  },
  modalButtonText: {
    fontWeight: 'bold',
    color: 'white',
  },
});

export default AppointmentList;