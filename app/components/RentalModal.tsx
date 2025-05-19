import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useCart } from '../context/CartContext';

interface RentalModalProps {
  visible: boolean;
  onClose: () => void;
  item: {
    id: string;
    title: string;
    price: number;
  };
}

export const RentalModal: React.FC<RentalModalProps> = ({
  visible,
  onClose,
  item,
}) => {
  const { addToCart } = useCart();
  const [rentalDays, setRentalDays] = useState('1');

  const handleRent = () => {
    addToCart({
      ...item,
      rentalDays: parseInt(rentalDays, 10),
    });
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Kiralama</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.dailyPrice}>Günlük Fiyat: {item.price} TL</Text>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Kiralama Süresi (Gün)</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={rentalDays}
                onChangeText={setRentalDays}
                maxLength={2}
              />
            </View>

            <View style={styles.totalContainer}>
              <Text style={styles.totalLabel}>Toplam Tutar:</Text>
              <Text style={styles.totalPrice}>
                {item.price * parseInt(rentalDays || '0', 10)} TL
              </Text>
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>İptal</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.rentButton]}
              onPress={handleRent}
            >
              <Text style={[styles.buttonText, styles.rentButtonText]}>
                Kirala
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 24,
    color: '#666',
  },
  content: {
    marginBottom: 16,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  dailyPrice: {
    fontSize: 16,
    color: '#007AFF',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f8f8f8',
    marginRight: 8,
  },
  rentButton: {
    backgroundColor: '#007AFF',
    marginLeft: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  rentButtonText: {
    color: '#fff',
  },
}); 