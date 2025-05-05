import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, FlatList, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

// Örnek öne çıkan araçlar
const FEATURED_CARS = [
  {
    id: '1',
    brand: 'Mercedes',
    model: 'E-Class',
    year: 2023,
    price: 2450000,
    image: 'https://via.placeholder.com/400x200',
    isNew: true,
  },
  {
    id: '2',
    brand: 'BMW',
    model: 'X5',
    year: 2022,
    price: 3200000,
    image: 'https://via.placeholder.com/400x200',
    isNew: true,
  },
  {
    id: '3',
    brand: 'Audi',
    model: 'A6',
    year: 2022,
    price: 1950000,
    image: 'https://via.placeholder.com/400x200',
    isNew: false,
  },
];

// Öne çıkan yedek parçalar
const FEATURED_PARTS = [
  {
    id: '1',
    name: 'Bosch Akü 60AH',
    price: 2400,
    image: 'https://via.placeholder.com/100',
    discount: 15,
  },
  {
    id: '2',
    name: 'Michelin Lastik 205/55R16',
    price: 1800,
    image: 'https://via.placeholder.com/100',
    discount: 0,
  },
  {
    id: '3',
    name: 'Mobil 1 Motor Yağı 4L',
    price: 750,
    image: 'https://via.placeholder.com/100',
    discount: 10,
  },
  {
    id: '4',
    name: 'Brembo Fren Diski (Ön)',
    price: 1250,
    image: 'https://via.placeholder.com/100',
    discount: 0,
  },
];

// Öne çıkan kiralık araçlar
const FEATURED_RENTALS = [
  {
    id: '1',
    brand: 'Toyota',
    model: 'Corolla',
    dailyPrice: 950,
    image: 'https://via.placeholder.com/150',
    location: 'İstanbul',
  },
  {
    id: '2',
    brand: 'Volkswagen',
    model: 'Passat',
    dailyPrice: 1200,
    image: 'https://via.placeholder.com/150',
    location: 'Ankara',
  },
  {
    id: '3',
    brand: 'Renault',
    model: 'Megane',
    dailyPrice: 850,
    image: 'https://via.placeholder.com/150',
    location: 'İzmir',
  },
];

// Ana menü öğesi
const MenuItem = ({ icon, title, onPress, color = "#007bff" }) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={[styles.menuIcon, { backgroundColor: `${color}20` }]}>
        <Ionicons name={icon} size={28} color={color} />
      </View>
      <Text style={styles.menuTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

// Öne çıkan araba kartı
const FeaturedCarCard = ({ car, onPress }) => {
  return (
    <TouchableOpacity style={styles.featuredCarCard} onPress={onPress}>
      <Image source={{ uri: car.image }} style={styles.featuredCarImage} />
      {car.isNew && (
        <View style={styles.newBadge}>
          <Text style={styles.newBadgeText}>Yeni</Text>
        </View>
      )}
      <View style={styles.featuredCarInfo}>
        <Text style={styles.featuredCarTitle}>{car.brand} {car.model}</Text>
        <Text style={styles.featuredCarYear}>{car.year}</Text>
        <Text style={styles.featuredCarPrice}>{car.price.toLocaleString('tr-TR')} ₺</Text>
      </View>
    </TouchableOpacity>
  );
};

// Yedek parça kartı
const PartCard = ({ part, onPress }) => {
  return (
    <TouchableOpacity style={styles.partCard} onPress={onPress}>
      <Image source={{ uri: part.image }} style={styles.partImage} />
      {part.discount > 0 && (
        <View style={styles.discountBadge}>
          <Text style={styles.discountText}>%{part.discount}</Text>
        </View>
      )}
      <Text style={styles.partName} numberOfLines={2}>{part.name}</Text>
      <Text style={styles.partPrice}>{part.price.toLocaleString('tr-TR')} ₺</Text>
    </TouchableOpacity>
  );
};

// Kiralık araç kartı
const RentalCard = ({ rental, onPress }) => {
  return (
    <TouchableOpacity style={styles.rentalCard} onPress={onPress}>
      <Image source={{ uri: rental.image }} style={styles.rentalImage} />
      <View style={styles.rentalInfo}>
        <Text style={styles.rentalTitle}>{rental.brand} {rental.model}</Text>
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={14} color="#666" />
          <Text style={styles.locationText}>{rental.location}</Text>
        </View>
        <Text style={styles.rentalPrice}>{rental.dailyPrice.toLocaleString('tr-TR')} ₺ <Text style={styles.perDay}>/ gün</Text></Text>
      </View>
    </TouchableOpacity>
  );
};

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Merhaba,</Text>
          <Text style={styles.headerTitle}>OtoCars'a Hoşgeldiniz!</Text>
        </View>
        <TouchableOpacity style={styles.notificationButton}>
          <Ionicons name="notifications-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Araba, yedek parça veya hizmet ara..."
          />
        </View>
        
        <View style={styles.menuContainer}>
          <MenuItem 
            icon="car" 
            title="Araç Al/Sat"
            color="#007bff"
            onPress={() => router.push('/(tabs)/buysell')}
          />
          <MenuItem 
            icon="key" 
            title="Kiralama"
            color="#ff6b6b"
            onPress={() => router.push('/(tabs)/rent')}
          />
          <MenuItem 
            icon="construct" 
            title="Yedek Parça"
            color="#00d68f"
            onPress={() => router.push('/(tabs)/parts')}
          />
          <MenuItem 
            icon="options" 
            title="Diğer"
            color="#ffa500"
            onPress={() => {}}
          />
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Öne Çıkan Araçlar</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/buysell')}>
              <Text style={styles.seeAllText}>Tümünü Gör</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {FEATURED_CARS.map((car) => (
              <FeaturedCarCard 
                key={car.id} 
                car={car} 
                onPress={() => router.push('/(tabs)/buysell')}
              />
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.bannerContainer}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/800x200' }} 
            style={styles.bannerImage} 
            resizeMode="cover"
          />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>Yaz Fırsatları!</Text>
            <Text style={styles.bannerSubtitle}>Seçili araçlarda %10'a varan indirimler sizi bekliyor</Text>
            <TouchableOpacity style={styles.bannerButton}>
              <Text style={styles.bannerButtonText}>Fırsatları Keşfet</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popüler Yedek Parçalar</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/parts')}>
              <Text style={styles.seeAllText}>Tümünü Gör</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.partsGrid}>
            {FEATURED_PARTS.map((part) => (
              <PartCard 
                key={part.id} 
                part={part} 
                onPress={() => router.push('/(tabs)/parts')}
              />
            ))}
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Kiralık Araçlar</Text>
            <TouchableOpacity onPress={() => router.push('/(tabs)/rent')}>
              <Text style={styles.seeAllText}>Tümünü Gör</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {FEATURED_RENTALS.map((rental) => (
              <RentalCard 
                key={rental.id} 
                rental={rental} 
                onPress={() => router.push('/(tabs)/rent')}
              />
            ))}
          </ScrollView>
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
  welcomeText: {
    fontSize: 16,
    color: '#666',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
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
  menuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  menuItem: {
    alignItems: 'center',
    width: 80,
  },
  menuIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  menuTitle: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
    color: '#333',
  },
  section: {
    marginBottom: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    fontSize: 14,
    color: '#007bff',
  },
  featuredCarCard: {
    width: 280,
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    marginLeft: 20,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featuredCarImage: {
    width: '100%',
    height: 160,
  },
  newBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  newBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  featuredCarInfo: {
    padding: 15,
  },
  featuredCarTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  featuredCarYear: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  featuredCarPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007bff',
  },
  bannerContainer: {
    position: 'relative',
    marginHorizontal: 20,
    marginBottom: 25,
    borderRadius: 15,
    overflow: 'hidden',
    height: 180,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  bannerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
    justifyContent: 'center',
  },
  bannerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  bannerSubtitle: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 15,
  },
  bannerButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 14,
  },
  partsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
  },
  partCard: {
    width: '50%',
    paddingHorizontal: 5,
    marginBottom: 15,
  },
  partImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  discountBadge: {
    position: 'absolute',
    top: 5,
    right: 10,
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
  },
  discountText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  partName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
  },
  partPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
  rentalCard: {
    width: 220,
    backgroundColor: '#fff',
    borderRadius: 15,
    overflow: 'hidden',
    marginLeft: 20,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
  },
  rentalImage: {
    width: 80,
    height: 80,
  },
  rentalInfo: {
    flex: 1,
    padding: 10,
  },
  rentalTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  rentalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
  perDay: {
    fontSize: 12,
    color: '#666',
    fontWeight: 'normal',
  },
});
