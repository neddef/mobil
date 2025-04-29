import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, FlatList, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

// Örnek kiralık araç verileri
const RENTAL_CARS = [
  {
    id: '1',
    brand: 'Toyota',
    model: 'Corolla',
    year: 2023,
    dailyPrice: 950,
    fuel: 'Benzin',
    image: 'https://via.placeholder.com/300',
    location: 'İstanbul',
    rating: 4.7,
    reviews: 32,
    available: true,
  },
  {
    id: '2',
    brand: 'Renault',
    model: 'Clio',
    year: 2022,
    dailyPrice: 780,
    fuel: 'Dizel',
    image: 'https://via.placeholder.com/300',
    location: 'Ankara',
    rating: 4.5,
    reviews: 21,
    available: true,
  },
  {
    id: '3',
    brand: 'Hyundai',
    model: 'i20',
    year: 2022,
    dailyPrice: 750,
    fuel: 'Benzin',
    image: 'https://via.placeholder.com/300',
    location: 'İzmir',
    rating: 4.8,
    reviews: 45,
    available: true,
  },
  {
    id: '4',
    brand: 'Ford',
    model: 'Focus',
    year: 2022,
    dailyPrice: 890,
    fuel: 'Dizel',
    image: 'https://via.placeholder.com/300',
    location: 'Antalya',
    rating: 4.6,
    reviews: 28,
    available: false,
  },
];

// Popüler kiralama lokasyonları
const POPULAR_LOCATIONS = [
  { id: '1', name: 'İstanbul', cars: 124 },
  { id: '2', name: 'Ankara', cars: 87 },
  { id: '3', name: 'İzmir', cars: 65 },
  { id: '4', name: 'Antalya', cars: 93 },
  { id: '5', name: 'Bodrum', cars: 42 },
];

// Kiralık araç kartı bileşeni
const RentalCarCard = ({ car }) => {
  return (
    <TouchableOpacity style={styles.carCard}>
      <Image
        source={{ uri: car.image }}
        style={styles.carImage}
        resizeMode="cover"
      />
      {!car.available && (
        <View style={styles.unavailableBadge}>
          <Text style={styles.unavailableText}>Müsait Değil</Text>
        </View>
      )}
      <View style={styles.carInfo}>
        <View style={styles.carHeader}>
          <Text style={styles.carTitle}>{car.brand} {car.model}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>{car.rating} ({car.reviews})</Text>
          </View>
        </View>
        <Text style={styles.carYear}>{car.year} - {car.fuel}</Text>
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={16} color="#666" />
          <Text style={styles.locationText}>{car.location}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>{car.dailyPrice.toLocaleString('tr-TR')} ₺</Text>
          <Text style={styles.perDay}>/ gün</Text>
        </View>
        {car.available && (
          <TouchableOpacity style={styles.rentButton}>
            <Text style={styles.rentButtonText}>Hemen Kirala</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

// Popüler lokasyon kartı
const LocationCard = ({ location }) => {
  return (
    <TouchableOpacity style={styles.locationCard}>
      <Text style={styles.locationName}>{location.name}</Text>
      <Text style={styles.locationCars}>{location.cars} araç</Text>
    </TouchableOpacity>
  );
};

export default function RentScreen() {
  const [searchText, setSearchText] = useState('');
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Araç Kirala</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Nerede araç kiralamak istiyorsunuz?"
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popüler Lokasyonlar</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.locationsScroll}>
            {POPULAR_LOCATIONS.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </ScrollView>
        </View>
        
        <View style={styles.filterContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>Tümü</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>Ekonomik</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>Orta Sınıf</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>Premium</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterText}>SUV</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hemen Kiralayabilirsiniz</Text>
          {RENTAL_CARS.map((car) => (
            <RentalCarCard key={car.id} car={car} />
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
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  locationsScroll: {
    flexDirection: 'row',
    marginHorizontal: -5,
  },
  locationCard: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 10,
    minWidth: 120,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  locationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  locationCars: {
    fontSize: 12,
    color: '#666',
  },
  filterContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  filterScroll: {
    flexDirection: 'row',
  },
  filterButton: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  filterText: {
    fontSize: 14,
    color: '#333',
  },
  carCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  carImage: {
    width: '100%',
    height: 180,
  },
  carInfo: {
    padding: 15,
  },
  carHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  carTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  carYear: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007bff',
  },
  perDay: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
    marginBottom: 2,
  },
  rentButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  rentButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  unavailableBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  unavailableText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
}); 