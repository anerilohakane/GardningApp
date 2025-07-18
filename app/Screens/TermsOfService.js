import React from 'react';
import { ScrollView, View, Text, StyleSheet, Linking } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

const TermsOfService = ({ navigation }) => {
  const handleOpenLink = (url) => {
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Terms of Service</Text>
        <Text style={styles.effectiveDate}>Effective Date: January 1, 2023</Text>
        
        <Text style={styles.heading}>1. Acceptance of Terms</Text>
        <Text style={styles.paragraph}>
          By accessing or using our mobile application (the "App"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the App.
        </Text>
        
        <Text style={styles.heading}>2. Description of Service</Text>
        <Text style={styles.paragraph}>
          Our App provides [brief description of your app's functionality]. We reserve the right to modify or discontinue the App at any time without notice.
        </Text>
        
        <Text style={styles.heading}>3. User Responsibilities</Text>
        <Text style={styles.paragraph}>
          You agree not to use the App for any unlawful purpose or in any way that might harm, damage, or disparage any other party. Without limiting the foregoing, you agree not to:
        </Text>
        <View style={styles.listItem}>
          <Ionicons name="ios-arrow-forward" size={14} color="#333" />
          <Text style={styles.listText}>Use the App in any manner that could interfere with other users' enjoyment</Text>
        </View>
        <View style={styles.listItem}>
          <Ionicons name="ios-arrow-forward" size={14} color="#333" />
          <Text style={styles.listText}>Upload or transmit viruses or other harmful code</Text>
        </View>
        <View style={styles.listItem}>
          <Ionicons name="ios-arrow-forward" size={14} color="#333" />
          <Text style={styles.listText}>Attempt to gain unauthorized access to our systems</Text>
        </View>
        
        <Text style={styles.heading}>4. Privacy Policy</Text>
        <Text style={styles.paragraph}>
          Your use of the App is also governed by our Privacy Policy, which can be found at: 
          <Text 
            style={styles.link}
            onPress={() => handleOpenLink('https://yourapp.com/privacy')}
          >
            https://yourapp.com/privacy
          </Text>
        </Text>
        
        <Text style={styles.heading}>5. Intellectual Property</Text>
        <Text style={styles.paragraph}>
          All content included in the App, such as text, graphics, logos, and images, is our property or the property of our licensors and is protected by copyright laws.
        </Text>
        
        <Text style={styles.heading}>6. Limitation of Liability</Text>
        <Text style={styles.paragraph}>
          We shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of or inability to use the App.
        </Text>
        
        <Text style={styles.heading}>7. Changes to Terms</Text>
        <Text style={styles.paragraph}>
          We may modify these Terms at any time. We will notify you of any changes by posting the new Terms on this page. Your continued use of the App constitutes acceptance of the modified Terms.
        </Text>
        
        <Text style={styles.heading}>8. Contact Us</Text>
        <Text style={styles.paragraph}>
          If you have any questions about these Terms, please contact us at: 
          <Text 
            style={styles.link}
            onPress={() => handleOpenLink('mailto:support@yourapp.com')}
          >
            support@yourapp.com
          </Text>
        </Text>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  effectiveDate: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: '#333',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
    color: '#444',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    marginLeft: 8,
  },
  listText: {
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 8,
    color: '#444',
    flex: 1,
  },
  link: {
    color: '#0066cc',
    textDecorationLine: 'underline',
  },
});

export default TermsOfService;