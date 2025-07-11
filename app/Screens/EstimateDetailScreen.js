import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';  // Added TouchableOpacity here
import { MaterialIcons } from '@expo/vector-icons';

const EstimateDetailScreen = ({ route }) => {
  const { estimate } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.serviceTitle}>{estimate.service}</Text>
        <View style={[
          styles.statusBadge, 
          estimate.status === 'pending' ? styles.pendingBadge : styles.completedBadge
        ]}>
          <Text style={styles.statusText}>{estimate.status}</Text>
        </View>
      </View>

      <View style={styles.detailSection}>
        <View style={styles.detailRow}>
          <MaterialIcons name="date-range" size={20} color="#6B7280" />
          <Text style={styles.detailText}>Requested on: {estimate.date}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <MaterialIcons name="attach-money" size={20} color="#6B7280" />
          <Text style={styles.detailText}>Budget Range: {estimate.budgetRange}</Text>
        </View>
        
        <View style={styles.detailRow}>
          <MaterialIcons name="description" size={20} color="#6B7280" />
          <Text style={styles.detailText}>Estimate ID: {estimate.id}</Text>
        </View>
      </View>

      <View style={styles.notesSection}>
        <Text style={styles.sectionTitle}>Notes</Text>
        <View style={styles.notesBox}>
          <Text style={styles.notesText}>
            {estimate.notes || 'No additional notes provided'}
          </Text>
        </View>
      </View>

      {estimate.status === 'pending' && (
        <View style={styles.actions}>
          <TouchableOpacity style={styles.acceptButton}>
            <Text style={styles.buttonText}>Accept Estimate</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.declineButton}>
            <Text style={styles.buttonText}>Decline</Text>
          </TouchableOpacity>
        </View>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  serviceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  pendingBadge: {
    backgroundColor: '#FEF3C7',
  },
  completedBadge: {
    backgroundColor: '#D1FAE5',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  detailSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  detailText: {
    fontSize: 16,
    color: '#374151',
    marginLeft: 10,
  },
  notesSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 10,
  },
  notesBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  notesText: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  acceptButton: {
    backgroundColor: '#10B981',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  declineButton: {
    backgroundColor: '#EF4444',
    padding: 15,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default EstimateDetailScreen;