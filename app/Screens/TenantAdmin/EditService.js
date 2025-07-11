// EditServiceScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

const EditService = () => {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Get the initial service data from route params
  const { service } = route.params || {};
  
  // State for form fields
  const [name, setName] = useState(service?.name || '');
  const [price, setPrice] = useState(service?.price || '');
  const [description, setDescription] = useState(service?.description || '');

  const handleSave = () => {
    // Here you would typically save the changes to your backend or state management
    console.log('Saving service:', { name, price, description });
    
    // Navigate back to ServiceList screen
    navigation.navigate('ServiceList');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Service</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Service Name"
        value={name}
        onChangeText={setName}
      />
      
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      
      <Button title="Save Changes" onPress={handleSave} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
});

export default EditService;