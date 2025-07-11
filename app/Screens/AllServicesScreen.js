// screens/AllServicesScreen.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { MaterialIcons, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const AllServicesScreen = () => {
  const navigation = useNavigation();
  
  // Mock data for booked services
  const bookedServices = [
    {
      id: '1',
      title: 'Premium Lawn Care',
      image: 'https://i.pinimg.com/736x/8d/f6/f1/8df6f12adc1bc5c0117aae821b2e9b3e.jpg',
      price: '$99',
      date: 'June 15, 2023',
      time: '9:00 AM',
      address: '123 Garden St, Austin, TX',
      status: 'Pending Payment'
    },
    {
      id: '2',
      title: 'Spring Cleanup',
      image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?auto=format&fit=crop&q=80&w=800',
      price: '$149',
      date: 'June 20, 2023',
      time: '2:00 PM',
      address: '123 Garden St, Austin, TX',
      status: 'Payment Due'
    },
    {
      id: '3',
      title: 'Aeration Service',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
      price: '$79',
      date: 'July 5, 2023',
      time: '10:30 AM',
      address: '123 Garden St, Austin, TX',
      status: 'Paid'
    },
  ];

  const handlePayNow = (service) => {
    navigation.navigate('Payment', { service });
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending Payment':
        return '#F59E0B'; // Amber
      case 'Payment Due':
        return '#EF4444'; // Red
      case 'Paid':
        return '#10B981'; // Green
      default:
        return '#6B7280'; // Gray
    }
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Booked Services</Text>
        <View style={{ width: 24 }} />
      </View> */}

      <FlatList
        data={bookedServices}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.serviceItem}>
            <Image source={{ uri: item.image }} style={styles.serviceImage} />
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceTitle}>{item.title}</Text>
              
              <View style={styles.serviceMeta}>
                <View style={styles.metaItem}>
                  <Ionicons name="calendar" size={14} color="#6B7280" />
                  <Text style={styles.metaText}>{item.date}</Text>
                </View>
                <View style={styles.metaItem}>
                  <Ionicons name="time" size={14} color="#6B7280" />
                  <Text style={styles.metaText}>{item.time}</Text>
                </View>
              </View>
              
              <View style={styles.metaItem}>
                <MaterialIcons name="location-on" size={14} color="#6B7280" />
                <Text style={styles.metaText}>{item.address}</Text>
              </View>
              
              <View style={styles.statusContainer}>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
                  <Text style={styles.statusText}>{item.status}</Text>
                </View>
                <Text style={styles.servicePrice}>{item.price}</Text>
              </View>

              {item.status !== 'Paid' && (
                <TouchableOpacity 
                  style={styles.payNowButton}
                  onPress={() => handlePayNow(item)}
                >
                  <Text style={styles.payNowText}>Pay Now</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2d3748',
  },
  listContent: {
    padding: 16,
  },
  serviceItem: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  serviceImage: {
    width: '100%',
    height: 150,
  },
  serviceInfo: {
    padding: 16,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a202c',
    marginBottom: 12,
  },
  serviceMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  metaText: {
    fontSize: 13,
    color: '#4a5568',
    marginLeft: 6,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#059669',
  },
  payNowButton: {
    backgroundColor: 'green',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  payNowText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default AllServicesScreen;