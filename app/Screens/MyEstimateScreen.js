import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  StyleSheet, 
  TouchableOpacity, 
  ActivityIndicator,
  Image,
  RefreshControl,
  ScrollView
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TENANT_CONFIG } from '../config/constants';
import moment from 'moment';

const MyEstimatesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [estimates, setEstimates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

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

  // Fetch estimates from backend
  const fetchEstimates = async () => {
    try {
      setLoading(true);
      setError(null);
      const authToken = await getToken();
      
      if (!authToken) {
        throw new Error('Authentication token not found');
      }

      const response = await axios.get(`${TENANT_CONFIG.API_BASE_URL}/estimates/my-estimates`, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
          'X-Tenant-ID': TENANT_CONFIG.ID
        }
      });
      
      // Transform API data to include all service details
      const transformedEstimates = response.data.data.map(estimate => ({
        id: estimate._id,
        estimateId: estimate.estimateNumber || estimate._id,
        serviceNames: estimate.services?.map(s => s.service?.name) || ['No services'],
        services: estimate.services?.map(service => ({
          name: service.service?.name || 'Unnamed Service',
          description: service.service?.description || 'No description available',
          quantity: service.quantity || 1,
          unit: service.service?.unit || 'unit'
        })) || [],
        status: estimate.status.toLowerCase() || 'requested',
        date: moment(estimate.createdAt).format('MMM D, YYYY'),
        createdAt: moment(estimate.createdAt).format('MMM D, YYYY h:mm A'),
        budgetRange: estimate.budget ? `$${estimate.budget.min}-$${estimate.budget.max}` : 'Not specified',
        propertyDetails: {
          address: estimate.property?.address ? 
            `${estimate.property.address.street || ''}, ${estimate.property.address.city || ''}, ${estimate.property.address.state || ''} ${estimate.property.address.zipCode || ''}` 
            : 'No address provided',
          size: estimate.property?.size || 0,
          details: estimate.property?.details || ''
        },
        photos: estimate.photos?.map(photo => photo.url) || [],
        notes: estimate.customerNotes || '',
        totalAmount: estimate.packages?.find(pkg => pkg.name === estimate.approvedPackage)?.total || 0
      }));
      
      setEstimates(transformedEstimates);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching estimates:', err);
      setError(err.response?.data?.message || 'Failed to load estimates');
      setLoading(false);
    }
  };

  // Handle refresh
  const onRefresh = () => {
    setRefreshing(true);
    fetchEstimates().finally(() => setRefreshing(false));
  };

  // Initial data fetch
  useEffect(() => {
    fetchEstimates();
  }, []);

  // Handle new estimate from navigation params
  useEffect(() => {
    if (route.params?.newEstimate) {
      const newEstimate = {
        id: `estimate_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        estimateId: `TEMP-${Date.now()}`,
        serviceNames: route.params.newEstimate.services?.map(s => s.name) || ['New Service'],
        services: route.params.newEstimate.services?.map(service => ({
          name: service.name || 'Unnamed Service',
          description: service.description || 'No description available',
          quantity: service.quantity || 1,
          unit: service.unit || 'unit'
        })) || [],
        status: 'pending',
        date: moment().format('MMM D, YYYY'),
        createdAt: moment().format('MMM D, YYYY h:mm A'),
        budgetRange: route.params.newEstimate.budgetRange,
        propertyDetails: route.params.newEstimate.propertyDetails || {},
        photos: route.params.newEstimate.photos || []
      };
      
      setEstimates(prev => [newEstimate, ...prev]);
      navigation.setParams({ newEstimate: null });
    }
  }, [route.params?.newEstimate]);

 const renderServiceItem = (service, index) => (
  <View key={index} style={styles.serviceItem}>
    <View style={styles.serviceHeader}>
      <Text style={styles.serviceName}>{service.name}</Text>
    </View>
    {service.description && (
      <Text style={styles.serviceDescription}>{service.description}</Text>
    )}
    <Text style={styles.serviceQuantity}>Quantity: {service.quantity}</Text>
  </View>
);

  const renderEstimateItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.estimateCard}
      onPress={() => navigation.navigate('EstimateDetail', { estimate: item })}
    >
      <View style={styles.estimateHeader}>
        <Text style={styles.estimateId}>Estimate #{item.estimateId}</Text>
        <View style={[
          styles.statusBadge, 
          item.status === 'pending' || item.status === 'requested' ? styles.pendingBadge : 
          item.status === 'approved' ? styles.approvedBadge : 
          item.status === 'rejected' || item.status === 'declined' ? styles.rejectedBadge : 
          styles.completedBadge
        ]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      
      <View style={styles.propertyRow}>
        <MaterialIcons name="location-on" size={16} color="#6B7280" />
        <Text style={styles.propertyText}>
          {item.propertyDetails?.address || 'No address provided'}
        </Text>
      </View>
      
      <View style={styles.detailsRow}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Created</Text>
          <Text style={styles.detailValue}>{item.createdAt}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Budget Range</Text>
          <Text style={styles.detailValue}>{item.budgetRange}</Text>
        </View>
      </View>
      
      <View style={styles.servicesSection}>
        <Text style={styles.sectionLabel}>Requested Services</Text>
        <View style={styles.servicesList}>
          {item.services.map((service, index) => renderServiceItem(service, index))}
        </View>
      </View>
      
      {item.photos?.length > 0 && (
        <View style={styles.photosSection}>
          <Text style={styles.sectionLabel}>Photos ({item.photos.length})</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.photosScrollContainer}
          >
            {item.photos.map((photo, index) => (
              <Image 
                key={index}
                source={{ uri: photo }} 
                style={styles.photoThumbnail} 
                resizeMode="cover"
                onError={(e) => console.log('Image loading error:', e.nativeEvent.error)}
              />
            ))}
          </ScrollView>
        </View>
      )}
    </TouchableOpacity>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity
          style={styles.retryButton}
          onPress={fetchEstimates}
        >
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>My Estimates</Text> */}
      
      {estimates.length === 0 ? (
        <View style={styles.emptyContainer}>
          <MaterialIcons name="description" size={50} color="#D1D5DB" />
          <Text style={styles.emptyText}>No estimates yet</Text>
          <Text style={styles.emptySubtext}>Request an estimate to get started</Text>
        </View>
      ) : (
        <FlatList
          data={estimates}
          renderItem={renderEstimateItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#10B981']}
              tintColor="#10B981"
            />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 20,
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
    color: '#EF4444',
    marginBottom: 20,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#111827',
  },
  listContainer: {
    paddingBottom: 20,
  },
  estimateCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  estimateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  estimateId: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  pendingBadge: {
    backgroundColor: '#FEF3C7',
  },
  approvedBadge: {
    backgroundColor: '#D1FAE5',
  },
  rejectedBadge: {
    backgroundColor: '#FEE2E2',
  },
  completedBadge: {
    backgroundColor: '#E0E7FF',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  propertyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  propertyText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 4,
    flexShrink: 1,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  detailItem: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  servicesSection: {
    marginBottom: 16,
  },
  servicesList: {
    marginTop: 8,
  },
  serviceItem: {
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    flex: 1,
  },
  serviceQuantity: {
  fontSize: 13,
  color: '#6B7280',
  marginTop: 4,
},
  serviceDescription: {
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  photosSection: {
    marginBottom: 12,
  },
  photosScrollContainer: {
    paddingRight: 16,
  },
  photoThumbnail: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#6B7280',
    marginBottom: 8,
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
  },
});

export default MyEstimatesScreen;