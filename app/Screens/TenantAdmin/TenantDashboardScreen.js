import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import {
  Card,
  Title,
  Text,
  Avatar,
  Chip,
  Divider,
  ActivityIndicator,
  Colors,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Dashboard = () => {
  // Hardcoded data for the dashboard
  const dashboardData = {
    stats: {
      appointments: 24,
      services: 8,
      estimates: 5,
      customers: 42,
    },
    upcomingAppointments: [
      {
        id: '1',
        customer: 'John Smith',
        service: 'Annual Checkup',
        date: '2023-06-15T09:30:00Z',
      },
      {
        id: '2',
        customer: 'Sarah Johnson',
        service: 'Teeth Cleaning',
        date: '2023-06-15T11:00:00Z',
      },
      {
        id: '3',
        customer: 'Michael Brown',
        service: 'Root Canal',
        date: '2023-06-16T14:15:00Z',
      },
    ],
    pendingEstimates: [
      {
        id: '1',
        customer: 'Emily Davis',
        created: '2023-06-10T08:45:00Z',
      },
      {
        id: '2',
        customer: 'Robert Wilson',
        created: '2023-06-12T13:20:00Z',
      },
    ],
  };

  const formatDate = (dateString) => {
    const options = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.header}>Tenant Dashboard</Title>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <Card style={styles.statCard}>
          <Card.Content>
            <View style={styles.statHeader}>
              <Icon name="calendar-clock" size={24} color="#3f51b5" />
              <Text style={styles.statTitle}>Appointments</Text>
            </View>
            <Title style={[styles.statValue, { color: '#3f51b5' }]}>
              {dashboardData.stats.appointments}
            </Title>
            <View style={styles.statFooter}>
              <Icon name="arrow-up" size={16} color="#4caf50" />
              <Text style={styles.statChange}>5% from last month</Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content>
            <View style={styles.statHeader}>
              <Icon name="room-service" size={24} color="#9c27b0" />
              <Text style={styles.statTitle}>Services</Text>
            </View>
            <Title style={[styles.statValue, { color: '#9c27b0' }]}>
              {dashboardData.stats.services}
            </Title>
            <View style={styles.statFooter}>
              <Icon name="plus" size={16} color="#4caf50" />
              <Text style={styles.statChange}>2 new services</Text>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content>
            <View style={styles.statHeader}>
              <Icon name="file-document-edit" size={24} color="#ff9800" />
              <Text style={styles.statTitle}>Pending Estimates</Text>
            </View>
            <Title style={[styles.statValue, { color: '#ff9800' }]}>
              {dashboardData.stats.estimates}
            </Title>
            <View style={styles.statFooter}>
              {dashboardData.stats.estimates > 0 ? (
                <>
                  <Icon name="alert" size={16} color="#f44336" />
                  <Text style={[styles.statChange, { color: '#f44336' }]}>
                    Needs attention
                  </Text>
                </>
              ) : (
                <>
                  <Icon name="check" size={16} color="#4caf50" />
                  <Text style={styles.statChange}>All clear</Text>
                </>
              )}
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.statCard}>
          <Card.Content>
            <View style={styles.statHeader}>
              <Icon name="account-group" size={24} color="#2196f3" />
              <Text style={styles.statTitle}>Customers</Text>
            </View>
            <Title style={[styles.statValue, { color: '#2196f3' }]}>
              {dashboardData.stats.customers}
            </Title>
            <View style={styles.statFooter}>
              <Icon name="arrow-up" size={16} color="#4caf50" />
              <Text style={styles.statChange}>10% from last month</Text>
            </View>
          </Card.Content>
        </Card>
      </View>

      {/* Upcoming Appointments */}
      <Card style={styles.sectionCard}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Upcoming Appointments</Title>
          {dashboardData.upcomingAppointments.length > 0 ? (
            dashboardData.upcomingAppointments.map((appointment, index) => (
              <View key={appointment.id}>
                <View style={styles.timelineItem}>
                  <Avatar.Icon 
                    size={24} 
                    icon="calendar" 
                    color="#3f51b5" 
                    style={styles.timelineIcon} 
                  />
                  <View style={styles.timelineContent}>
                    <Text style={styles.timelineTitle}>
                      {appointment.customer}
                    </Text>
                    <Text style={styles.timelineSubtitle}>
                      {appointment.service}
                    </Text>
                    <Text style={styles.timelineDate}>
                      {formatDate(appointment.date)}
                    </Text>
                  </View>
                </View>
                {index < dashboardData.upcomingAppointments.length - 1 && <Divider />}
              </View>
            ))
          ) : (
            <Text style={styles.emptyMessage}>No upcoming appointments</Text>
          )}
        </Card.Content>
      </Card>

      {/* Pending Estimates */}
      <Card style={styles.sectionCard}>
        <Card.Content>
          <Title style={styles.sectionTitle}>Pending Estimates</Title>
          {dashboardData.pendingEstimates.length > 0 ? (
            dashboardData.pendingEstimates.map((estimate, index) => (
              <View key={estimate.id}>
                <View style={styles.timelineItem}>
                  <Avatar.Icon 
                    size={24} 
                    icon="file-document" 
                    color="#ff9800" 
                    style={styles.timelineIcon} 
                  />
                  <View style={styles.timelineContent}>
                    <Text style={styles.timelineTitle}>
                      {estimate.customer}
                    </Text>
                    <Text style={styles.timelineSubtitle}>
                      Created: {formatDate(estimate.created)}
                    </Text>
                    <View style={styles.statusContainer}>
                      <Chip 
                        icon="alert" 
                        style={styles.pendingChip}
                        textStyle={styles.chipText}
                      >
                        Pending
                      </Chip>
                    </View>
                  </View>
                </View>
                {index < dashboardData.pendingEstimates.length - 1 && <Divider />}
              </View>
            ))
          ) : (
            <Text style={styles.emptyMessage}>No pending estimates</Text>
          )}
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    marginTop:24,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statCard: {
    width: '48%',
    marginBottom: 16,
    borderRadius: 12,
    elevation: 3,
  },
  statHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statTitle: {
    marginLeft: 8,
    fontSize: 14,
    // color: Colors.grey600,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  statFooter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statChange: {
    marginLeft: 4,
    fontSize: 12,
    // color: Colors.grey600,
  },
  sectionCard: {
    marginBottom: 16,
    borderRadius: 12,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  timelineItem: {
    flexDirection: 'row',
    paddingVertical: 12,
  },
  timelineIcon: {
    marginRight: 16,
    backgroundColor: 'transparent',
  },
  timelineContent: {
    flex: 1,
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  timelineSubtitle: {
    fontSize: 14,
    // color: Colors.grey600,
    marginBottom: 4,
  },
  timelineDate: {
    fontSize: 12,
    // color: Colors.grey500,
  },
  statusContainer: {
    marginTop: 8,
  },
  pendingChip: {
    backgroundColor: '#fff3e0',
    alignSelf: 'flex-start',
  },
  chipText: {
    color: '#ff9800',
  },
  emptyMessage: {
    textAlign: 'center',
    // color: Colors.grey500,
    paddingVertical: 16,
  },
});

export default Dashboard;