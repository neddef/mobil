import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useFilters } from '../hooks/useFilters';
import { FilterModal } from '../components/FilterModal';

// Örnek veri
const sampleItems = [
  {
    id: '1',
    title: 'iPhone 13 Pro',
    price: 999,
    brand: 'Apple',
    model: 'iPhone 13 Pro',
    year: '2021',
    condition: 'Yeni',
    category: 'Telefon',
    location: 'İstanbul',
  },
  {
    id: '2',
    title: 'Samsung Galaxy S21',
    price: 799,
    brand: 'Samsung',
    model: 'Galaxy S21',
    year: '2021',
    condition: 'İkinci El',
    category: 'Telefon',
    location: 'Ankara',
  },
  // Daha fazla örnek veri eklenebilir
];

export const FilterExampleScreen = () => {
  const {
    filters,
    isFilterModalVisible,
    showFilterModal,
    hideFilterModal,
    applyFilters,
    resetFilters,
    filterItems,
  } = useFilters();

  const filteredItems = filterItems(sampleItems);

  const renderItem = ({ item }: { item: typeof sampleItems[0] }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemPrice}>{item.price} TL</Text>
      <Text style={styles.itemDetails}>
        {item.brand} - {item.model} - {item.year}
      </Text>
      <Text style={styles.itemDetails}>
        {item.condition} - {item.location}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ürünler</Text>
        <TouchableOpacity style={styles.filterButton} onPress={showFilterModal}>
          <Text style={styles.filterButtonText}>Filtrele</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      <FilterModal
        visible={isFilterModalVisible}
        onClose={hideFilterModal}
        onApply={applyFilters}
        onReset={resetFilters}
        initialFilters={filters}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  filterButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  filterButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  listContainer: {
    padding: 16,
  },
  itemContainer: {
    backgroundColor: '#f8f8f8',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  itemDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
}); 