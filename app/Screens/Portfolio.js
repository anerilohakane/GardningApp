import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  Dimensions, 
  SafeAreaView, 
  FlatList,
  TouchableOpacity,
  ScrollView
} from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 48) / 2;
const CARD_HEIGHT = CARD_WIDTH * 1.1;

const portfolioData = [
  {
    id: '1',
    title: 'Zen Garden Design',
    location: 'Kyoto, Japan',
    type: 'Residential',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae',
  },
  {
    id: '2',
    title: 'Corporate Park',
    location: 'Singapore',
    type: 'Commercial',
    image: 'https://i.pinimg.com/736x/c9/15/a1/c915a1d8c26dfab990c32dabad3bc72a.jpg',
  },
  {
    id: '3',
    title: 'Tropical Retreat',
    location: 'Bali, Indonesia',
    type: 'Residential',
    image: 'https://i.pinimg.com/736x/e9/a0/d6/e9a0d68ead0296cb64ea2b680c2869c9.jpg',
  },
  {
    id: '4',
    title: 'Botanical Garden',
    location: 'London, UK',
    type: 'Public',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3',
  },
  {
    id: '5',
    title: 'Rooftop Garden',
    location: 'New York, USA',
    type: 'Commercial',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
  },
  {
    id: '6',
    title: 'Family Garden',
    location: 'Sydney, Australia',
    type: 'Residential',
    image: 'https://images.unsplash.com/photo-1560703650-ef3e0f254ae0',
  },
];

const categories = [
  { id: 'all', name: 'All Projects', icon: 'apps' },
  { id: 'Residential', name: 'Homes', icon: 'home' },
  { id: 'Commercial', name: 'Businesses', icon: 'business' },
  { id: 'Public', name: 'Public Spaces', icon: 'park' },
];

const PortfolioScreen = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredData = portfolioData.filter(item => 
    activeCategory === 'all' || item.type === activeCategory
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>Portfolio</Text>
          <Text style={styles.headerSubtitle}>Transforming spaces since 2022</Text>
        </View>
        <Ionicons name="leaf" size={28} color="#2E8B57" />
      </View>

      {/* Enhanced Green Theme Category Section */}
      <View style={styles.categorySection}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {categories.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryButton,
                activeCategory === category.id && styles.activeCategoryButton
              ]}
              onPress={() => setActiveCategory(category.id)}
            >
              <Ionicons 
                name={category.icon} 
                size={18} 
                color={activeCategory === category.id ? '#fff' : '#2E8B57'} 
              />
              <Text style={[
                styles.categoryText,
                activeCategory === category.id && styles.activeCategoryText
              ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Project Grid */}
      <FlatList
        data={filteredData}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.cardContainer}>
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.cardImage} />
              <View style={styles.cardOverlay} />
              <View style={styles.cardContent}>
                <Text style={styles.projectType}>{item.type}</Text>
                <Text style={styles.projectTitle}>{item.title}</Text>
                <View style={styles.locationContainer}>
                  <MaterialIcons name="location-on" size={14} color="#fff" />
                  <Text style={styles.locationText}>{item.location}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.galleryContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="leaf-outline" size={48} color="#C8E6C9" />
            <Text style={styles.emptyText}>No projects in this category</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FDF8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop:28,
    padding: 24,
    paddingBottom: 16,
    // backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E8F5E9',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2E7D32',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#689F38',
    marginTop: 4,
  },
  categorySection: {
    backgroundColor: '#E8F5E9',
    paddingVertical: 12,
  },
  categoriesContainer: {
    paddingHorizontal: 16,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  activeCategoryButton: {
    backgroundColor: '#2E8B57',
    borderColor: '#2E8B57',
  },
  categoryText: {
    fontSize: 14,
    color: '#2E8B57',
    fontWeight: '600',
    marginLeft: 8,
  },
  activeCategoryText: {
    color: '#fff',
  },
  galleryContainer: {
    padding: 16,
    paddingBottom: 24,
  },
  cardContainer: {
    width: '50%',
    padding: 8,
  },
  card: {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  cardImage: {
    width: '100%',
    height: CARD_HEIGHT,
    resizeMode: 'cover',
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(46, 139, 87, 0.15)',
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  projectType: {
    fontSize: 12,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 4,
    textTransform: 'uppercase',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  projectTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: '#fff',
    marginLeft: 4,
    textShadowColor: 'rgba(0,0,0,0.3)',
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
    fontSize: 16,
    color: '#689F38',
    fontWeight: '600',
    marginTop: 16,
  },
});

export default PortfolioScreen;