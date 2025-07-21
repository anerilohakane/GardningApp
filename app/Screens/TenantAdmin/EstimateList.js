import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Alert,
  Dimensions,
  Modal,
  TextInput,
  ScrollView
} from 'react-native';
import { Card, Searchbar, Button, Divider } from 'react-native-paper';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TENANT_CONFIG } from '../../config/constants';
import { format } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';
import RNPickerSelect from 'react-native-picker-select';

const { width } = Dimensions.get('window');

const TenantEstimatesScreen = ({ navigation }) => {
  const [estimates, setEstimates] = useState([]);
  const [filteredEstimates, setFilteredEstimates] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentEstimate, setCurrentEstimate] = useState(null);
  const [editedEstimate, setEditedEstimate] = useState({
    status: '',
    services: []
  });
  const [services, setServices] = useState([]);
  const [loadingServices, setLoadingServices] = useState(false);

  useEffect(() => {
    fetchEstimates();
    fetchServices();
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredEstimates(estimates);
    } else {
      const filtered = estimates.filter(estimate =>
        estimate.customer?.user?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        estimate.services[0]?.service?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        estimate.status.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredEstimates(filtered);
    }
  }, [searchQuery, estimates]);

  const fetchEstimates = async () => {
    try {
      setRefreshing(true);
      const token = await AsyncStorage.getItem('token');
      
      const response = await axios.get(`${TENANT_CONFIG.API_BASE_URL}/estimates`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
          'X-Tenant-ID': TENANT_CONFIG.ID
        },
        params: {
          tenant: TENANT_CONFIG.ID
        }
      });

      const transformedEstimates = response.data.data.map(estimate => ({
        _id: estimate._id,
        estimateNumber: estimate.estimateNumber || `EST-${estimate._id.substring(0, 6).toUpperCase()}`,
        status: estimate.status || 'Requested',
        customer: estimate.customer,
        customerName: estimate.customer?.user?.name || 'Unknown Customer',
        serviceType: estimate.services[0]?.service?.name || 'Service',
        totalAmount: calculateTotalAmount(estimate.services),
        createdAt: estimate.createdAt,
        createdBy: estimate.createdBy,
        services: estimate.services
      }));

      setEstimates(transformedEstimates);
      setFilteredEstimates(transformedEstimates);
    } catch (error) {
      console.error('Error fetching estimates:', error);
      Alert.alert('Error', 'Failed to fetch estimates');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const fetchServices = async () => {
    try {
      setLoadingServices(true);
      const token = await AsyncStorage.getItem('token');
      
      const response = await axios.get(`${TENANT_CONFIG.API_BASE_URL}/services`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
          'X-Tenant-ID': TENANT_CONFIG.ID
        }
      });

      setServices(response.data.data);
    } catch (error) {
      console.error('Error fetching services:', error);
      Alert.alert('Error', 'Failed to fetch services');
    } finally {
      setLoadingServices(false);
    }
  };

  const calculateTotalAmount = (services) => {
    if (!services || services.length === 0) return 0;
    return services.reduce((total, service) => {
      return total + (service.quantity * service.price);
    }, 0);
  };

  const openEditModal = (estimate) => {
    setCurrentEstimate(estimate);
    setEditedEstimate({
      status: estimate.status || 'Requested',
      services: estimate.services.map(service => ({
        _id: service._id || '',
        service: {
          _id: service.service?._id || '',
          name: service.service?.name || ''
        },
        quantity: service.quantity || 1,
        price: service.price || 0
      }))
    });
    setEditModalVisible(true);
  };

  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...editedEstimate.services];
    
    if (field === 'service') {
      const selectedService = services.find(s => s._id === value);
      updatedServices[index].service = {
        _id: selectedService._id,
        name: selectedService.name
      };
      updatedServices[index].price = selectedService.price || 0;
    } else {
      updatedServices[index][field] = field === 'quantity' ? parseInt(value) || 1 : value;
    }
    
    setEditedEstimate(prev => ({
      ...prev,
      services: updatedServices
    }));
  };

  const addService = () => {
    setEditedEstimate(prev => ({
      ...prev,
      services: [
        ...prev.services,
        {
          service: { _id: '', name: '' },
          quantity: 1,
          price: 0
        }
      ]
    }));
  };

  const removeService = (index) => {
    const updatedServices = [...editedEstimate.services];
    updatedServices.splice(index, 1);
    setEditedEstimate(prev => ({
      ...prev,
      services: updatedServices
    }));
  };

  const handleStatusChange = (status) => {
    setEditedEstimate(prev => ({
      ...prev,
      status
    }));
  };

  const updateEstimate = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      
      // Prepare the payload with only necessary fields
      const payload = {
        status: editedEstimate.status,
        services: editedEstimate.services.map(service => ({
          service: service.service._id,
          quantity: service.quantity
        }))
      };
      
      const response = await axios.put(
        `${TENANT_CONFIG.API_BASE_URL}/estimates/${currentEstimate._id}`,
        payload,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
            'X-Tenant-ID': TENANT_CONFIG.ID,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        Alert.alert('Success', 'Estimate updated successfully');
        fetchEstimates(); // Refresh the list
        setEditModalVisible(false);
      } else {
        throw new Error(response.data.error || 'Failed to update estimate');
      }
    } catch (error) {
      console.error('Error updating estimate:', error);
      Alert.alert('Error', error.response?.data?.error || 'Failed to update estimate');
    }
  };

  const renderEstimateItem = ({ item }) => (
    <TouchableOpacity 
      onPress={() => navigation.navigate('TenantEstimateDetail', { estimate: item })}
      activeOpacity={0.9}
    >
      <Card style={styles.estimateCard}>
        <LinearGradient
          colors={['#FFFFFF', '#F0FFF4']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.cardGradient}
        >
          <Card.Content>
            <View style={styles.estimateHeader}>
              <View style={styles.estimateNumberContainer}>
                <MaterialIcons name="receipt" size={18} color="#10B981" />
                <Text style={styles.estimateTitle}>#{item.estimateNumber}</Text>
              </View>
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                <Text style={[styles.statusText, { color: getStatusTextColor(item.status) }]}>
                  {item.status.toUpperCase()}
                </Text>
              </View>
            </View>
            
            <View style={styles.customerRow}>
              <Ionicons name="person-circle-outline" size={20} color="#6B7280" />
              <Text style={styles.customerName}>{item.customerName}</Text>
            </View>
            
            <View style={styles.serviceRow}>
              <Ionicons name="construct-outline" size={20} color="#6B7280" />
              <Text style={styles.serviceType}>{item.serviceType}</Text>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.detailsRow}>
              <View style={styles.detailItem}>
                <Ionicons name="calendar" size={16} color="#6B7280" />
                <Text style={styles.detailText}>
                  {format(new Date(item.createdAt), 'MMM dd, yyyy')}
                </Text>
              </View>
              
              <TouchableOpacity 
                style={styles.editButton}
                onPress={(e) => {
                  e.stopPropagation();
                  openEditModal(item);
                }}
              >
                <Ionicons name="create-outline" size={18} color="#10B981" />
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>
          </Card.Content>
        </LinearGradient>
      </Card>
    </TouchableOpacity>
  );

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return '#D1FAE5';
      case 'in review':
        return '#FEF3C7';
      case 'declined':
        return '#FEE2E2';
      case 'requested':
        return '#E5E7EB';
      case 'prepared':
        return '#BFDBFE';
      case 'sent':
        return '#CFFAFE';
      case 'expired':
        return '#E5E7EB';
      default:
        return '#E5E7EB';
    }
  };

  const getStatusTextColor = (status) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return '#065F46';
      case 'in review':
        return '#92400E';
      case 'declined':
        return '#991B1B';
      case 'requested':
        return '#6B7280';
      case 'prepared':
        return '#1E40AF';
      case 'sent':
        return '#155E75';
      case 'expired':
        return '#6B7280';
      default:
        return '#6B7280';
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header with Green Accent */}
      <View style={styles.header}>
        <LinearGradient
          colors={['#10B981', '#34D399']}
          style={styles.headerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <Text style={styles.headerTitle}>Estimates</Text>
          <Text style={styles.headerSubtitle}>Manage your service estimates</Text>
        </LinearGradient>
      </View>

      {/* Search Bar */}
      <Searchbar
        placeholder="Search estimates..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        inputStyle={styles.searchInput}
        iconColor="#6B7280"
        placeholderTextColor="#9CA3AF"
      />

      {/* Estimates List */}
      <FlatList
        data={filteredEstimates}
        renderItem={renderEstimateItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={fetchEstimates}
            colors={['#10B981']}
            tintColor="#10B981"
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIllustration}>
              <Ionicons name="document-text-outline" size={72} color="#E5E7EB" />
            </View>
            <Text style={styles.emptyText}>No estimates found</Text>
            <Text style={styles.emptySubtext}>Your estimates will appear here</Text>
          </View>
        }
      />

      {/* Edit Estimate Modal */}
      <Modal
        visible={editModalVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Edit Estimate</Text>
            <TouchableOpacity onPress={() => setEditModalVisible(false)}>
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView contentContainerStyle={styles.modalContent}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Status</Text>
              <View style={styles.statusOptions}>
                {['Requested', 'In Review', 'Prepared', 'Sent', 'Approved', 'Declined', 'Expired'].map(status => (
                  <TouchableOpacity
                    key={status}
                    style={[
                      styles.statusOption,
                      editedEstimate.status === status && styles.selectedStatusOption,
                      { backgroundColor: getStatusColor(status) }
                    ]}
                    onPress={() => handleStatusChange(status)}
                  >
                    <Text style={[
                      styles.statusOptionText,
                      { color: getStatusTextColor(status) }
                    ]}>
                      {status}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <Divider style={styles.modalDivider} />

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Services</Text>
              {editedEstimate.services.map((service, index) => (
                <View key={`${service._id}-${index}`} style={styles.serviceContainer}>
                  <View style={styles.serviceHeader}>
                    <Text style={styles.serviceLabel}>Service {index + 1}</Text>
                    {editedEstimate.services.length > 1 && (
                      <TouchableOpacity 
                        style={styles.removeServiceButton}
                        onPress={() => removeService(index)}
                      >
                        <Ionicons name="trash-outline" size={18} color="#EF4444" />
                      </TouchableOpacity>
                    )}
                  </View>
                  
                  {loadingServices ? (
                    <ActivityIndicator size="small" color="#10B981" />
                  ) : (
                    <RNPickerSelect
                      onValueChange={(value) => handleServiceChange(index, 'service', value)}
                      items={services.map(s => ({
                        label: s.name,
                        value: s._id,
                        key: s._id
                      }))}
                      value={service.service._id}
                      placeholder={{ label: "Select a service...", value: null }}
                      style={pickerSelectStyles}
                    />
                  )}

                  <View style={styles.serviceDetails}>
                    <View style={styles.serviceDetailInput}>
                      <Text style={styles.inputLabel}>Quantity</Text>
                      <TextInput
                        style={[styles.input, styles.smallInput]}
                        value={service.quantity.toString()}
                        onChangeText={(text) => handleServiceChange(index, 'quantity', text)}
                        placeholder="Quantity"
                        keyboardType="numeric"
                      />
                    </View>
                    <View style={styles.serviceDetailInput}>
                      <Text style={styles.inputLabel}>Price</Text>
                      <TextInput
                        style={[styles.input, styles.smallInput]}
                        value={service.price.toString()}
                        onChangeText={(text) => handleServiceChange(index, 'price', text)}
                        placeholder="Price"
                        keyboardType="numeric"
                        editable={false}
                      />
                    </View>
                  </View>
                </View>
              ))}
              
              <Button
                mode="outlined"
                onPress={addService}
                style={styles.addServiceButton}
                labelStyle={styles.addServiceButtonText}
              >
                <Ionicons name="add" size={18} color="#10B981" />
                <Text style={{ marginLeft: 8 }}>Add Service</Text>
              </Button>
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <Button
              mode="contained"
              onPress={updateEstimate}
              style={styles.saveButton}
              labelStyle={styles.saveButtonText}
            >
              Save Changes
            </Button>
            <Button
              mode="outlined"
              onPress={() => setEditModalVisible(false)}
              style={styles.cancelButton}
              labelStyle={styles.cancelButtonText}
            >
              Cancel
            </Button>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    height: 160,
    marginBottom: 16,
  },
  headerGradient: {
    flex: 1,
    padding: 24,
    paddingTop: 40,
    justifyContent: 'flex-end',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  searchBar: {
    margin: 16,
    marginTop: -24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 48,
  },
  searchInput: {
    minHeight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: 14,
    color: '#111827',
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  estimateCard: {
    marginBottom: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  cardGradient: {
    padding: 16,
  },
  estimateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  estimateNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  estimateTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 8,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  customerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  customerName: {
    fontSize: 15,
    fontWeight: '500',
    color: '#111827',
    marginLeft: 8,
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  serviceType: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 12,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 13,
    color: '#6B7280',
    marginLeft: 6,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    borderRadius: 8,
    backgroundColor: '#ECFDF5',
  },
  editButtonText: {
    fontSize: 14,
    color: '#10B981',
    marginLeft: 4,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIllustration: {
    backgroundColor: '#F9FAFB',
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    textAlign: 'center',
    marginBottom: 24,
    maxWidth: '80%',
  },
  // Modal Styles
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
    paddingBottom: 80,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
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
    borderColor: '#10B981',
  },
  statusOptionText: {
    fontSize: 14,
    fontWeight: '500',
  },
  modalDivider: {
    marginVertical: 16,
    backgroundColor: '#E5E7EB',
  },
  serviceContainer: {
    marginBottom: 20,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  removeServiceButton: {
    padding: 4,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 14,
    color: '#111827',
  },
  inputLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  smallInput: {
    flex: 1,
    marginRight: 8,
  },
  serviceDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  serviceDetailInput: {
    flex: 1,
  },
  addServiceButton: {
    borderColor: '#10B981',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  addServiceButtonText: {
    color: '#10B981',
  },
  modalFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#10B981',
    borderRadius: 8,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  cancelButton: {
    flex: 1,
    marginLeft: 8,
    borderColor: '#E5E7EB',
    borderRadius: 8,
  },
  cancelButtonText: {
    color: '#6B7280',
    fontWeight: '600',
  },
});

export default TenantEstimatesScreen;