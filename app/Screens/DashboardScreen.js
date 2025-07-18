// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   StyleSheet,
//   Modal,
//   TextInput
// } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { useNavigation } from '@react-navigation/native';

// const ProfileScreen = () => {
//   const navigation = useNavigation();
//   const [showDropdown, setShowDropdown] = useState(false);
  
//   // Hardcoded data
//   const userData = {
//     name: 'John Doe',
//     email: 'john.doe@example.com',
//     phone: '+1 (555) 123-4567',
//     address: '123 Garden Lane, Greenville, CA 90210',
//     membership: 'Premium Member',
//     joinDate: 'Joined May 2022'
//   };

//   const propertyData = {
//     address: '123 Garden Lane, Greenville, CA 90210',
//     size: '1,200 sq ft',
//     type: 'Residential Garden',
//     photo: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
//   };

//   const upcomingService = {
//     date: 'June 15, 2023',
//     time: '9:00 AM - 11:00 AM',
//     service: 'Lawn Mowing & Trimming',
//     technician: 'Michael Green',
//     status: 'Confirmed'
//   };

//   const recentServices = [
//     {
//       id: 1,
//       date: 'May 28, 2023',
//       service: 'Full Garden Maintenance',
//       amount: '$120.00',
//       status: 'due'
//     },
//     {
//       id: 2,
//       date: 'May 14, 2023',
//       service: 'Hedge Trimming',
//       amount: '$85.00',
//       status: 'Paid'
//     },
//     {
//       id: 3,
//       date: 'April 30, 2023',
//       service: 'Weed Control',
//       amount: '$65.00',
//       status: 'Paid'
//     }
//   ];

//  // In ProfileScreen.js, update handlePayment:
// const handlePayment = (service) => {
//   navigation.navigate('HomeTab', { 
//     screen: 'Payment',
//     params: {
//       serviceDetails: service,
//       propertyDetails: propertyData
//     }
//   });
// };

//   return (
//     <View style={styles.container}> 

// {/* Header */}
// <View style={styles.header}>
//   <TouchableOpacity onPress={() => navigation.goBack()}>
//     <Icon name="arrow-left" size={24} color="#fff" />
//   </TouchableOpacity>
  
//   <Text style={styles.headerTitle}>Profile</Text>
  
//   <TouchableOpacity 
//     onPress={() => setShowDropdown(!showDropdown)}
//     hitSlop={{top: 20, bottom: 20, left: 20, right: 20}} // Makes it easier to tap
//   >
//     <Icon name="ellipsis-v" size={24} color="#fff" />
//   </TouchableOpacity>
// </View>

// {/* Dropdown Menu */}
// <Modal
//   transparent={true}
//   visible={showDropdown}
//   animationType="fade"
//   onRequestClose={() => setShowDropdown(false)}
// >
//   <TouchableOpacity 
//     style={styles.dropdownOverlay}
//     activeOpacity={1}
//     onPressOut={() => setShowDropdown(false)} // Changed to onPressOut
//   >
//     <View style={styles.dropdownMenu}>
//       <TouchableOpacity 
//         style={styles.dropdownItem}
//         onPress={() => {
//           setShowDropdown(false);
//           navigation.navigate('Dashboard');
//         }}
//       >
//         <Icon name="tachometer" size={18} color="#4CAF50" style={styles.dropdownIcon} />
//         <Text style={styles.dropdownText}>Dashboard</Text>
//       </TouchableOpacity>
      
//       <TouchableOpacity 
//         style={styles.dropdownItem}
//         onPress={() => {
//           setShowDropdown(false);
//           navigation.navigate('HomeTab', { screen: 'AppointmentList' });
//         }}
//       >
//         <Icon name="calendar" size={18} color="#4CAF50" style={styles.dropdownIcon} />
//         <Text style={styles.dropdownText}>Appointments</Text>
//       </TouchableOpacity>
      
//       <TouchableOpacity 
//   style={styles.dropdownItem}
//   onPress={() => {
//     setShowDropdown(false);
//     navigation.navigate('HomeTab', { screen: 'MyEstimates' });
//   }}
// >
//   <Icon name="file-text" size={18} color="#4CAF50" style={styles.dropdownIcon} />
//   <Text style={styles.dropdownText}>Estimates</Text>
// </TouchableOpacity>
//     </View>
//   </TouchableOpacity>
// </Modal>

//       <ScrollView contentContainerStyle={styles.content}>
//         {/* Upcoming Service Card */}
//         <View style={styles.card}>
//           <View style={styles.cardHeader}>
//             <Icon name="bell" size={20} color="#4CAF50" />
//             <Text style={styles.cardTitle}>Upcoming Service</Text>
//           </View>
          
//           <View style={styles.serviceInfo}>
//             <Text style={styles.serviceName}>{upcomingService.service}</Text>
//             <View style={styles.serviceDetailRow}>
//               <Icon name="calendar" size={16} color="#666" style={styles.detailIcon} />
//               <Text style={styles.serviceDetail}>{upcomingService.date}</Text>
//             </View>
//             <View style={styles.serviceDetailRow}>
//               <Icon name="clock-o" size={16} color="#666" style={styles.detailIcon} />
//               <Text style={styles.serviceDetail}>{upcomingService.time}</Text>
//             </View>
//             <View style={styles.serviceDetailRow}>
//               <Icon name="user" size={16} color="#666" style={styles.detailIcon} />
//               <Text style={styles.serviceDetail}>Technician: {upcomingService.technician}</Text>
//             </View>
            
//             <View style={[styles.statusBadge, upcomingService.status === 'Confirmed' ? styles.statusConfirmed : null]}>
//               <Text style={styles.statusText}>{upcomingService.status}</Text>
//             </View>
//           </View>
//         </View>

//         {/* Personal Information Card */}
//         <View style={styles.card}>
//           <View style={styles.cardHeader}>
//             <Icon name="user" size={20} color="#4CAF50" />
//             <Text style={styles.cardTitle}>Personal Information</Text>
//           </View>
          
//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Name:</Text>
//             <Text style={styles.infoValue}>{userData.name}</Text>
//           </View>
          
//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Email:</Text>
//             <Text style={styles.infoValue}>{userData.email}</Text>
//           </View>
          
//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Phone:</Text>
//             <Text style={styles.infoValue}>{userData.phone}</Text>
//           </View>
          
//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Address:</Text>
//             <Text style={styles.infoValue}>{userData.address}</Text>
//           </View>
          
//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Membership:</Text>
//             <Text style={[styles.infoValue, styles.membership]}>{userData.membership}</Text>
//           </View>
          
//           <Text style={styles.joinDate}>{userData.joinDate}</Text>
//         </View>

//         {/* Property Details Card */}
//         <View style={styles.card}>
//           <View style={styles.cardHeader}>
//             <Icon name="home" size={20} color="#4CAF50" />
//             <Text style={styles.cardTitle}>Property Details</Text>
//           </View>
          
//           <Image 
//             source={{ uri: propertyData.photo }} 
//             style={styles.propertyImage}
//             resizeMode="cover"
//           />
          
//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Address:</Text>
//             <Text style={styles.infoValue}>{propertyData.address}</Text>
//           </View>
          
//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Size:</Text>
//             <Text style={styles.infoValue}>{propertyData.size}</Text>
//           </View>
          
//           <View style={styles.infoRow}>
//             <Text style={styles.infoLabel}>Type:</Text>
//             <Text style={styles.infoValue}>{propertyData.type}</Text>
//           </View>
//         </View>

//         {/* Recent Services Card */}
//         <View style={styles.card}>
//           <View style={styles.cardHeader}>
//             <Icon name="history" size={20} color="#4CAF50" />
//             <Text style={styles.cardTitle}>Recent Services</Text>
//           </View>
          
//           {recentServices.map((service) => (
//             <View key={service.id} style={styles.serviceItem}>
//               <View style={styles.serviceLeft}>
//                 <Text style={styles.serviceDate}>{service.date}</Text>
//                 <Text style={styles.serviceName}>{service.service}</Text>
//               </View>
              
//               <View style={styles.serviceRight}>
//                 <Text style={styles.serviceAmount}>{service.amount}</Text>
//                 {service.status === 'Paid' ? (
//                   <View style={styles.paidBadge}>
//                     <Text style={styles.paidText}>Paid</Text>
//                   </View>
//                 ) : (
//                   <TouchableOpacity 
//                     style={styles.payButton}
//                     onPress={() => handlePayment(service)}
//                   >
//                     <Text style={styles.payButtonText}>Pay Now</Text>
//                   </TouchableOpacity>
//                 )}
//               </View>
//             </View>
//           ))}
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//     marginTop:30
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 16,
//     backgroundColor: '#4CAF50',
//     elevation: 4
//   },
//   headerTitle: {
//     color: '#fff',
//     fontSize: 20,
//     fontWeight: 'bold'
//   },
//   dropdownOverlay: {
//   flex: 1,
//   backgroundColor: 'rgba(0,0,0,0.5)',
//   justifyContent: 'flex-start',
//   alignItems: 'flex-end',
//   paddingTop: 60,
//   paddingRight: 16,
//   zIndex: 1000 // Ensure it appears above other elements
// },
// dropdownMenu: {
//   backgroundColor: '#fff',
//   borderRadius: 8,
//   width: 200,
//   elevation: 4,
//   zIndex: 1001 // Higher than overlay
// },
//   dropdownItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 12,
//     paddingHorizontal: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee'
//   },
//   dropdownIcon: {
//     marginRight: 12
//   },
//   dropdownText: {
//     fontSize: 16,
//     color: '#333'
//   },
//   content: {
//     padding: 16,
//     paddingBottom: 32
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     padding: 16,
//     marginBottom: 16,
//     elevation: 2
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//     paddingBottom: 12
//   },
//   cardTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginLeft: 10,
//     color: '#333'
//   },
//   serviceInfo: {
//     marginBottom: 8
//   },
//   serviceName: {
//     fontSize: 16,
//     fontWeight: '600',
//     marginBottom: 12,
//     color: '#333'
//   },
//   serviceDetailRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8
//   },
//   detailIcon: {
//     marginRight: 8
//   },
//   serviceDetail: {
//     fontSize: 14,
//     color: '#666'
//   },
//   statusBadge: {
//     alignSelf: 'flex-start',
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//     borderRadius: 12,
//     backgroundColor: '#eee',
//     marginTop: 8
//   },
//   statusConfirmed: {
//     backgroundColor: '#E8F5E9',
//     borderColor: '#4CAF50',
//     borderWidth: 1
//   },
//   statusText: {
//     fontSize: 12,
//     color: '#4CAF50',
//     fontWeight: '500'
//   },
//   infoRow: {
//     flexDirection: 'row',
//     marginBottom: 12
//   },
//   infoLabel: {
//     width: 100,
//     fontSize: 14,
//     color: '#666',
//     fontWeight: '500'
//   },
//   infoValue: {
//     flex: 1,
//     fontSize: 14,
//     color: '#333'
//   },
//   membership: {
//     color: '#4CAF50',
//     fontWeight: '600'
//   },
//   joinDate: {
//     fontSize: 12,
//     color: '#999',
//     marginTop: 8,
//     fontStyle: 'italic'
//   },
//   propertyImage: {
//     width: '100%',
//     height: 180,
//     borderRadius: 8,
//     marginBottom: 16
//   },
//   serviceItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee'
//   },
//   serviceLeft: {
//     flex: 1
//   },
//   serviceDate: {
//     fontSize: 12,
//     color: '#999',
//     marginBottom: 4
//   },
//   serviceRight: {
//     alignItems: 'flex-end'
//   },
//   serviceAmount: {
//     fontSize: 16,
//     fontWeight: '600',
//     color: '#333',
//     marginBottom: 4
//   },
//   paidBadge: {
//     backgroundColor: '#E8F5E9',
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//     borderRadius: 12
//   },
//   paidText: {
//     fontSize: 12,
//     color: '#4CAF50',
//     fontWeight: '500'
//   },
//   payButton: {
//     backgroundColor: '#4CAF50',
//     paddingVertical: 6,
//     paddingHorizontal: 12,
//     borderRadius: 16
//   },
//   payButtonText: {
//     color: '#fff',
//     fontSize: 12,
//     fontWeight: '600'
//   }
// });

// export default ProfileScreen;




import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  ActivityIndicator,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TENANT_CONFIG } from '../config/constants';
import moment from 'moment';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [error, setError] = useState(null);

  const fetchProfileData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Fetch customer profile
      const profileResponse = await fetch(`${TENANT_CONFIG.API_BASE_URL}/customers/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
          'X-Tenant-ID': TENANT_CONFIG.ID
        }
      });

      const profileData = await profileResponse.json();

      if (!profileResponse.ok) {
        throw new Error(profileData.message || 'Failed to fetch profile data');
      }

      setProfileData(profileData.data);

      // Fetch appointments
      const appointmentsResponse = await fetch(`${TENANT_CONFIG.API_BASE_URL}/appointments/my-appointments`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
          'X-Tenant-ID': TENANT_CONFIG.ID
        }
      });

      const appointmentsData = await appointmentsResponse.json();

      if (!appointmentsResponse.ok) {
        throw new Error(appointmentsData.message || 'Failed to fetch appointments');
      }

      setAppointments(appointmentsData.data || []);
      setError(null);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
      Alert.alert('Error', 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  // Get upcoming appointment (first future appointment)
  const getUpcomingAppointment = () => {
    if (!appointments || appointments.length === 0) return null;
    
    const now = moment();
    const futureAppointments = appointments.filter(appt => 
      moment(appt.date).isAfter(now)
    ).sort((a, b) => moment(a.date).diff(moment(b.date)));
    
    return futureAppointments.length > 0 ? futureAppointments[0] : null;
  };

  // Get recent appointments (past appointments, max 5)
 const getRecentAppointments = () => {
  if (!appointments || appointments.length === 0) return [];
  
  const now = moment();
  return appointments
    .filter(appt => moment(appt.date).isBefore(now))
    .sort((a, b) => moment(b.date).diff(moment(a.date)))
    .slice(0, 5);
};

  const upcomingAppointment = getUpcomingAppointment();
  const recentAppointments = getRecentAppointments();

  const handlePayment = (appointment) => {
    navigation.navigate('HomeTab', { 
      screen: 'Payment',
      params: {
        appointmentDetails: appointment
      }
    });
  };

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
        <Text style={styles.errorText}>Error loading profile: {error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => {
            setLoading(true);
            setError(null);
            fetchProfileData();
          }}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}> 
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Profile</Text>
        
        <TouchableOpacity 
          onPress={() => setShowDropdown(!showDropdown)}
          hitSlop={{top: 20, bottom: 20, left: 20, right: 20}}
        >
          <Icon name="ellipsis-v" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Dropdown Menu */}
      <Modal
        transparent={true}
        visible={showDropdown}
        animationType="fade"
        onRequestClose={() => setShowDropdown(false)}
      >
        <TouchableOpacity 
          style={styles.dropdownOverlay}
          activeOpacity={1}
          onPressOut={() => setShowDropdown(false)}
        >
          <View style={styles.dropdownMenu}>
            <TouchableOpacity 
              style={styles.dropdownItem}
              onPress={() => {
                setShowDropdown(false);
                navigation.navigate('Dashboard');
              }}
            >
              <Icon name="tachometer" size={18} color="#4CAF50" style={styles.dropdownIcon} />
              <Text style={styles.dropdownText}>Dashboard</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.dropdownItem}
              onPress={() => {
                setShowDropdown(false);
                navigation.navigate('HomeTab', { screen: 'AppointmentList' });
              }}
            >
              <Icon name="calendar" size={18} color="#4CAF50" style={styles.dropdownIcon} />
              <Text style={styles.dropdownText}>Appointments</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.dropdownItem}
              onPress={() => {
                setShowDropdown(false);
                navigation.navigate('HomeTab', { screen: 'MyEstimates' });
              }}
            >
              <Icon name="file-text" size={18} color="#4CAF50" style={styles.dropdownIcon} />
              <Text style={styles.dropdownText}>Estimates</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Upcoming Service Card */}
        {upcomingAppointment ? (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Icon name="bell" size={20} color="#4CAF50" />
              <Text style={styles.cardTitle}>Upcoming Service</Text>
            </View>
            
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceName}>
                {upcomingAppointment.service?.name || 'Service'}
              </Text>
              <View style={styles.serviceDetailRow}>
                <Icon name="calendar" size={16} color="#666" style={styles.detailIcon} />
                <Text style={styles.serviceDetail}>
                  {moment(upcomingAppointment.date).format('MMMM D, YYYY')}
                </Text>
              </View>
              <View style={styles.serviceDetailRow}>
  <Icon name="clock-o" size={16} color="#666" style={styles.detailIcon} />
  <Text style={styles.serviceDetail}>
    {upcomingAppointment.timeSlot
      ? `${upcomingAppointment.timeSlot.startTime} - ${upcomingAppointment.timeSlot.endTime}`
      : 'Time not specified'}
  </Text>
</View>
              {upcomingAppointment.technician && (
                <View style={styles.serviceDetailRow}>
                  <Icon name="user" size={16} color="#666" style={styles.detailIcon} />
                  <Text style={styles.serviceDetail}>
                    Technician: {upcomingAppointment.technician.name || 'Not assigned'}
                  </Text>
                </View>
              )}
              
              <View style={[styles.statusBadge, styles.statusConfirmed]}>
                <Text style={styles.statusText}>Confirmed</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Icon name="bell" size={20} color="#4CAF50" />
              <Text style={styles.cardTitle}>Upcoming Service</Text>
            </View>
            <Text style={styles.noAppointmentsText}>No upcoming appointments</Text>
          </View>
        )}

        {/* Personal Information Card */}
        {profileData && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Icon name="user" size={20} color="#4CAF50" />
              <Text style={styles.cardTitle}>Personal Information</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Name:</Text>
              <Text style={styles.infoValue}>{profileData.user?.name || 'Not provided'}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Email:</Text>
              <Text style={styles.infoValue}>{profileData.user?.email || 'Not provided'}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Phone:</Text>
              <Text style={styles.infoValue}>{profileData.user?.phone || 'Not provided'}</Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Address:</Text>
              <Text style={styles.infoValue}>
                {profileData.address ? 
                  `${profileData.address.street || ''}, ${profileData.address.city || ''}, ${profileData.address.state || ''} ${profileData.address.zipCode || ''}` 
                  : 'Not provided'
                }
              </Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Member Since:</Text>
              <Text style={styles.infoValue}>
                {profileData.createdAt ? moment(profileData.createdAt).format('MMMM D, YYYY') : 'N/A'}
              </Text>
            </View>
          </View>
        )}

        {/* Property Details Card */}
        {profileData?.propertyDetails?.length > 0 && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Icon name="home" size={20} color="#4CAF50" />
              <Text style={styles.cardTitle}>Property Details</Text>
            </View>
            
            {profileData.propertyDetails[0].images?.length > 0 && (
              <Image 
                source={{ uri: profileData.propertyDetails[0].images[0].url }} 
                style={styles.propertyImage}
                resizeMode="cover"
              />
            )}
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Address:</Text>
              <Text style={styles.infoValue}>
                {profileData.propertyDetails[0].propertyAddress ? 
                  `${profileData.propertyDetails[0].propertyAddress.street || ''}, 
                   ${profileData.propertyDetails[0].propertyAddress.city || ''}, 
                   ${profileData.propertyDetails[0].propertyAddress.state || ''} 
                   ${profileData.propertyDetails[0].propertyAddress.zipCode || ''}` 
                  : 'Not provided'
                }
              </Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Size:</Text>
              <Text style={styles.infoValue}>
                {profileData.propertyDetails[0].size ? 
                  `${profileData.propertyDetails[0].size} sq ft` : 'N/A'
                }
              </Text>
            </View>
            
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Type:</Text>
              <Text style={styles.infoValue}>
                {profileData.propertyDetails[0].name || 'Property'}
              </Text>
            </View>
          </View>
        )}

        {/* Recent Services Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Icon name="history" size={20} color="#4CAF50" />
            <Text style={styles.cardTitle}>Recent Services</Text>
          </View>
          
          {recentAppointments.length > 0 ? (
            recentAppointments.map((appointment) => (
              <View key={appointment._id} style={styles.serviceItem}>
                <View style={styles.serviceLeft}>
                  <Text style={styles.serviceDate}>
                    {moment(appointment.date).format('MMMM D, YYYY')}
                  </Text>
                  <Text style={styles.serviceName}>
                    {appointment.service?.name || 'Service'}
                  </Text>
                </View>
                
                <View style={styles.serviceRight}>
                  {/* <Text style={styles.serviceAmount}>
                    ${appointment.price || '0.00'}
                  </Text> */}
                  {appointment.paymentStatus === 'paid' ? (
                    <View style={styles.paidBadge}>
                      <Text style={styles.paidText}>Paid</Text>
                    </View>
                  ) : (
                    <TouchableOpacity 
                      style={styles.payButton}
                      onPress={() => handlePayment(appointment)}
                    >
                      <Text style={styles.payButtonText}>Pay Now</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noAppointmentsText}>No recent services</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop: 30
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  errorText: {
    color: '#d32f2f',
    marginBottom: 20,
    textAlign: 'center'
  },
  retryButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5
  },
  retryButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#4CAF50',
    elevation: 4
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold'
  },
  dropdownOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingTop: 60,
    paddingRight: 16
  },
  dropdownMenu: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: 200,
    elevation: 4
  },
  dropdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  dropdownIcon: {
    marginRight: 12
  },
  dropdownText: {
    fontSize: 16,
    color: '#333'
  },
  content: {
    padding: 16,
    paddingBottom: 32
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 2
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 12
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333'
  },
  serviceInfo: {
    marginBottom: 8
  },
  serviceName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333'
  },
  serviceDetailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8
  },
  detailIcon: {
    marginRight: 8
  },
  serviceDetail: {
    fontSize: 14,
    color: '#666'
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    backgroundColor: '#eee',
    marginTop: 8
  },
  statusConfirmed: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
    borderWidth: 1
  },
  statusText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500'
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12
  },
  infoLabel: {
    width: 100,
    fontSize: 14,
    color: '#666',
    fontWeight: '500'
  },
  infoValue: {
    flex: 1,
    fontSize: 14,
    color: '#333'
  },
  propertyImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 16
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  serviceLeft: {
    flex: 1
  },
  serviceDate: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4
  },
  serviceRight: {
    alignItems: 'flex-end'
  },
  serviceAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4
  },
  paidBadge: {
    backgroundColor: '#E8F5E9',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12
  },
  paidText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '500'
  },
  payButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16
  },
  payButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600'
  },
  noAppointmentsText: {
    textAlign: 'center',
    color: '#666',
    paddingVertical: 10
  }
});

export default ProfileScreen;