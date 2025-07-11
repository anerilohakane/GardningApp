import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

const MyEstimatesScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [estimates, setEstimates] = useState([
    {
      id: '1',
      service: 'Lawn Mowing',
      status: 'pending',
      date: '2023-05-15',
      budgetRange: '$100-$150',
    },
    {
      id: '2',
      service: 'Fertilization',
      status: 'completed',
      date: '2023-04-20',
      budgetRange: '$80-$120',
    },
  ]);

  useEffect(() => {
    if (route.params?.newEstimate) {
      const newEstimate = {
        id: `estimate_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        service: route.params.newEstimate.service,
        status: 'pending',
        date: new Date().toISOString().split('T')[0],
        budgetRange: route.params.newEstimate.budgetRange,
      };
      
      setEstimates(prev => [newEstimate, ...prev]);
      
      // Reset navigation params
      navigation.setParams({ newEstimate: null });
    }
  }, [route.params?.newEstimate]);

 // Update the renderEstimateItem function in MyEstimatesScreen.js
const renderEstimateItem = ({ item }) => (
  <View style={styles.estimateCard}>
    <View style={styles.estimateHeader}>
      <Text style={styles.estimateService}>{item.service}</Text>
      <View style={[
        styles.statusBadge, 
        item.status === 'pending' ? styles.pendingBadge : styles.completedBadge
      ]}>
        <Text style={styles.statusText}>{item.status}</Text>
      </View>
    </View>
    <Text style={styles.estimateDate}>Requested: {item.date}</Text>
    <Text style={styles.estimateBudget}>Budget: {item.budgetRange}</Text>
    
    <TouchableOpacity 
      style={styles.detailsButton}
      onPress={() => navigation.navigate('EstimateDetail', { estimate: item })}
    >
      <Text style={styles.detailsButtonText}>View Details</Text>
      <MaterialIcons name="chevron-right" size={20} color="#10B981" />
    </TouchableOpacity>
  </View>
);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Estimates</Text>
      
      {estimates.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No estimates yet</Text>
          <Text style={styles.emptySubtext}>Request an estimate to get started</Text>
        </View>
      ) : (
        <FlatList
          data={estimates}
          renderItem={renderEstimateItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
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
    marginBottom: 12,
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
    marginBottom: 8,
  },
  estimateService: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pendingBadge: {
    backgroundColor: '#FEF3C7',
  },
  completedBadge: {
    backgroundColor: '#D1FAE5',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    textTransform: 'capitalize',
  },
  estimateDate: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  estimateBudget: {
    fontSize: 16,
    color: '#111827',
    marginBottom: 12,
  },
  detailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  detailsButtonText: {
    color: '#10B981',
    fontWeight: '500',
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
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
  },
});

export default MyEstimatesScreen;