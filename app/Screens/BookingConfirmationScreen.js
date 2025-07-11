import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { CommonActions } from '@react-navigation/native';

const BookingConfirmationScreen = ({ route, navigation }) => {
  const { service, date, time, customer } = route.params;

  const handleGoHome = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { 
            name: 'HomeTab',
            state: {
              routes: [
                { name: 'HomeMain' }
              ]
            }
          }
        ]
      })
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking Confirmation</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.confirmationCard}>
        <Text style={styles.confirmationTitle}>Your booking is confirmed!</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Service Details</Text>
          <Text style={styles.detailText}>{service.title}</Text>
          <Text style={styles.detailText}>{service.price}</Text>
          <Text style={styles.detailText}>{service.duration}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appointment Time</Text>
          <Text style={styles.detailText}>{date}</Text>
          <Text style={styles.detailText}>{time}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Customer Information</Text>
          <Text style={styles.detailText}>{customer.firstName} {customer.lastName}</Text>
          <Text style={styles.detailText}>{customer.email}</Text>
          <Text style={styles.detailText}>{customer.phone}</Text>
          {customer.address && <Text style={styles.detailText}>{customer.address}</Text>}
        </View>

        <TouchableOpacity 
          style={styles.homeButton}
          onPress={handleGoHome}
        >
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  confirmationCard: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  confirmationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 15,
    color: '#4a5568',
    marginBottom: 6,
  },
  homeButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  homeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default BookingConfirmationScreen;