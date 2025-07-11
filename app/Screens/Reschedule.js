import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Platform } from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const RescheduleScreen = ({ route }) => {
  const { service } = route.params;
  const navigation = useNavigation();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Available time slots
  const timeSlots = [
    { id: 1, time: '08:00 AM - 10:00 AM', available: true },
    { id: 2, time: '10:00 AM - 12:00 PM', available: true },
    { id: 3, time: '12:00 PM - 02:00 PM', available: false },
    { id: 4, time: '02:00 PM - 04:00 PM', available: true },
    { id: 5, time: '04:00 PM - 06:00 PM', available: true },
  ];

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: selectedDate,
      onChange: (event, date) => {
        if (date) {
          setSelectedDate(date);
          // Reset selected slot when date changes
          setSelectedSlot(null);
        }
      },
      mode: 'date',
      minimumDate: new Date(),
    });
  };

  const handleReschedule = () => {
    if (!selectedSlot) {
      alert('Please select a time slot');
      return;
    }
    
    // In a real app, you would call your API here
    setIsSuccess(true);
    setTimeout(() => {
      navigation.goBack();
    }, 2000);
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getSelectedTimeSlot = () => {
    const slot = timeSlots.find(s => s.id === selectedSlot);
    return slot ? slot.time : 'No time selected';
  };

  if (isSuccess) {
    return (
      <View style={styles.successContainer}>
        <View style={styles.successContent}>
          <FontAwesome name="check-circle" size={60} color="#10B981" />
          <Text style={styles.successText}>Service Rescheduled Successfully!</Text>
          <Text style={styles.successSubText}>
            Your {service.service} has been rescheduled for {formatDate(selectedDate)} at {getSelectedTimeSlot()}
          </Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Reschedule Service</Text>
      </View> */}

      <View style={styles.serviceCard}>
        <Image source={{ uri: service.image }} style={styles.serviceImage} />
        <View style={styles.serviceInfo}>
          <Text style={styles.serviceName}>{service.service}</Text>
          <Text style={styles.serviceTeam}>Team: {service.team}</Text>
          <Text style={styles.serviceDuration}>{service.duration} service</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Select New Date</Text>
      <TouchableOpacity style={styles.pickerButton} onPress={showDatePicker}>
        <Text style={styles.pickerButtonText}>
          {formatDate(selectedDate)}
        </Text>
        <MaterialIcons name="calendar-today" size={20} color="#6B7280" />
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Available Time Slots</Text>
      <View style={styles.timeSlotsContainer}>
        {timeSlots.map((slot) => (
          <TouchableOpacity
            key={slot.id}
            style={[
              styles.timeSlotButton,
              !slot.available && styles.timeSlotDisabled,
              selectedSlot === slot.id && styles.timeSlotSelected
            ]}
            disabled={!slot.available}
            onPress={() => setSelectedSlot(slot.id)}
          >
            <Text style={[
              styles.timeSlotText,
              selectedSlot === slot.id && styles.timeSlotSelectedText,
              !slot.available && styles.timeSlotDisabledText
            ]}>
              {slot.time}
            </Text>
            {!slot.available && (
              <Text style={styles.timeSlotBookedText}>Booked</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.rescheduleButton}
        onPress={handleReschedule}
      >
        <Text style={styles.rescheduleButtonText}>Confirm Reschedule</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  serviceCard: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
  },
  serviceImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  serviceInfo: {
    marginLeft: 12,
    justifyContent: 'center',
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  serviceTeam: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
  serviceDuration: {
    fontSize: 14,
    color: '#6B7280',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#111827',
  },
  pickerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  pickerButtonText: {
    fontSize: 16,
    color: '#111827',
  },
  timeSlotsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  timeSlotButton: {
    width: '48%',
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeSlotSelected: {
    backgroundColor: '#D1FAE5',
    borderWidth: 1,
    borderColor: '#10B981',
  },
  timeSlotDisabled: {
    opacity: 0.5,
  },
  timeSlotText: {
    fontSize: 14,
    color: '#111827',
  },
  timeSlotSelectedText: {
    color: '#10B981',
    fontWeight: '600',
  },
  timeSlotDisabledText: {
    color: '#6B7280',
  },
  timeSlotBookedText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
  },
  rescheduleButton: {
    backgroundColor: '#10B981',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  rescheduleButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  successContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  successContent: {
    alignItems: 'center',
  },
  successText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
    color: '#111827',
  },
  successSubText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default RescheduleScreen;