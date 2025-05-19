import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useCart } from '../context/CartContext';
import { useNavigation } from '@react-navigation/native';

export const CheckoutScreen = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigation = useNavigation();
  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
  });

  const handlePayment = () => {
    // Burada gerçek ödeme işlemi yapılacak
    // Şimdilik sadece simüle ediyoruz
    Alert.alert(
      'Ödeme Başarılı',
      'Siparişiniz başarıyla oluşturuldu.',
      [
        {
          text: 'Tamam',
          onPress: () => {
            clearCart();
            navigation.navigate('Home' as never);
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ödeme</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sipariş Özeti</Text>
        {items.map((item) => (
          <View key={item.id} style={styles.orderItem}>
            <Text style={styles.orderItemTitle}>{item.title}</Text>
            <Text style={styles.orderItemPrice}>
              {item.price * item.quantity * (item.rentalDays || 1)} TL
            </Text>
          </View>
        ))}
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Toplam:</Text>
          <Text style={styles.totalPrice}>{totalPrice} TL</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ödeme Bilgileri</Text>
        <TextInput
          style={styles.input}
          placeholder="Kart Numarası"
          keyboardType="numeric"
          maxLength={16}
          value={paymentInfo.cardNumber}
          onChangeText={(text) =>
            setPaymentInfo({ ...paymentInfo, cardNumber: text })
          }
        />
        <TextInput
          style={styles.input}
          placeholder="Kart Sahibi"
          value={paymentInfo.cardHolder}
          onChangeText={(text) =>
            setPaymentInfo({ ...paymentInfo, cardHolder: text })
          }
        />
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="Son Kullanma Tarihi (AA/YY)"
            maxLength={5}
            value={paymentInfo.expiryDate}
            onChangeText={(text) =>
              setPaymentInfo({ ...paymentInfo, expiryDate: text })
            }
          />
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder="CVV"
            keyboardType="numeric"
            maxLength={3}
            value={paymentInfo.cvv}
            onChangeText={(text) =>
              setPaymentInfo({ ...paymentInfo, cvv: text })
            }
          />
        </View>
      </View>

      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payButtonText}>Ödemeyi Tamamla</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  orderItemTitle: {
    fontSize: 16,
    color: '#333',
  },
  orderItemPrice: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalText: {
    fontSize: 18,
    fontWeight: '600',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  payButton: {
    backgroundColor: '#007AFF',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  payButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 