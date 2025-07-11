import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AppointmentListScreen = () => {
  const navigation = useNavigation();

  // Sample appointment data
  const appointments = [
    {
      id: '1',
      customerName: 'John Smith',
      service: 'Lawn Mowing',
      date: '2023-06-15',
      time: '09:00 AM',
      status: 'Pending',
      address: '123 Main St, Anytown'
    },
    {
      id: '2',
      customerName: 'Sarah Johnson',
      service: 'Tree Trimming',
      date: '2023-06-16',
      time: '10:30 AM',
      status: 'Assigned',
      address: '456 Oak Ave, Somewhere'
    },
    {
      id: '3',
      customerName: 'Mike Brown',
      service: 'Garden Maintenance',
      date: '2023-06-17',
      time: '01:00 PM',
      status: 'Completed',
      address: '789 Pine Rd, Nowhere'
    },
  ];

  // Handle view appointment
  const handleViewAppointment = (appointment) => {
    navigation.navigate('ViewAppointment', { appointment });
  };

  // Handle edit appointment
  const handleEditAppointment = (appointment) => {
    navigation.navigate('EditAppointment', { appointment });
  };

  // Handle assign crew
  const handleAssignCrew = (appointment) => {
    navigation.navigate('AssignCrew', { appointment });
  };

  // Render each appointment item
  const renderAppointmentItem = ({ item }) => (
    <View style={styles.appointmentCard}>
      <View style={styles.appointmentHeader}>
        <Text style={styles.customerName}>{item.customerName}</Text>
        <Text style={[styles.statusBadge, 
          item.status === 'Pending' ? styles.pendingStatus :
          item.status === 'Assigned' ? styles.assignedStatus :
          styles.completedStatus
        ]}>
          {item.status}
        </Text>
      </View>
      
      <Text style={styles.serviceText}>{item.service}</Text>
      <Text style={styles.dateTimeText}>{item.date} at {item.time}</Text>
      <Text style={styles.addressText}>{item.address}</Text>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.viewButton]}
          onPress={() => handleViewAppointment(item)}
        >
          <FontAwesome name="eye" size={16} color="#fff" />
          <Text style={styles.actionButtonText}>View</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.editButton]}
          onPress={() => handleEditAppointment(item)}
        >
          <MaterialIcons name="edit" size={16} color="#fff" />
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.assignButton]}
          onPress={() => handleAssignCrew(item)}
        >
          <FontAwesome name="users" size={16} color="#fff" />
          <Text style={styles.actionButtonText}>Assign Crew</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Appointments</Text>
      </View>
      
      <FlatList
        data={appointments}
        renderItem={renderAppointmentItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 16,
    backgroundColor: '#4CAF50',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  listContent: {
    padding: 16,
  },
  appointmentCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  appointmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  customerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  pendingStatus: {
    backgroundColor: '#FFC107',
  },
  assignedStatus: {
    backgroundColor: '#2196F3',
  },
  completedStatus: {
    backgroundColor: '#4CAF50',
  },
  serviceText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  dateTimeText: {
    fontSize: 14,
    color: '#777',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: '#777',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  viewButton: {
    backgroundColor: '#2196F3',
  },
  editButton: {
    backgroundColor: '#FF9800',
  },
  assignButton: {
    backgroundColor: '#9C27B0',
  },
  actionButtonText: {
    color: '#fff',
    marginLeft: 6,
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default AppointmentListScreen;