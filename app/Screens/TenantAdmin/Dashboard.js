import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, FlatList } from 'react-native';
import { MaterialIcons, FontAwesome, Ionicons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

const Dashboard = () => {
  const navigation = useNavigation();
  
  // Dashboard data
  const dashboardData = {
    stats: {
      services: { value: 24, trend: 'up', change: 12 },
      appointments: { value: 156, trend: 'down', change: 5 },
      estimates: { value: 42, trend: 'up', change: 8 },
      customers: { value: 89, trend: 'up', change: 7 }
    },
    recentActivities: [
      { id: 1, title: 'New service added', time: '2 hours ago', icon: 'plus', type: 'service' },
      { id: 2, title: 'Appointment booked', time: '5 hours ago', icon: 'calendar', type: 'appointment' },
      { id: 3, title: 'New estimate created', time: '1 day ago', icon: 'file-text', type: 'estimate' },
      { id: 4, title: 'New customer registered', time: '1 day ago', icon: 'user-plus', type: 'customer' }
    ],
    quickActions: [
      { id: 1, title: 'Add Service', icon: 'plus-circle', screen: 'AddService' },
      { id: 2, title: 'Add Customer', icon: 'user-plus', screen: 'AddCustomer' },
      { id: 3, title: 'Create Estimate', icon: 'file-text', screen: 'CreateEstimate' },
      { id: 4, title: 'Schedule', icon: 'calendar', screen: 'ScheduleAppointment' }
    ]
  };

  // Navigation handler
  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };

  // Stat Card Component with previous style
  const StatCard = ({ title, value, trend, change, color, screen }) => (
    <TouchableOpacity 
      onPress={() => navigateTo(screen)}
      style={[styles.metricCard, { borderLeftColor: color }]}
      activeOpacity={0.8}
    >
      <View style={styles.metricContent}>
        <Ionicons 
          name={trend === 'up' ? 'trending-up' : 'trending-down'} 
          size={24} 
          color={color} 
          style={styles.metricIcon} 
        />
        <View>
          <Text style={styles.metricValue}>{value}</Text>
          <Text style={styles.metricTitle}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  // Quick Action Component (unchanged)
  const QuickAction = ({ title, icon, screen }) => (
    <TouchableOpacity 
      style={styles.quickAction}
      onPress={() => navigateTo(screen)}
    >
      <View style={styles.quickActionIcon}>
        <Feather name={icon} size={24} color="#fff" />
      </View>
      <Text style={styles.quickActionText}>{title}</Text>
    </TouchableOpacity>
  );

  // Activity Item Component (unchanged)
  const ActivityItem = ({ item }) => (
    <TouchableOpacity onPress={() => {
      if (item.type === 'service') navigateTo('ServiceList');
      if (item.type === 'appointment') navigateTo('AppointmentListScreen');
      if (item.type === 'estimate') navigateTo('EstimateList');
      if (item.type === 'customer') navigateTo('CustomerList');
    }}>
      <View style={styles.activityItem}>
        <View style={[
          styles.activityIconContainer,
          { backgroundColor: getActivityColor(item.type) }
        ]}>
          <Feather name={item.icon} size={16} color="#fff" />
        </View>
        <View style={styles.activityContent}>
          <Text style={styles.activityTitle}>{item.title}</Text>
          <Text style={styles.activityTime}>{item.time}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const getActivityColor = (type) => {
    switch(type) {
      case 'service': return '#4CAF50';
      case 'appointment': return '#2196F3';
      case 'estimate': return '#FFC107';
      case 'customer': return '#9C27B0';
      default: return '#607D8B';
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back,</Text>
          <Text style={styles.userName}>Admin User</Text>
        </View>
        <TouchableOpacity onPress={() => navigateTo('Profile')}>
          <Image 
            source={{ uri: 'https://randomuser.me/api/portraits/women/44.jpg' }} 
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Stats Overview - Updated to previous card style */}
        <View style={styles.metricsContainer}>
          <StatCard 
            title="Services" 
            value={dashboardData.stats.services.value} 
            trend={dashboardData.stats.services.trend}
            change={dashboardData.stats.services.change}
            color="#4CAF50"
            screen="ServiceList"
          />
          <StatCard 
            title="Appointments" 
            value={dashboardData.stats.appointments.value} 
            trend={dashboardData.stats.appointments.trend}
            change={dashboardData.stats.appointments.change}
            color="#2196F3"
            screen="AppointmentListScreen"
          />
          <StatCard 
            title="Estimates" 
            value={dashboardData.stats.estimates.value} 
            trend={dashboardData.stats.estimates.trend}
            change={dashboardData.stats.estimates.change}
            color="#FFC107"
            screen="EstimateList"
          />
          <StatCard 
            title="Customers" 
            value={dashboardData.stats.customers.value} 
            trend={dashboardData.stats.customers.trend}
            change={dashboardData.stats.customers.change}
            color="#9C27B0"
            screen="CustomerList"
          />
        </View>

        {/* Quick Actions - Unchanged */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsContainer}>
          {dashboardData.quickActions.map((action) => (
            <QuickAction 
              key={action.id}
              title={action.title}
              icon={action.icon}
              screen={action.screen}
            />
          ))}
        </View>

        {/* Recent Activities - Unchanged */}
        <Text style={styles.sectionTitle}>Recent Activities</Text>
        <View style={styles.activitiesContainer}>
          <FlatList
            data={dashboardData.recentActivities}
            renderItem={ActivityItem}
            keyExtractor={item => item.id.toString()}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  greeting: {
    fontSize: 16,
    color: '#607D8B',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#263238',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  // Previous card styles
  metricsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  metricCard: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 8,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 5,
    marginBottom: 15,
  },
  metricContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metricIcon: {
    marginRight: 10,
  },
  metricValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  metricTitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  // Unchanged styles below
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#263238',
    marginBottom: 15,
  },
  quickActionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  quickAction: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 15,
  },
  quickActionIcon: {
    backgroundColor: '#4CAF50',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  quickActionText: {
    fontSize: 14,
    color: '#455A64',
    textAlign: 'center',
  },
  activitiesContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 30,
    elevation: 2,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ECEFF1',
  },
  activityIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 15,
    color: '#263238',
    marginBottom: 3,
  },
  activityTime: {
    fontSize: 12,
    color: '#78909C',
  },
});

export default Dashboard;