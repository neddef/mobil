import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
  onReset: () => void;
  initialFilters: any;
}

export const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  onApply,
  onReset,
  initialFilters,
}) => {
  const [filters, setFilters] = useState(initialFilters);

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  const handleReset = () => {
    setFilters({});
    onReset();
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
            <Text style={styles.title}>Filtreler</Text>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.closeButton}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.filterContainer}>
            {/* Fiyat Aralığı */}
            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Fiyat Aralığı</Text>
              <View style={styles.priceInputs}>
                <TextInput
                  style={styles.input}
                  placeholder="Min Fiyat"
                  keyboardType="numeric"
                  value={filters.priceMin}
                  onChangeText={(text) =>
                    setFilters({ ...filters, priceMin: text })
                  }
                />
                <TextInput
                  style={styles.input}
                  placeholder="Max Fiyat"
                  keyboardType="numeric"
                  value={filters.priceMax}
                  onChangeText={(text) =>
                    setFilters({ ...filters, priceMax: text })
                  }
                />
              </View>
            </View>

            {/* Marka */}
            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Marka</Text>
              <TextInput
                style={styles.input}
                placeholder="Marka Ara"
                value={filters.brand}
                onChangeText={(text) => setFilters({ ...filters, brand: text })}
              />
            </View>

            {/* Model */}
            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Model</Text>
              <TextInput
                style={styles.input}
                placeholder="Model Ara"
                value={filters.model}
                onChangeText={(text) => setFilters({ ...filters, model: text })}
              />
            </View>

            {/* Yıl */}
            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Yıl</Text>
              <TextInput
                style={styles.input}
                placeholder="Yıl"
                keyboardType="numeric"
                value={filters.year}
                onChangeText={(text) => setFilters({ ...filters, year: text })}
              />
            </View>

            {/* Durum */}
            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Durum</Text>
              <TextInput
                style={styles.input}
                placeholder="Durum"
                value={filters.condition}
                onChangeText={(text) =>
                  setFilters({ ...filters, condition: text })
                }
              />
            </View>

            {/* Kategori */}
            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Kategori</Text>
              <TextInput
                style={styles.input}
                placeholder="Kategori"
                value={filters.category}
                onChangeText={(text) =>
                  setFilters({ ...filters, category: text })
                }
              />
            </View>

            {/* Konum */}
            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Konum</Text>
              <TextInput
                style={styles.input}
                placeholder="Konum"
                value={filters.location}
                onChangeText={(text) =>
                  setFilters({ ...filters, location: text })
                }
              />
            </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.resetButton]}
              onPress={handleReset}
            >
              <Text style={styles.buttonText}>Sıfırla</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.applyButton]}
              onPress={handleApply}
            >
              <Text style={[styles.buttonText, styles.applyButtonText]}>
                Uygula
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
    height: '80%',
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
  closeButton: {
    fontSize: 24,
    color: '#666',
  },
  filterContainer: {
    flex: 1,
    padding: 16,
  },
  filterSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  priceInputs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    flex: 1,
    marginRight: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: '#f8f8f8',
    marginRight: 8,
  },
  applyButton: {
    backgroundColor: '#007AFF',
    marginLeft: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  applyButtonText: {
    color: '#fff',
  },
}); 