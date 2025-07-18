// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
// import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
// import { useNavigation, useIsFocused } from '@react-navigation/native';

// const ServiceList = ({ navigation }) => {
//   const [services, setServices] = useState([
//     {
//       id: '1',
//       name: 'Lawn Mowing',
//       description: 'Standard lawn mowing service',
//       price: '$50',
//       duration: '1 hour',
//       category: 'Basic'
//     },
//     {
//       id: '2',
//       name: 'Tree Trimming',
//       description: 'Professional tree trimming',
//       price: '$120',
//       duration: '2 hours',
//       category: 'Advanced'
//     },
//     {
//       id: '3',
//       name: 'Garden Maintenance',
//       description: 'Weekly garden upkeep',
//       price: '$80',
//       duration: '1.5 hours',
//       category: 'Basic'
//     },
//   ]);

//   const isFocused = useIsFocused();

//   // Load services when screen is focused
//   useEffect(() => {
//     if (isFocused) {
//       // You would typically fetch from API here
//       // For now, we'll just maintain local state
//     }
//   }, [isFocused]);

//   const handleAddService = () => {
//     navigation.navigate('AddService', {
//       onAddService: (newService) => {
//         setServices(prevServices => [...prevServices, newService]);
//       }
//     });
//   };

//   // Handle edit service
//   const handleEditService = (service) => {
//     navigation.navigate('EditService', { 
//       service,
//       onUpdateService: (updatedService) => {
//         setServices(services.map(s => 
//           s.id === updatedService.id ? updatedService : s
//         ));
//       }
//     });
//   };

//   // Handle delete service
//   const handleDeleteService = (serviceId) => {
//     Alert.alert(
//       'Confirm Delete',
//       'Are you sure you want to delete this service?',
//       [
//         {
//           text: 'Cancel',
//           style: 'cancel',
//         },
//         {
//           text: 'Delete',
//           onPress: () => {
//             setServices(services.filter(service => service.id !== serviceId));
//           },
//           style: 'destructive',
//         },
//       ]
//     );
//   };

//   // Render each service item
//   const renderServiceItem = ({ item }) => (
//     <View style={styles.serviceCard}>
//       <View style={styles.serviceInfo}>
//         <Text style={styles.serviceName}>{item.name}</Text>
//         <Text style={styles.serviceDescription}>{item.description}</Text>
//         <View style={styles.serviceMeta}>
//           <Text style={styles.servicePrice}>{item.price}</Text>
//           <Text style={styles.serviceDuration}>{item.duration}</Text>
//           <Text style={styles.serviceCategory}>{item.category}</Text>
//         </View>
//       </View>
      
//       <View style={styles.actionButtons}>
//         <TouchableOpacity 
//           style={[styles.actionButton, styles.editButton]}
//           onPress={() => handleEditService(item)}
//         >
//           <MaterialIcons name="edit" size={20} color="#fff" />
//         </TouchableOpacity>
        
//         <TouchableOpacity 
//           style={[styles.actionButton, styles.deleteButton]}
//           onPress={() => handleDeleteService(item.id)}
//         >
//           <MaterialIcons name="delete" size={20} color="#fff" />
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Services</Text>
//         <TouchableOpacity 
//           style={styles.addButton}
//           onPress={handleAddService}
//         >
//           <Text style={styles.addButtonText}>Add Service</Text>
//           <MaterialIcons name="add" size={20} color="#fff" />
//         </TouchableOpacity>
//       </View>
      
//       <FlatList
//         data={services}
//         renderItem={renderServiceItem}
//         keyExtractor={item => item.id}
//         contentContainerStyle={styles.listContent}
//         showsVerticalScrollIndicator={false}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: '#4CAF50',
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   addButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#2196F3',
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 4,
//   },
//   addButtonText: {
//     color: '#fff',
//     marginRight: 6,
//     fontWeight: 'bold',
//     fontSize: 14,
//   },
//   listContent: {
//     padding: 16,
//   },
//   serviceCard: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     padding: 16,
//     marginBottom: 16,
//     elevation: 2,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.2,
//     shadowRadius: 2,
//   },
//   serviceInfo: {
//     flex: 1,
//   },
//   serviceName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 4,
//   },
//   serviceDescription: {
//     fontSize: 14,
//     color: '#666',
//     marginBottom: 8,
//   },
//   serviceMeta: {
//     flexDirection: 'row',
//   },
//   servicePrice: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#4CAF50',
//     marginRight: 12,
//   },
//   serviceDuration: {
//     fontSize: 14,
//     color: '#777',
//     marginRight: 12,
//   },
//   serviceCategory: {
//     fontSize: 14,
//     color: '#9C27B0',
//     fontStyle: 'italic',
//   },
//   actionButtons: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   actionButton: {
//     padding: 8,
//     borderRadius: 4,
//     marginLeft: 8,
//   },
//   editButton: {
//     backgroundColor: '#FF9800',
//   },
//   deleteButton: {
//     backgroundColor: '#F44336',
//   },
// });

// export default ServiceList;





import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Searchbar, Card } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TENANT_CONFIG } from '../../config/constants';

const TenantServicesScreen = ({ navigation }) => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredServices(services);
    } else {
      const filtered = services.filter(service =>
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.customerName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredServices(filtered);
    }
  }, [searchQuery, services]);

  const fetchServices = async () => {
    try {
      setRefreshing(true);
      const token = await AsyncStorage.getItem('token');
      
      const response = await axios.get(`${TENANT_CONFIG.API_BASE_URL}/tenant/services`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'X-Tenant-ID': TENANT_CONFIG.ID
        }
      });

      setServices(response.data);
      setFilteredServices(response.data);
    } catch (error) {
      console.error('Error fetching services:', error);
      Alert.alert('Error', 'Failed to fetch services');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const renderServiceItem = ({ item }) => (
    <TouchableOpacity 
      onPress={() => navigation.navigate('TenantServiceDetail', { serviceId: item._id })}
    >
      <Card style={styles.serviceCard}>
        <Card.Content>
          <View style={styles.serviceHeader}>
            <Text style={styles.serviceName}>{item.name}</Text>
            <View style={styles.statusBadge(item.status)}>
              <Text style={styles.statusText}>{item.status}</Text>
            </View>
          </View>
          <Text style={styles.customerText}>Customer: {item.customerName}</Text>
          <Text style={styles.dateText}>Scheduled: {item.date}</Text>
          <View style={styles.footer}>
            <Text style={styles.priceText}>${item.price}</Text>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder="Search services..."
        onChangeText={setSearchQuery}
        value={searchQuery}
        style={styles.searchBar}
        inputStyle={styles.searchInput}
      />

      <FlatList
        data={filteredServices}
        renderItem={renderServiceItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.listContent}
        refreshing={refreshing}
        onRefresh={fetchServices}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="construct-outline" size={48} color="#9CA3AF" />
            <Text style={styles.emptyText}>No services found</Text>
          </View>
        }
      />

      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => navigation.navigate('AddService')}
      >
        <Ionicons name="add" size={24} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    margin: 16,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    elevation: 1,
  },
  searchInput: {
    minHeight: 0,
    paddingTop: 8,
    paddingBottom: 8,
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  serviceCard: {
    marginBottom: 16,
    borderRadius: 8,
    elevation: 1,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  statusBadge: (status) => ({
    backgroundColor: status === 'Completed' ? '#D1FAE5' : 
                    status === 'Pending' ? '#FEF3C7' : '#FEE2E2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  }),
  statusText: {
    color: status => status === 'Completed' ? '#065F46' : 
                    status === 'Pending' ? '#92400E' : '#991B1B',
    fontSize: 12,
    fontWeight: '500',
  },
  customerText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  emptyText: {
    marginTop: 16,
    color: '#9CA3AF',
    fontSize: 16,
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
});

export default TenantServicesScreen;