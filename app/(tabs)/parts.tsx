import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, FlatList, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

// Örnek yedek parça kategorileri
const PARTS_CATEGORIES = [
  {
    id: '1',
    name: 'Motor Parçaları',
    icon: 'engine',
    count: 145,
  },
  {
    id: '2',
    name: 'Fren Sistemi',
    icon: 'car-brake-abs',
    count: 89,
  },
  {
    id: '3',
    name: 'Süspansiyon',
    icon: 'car-traction-control',
    count: 67,
  },
  {
    id: '4',
    name: 'İç Aksesuarlar',
    icon: 'car-seat',
    count: 112,
  },
  {
    id: '5',
    name: 'Dış Aksesuarlar',
    icon: 'car-door',
    count: 94,
  },
  {
    id: '6',
    name: 'Aydınlatma',
    icon: 'car-light-high',
    count: 56,
  },
];

// Örnek popüler yedek parçalar
const POPULAR_PARTS = [
  {
    id: '1',
    name: 'NGK Ateşleme Bujisi',
    brand: 'NGK',
    price: 120,
    oldPrice: 150,
    rating: 4.8,
    reviews: 246,
    isFavorite: true,
    compatibility: ['Toyota', 'Honda', 'Nissan'],
    image: 'https://via.placeholder.com/300',
  },
  {
    id: '2',
    name: 'Bosch Ön Fren Balataları',
    brand: 'Bosch',
    price: 350,
    oldPrice: 420,
    rating: 4.6,
    reviews: 187,
    isFavorite: false,
    compatibility: ['BMW', 'Mercedes', 'Audi'],
    image: 'https://via.placeholder.com/300',
  },
  {
    id: '3',
    name: 'Mann Yağ Filtresi',
    brand: 'Mann',
    price: 85,
    oldPrice: 110,
    rating: 4.7,
    reviews: 312,
    isFavorite: false,
    compatibility: ['VW', 'Skoda', 'Seat'],
    image: 'https://via.placeholder.com/300',
  },
  {
    id: '4',
    name: 'Delphi Oksijen Sensörü',
    brand: 'Delphi',
    price: 580,
    oldPrice: 650,
    rating: 4.5,
    reviews: 98,
    isFavorite: false,
    compatibility: ['Ford', 'Opel', 'Peugeot'],
    image: 'https://via.placeholder.com/300',
  },
];

// Fırsatlar
const DEALS = [
  {
    id: '1',
    title: 'Yağ & Filtre',
    description: 'Yağ ve filtre değişimi için %20 indirim',
    image: 'https://via.placeholder.com/600x300',
    expiry: '5 gün kaldı',
    discount: 20,
  },
  {
    id: '2',
    title: 'Aküler',
    description: 'Tüm akülerde %15 indirim fırsatı',
    image: 'https://via.placeholder.com/600x300',
    expiry: '3 gün kaldı',
    discount: 15,
  },
];

// Kategori kartı bileşeni
const CategoryCard = ({ category }) => {
  return (
    <TouchableOpacity style={styles.categoryCard}>
      <MaterialCommunityIcons name={category.icon} size={32} color="#007bff" />
      <Text style={styles.categoryName}>{category.name}</Text>
      <Text style={styles.categoryCount}>{category.count} ürün</Text>
    </TouchableOpacity>
  );
};

// Yedek parça kartı bileşeni
const PartCard = ({ part }) => {
  return (
    <TouchableOpacity style={styles.partCard}>
      <View style={styles.partImageContainer}>
        <Image
          source={{ uri: part.image }}
          style={styles.partImage}
          resizeMode="contain"
        />
        <TouchableOpacity style={styles.favoriteButton}>
          <Ionicons 
            name={part.isFavorite ? "heart" : "heart-outline"} 
            size={22} 
            color={part.isFavorite ? "#ff6b6b" : "#666"} 
          />
        </TouchableOpacity>
      </View>
      <View style={styles.partInfo}>
        <Text style={styles.partBrand}>{part.brand}</Text>
        <Text style={styles.partName}>{part.name}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={14} color="#FFD700" />
          <Text style={styles.ratingText}>{part.rating} ({part.reviews})</Text>
        </View>
        <View style={styles.compatibilityContainer}>
          <Text style={styles.compatibilityText}>Uyumlu: {part.compatibility.slice(0, 2).join(', ')}{part.compatibility.length > 2 ? '...' : ''}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{part.price.toLocaleString('tr-TR')} ₺</Text>
          {part.oldPrice && (
            <Text style={styles.oldPrice}>{part.oldPrice.toLocaleString('tr-TR')} ₺</Text>
          )}
        </View>
        <TouchableOpacity style={styles.addToCartButton}>
          <Text style={styles.addToCartText}>Sepete Ekle</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

// Fırsat kartı bileşeni
const DealCard = ({ deal }) => {
  return (
    <TouchableOpacity style={styles.dealCard}>
      <Image
        source={{ uri: deal.image }}
        style={styles.dealImage}
        resizeMode="cover"
      />
      <View style={styles.dealBadge}>
        <Text style={styles.dealBadgeText}>%{deal.discount}</Text>
      </View>
      <View style={styles.dealInfo}>
        <Text style={styles.dealTitle}>{deal.title}</Text>
        <Text style={styles.dealDescription}>{deal.description}</Text>
        <Text style={styles.dealExpiry}>{deal.expiry}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default function PartsScreen() {
  const [searchText, setSearchText] = useState('');
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Yedek Parçalar</Text>
        <TouchableOpacity>
          <Ionicons name="cart-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Yedek parça, marka veya model ara..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Özel Fırsatlar</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dealsScroll}>
            {DEALS.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kategoriler</Text>
          <View style={styles.categoriesGrid}>
            {PARTS_CATEGORIES.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popüler Parçalar</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>Tümünü Gör</Text>
            </TouchableOpacity>
          </View>
          {POPULAR_PARTS.map((part) => (
            <PartCard key={part.id} part={part} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  seeAllText: {
    fontSize: 14,
    color: '#007bff',
  },
  dealsScroll: {
    marginHorizontal: -5,
  },
  dealCard: {
    width: 280,
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  dealImage: {
    width: '100%',
    height: 120,
  },
  dealBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  dealBadgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  dealInfo: {
    padding: 12,
  },
  dealTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  dealDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  dealExpiry: {
    fontSize: 12,
    color: '#ff6b6b',
    fontWeight: '500',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
    marginBottom: 4,
    textAlign: 'center',
  },
  categoryCount: {
    fontSize: 12,
    color: '#666',
  },
  partCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  partImageContainer: {
    width: 120,
    height: 120,
    position: 'relative',
  },
  partImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f9f9f9',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  partInfo: {
    flex: 1,
    padding: 12,
  },
  partBrand: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  partName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  compatibilityContainer: {
    marginBottom: 8,
  },
  compatibilityText: {
    fontSize: 11,
    color: '#666',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
  oldPrice: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
    marginLeft: 6,
  },
  addToCartButton: {
    backgroundColor: '#007bff',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
}); 