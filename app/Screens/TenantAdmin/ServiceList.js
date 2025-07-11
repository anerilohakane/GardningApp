import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation, useIsFocused } from '@react-navigation/native';

const ServiceList = ({ navigation }) => {
  const [services, setServices] = useState([
    {
      id: '1',
      name: 'Lawn Mowing',
      description: 'Standard lawn mowing service',
      price: '$50',
      duration: '1 hour',
      category: 'Basic'
    },
    {
      id: '2',
      name: 'Tree Trimming',
      description: 'Professional tree trimming',
      price: '$120',
      duration: '2 hours',
      category: 'Advanced'
    },
    {
      id: '3',
      name: 'Garden Maintenance',
      description: 'Weekly garden upkeep',
      price: '$80',
      duration: '1.5 hours',
      category: 'Basic'
    },
  ]);

  const isFocused = useIsFocused();

  // Load services when screen is focused
  useEffect(() => {
    if (isFocused) {
      // You would typically fetch from API here
      // For now, we'll just maintain local state
    }
  }, [isFocused]);

  const handleAddService = () => {
    navigation.navigate('AddService', {
      onAddService: (newService) => {
        setServices(prevServices => [...prevServices, newService]);
      }
    });
  };

  // Handle edit service
  const handleEditService = (service) => {
    navigation.navigate('EditService', { 
      service,
      onUpdateService: (updatedService) => {
        setServices(services.map(s => 
          s.id === updatedService.id ? updatedService : s
        ));
      }
    });
  };

  // Handle delete service
  const handleDeleteService = (serviceId) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this service?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => {
            setServices(services.filter(service => service.id !== serviceId));
          },
          style: 'destructive',
        },
      ]
    );
  };

  // Render each service item
  const renderServiceItem = ({ item }) => (
    <View style={styles.serviceCard}>
      <View style={styles.serviceInfo}>
        <Text style={styles.serviceName}>{item.name}</Text>
        <Text style={styles.serviceDescription}>{item.description}</Text>
        <View style={styles.serviceMeta}>
          <Text style={styles.servicePrice}>{item.price}</Text>
          <Text style={styles.serviceDuration}>{item.duration}</Text>
          <Text style={styles.serviceCategory}>{item.category}</Text>
        </View>
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.editButton]}
          onPress={() => handleEditService(item)}
        >
          <MaterialIcons name="edit" size={20} color="#fff" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.deleteButton]}
          onPress={() => handleDeleteService(item.id)}
        >
          <MaterialIcons name="delete" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Services</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddService}
        >
          <Text style={styles.addButtonText}>Add Service</Text>
          <MaterialIcons name="add" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={services}
        renderItem={renderServiceItem}
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#4CAF50',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2196F3',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  addButtonText: {
    color: '#fff',
    marginRight: 6,
    fontWeight: 'bold',
    fontSize: 14,
  },
  listContent: {
    padding: 16,
  },
  serviceCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  serviceMeta: {
    flexDirection: 'row',
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginRight: 12,
  },
  serviceDuration: {
    fontSize: 14,
    color: '#777',
    marginRight: 12,
  },
  serviceCategory: {
    fontSize: 14,
    color: '#9C27B0',
    fontStyle: 'italic',
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  editButton: {
    backgroundColor: '#FF9800',
  },
  deleteButton: {
    backgroundColor: '#F44336',
  },
});

export default ServiceList;