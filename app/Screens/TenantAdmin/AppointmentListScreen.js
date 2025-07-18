import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList,
  ActivityIndicator,
  RefreshControl,
  Alert,
  Dimensions,
  Platform,
  Modal,
  TextInput,
  ScrollView
} from 'react-native';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TENANT_CONFIG } from '../../config/constants';
import { format, parseISO } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePicker from '@react-native-community/datetimepicker';

const { width } = Dimensions.get('window');
const isIOS = Platform.OS === 'ios';

const AppointmentListScreen = () => {
  const navigation = useNavigation();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [viewModalVisible, setViewModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editedAppointment, setEditedAppointment] = useState({
    date: new Date(),
    time: '10:00',
    status: 'Pending',
    notes: ''
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      setRefreshing(true);
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
        appointmentId: appointment._id,
        customerName: appointment.customer?.user?.name || 'Unknown Customer',
        service: appointment.service?.name || 'Service',
        date: format(parseISO(appointment.date), 'yyyy-MM-dd'),
        time: appointment.time || '10:00',
        status: appointment.status || 'Pending',
        address: appointment.address || 'No address provided',
        notes: appointment.notes || '',
        originalData: appointment
      }));

      setAppointments(transformedAppointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      Alert.alert('Error', 'Failed to fetch appointments');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleViewAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setViewModalVisible(true);
  };

  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setEditedAppointment({
      date: new Date(appointment.date),
      time: appointment.time,
      status: appointment.status,
      notes: appointment.notes
    });
    setEditModalVisible(true);
  };

  const handleAssignCrew = (appointment) => {
    navigation.navigate('AssignCrew', { 
      appointment: appointment.originalData 
    });
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setEditedAppointment(prev => ({
        ...prev,
        date: selectedDate
      }));
    }
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      const formattedTime = format(selectedTime, 'HH:mm');
      setEditedAppointment(prev => ({
        ...prev,
        time: formattedTime
      }));
    }
  };

  const updateAppointment = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      
      const response = await axios.put(
        `${TENANT_CONFIG.API_BASE_URL}/appointments/${selectedAppointment.id}`,
        {
          date: format(editedAppointment.date, 'yyyy-MM-dd'),
          time: editedAppointment.time,
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
        Alert.alert('Success', 'Appointment updated successfully');
        fetchAppointments();
        setEditModalVisible(false);
      } else {
        throw new Error(response.data.error || 'Failed to update appointment');
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
      Alert.alert('Error', error.response?.data?.error || 'Failed to update appointment');
    }
  };

  const renderAppointmentItem = ({ item }) => (
    <View style={styles.appointmentCard}>
      <LinearGradient
        colors={['#ffffff', '#f8f9fa']}
        start={[0, 0]}
        end={[1, 1]}
        style={styles.cardBackground}
      >
        <View style={styles.appointmentHeader}>
          <View style={styles.customerInfo}>
            <Ionicons name="person-circle" size={24} color="#495057" />
            <Text style={styles.customerName}>{item.customerName}</Text>
          </View>
          <View style={[
            styles.statusBadge, 
            item.status === 'Pending' ? styles.pendingStatus :
            item.status === 'Assigned' ? styles.assignedStatus :
            styles.completedStatus
          ]}>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>
        
        <View style={styles.detailRow}>
          <MaterialIcons name="design-services" size={18} color="#6c757d" />
          <Text style={styles.serviceText}>{item.service}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <Ionicons name="calendar" size={16} color="#6c757d" />
          <Text style={styles.detailText}>{item.date}</Text>
          <Ionicons name="time" size={16} color="#6c757d" style={styles.iconSpacing} />
          <Text style={styles.detailText}>{item.time}</Text>
        </View>
        
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, styles.viewButton]}
            onPress={() => handleViewAppointment(item)}
          >
            <FontAwesome name="eye" size={14} color="#fff" />
            <Text style={styles.actionButtonText}>View</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.editButton]}
            onPress={() => handleEditAppointment(item)}
          >
            <MaterialIcons name="edit" size={14} color="#fff" />
            <Text style={styles.actionButtonText}>Edit</Text>
          </TouchableOpacity>
          
          {item.status !== 'Completed' && (
            <TouchableOpacity 
              style={[styles.actionButton, styles.assignButton]}
              onPress={() => handleAssignCrew(item)}
            >
              <FontAwesome name="users" size={14} color="#fff" />
              <Text style={styles.actionButtonText}>Assign</Text>
            </TouchableOpacity>
          )}
        </View>
      </LinearGradient>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Loading Appointments...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4CAF50', '#2E7D32']}
        style={styles.header}
      >
        <Text style={styles.headerTitle}>Appointments</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={fetchAppointments}>
          <Ionicons name="refresh" size={24} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>
      
      <FlatList
        data={appointments}
        renderItem={renderAppointmentItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchAppointments}
            colors={['#4CAF50']}
            tintColor="#4CAF50"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="calendar" size={48} color="#adb5bd" />
            <Text style={styles.emptyText}>No Appointments Found</Text>
            <Text style={styles.emptySubtext}>Pull to refresh or create a new appointment</Text>
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
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            {selectedAppointment && (
              <>
                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>Customer:</Text>
                  <Text style={styles.detailValue}>{selectedAppointment.customerName}</Text>
                </View>

                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>Service:</Text>
                  <Text style={styles.detailValue}>{selectedAppointment.service}</Text>
                </View>

                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>Date:</Text>
                  <Text style={styles.detailValue}>{selectedAppointment.date}</Text>
                </View>

                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>Time:</Text>
                  <Text style={styles.detailValue}>{selectedAppointment.time}</Text>
                </View>

                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>Status:</Text>
                  <View style={[
                    styles.statusBadge, 
                    selectedAppointment.status === 'Pending' ? styles.pendingStatus :
                    selectedAppointment.status === 'Assigned' ? styles.assignedStatus :
                    styles.completedStatus,
                    { marginLeft: 0 }
                  ]}>
                    <Text style={styles.statusText}>{selectedAppointment.status}</Text>
                  </View>
                </View>

                <View style={styles.detailSection}>
                  <Text style={styles.detailLabel}>Address:</Text>
                  <Text style={styles.detailValue}>{selectedAppointment.address}</Text>
                </View>

                {selectedAppointment.notes && (
                  <View style={styles.detailSection}>
                    <Text style={styles.detailLabel}>Notes:</Text>
                    <Text style={styles.detailValue}>{selectedAppointment.notes}</Text>
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

      {/* Edit Appointment Modal */}
      <Modal
        visible={editModalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Edit Appointment</Text>
            <TouchableOpacity onPress={() => setEditModalVisible(false)}>
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalContent}>
            {selectedAppointment && (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Date</Text>
                  <TouchableOpacity
                    style={styles.dateInput}
                    onPress={() => setShowDatePicker(true)}
                  >
                    <Text>{format(editedAppointment.date, 'yyyy-MM-dd')}</Text>
                  </TouchableOpacity>
                  {showDatePicker && (
                    <DateTimePicker
                      value={editedAppointment.date}
                      mode="date"
                      display="default"
                      onChange={handleDateChange}
                    />
                  )}
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Time</Text>
                  <TouchableOpacity
                    style={styles.dateInput}
                    onPress={() => setShowTimePicker(true)}
                  >
                    <Text>{editedAppointment.time}</Text>
                  </TouchableOpacity>
                  {showTimePicker && (
                    <DateTimePicker
                      value={new Date(`1970-01-01T${editedAppointment.time}:00`)}
                      mode="time"
                      display="default"
                      onChange={handleTimeChange}
                    />
                  )}
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Status</Text>
                  <View style={styles.statusOptions}>
                    {['Pending', 'Assigned', 'Completed'].map(status => (
                      <TouchableOpacity
                        key={status}
                        style={[
                          styles.statusOption,
                          editedAppointment.status === status && styles.selectedStatusOption,
                          status === 'Pending' ? styles.pendingStatus :
                          status === 'Assigned' ? styles.assignedStatus :
                          styles.completedStatus
                        ]}
                        onPress={() => setEditedAppointment(prev => ({
                          ...prev,
                          status
                        }))}
                      >
                        <Text style={styles.statusOptionText}>{status}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Notes</Text>
                  <TextInput
                    style={styles.notesInput}
                    value={editedAppointment.notes}
                    onChangeText={(text) => setEditedAppointment(prev => ({
                      ...prev,
                      notes: text
                    }))}
                    placeholder="Add any notes about this appointment"
                    multiline
                    numberOfLines={4}
                  />
                </View>
              </>
            )}
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={updateAppointment}
            >
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setEditModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  loadingText: {
    marginTop: 16,
    color: '#495057',
    fontSize: 16,
    fontWeight: '500',
  },
  header: {
    padding: 20,
    paddingTop: 50,
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0,0,0,0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  refreshButton: {
    padding: 8,
  },
  listContent: {
    padding: 16,
    paddingBottom: 20,
  },
  appointmentCard: {
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardBackground: {
    padding: 20,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  customerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  customerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#343a40',
    marginLeft: 10,
  },
  statusBadge: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  statusText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  pendingStatus: {
    backgroundColor: '#ffc107',
  },
  assignedStatus: {
    backgroundColor: '#17a2b8',
  },
  completedStatus: {
    backgroundColor: '#28a745',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  serviceText: {
    fontSize: 16,
    color: '#495057',
    marginLeft: 8,
    fontWeight: '500',
  },
  detailText: {
    fontSize: 14,
    color: '#6c757d',
    marginLeft: 8,
  },
  iconSpacing: {
    marginLeft: 15,
  },
  addressText: {
    fontSize: 14,
    color: '#6c757d',
    marginLeft: 8,
    flex: 1,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
    minWidth: 80,
    justifyContent: 'center',
  },
  viewButton: {
    backgroundColor: '#17a2b8',
  },
  editButton: {
    backgroundColor: '#ffc107',
  },
  assignButton: {
    backgroundColor: '#6f42c1',
  },
  actionButtonText: {
    color: '#fff',
    marginLeft: 6,
    fontWeight: '500',
    fontSize: 13,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 12,
    marginTop: 50,
  },
  emptyText: {
    fontSize: 20,
    color: '#495057',
    marginTop: 16,
    fontWeight: '600',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#6c757d',
    marginTop: 8,
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  modalContent: {
    padding: 16,
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  detailSection: {
    marginBottom: 20,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: '#111827',
  },
  closeButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
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
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedStatusOption: {
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  statusOptionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  notesInput: {
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    height: 100,
    textAlignVertical: 'top',
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#F3F4F6',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginLeft: 8,
  },
  cancelButtonText: {
    color: '#6B7280',
    fontWeight: '600',
  },
});

export default AppointmentListScreen;