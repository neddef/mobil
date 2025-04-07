import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput, FlatList, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome, Ionicons } from '@expo/vector-icons';

// Örnek otomobil verileri
const CARS_DATA = [
  {
    id: '1',
    brand: 'BMW',
    model: '3 Serisi',
    year: 2022,
    price: 1250000,
    km: 15000,
    fuel: 'Benzin',
    image: 'https://via.placeholder.com/300',
    location: 'İstanbul',
  },
  {
    id: '2',
    brand: 'Mercedes',
    model: 'C Serisi',
    year: 2021,
    price: 1380000,
    km: 25000,
    fuel: 'Dizel',
    image: 'https://via.placeholder.com/300',
    location: 'Ankara',
  },
  {
    id: '3',
    brand: 'Audi',
    model: 'A4',
    year: 2020,
    price: 1125000,
    km: 42000,
    fuel: 'Benzin',
    image: 'https://via.placeholder.com/300',
    location: 'İzmir',
  },
  {
    id: '4',
    brand: 'Volkswagen',
    model: 'Passat',
    year: 2021,
    price: 950000,
    km: 30000,
    fuel: 'Dizel',
    image: 'https://via.placeholder.com/300',
    location: 'Bursa',
  },
];

// Araç kartı bileşeni
const CarCard = ({ car }) => {
  return (
    <TouchableOpacity style={styles.carCard}>
      <Image
        source={{ uri: car.image }}
        style={styles.carImage}
        resizeMode="cover"
      />
      <View style={styles.carInfo}>
        <Text style={styles.carTitle}>{car.brand} {car.model}</Text>
        <Text style={styles.carYear}>{car.year} - {car.fuel}</Text>
        <Text style={styles.carKm}>{car.km.toLocaleString('tr-TR')} km</Text>
        <Text style={styles.carPrice}>{car.price.toLocaleString('tr-TR')} ₺</Text>
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={16} color="#666" />
          <Text style={styles.locationText}>{car.location}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default function BuySellScreen() {
  const [searchText, setSearchText] = useState('');
  
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Araç Al & Sat</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Marka, model veya anahtar kelime ara..."
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>
      
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Tümü</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Sıfır</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>İkinci El</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Fiyat</Text>
            <Ionicons name="chevron-down" size={16} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Marka</Text>
            <Ionicons name="chevron-down" size={16} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterText}>Model</Text>
            <Ionicons name="chevron-down" size={16} color="#333" />
          </TouchableOpacity>
        </ScrollView>
      </View>
      
      <View style={styles.createAdContainer}>
        <TouchableOpacity style={styles.createAdButton}>
          <Ionicons name="add-circle" size={20} color="#fff" />
          <Text style={styles.createAdText}>İlan Ver</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={CARS_DATA}
        renderItem={({ item }) => <CarCard car={item} />}
        keyExtractor={item => item.id}
        style={styles.carList}
        showsVerticalScrollIndicator={false}
      />
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
    paddingVertical: 8,
    marginBottom: 15,
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
  filterContainer: {
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  filterScroll: {
    flexDirection: 'row',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
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
    marginRight: 5,
  },
  createAdContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  createAdButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  createAdText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 5,
  },
  carList: {
    paddingHorizontal: 20,
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
  carTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  carYear: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  carKm: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  carPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007bff',
    marginBottom: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
}); 