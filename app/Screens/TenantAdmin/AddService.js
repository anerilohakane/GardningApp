import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';

const AddService = ({ navigation, route }) => {
  const { onAddService } = route.params;
  
  const [serviceData, setServiceData] = useState({
    id: Math.random().toString(36).substr(2, 9), // Generate unique ID
    name: '',
    description: '',
    price: '',
    duration: '',
    category: 'Basic',
    equipmentRequired: '',
    frequencyOptions: 'One-time',
    seasonAvailability: 'All year',
    teamSize: '1',
  });

  const handleInputChange = (name, value) => {
    setServiceData({
      ...serviceData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    if (!serviceData.name || !serviceData.price || !serviceData.duration) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // Call the callback function to add the service
    onAddService(serviceData);
    
    // Navigate back to ServiceList
    navigation.navigate('ServiceList');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add New Service</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.formContainer}>
        {/* All form fields wrapped properly */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Service Name*</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Lawn Mowing"
            value={serviceData.name}
            onChangeText={(text) => handleInputChange('name', text)}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={[styles.input, styles.multilineInput]}
            placeholder="Describe the service..."
            multiline
            numberOfLines={4}
            value={serviceData.description}
            onChangeText={(text) => handleInputChange('description', text)}
          />
        </View>

        {/* Price Field */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Price*</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., $50"
            keyboardType="numeric"
            value={serviceData.price}
            onChangeText={(text) => handleInputChange('price', text)}
          />
        </View>

        {/* Duration Field */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Duration*</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., 1 hour"
            value={serviceData.duration}
            onChangeText={(text) => handleInputChange('duration', text)}
          />
        </View>

        {/* Category Picker */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={serviceData.category}
              onValueChange={(itemValue) => handleInputChange('category', itemValue)}
            >
              <Picker.Item label="Basic" value="Basic" />
              <Picker.Item label="Advanced" value="Advanced" />
              <Picker.Item label="Premium" value="Premium" />
              <Picker.Item label="Specialty" value="Specialty" />
            </Picker>
          </View>
        </View>

        {/* Equipment Field */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Equipment Required</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g., Lawn mower, trimmer"
            value={serviceData.equipmentRequired}
            onChangeText={(text) => handleInputChange('equipmentRequired', text)}
          />
        </View>

        {/* Frequency Picker */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Frequency Options</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={serviceData.frequencyOptions}
              onValueChange={(itemValue) => handleInputChange('frequencyOptions', itemValue)}
            >
              <Picker.Item label="One-time" value="One-time" />
              <Picker.Item label="Weekly" value="Weekly" />
              <Picker.Item label="Bi-weekly" value="Bi-weekly" />
              <Picker.Item label="Monthly" value="Monthly" />
              <Picker.Item label="Seasonal" value="Seasonal" />
            </Picker>
          </View>
        </View>

        {/* Season Picker */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Season Availability</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={serviceData.seasonAvailability}
              onValueChange={(itemValue) => handleInputChange('seasonAvailability', itemValue)}
            >
              <Picker.Item label="All year" value="All year" />
              <Picker.Item label="Spring" value="Spring" />
              <Picker.Item label="Summer" value="Summer" />
              <Picker.Item label="Fall" value="Fall" />
              <Picker.Item label="Winter" value="Winter" />
            </Picker>
          </View>
        </View>

        {/* Team Size Picker */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Team Size</Text>
          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={serviceData.teamSize}
              onValueChange={(itemValue) => handleInputChange('teamSize', itemValue)}
            >
              <Picker.Item label="1 person" value="1" />
              <Picker.Item label="2 people" value="2" />
              <Picker.Item label="3 people" value="3" />
              <Picker.Item label="4+ people" value="4+" />
            </Picker>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Save Service</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
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
  formContainer: {
    padding: 20,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: '#4a5568',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddService;