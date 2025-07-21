
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   Dimensions,
//   SafeAreaView,
//   FlatList,
//   ScrollView,
//   TouchableOpacity,
//   ActivityIndicator
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import axios from 'axios';
// import { TENANT_CONFIG } from '../config/constants';


// const { width } = Dimensions.get('window');
// const CARD_WIDTH = width - 40;
// const CARD_HEIGHT = CARD_WIDTH * 0.6;

// // Default image for fallback
// const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c';

// // Categories
// const categories = [
//   { id: 'all', name: 'All Services' },
//   { id: 'lawn', name: 'Lawn Care' },
//   { id: 'hardscape', name: 'Hardscaping' },
//   { id: 'planting', name: 'Planting' },
//   { id: 'irrigation', name: 'Irrigation' },
//   { id: 'lighting', name: 'Lighting' },
// ];

// const Gallery = () => {
//   const [activeCategory, setActiveCategory] = useState('all');
//   const [galleryData, setGalleryData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Enhanced URL validation
//   const isValidImageUrl = (url) => {
//     if (!url || typeof url !== 'string') return false;
//     try {
//       new URL(url);
//       return url.startsWith('http') || url.startsWith('https');
//     } catch {
//       return false;
//     }
//   };

//   const fetchGalleryData = async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const response = await axios.get(`${TENANT_CONFIG.API_BASE_URL}/gallery`, {
//         headers: {
//           'X-Tenant-ID': TENANT_CONFIG.ID,
//           'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
//         }
//       });
      
//       console.log('API Response:', JSON.stringify(response.data, null, 2)); // Debug log

//       if (response.data && response.data.success) {
//         const processedData = response.data.data.map(item => {
//           // Extract image URLs from objects if needed
//           const rawImages = Array.isArray(item.images) 
//             ? item.images.map(img => img.url || img) 
//             : [];
          
//           // Get all possible image sources
//           const possibleImages = [
//             ...rawImages,
//             item.image,
//             DEFAULT_IMAGE
//           ].filter(Boolean);

//           // Find the first valid image URL
//           let imageUrl = DEFAULT_IMAGE;
//           for (const url of possibleImages) {
//             if (isValidImageUrl(url)) {
//               imageUrl = url;
//               break;
//             }
//           }

//           return {
//             ...item,
//             images: possibleImages.filter(url => isValidImageUrl(url)),
//             thumbnailIndex: Math.min(item.thumbnailIndex || 0, rawImages.length - 1),
//             displayImage: imageUrl
//           };
//         });
//         setGalleryData(processedData);
//       } else {
//         setError('Failed to fetch gallery data');
//       }
//     } catch (err) {
//       console.error('Error fetching gallery data:', err);
//       setError(err.message || 'An error occurred');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchGalleryData();
//   }, []);

//   const filteredData = galleryData.filter(item => 
//     activeCategory === 'all' || item.category === activeCategory
//   );

//   const renderGalleryItem = ({ item }) => {
//     const imageUri = item.displayImage || DEFAULT_IMAGE;
//     console.log('Rendering item:', item._id, 'with image:', imageUri); // Debug log

//     return (
//       <View style={styles.card}>
//         <Image 
//           source={{ 
//             uri: imageUri,
//             headers: {
//               'X-Tenant-ID': TENANT_CONFIG.ID,
//               'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN
//             }
//           }}
//           style={styles.cardImage}
//           onError={(e) => {
//             console.log(`Image load error for item ${item._id}:`, e.nativeEvent.error);
//             // Update state to show default image for this item
//             setGalleryData(prev => prev.map(prevItem => 
//               prevItem._id === item._id 
//                 ? {...prevItem, displayImage: DEFAULT_IMAGE} 
//                 : prevItem
//             ));
//           }}
//           defaultSource={{ uri: DEFAULT_IMAGE }}
//         />
//         <View style={styles.cardOverlay} />
//         <View style={styles.infoContainer}>
//           <Text style={styles.name}>{item.name || item.title}</Text>
//           <View style={styles.metaContainer}>
//             <View style={styles.metaItem}>
//               <Ionicons name="location-outline" size={14} color="#F3F4F6" />
//               <Text style={styles.metaText}>{item.location}</Text>
//             </View>
//             <View style={styles.metaItem}>
//               <Ionicons name="calendar-outline" size={14} color="#F3F4F6" />
//               <Text style={styles.metaText}>
//                 {new Date(item.createdAt || item.date).toLocaleDateString()}
//               </Text>
//             </View>
//           </View>
//         </View>
//       </View>
//     );
//   };

//   if (loading) {
//     return (
//       <SafeAreaView style={[styles.container, styles.loadingContainer]}>
//         <ActivityIndicator size="large" color="#10B981" />
//         <Text style={styles.loadingText}>Loading gallery...</Text>
//       </SafeAreaView>
//     );
//   }

//   if (error) {
//     return (
//       <SafeAreaView style={[styles.container, styles.errorContainer]}>
//         <Ionicons name="warning-outline" size={48} color="#EF4444" />
//         <Text style={styles.errorText}>Error loading data</Text>
//         <Text style={styles.errorSubtext}>{error}</Text>
//         <TouchableOpacity 
//           style={styles.retryButton}
//           onPress={fetchGalleryData}
//         >
//           <Text style={styles.retryButtonText}>Try Again</Text>
//         </TouchableOpacity>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <Text style={styles.headerTitle}>Landscape Gallery</Text>
//         <Text style={styles.headerSubtitle}>Professional landscaping services</Text>
//       </View>

//       {/* Categories */}
//       <View style={styles.categorySection}>
//         <Text style={styles.sectionTitle}>Service Categories</Text>
//         <ScrollView 
//           horizontal 
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.categoriesContainer}
//         >
//           {categories.map(category => (
//             <TouchableOpacity
//               key={category.id}
//               style={[
//                 styles.categoryButton,
//                 activeCategory === category.id && styles.activeCategoryButton
//               ]}
//               onPress={() => setActiveCategory(category.id)}
//             >
//               <Text style={[
//                 styles.categoryText,
//                 activeCategory === category.id && styles.activeCategoryText
//               ]}>
//                 {category.name}
//               </Text>
//             </TouchableOpacity>
//           ))}
//         </ScrollView>
//       </View>

//       {/* Gallery */}
//       <FlatList
//         data={filteredData}
//         keyExtractor={(item) => item._id || item.id}
//         renderItem={renderGalleryItem}
//         contentContainerStyle={styles.galleryContainer}
//         showsVerticalScrollIndicator={false}
//         ListEmptyComponent={
//           <View style={styles.emptyContainer}>
//             <Ionicons name="leaf-outline" size={48} color="#9CA3AF" />
//             <Text style={styles.emptyText}>No services found</Text>
//             <Text style={styles.emptySubtext}>Try selecting a different category</Text>
//           </View>
//         }
//       />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F9FAFB',
//   },
//   loadingContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     marginTop: 16,
//     color: '#6B7280',
//   },
//   errorContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   errorText: {
//     fontSize: 18,
//     color: '#EF4444',
//     fontWeight: '600',
//     marginTop: 16,
//   },
//   errorSubtext: {
//     fontSize: 14,
//     color: '#9CA3AF',
//     marginTop: 8,
//     textAlign: 'center',
//   },
//   retryButton: {
//     marginTop: 20,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     backgroundColor: '#EF4444',
//     borderRadius: 8,
//   },
//   retryButtonText: {
//     color: 'white',
//     fontWeight: '600',
//   },
//   header: {
//     padding: 16,
//   },
//   headerTitle: {
//     fontSize: 28,
//     fontWeight: '700',
//     color: '#111827',
//     marginBottom: 4,
//   },
//   headerSubtitle: {
//     fontSize: 16,
//     color: '#6B7280',
//     fontWeight: '500',
//   },
//   categorySection: {
//     marginBottom: 20,
//     paddingTop: 8,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#111827',
//     paddingHorizontal: 20,
//     marginBottom: 12,
//   },
//   categoriesContainer: {
//     paddingHorizontal: 20,
//   },
//   categoryButton: {
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 20,
//     marginRight: 10,
//     borderWidth: 1,
//     borderColor: '#E5E7EB',
//   },
//   activeCategoryButton: {
//     backgroundColor: '#10B981',
//     borderColor: '#10B981',
//   },
//   categoryText: {
//     fontSize: 14,
//     color: '#6B7280',
//     fontWeight: '500',
//   },
//   activeCategoryText: {
//     color: '#FFFFFF',
//   },
//   galleryContainer: {
//     paddingHorizontal: 20,
//     paddingBottom: 24,
//   },
//   card: {
//     marginBottom: 20,
//     borderRadius: 16,
//     overflow: 'hidden',
//     backgroundColor: '#FFFFFF',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.1,
//     shadowRadius: 10,
//     elevation: 5,
//   },
//   cardImage: {
//     width: CARD_WIDTH,
//     height: CARD_HEIGHT,
//     resizeMode: 'cover',
//   },
//   cardOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     backgroundColor: 'rgba(0,0,0,0.2)',
//   },
//   infoContainer: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     padding: 20,
//   },
//   name: {
//     fontSize: 20,
//     fontWeight: '700',
//     color: '#FFFFFF',
//     marginBottom: 8,
//     textShadowColor: 'rgba(0,0,0,0.5)',
//     textShadowOffset: { width: 0, height: 1 },
//     textShadowRadius: 4,
//   },
//   metaContainer: {
//     flexDirection: 'row',
//   },
//   metaItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginRight: 16,
//   },
//   metaText: {
//     fontSize: 14,
//     color: '#F3F4F6',
//     marginLeft: 6,
//     textShadowColor: 'rgba(0,0,0,0.5)',
//     textShadowOffset: { width: 0, height: 1 },
//     textShadowRadius: 2,
//   },
//   emptyContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 40,
//   },
//   emptyText: {
//     fontSize: 18,
//     color: '#6B7280',
//     fontWeight: '600',
//     marginTop: 16,
//   },
//   emptySubtext: {
//     fontSize: 14,
//     color: '#9CA3AF',
//     marginTop: 4,
//   },
// });

// export default Gallery;






import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  FlatList,
  TextInput,
  TouchableOpacity,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { TENANT_CONFIG } from '../config/constants';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 40;
const CARD_HEIGHT = CARD_WIDTH * 0.6;

// Default image for fallback
const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c';

const Gallery = () => {
  const [galleryData, setGalleryData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Enhanced URL validation
  const isValidImageUrl = (url) => {
    if (!url || typeof url !== 'string') return false;
    try {
      new URL(url);
      return url.startsWith('http') || url.startsWith('https');
    } catch {
      return false;
    }
  };

  const fetchGalleryData = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${TENANT_CONFIG.API_BASE_URL}/gallery`, {
        headers: {
          'X-Tenant-ID': TENANT_CONFIG.ID,
          'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
        }
      });
      
      console.log('API Response:', JSON.stringify(response.data, null, 2));

      if (response.data && response.data.success) {
        const processedData = response.data.data.map(item => {
          // Extract image URLs from objects if needed
          const rawImages = Array.isArray(item.images) 
            ? item.images.map(img => img.url || img) 
            : [];
          
          // Get all possible image sources
          const possibleImages = [
            ...rawImages,
            item.image,
            DEFAULT_IMAGE
          ].filter(Boolean);

          // Find the first valid image URL
          let imageUrl = DEFAULT_IMAGE;
          for (const url of possibleImages) {
            if (isValidImageUrl(url)) {
              imageUrl = url;
              break;
            }
          }

          return {
            ...item,
            images: possibleImages.filter(url => isValidImageUrl(url)),
            thumbnailIndex: Math.min(item.thumbnailIndex || 0, rawImages.length - 1),
            displayImage: imageUrl
          };
        });
        setGalleryData(processedData);
        setFilteredData(processedData); // Initialize filtered data with all data
      } else {
        setError('Failed to fetch gallery data');
      }
    } catch (err) {
      console.error('Error fetching gallery data:', err);
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // Filter gallery items based on search query
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredData(galleryData);
    } else {
      const filtered = galleryData.filter(item =>
        item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.title?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, galleryData]);

  useEffect(() => {
    fetchGalleryData();
  }, []);

  const renderGalleryItem = ({ item }) => {
    const imageUri = item.displayImage || DEFAULT_IMAGE;
    console.log('Rendering item:', item._id, 'with image:', imageUri);

    return (
      <View style={styles.card}>
        <Image 
          source={{ 
            uri: imageUri,
            headers: {
              'X-Tenant-ID': TENANT_CONFIG.ID,
              'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN
            }
          }}
          style={styles.cardImage}
          onError={(e) => {
            console.log(`Image load error for item ${item._id}:`, e.nativeEvent.error);
            // Update state to show default image for this item
            setGalleryData(prev => prev.map(prevItem => 
              prevItem._id === item._id 
                ? {...prevItem, displayImage: DEFAULT_IMAGE} 
                : prevItem
            ));
          }}
          defaultSource={{ uri: DEFAULT_IMAGE }}
        />
        <View style={styles.cardOverlay} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{item.name || item.title}</Text>
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Ionicons name="location-outline" size={14} color="#F3F4F6" />
              <Text style={styles.metaText}>{item.location}</Text>
            </View>
            <View style={styles.metaItem}>
              <Ionicons name="calendar-outline" size={14} color="#F3F4F6" />
              <Text style={styles.metaText}>
                {new Date(item.createdAt || item.date).toLocaleDateString()}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#10B981" />
        <Text style={styles.loadingText}>Loading gallery...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.container, styles.errorContainer]}>
        <Ionicons name="warning-outline" size={48} color="#EF4444" />
        <Text style={styles.errorText}>Error loading data</Text>
        <Text style={styles.errorSubtext}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={fetchGalleryData}
        >
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Landscape Gallery</Text>
        <Text style={styles.headerSubtitle}>Professional landscaping services</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#9CA3AF" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by project name..."
          placeholderTextColor="#9CA3AF"
          value={searchQuery}
          onChangeText={setSearchQuery}
          clearButtonMode="while-editing"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearButton}>
            <Ionicons name="close-circle" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      </View>

      {/* Gallery */}
      <FlatList
        data={filteredData}
        keyExtractor={(item) => item._id || item.id}
        renderItem={renderGalleryItem}
        contentContainerStyle={styles.galleryContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="leaf-outline" size={48} color="#9CA3AF" />
            <Text style={styles.emptyText}>No projects found</Text>
            <Text style={styles.emptySubtext}>
              {searchQuery.trim() ? 'Try a different search term' : 'No projects available'}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    color: '#6B7280',
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#EF4444',
    fontWeight: '600',
    marginTop: 16,
  },
  errorSubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 8,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#EF4444',
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  header: {
    padding: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginHorizontal: 20,
    marginBottom: 20,
    height: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#111827',
  },
  clearButton: {
    padding: 5,
  },
  galleryContainer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  card: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cardImage: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    resizeMode: 'cover',
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  infoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  metaContainer: {
    flexDirection: 'row',
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  metaText: {
    fontSize: 14,
    color: '#F3F4F6',
    marginLeft: 6,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    color: '#6B7280',
    fontWeight: '600',
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#9CA3AF',
    marginTop: 4,
  },
});

export default Gallery;