import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert,
  ScrollView,
  Dimensions,
  Modal,
  ActivityIndicator
} from 'react-native';
import { MaterialIcons, Ionicons, FontAwesome, Feather, AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';
import { TENANT_CONFIG } from '../../config/constants';

const { width } = Dimensions.get('window');

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [adminData, setAdminData] = useState({
    name: '',
    email: '',
    tenant: '',
    role: '',
    phone: '',
    joinDate: ''
  });
  const [avatarColor, setAvatarColor] = useState('#4CAF50');
  const [showThemeOptions, setShowThemeOptions] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('token');
      
      const userResponse = await axios.get(`${TENANT_CONFIG.API_BASE_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
          'X-Tenant-ID': TENANT_CONFIG.ID,
        }
      });
      
      const userData = userResponse.data.data;
      
      const joinDate = new Date(userData.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
      });
      
      setAdminData({
        name: userData.name || 'User',
        email: userData.email,
        role: userData.role || 'User',
        phone: userData.phone || 'Not provided',
        joinDate: `Member since ${joinDate}`
      });
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError(err.message || 'Failed to load profile data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Log Out", 
          onPress: async () => {
            await AsyncStorage.removeItem('token');
            navigation.replace('Login');
          } 
        }
      ]
    );
  };

  const getInitials = (name) => {
    if (!name) return 'US';
    return name.split(' ').map(part => part[0]).join('').toUpperCase().slice(0, 2);
  };

  const colorOptions = [
    '#4CAF50', // Green
    '#2196F3', // Blue
    '#9C27B0', // Purple
    '#FF9800', // Orange
    '#E91E63', // Pink
    '#009688', // Teal
  ];

  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#4CAF50" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Ionicons name="alert-circle" size={50} color="#E91E63" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={fetchData}
        >
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header with Gradient Background */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => setShowThemeOptions(true)}
          style={[styles.avatarContainer, { backgroundColor: avatarColor }]}
        >
          <Text style={styles.avatarText}>{getInitials(adminData.name)}</Text>
        </TouchableOpacity>
        <Text style={styles.name}>{adminData.name}</Text>
        <Text style={styles.role}>{adminData.role}</Text>
      </View>

      {/* Account Information Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Information</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Ionicons name="person" size={20} color="#4CAF50" />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Full Name</Text>
              <Text style={styles.infoText}>{adminData.name}</Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <MaterialIcons name="email" size={20} color="#4CAF50" />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Email Address</Text>
              <Text style={styles.infoText}>{adminData.email}</Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Feather name="phone" size={20} color="#4CAF50" />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Phone Number</Text>
              <Text style={styles.infoText}>{adminData.phone}</Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <AntDesign name="calendar" size={20} color="#4CAF50" />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Member Since</Text>
              <Text style={styles.infoText}>{adminData.joinDate}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Quick Actions Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={[styles.actionButton, styles.actionButtonPrimary]}>
            <LinearGradient
              colors={['#4CAF50', '#66BB6A']}
              style={styles.actionIconContainer}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <FontAwesome name="users" size={20} color="#fff" />
            </LinearGradient>
            <Text style={styles.actionText}>Team</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.actionButtonSecondary]}>
            <View style={[styles.actionIconContainer, { backgroundColor: '#2196F3' }]}>
              <Ionicons name="settings" size={20} color="#fff" />
            </View>
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.actionButtonTertiary]}>
            <View style={[styles.actionIconContainer, { backgroundColor: '#FF9800' }]}>
              <MaterialIcons name="help-outline" size={20} color="#fff" />
            </View>
            <Text style={styles.actionText}>Help</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.actionButton, styles.actionButtonQuaternary]}>
            <View style={[styles.actionIconContainer, { backgroundColor: '#9C27B0' }]}>
              <Feather name="file-text" size={20} color="#fff" />
            </View>
            <Text style={styles.actionText}>Docs</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Account Settings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Settings</Text>
        <View style={styles.settingsCard}>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <MaterialIcons name="edit" size={22} color="#4CAF50" />
            </View>
            <Text style={styles.settingText}>Edit Profile</Text>
            <MaterialIcons name="chevron-right" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          
          <View style={styles.dividerFull} />
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <MaterialIcons name="security" size={22} color="#4CAF50" />
            </View>
            <Text style={styles.settingText}>Change Password</Text>
            <MaterialIcons name="chevron-right" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          
          <View style={styles.dividerFull} />
          
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingIcon}>
              <MaterialIcons name="notifications" size={22} color="#4CAF50" />
            </View>
            <Text style={styles.settingText}>Notifications</Text>
            <MaterialIcons name="chevron-right" size={24} color="#BDBDBD" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <MaterialIcons name="logout" size={20} color="#fff" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      {/* Theme Selection Modal */}
      <Modal
        visible={showThemeOptions}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowThemeOptions(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Choose Avatar Color</Text>
            <View style={styles.colorOptionsContainer}>
              {colorOptions.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[styles.colorOption, { 
                    backgroundColor: color,
                    borderWidth: avatarColor === color ? 3 : 0,
                    borderColor: '#fff'
                  }]}
                  onPress={() => {
                    setAvatarColor(color);
                    setShowThemeOptions(false);
                  }}
                />
              ))}
            </View>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowThemeOptions(false)}
            >
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  errorText: {
    fontSize: 16,
    color: '#616161',
    marginVertical: 20,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  headerGradient: {
    paddingTop: 50,
    paddingBottom: 30,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    alignItems: 'center',
  },
   header: {
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingBottom: 30,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    marginBottom: 16,
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    elevation: 3,
    borderWidth: 4,
    borderColor: '#EEEEEE',
  },
  avatarText: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 4,
  },
  role: {
    fontSize: 16,
    color: '#757575',
  },
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#424242',
    marginBottom: 16,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  infoIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#9E9E9E',
    marginBottom: 2,
  },
  infoText: {
    fontSize: 16,
    color: '#212121',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginLeft: 48,
  },
  dividerFull: {
    height: 1,
    backgroundColor: '#EEEEEE',
    marginVertical: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionButton: {
    width: (width - 48) / 2,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 1,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  actionButtonPrimary: {
    borderTopWidth: 2,
    borderTopColor: '#4CAF50',
  },
  actionButtonSecondary: {
    borderTopWidth: 2,
    borderTopColor: '#2196F3',
  },
  actionButtonTertiary: {
    borderTopWidth: 2,
    borderTopColor: '#FF9800',
  },
  actionButtonQuaternary: {
    borderTopWidth: 2,
    borderTopColor: '#9C27B0',
  },
  actionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 14,
    color: '#424242',
    fontWeight: '500',
  },
  settingsCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingText: {
    fontSize: 16,
    color: '#212121',
    fontWeight: '500',
    flex: 1,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E53935',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    elevation: 2,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginLeft: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: width - 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#424242',
  },
  colorOptionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 24,
  },
  colorOption: {
    width: 60,
    height: 60,
    borderRadius: 30,
    margin: 8,
    elevation: 2,
  },
  modalCloseButton: {
    padding: 12,
    alignItems: 'center',
  },
  modalCloseText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProfileScreen;