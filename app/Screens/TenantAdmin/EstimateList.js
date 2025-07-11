import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const EstimateList = () => {
  const navigation = useNavigation();

  // Sample estimate data
  const [estimates, setEstimates] = React.useState([
    {
      id: '1',
      customerName: 'John Smith',
      service: 'Lawn Mowing',
      amount: '$120',
      date: '2023-06-15',
      status: 'Pending',
      address: '123 Main St, Anytown'
    },
    {
      id: '2',
      customerName: 'Sarah Johnson',
      service: 'Tree Trimming',
      amount: '$250',
      date: '2023-06-16',
      status: 'Approved',
      address: '456 Oak Ave, Somewhere'
    },
    {
      id: '3',
      customerName: 'Mike Brown',
      service: 'Garden Maintenance',
      amount: '$180',
      date: '2023-06-17',
      status: 'Rejected',
      address: '789 Pine Rd, Nowhere'
    },
  ]);

  // Handle view estimate
  const handleViewEstimate = (estimate) => {
    navigation.navigate('ViewEstimate', { estimate });
  };

  // Handle edit estimate
  const handleEditEstimate = (estimate) => {
    navigation.navigate('EditEstimate', { estimate });
  };

  // Render each estimate item
  const renderEstimateItem = ({ item }) => (
    <View style={styles.estimateCard}>
      <View style={styles.estimateHeader}>
        <Text style={styles.customerName}>{item.customerName}</Text>
        <Text style={[
          styles.statusBadge,
          item.status === 'Pending' ? styles.pendingStatus :
          item.status === 'Approved' ? styles.approvedStatus :
          styles.rejectedStatus
        ]}>
          {item.status}
        </Text>
      </View>
      
      <Text style={styles.serviceText}>{item.service}</Text>
      <Text style={styles.amountText}>{item.amount}</Text>
      <Text style={styles.dateText}>Created: {item.date}</Text>
      <Text style={styles.addressText}>{item.address}</Text>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.viewButton]}
          onPress={() => handleViewEstimate(item)}
        >
          <FontAwesome name="eye" size={16} color="#fff" />
          <Text style={styles.actionButtonText}>View</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.editButton]}
          onPress={() => handleEditEstimate(item)}
        >
          <MaterialIcons name="edit" size={16} color="#fff" />
          <Text style={styles.actionButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Estimates</Text>
      </View>
      
      <FlatList
        data={estimates}
        renderItem={renderEstimateItem}
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
  estimateCard: {
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
  estimateHeader: {
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
  approvedStatus: {
    backgroundColor: '#4CAF50',
  },
  rejectedStatus: {
    backgroundColor: '#F44336',
  },
  serviceText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 4,
  },
  amountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 4,
  },
  dateText: {
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
    justifyContent: 'flex-end',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginLeft: 8,
  },
  viewButton: {
    backgroundColor: '#2196F3',
  },
  editButton: {
    backgroundColor: '#FF9800',
  },
  actionButtonText: {
    color: '#fff',
    marginLeft: 6,
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default EstimateList;