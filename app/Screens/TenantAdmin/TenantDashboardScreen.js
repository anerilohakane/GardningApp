import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from 'react-native-paper';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TENANT_CONFIG } from '../../config/constants';

const TenantDashboardScreen = ({ navigation }) => {
  const [stats, setStats] = useState({
    totalServices: 0,
    activeServices: 0,
    totalCustomers: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentServices, setRecentServices] = useState([]);

  // useEffect(() => {
  //   const fetchDashboardData = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem('token');
        
  //       const response = await axios.get('http://192.168.0.120:5000/api/v1/tenant/dashboard', {
  //         headers: {
  //           'Authorization': `Bearer ${token}`,
  //           'X-Tenant-ID': TENANT_CONFIG.ID
  //         }
  //       });

  //       setStats(response.data.stats);
  //       setRecentServices(response.data.recentServices);
  //     } catch (error) {
  //       console.error('Error fetching dashboard data:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchDashboardData();
  // }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#10B981" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Dashboard</Text>
      
      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <Card style={styles.card}>
          <Card.Content>
            <Ionicons name="construct" size={24} color="#3B82F6" />
            <Text style={styles.cardTitle}>Total Services</Text>
            <Text style={styles.cardValue}>{stats.totalServices}</Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Ionicons name="checkmark-circle" size={24} color="#10B981" />
            <Text style={styles.cardTitle}>Active Services</Text>
            <Text style={styles.cardValue}>{stats.activeServices}</Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Ionicons name="people" size={24} color="#8B5CF6" />
            <Text style={styles.cardTitle}>Total Customers</Text>
            <Text style={styles.cardValue}>{stats.totalCustomers}</Text>
          </Card.Content>
        </Card>

        <Card style={styles.card}>
          <Card.Content>
            <Ionicons name="cash" size={24} color="#F59E0B" />
            <Text style={styles.cardTitle}>Revenue</Text>
            <Text style={styles.cardValue}>${stats.revenue.toLocaleString()}</Text>
          </Card.Content>
        </Card>
      </View>

      {/* Recent Services */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Services</Text>
          <TouchableOpacity onPress={() => navigation.navigate('TenantServicesMain')}>
            <Text style={styles.seeAll}>See All</Text>
          </TouchableOpacity>
        </View>

        {recentServices.length > 0 ? (
          recentServices.map((service, index) => (
            <Card key={index} style={styles.serviceCard}>
              <Card.Content>
                <View style={styles.serviceHeader}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.serviceStatus(service.status)}>{service.status}</Text>
                </View>
                <Text style={styles.serviceCustomer}>{service.customerName}</Text>
                <Text style={styles.serviceDate}>{service.date}</Text>
                <Text style={styles.servicePrice}>${service.price}</Text>
              </Card.Content>
            </Card>
          ))
        ) : (
          <Text style={styles.noData}>No recent services found</Text>
        )}
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('TenantServicesMain')}
          >
            <Ionicons name="add" size={24} color="#FFFFFF" />
            <Text style={styles.actionText}>Add Service</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('TenantReports')}
          >
            <Ionicons name="document-text" size={24} color="#FFFFFF" />
            <Text style={styles.actionText}>Generate Report</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#111827',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  card: {
    width: '48%',
    marginBottom: 16,
    borderRadius: 12,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
  },
  seeAll: {
    color: '#10B981',
    fontWeight: '500',
  },
  serviceCard: {
    marginBottom: 12,
    borderRadius: 8,
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
  serviceStatus: (status) => ({
    color: status === 'Completed' ? '#10B981' : 
           status === 'Pending' ? '#F59E0B' : '#EF4444',
    fontWeight: '500',
  }),
  serviceCustomer: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  serviceDate: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 8,
  },
  servicePrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#111827',
  },
  noData: {
    textAlign: 'center',
    color: '#9CA3AF',
    marginTop: 16,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: '48%',
    backgroundColor: '#10B981',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  actionText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginLeft: 8,
  },
});

export default TenantDashboardScreen;