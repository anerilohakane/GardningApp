import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  FlatList
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { TENANT_CONFIG } from '../config/constants';

const { width } = Dimensions.get('window');
const IMAGE_HEIGHT = width * 0.6;

const PortfolioDetailScreen = ({ route, navigation }) => {
  const { portfolioId } = route.params;
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const fetchPortfolioDetail = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await axios.get(`${TENANT_CONFIG.API_BASE_URL}/portfolio/${portfolioId}`, {
        headers: {
          'X-Tenant-ID': TENANT_CONFIG.ID,
          'X-Tenant-Subdomain': TENANT_CONFIG.SUBDOMAIN,
        }
      });

      if (response.data?.success) {
        setPortfolio(response.data.data);
      } else {
        setError('Failed to fetch portfolio details');
      }
    } catch (err) {
      console.error('Error fetching portfolio details:', err);
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolioDetail();
  }, [portfolioId]);

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#2E8B57" />
        <Text style={styles.loadingText}>Loading portfolio details...</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={[styles.container, styles.errorContainer]}>
        <Ionicons name="warning-outline" size={48} color="#EF5350" />
        <Text style={styles.errorText}>Error loading portfolio</Text>
        <Text style={styles.errorSubtext}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={fetchPortfolioDetail}
        >
          <Text style={styles.retryButtonText}>Try Again</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  if (!portfolio) {
    return (
      <SafeAreaView style={[styles.container, styles.errorContainer]}>
        <Ionicons name="leaf-outline" size={48} color="#C8E6C9" />
        <Text style={styles.errorText}>Portfolio not found</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.retryButtonText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const images = portfolio.images?.length > 0 ? portfolio.images : [{ url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c' }];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#2E8B57" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{portfolio.title}</Text>
          <View style={{ width: 24 }} /> {/* Spacer for alignment */}
        </View>

        {/* Main Image */}
        <Image
          source={{ uri: images[activeImageIndex]?.url }}
          style={styles.mainImage}
          resizeMode="cover"
          onError={() => console.log('Image load error')}
        />

        {/* Image Thumbnails */}
        {images.length > 1 && (
          <FlatList
            data={images}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.thumbnailsContainer}
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => setActiveImageIndex(index)}>
                <Image
                  source={{ uri: item.url }}
                  style={[
                    styles.thumbnail,
                    index === activeImageIndex && styles.activeThumbnail
                  ]}
                />
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        )}

        {/* Portfolio Details */}
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Ionicons name="location-outline" size={20} color="#2E8B57" />
            <Text style={styles.detailText}>{portfolio.location || 'Location not specified'}</Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="time-outline" size={20} color="#2E8B57" />
            <Text style={styles.detailText}>
              {portfolio.startDate ? new Date(portfolio.startDate).toLocaleDateString() : 'Date not specified'}
              {portfolio.endDate && ` - ${new Date(portfolio.endDate).toLocaleDateString()}`}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="pricetag-outline" size={20} color="#2E8B57" />
            <Text style={styles.detailText}>{portfolio.serviceType || 'Type not specified'}</Text>
          </View>

          {/* Description */}
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.descriptionText}>
            {portfolio.description || 'No description available'}
          </Text>

          {/* Features */}
          {portfolio.features?.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Key Features</Text>
              {portfolio.features.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Ionicons name="checkmark-circle" size={16} color="#2E8B57" />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </>
          )}

          {/* Technologies */}
          {portfolio.technologies?.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Technologies Used</Text>
              <View style={styles.tagsContainer}>
                {portfolio.technologies.map((tech, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{tech}</Text>
                  </View>
                ))}
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FDF8',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    color: '#2E8B57',
    fontSize: 16,
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  errorText: {
    fontSize: 18,
    color: '#EF5350',
    fontWeight: '600',
    marginTop: 16,
  },
  errorSubtext: {
    fontSize: 14,
    color: '#757575',
    marginTop: 8,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 20,
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: '#EF5350',
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E8F5E9',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#2E7D32',
  },
  mainImage: {
    width: '100%',
    height: IMAGE_HEIGHT,
  },
  thumbnailsContainer: {
    padding: 8,
  },
  thumbnail: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E8F5E9',
  },
  activeThumbnail: {
    borderColor: '#2E8B57',
    borderWidth: 2,
  },
  detailsContainer: {
    padding: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2E7D32',
    marginTop: 20,
    marginBottom: 12,
  },
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  featureText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#555',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  tag: {
    backgroundColor: '#E8F5E9',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  tagText: {
    color: '#2E8B57',
    fontSize: 14,
  },
});

export default PortfolioDetailScreen;