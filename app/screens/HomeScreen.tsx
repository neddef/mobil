import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useCart } from '../context/CartContext';
import { RentalModal } from '../components/RentalModal';

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
    image: 'https://example.com/iphone.jpg',
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
    image: 'https://example.com/samsung.jpg',
  },
  // Daha fazla örnek veri eklenebilir
];

export const HomeScreen = () => {
  const navigation = useNavigation();
  const { addToCart, totalItems } = useCart();
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isRentalModalVisible, setIsRentalModalVisible] = useState(false);

  const handleRent = (item: any) => {
    setSelectedItem(item);
    setIsRentalModalVisible(true);
  };

  const handleBuy = (item: any) => {
    addToCart(item);
  };

  const renderItem = ({ item }: { item: typeof sampleItems[0] }) => (
    <View style={styles.itemContainer}>
      {item.image && (
        <Image source={{ uri: item.image }} style={styles.itemImage} />
      )}
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>{item.price} TL</Text>
        <Text style={styles.itemDetails}>
          {item.brand} - {item.model} - {item.year}
        </Text>
        <Text style={styles.itemDetails}>
          {item.condition} - {item.location}
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.rentButton]}
            onPress={() => handleRent(item)}
          >
            <Text style={styles.buttonText}>Kirala</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buyButton]}
            onPress={() => handleBuy(item)}
          >
            <Text style={[styles.buttonText, styles.buyButtonText]}>Satın Al</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ürünler</Text>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate('Cart' as never)}
        >
          <Text style={styles.cartButtonText}>Sepet ({totalItems})</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={sampleItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />

      {selectedItem && (
        <RentalModal
          visible={isRentalModalVisible}
          onClose={() => setIsRentalModalVisible(false)}
          item={selectedItem}
        />
      )}
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
  cartButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  cartButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  listContainer: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  itemImage: {
    width: 100,
    height: 100,
    borderRadius: 4,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
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
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  button: {
    flex: 1,
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  rentButton: {
    backgroundColor: '#f8f8f8',
  },
  buyButton: {
    backgroundColor: '#007AFF',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  buyButtonText: {
    color: '#fff',
  },
}); 