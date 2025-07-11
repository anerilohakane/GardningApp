import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const HelpSupport = ({ navigation }) => {
  const [expandedItem, setExpandedItem] = useState(null);

  // Content for each section
  const contentData = {
    faq: {
      title: 'FAQs',
      icon: 'help-circle-outline',
      content: [
        { question: 'How do I reset my password?', answer: 'Go to Settings > Account > Reset Password and follow the instructions.' },
        { question: 'How can I update my profile?', answer: 'Tap on your profile picture in the top right corner and select Edit Profile.' },
        { question: 'Is there a premium version?', answer: 'Yes, you can upgrade to premium in the Settings > Subscription section.' }
      ]
    },
    contact: {
      title: 'Contact Support',
      icon: 'chatbubbles-outline',
      content: 'You can reach our support team 24/7 via email at support@yourapp.com or through the live chat feature during business hours (9am-5pm EST).',
      action: () => Linking.openURL('mailto:support@yourapp.com?subject=Support Request')
    },
    liveChat: {
      title: 'Live Chat',
      icon: 'chatbox-outline',
      content: 'Our live chat support is available Monday-Friday from 9am to 5pm EST. Tap the button below to start a chat session with one of our agents.',
      action: () => navigation.navigate('LiveChat')
    },
    report: {
      title: 'Report a Problem',
      icon: 'alert-circle-outline',
      content: 'If you encounter any issues with the app, please describe the problem in detail and include screenshots if possible. Our team will investigate promptly.',
      action: () => navigation.navigate('ReportProblem')
    },
    tutorials: {
      title: 'App Tutorials',
      icon: 'play-circle-outline',
      content: [
        { title: 'Getting Started', duration: '2:15', action: () => navigation.navigate('TutorialVideo', { id: 'getting-started' }) },
        { title: 'Advanced Features', duration: '4:30', action: () => navigation.navigate('TutorialVideo', { id: 'advanced-features' }) },
        { title: 'Privacy Settings', duration: '3:10', action: () => navigation.navigate('TutorialVideo', { id: 'privacy-settings' }) }
      ]
    },
    tos: {
      title: 'Terms of Service',
      icon: 'document-text-outline',
      content: 'By using this app, you agree to our Terms of Service. These terms outline your rights and responsibilities as a user of our platform. Key points include:\n\n1. You must be at least 13 years old to use this service\n2. You are responsible for maintaining the confidentiality of your account\n3. We reserve the right to modify these terms at any time\n\nFor the complete terms, please visit our website.',
      action: () => Linking.openURL('https://yourapp.com/terms')
    }
  };

  const supportItems = [
    {
      id: 'faq',
      title: 'FAQs',
      icon: 'help-circle-outline',
    },
    {
      id: 'contact',
      title: 'Contact Support',
      icon: 'chatbubbles-outline',
    },
    {
      id: 'liveChat',
      title: 'Live Chat',
      icon: 'chatbox-outline',
    },
    {
      id: 'report',
      title: 'Report a Problem',
      icon: 'alert-circle-outline',
    },
    {
      id: 'tutorials',
      title: 'App Tutorials',
      icon: 'play-circle-outline',
    },
    {
      id: 'tos',
      title: 'Terms of Service',
      icon: 'document-text-outline',
    },
  ];

  const contactMethods = [
    {
      title: 'Call Us',
      subtitle: '+1 (555) 123-4567',
      icon: 'call-outline',
      action: () => Linking.openURL('tel:+15551234567'),
    },
    {
      title: 'Email Us',
      subtitle: 'support@yourapp.com',
      icon: 'mail-outline',
      action: () => Linking.openURL('mailto:support@yourapp.com?subject=Support Request'),
    },
  ];

  const toggleExpand = (itemId) => {
    setExpandedItem(expandedItem === itemId ? null : itemId);
  };

  const renderContent = (itemId) => {
    const item = contentData[itemId];
    if (!item) return null;

    return (
      <View style={styles.contentContainer}>
        {itemId === 'faq' && (
          <View>
            {item.content.map((faq, index) => (
              <View key={index} style={styles.faqItem}>
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                <Text style={styles.faqAnswer}>{faq.answer}</Text>
                {index < item.content.length - 1 && <View style={styles.divider} />}
              </View>
            ))}
          </View>
        )}

        {itemId === 'tutorials' && (
          <View>
            {item.content.map((tutorial, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.tutorialItem}
                onPress={tutorial.action}
              >
                <Ionicons name="play-circle" size={24} color="#4CAF50" />
                <View style={styles.tutorialText}>
                  <Text style={styles.tutorialTitle}>{tutorial.title}</Text>
                  <Text style={styles.tutorialDuration}>{tutorial.duration}</Text>
                </View>
                {index < item.content.length - 1 && <View style={styles.divider} />}
              </TouchableOpacity>
            ))}
          </View>
        )}

        {['contact', 'liveChat', 'report', 'tos'].includes(itemId) && (
          <Text style={styles.contentText}>{item.content}</Text>
        )}

        {(itemId === 'contact' || itemId === 'liveChat') && (
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={item.action}
          >
            <Text style={styles.actionButtonText}>
              {itemId === 'contact' ? 'Send Email' : 'Start Chat'}
            </Text>
          </TouchableOpacity>
        )}

        {itemId === 'report' && (
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={item.action}
          >
            <Text style={styles.actionButtonText}>Submit Report</Text>
          </TouchableOpacity>
        )}

        {itemId === 'tos' && (
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={item.action}
          >
            <Text style={styles.actionButtonText}>View Full Terms</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.header}>Help & Support</Text>
        <Text style={styles.subHeader}>How can we help you today?</Text>
        
        {/* Quick Help Options */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Help</Text>
          {supportItems.map((item) => (
            <View key={item.id}>
              <TouchableOpacity 
                style={styles.optionCard}
                onPress={() => toggleExpand(item.id)}
              >
                <Ionicons name={item.icon} size={24} color="#4CAF50" />
                <Text style={styles.optionText}>{item.title}</Text>
                <Ionicons 
                  name={expandedItem === item.id ? "chevron-down" : "chevron-forward"} 
                  size={20} 
                  color="#888" 
                />
              </TouchableOpacity>
              {expandedItem === item.id && renderContent(item.id)}
            </View>
          ))}
        </View>

        {/* Contact Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          {contactMethods.map((item, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.contactCard}
              onPress={item.action}
            >
              <View style={styles.contactIcon}>
                <Ionicons name={item.icon} size={24} color="#fff" />
              </View>
              <View style={styles.contactTextContainer}>
                <Text style={styles.contactTitle}>{item.title}</Text>
                <Text style={styles.contactSubtitle}>{item.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#888" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Help Resources */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Help Resources</Text>
          <View style={styles.resourceContainer}>
            <TouchableOpacity 
              style={styles.resourceCard}
              onPress={() => navigation.navigate('UserGuide')}
            >
              <Ionicons name="book-outline" size={28} color="#4CAF50" />
              <Text style={styles.resourceText}>User Guide</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.resourceCard}
              onPress={() => navigation.navigate('VideoTutorials')}
            >
              <Ionicons name="videocam-outline" size={28} color="#4CAF50" />
              <Text style={styles.resourceText}>Video Tutorials</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subHeader: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 16,
    color: '#333',
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  contactIcon: {
    backgroundColor: '#4CAF50',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactTextContainer: {
    flex: 1,
    marginLeft: 16,
  },
  contactTitle: {
    fontSize: 16,
    color: '#333',
  },
  contactSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  resourceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  resourceCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  resourceText: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  contentContainer: {
    backgroundColor: '#f0f4f7',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  contentText: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  faqItem: {
    marginBottom: 12,
  },
  faqQuestion: {
    fontWeight: '600',
    fontSize: 15,
    color: '#333',
    marginBottom: 6,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#555',
    marginBottom: 12,
  },
  tutorialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tutorialText: {
    marginLeft: 12,
    flex: 1,
  },
  tutorialTitle: {
    fontWeight: '500',
    fontSize: 15,
    color: '#333',
  },
  tutorialDuration: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 12,
  },
  actionButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  actionButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default HelpSupport;