import React from 'react';
import { ScrollView, Text, StyleSheet, SafeAreaView, Linking, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const PrivacyPolicy = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.lastUpdated}>Last Updated: June 2023</Text>
        
        <Text style={styles.sectionTitle}>1. Information We Collect</Text>
        <Text style={styles.text}>
          We collect information you provide when using our landscaping services, including:
          {'\n\n'}• Contact details (name, email, phone)
          {'\n'}• Property information
          {'\n'}• Service preferences
          {'\n'}• Payment information (processed securely)
        </Text>

        <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
        <Text style={styles.text}>
          Your information helps us:
          {'\n\n'}• Provide and improve our services
          {'\n'}• Process transactions
          {'\n'}• Communicate about appointments
          {'\n'}• Send service updates (with your consent)
        </Text>

        <Text style={styles.sectionTitle}>3. Data Security</Text>
        <Text style={styles.text}>
          We implement industry-standard measures to protect your data:
          {'\n\n'}• SSL encrypted connections
          {'\n'}• Secure payment processing
          {'\n'}• Limited employee access
        </Text>

        <Text style={styles.sectionTitle}>4. Your Rights</Text>
        <Text style={styles.text}>
          You may:
          {'\n\n'}• Request access to your data
          {'\n'}• Request corrections
          {'\n'}• Opt-out of marketing
          {'\n'}• Request data deletion
        </Text>

        <TouchableOpacity 
          style={styles.contactButton}
          onPress={() => Linking.openURL('mailto:privacy@greenscape.com')}
        >
          <MaterialIcons name="email" size={20} color="#2E8B57" />
          <Text style={styles.contactText}>Contact Our Privacy Officer</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FDF8',
  },
  content: {
    padding: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2E7D32',
    marginBottom: 4,
  },
  lastUpdated: {
    fontSize: 14,
    color: '#689F38',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2E7D32',
    marginTop: 24,
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
    marginBottom: 8,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    padding: 16,
    borderRadius: 8,
    marginTop: 32,
    justifyContent: 'center',
  },
  contactText: {
    color: '#2E8B57',
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default PrivacyPolicy;