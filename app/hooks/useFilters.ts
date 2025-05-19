import { useState, useCallback } from 'react';

interface Filters {
  priceMin?: string;
  priceMax?: string;
  brand?: string;
  model?: string;
  year?: string;
  condition?: string;
  category?: string;
  location?: string;
}

export const useFilters = () => {
  const [filters, setFilters] = useState<Filters>({});
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const showFilterModal = useCallback(() => {
    setIsFilterModalVisible(true);
  }, []);

  const hideFilterModal = useCallback(() => {
    setIsFilterModalVisible(false);
  }, []);

  const applyFilters = useCallback((newFilters: Filters) => {
    setFilters(newFilters);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({});
  }, []);

  const filterItems = useCallback((items: any[]) => {
    return items.filter((item) => {
      // Fiyat filtresi
      if (filters.priceMin && item.price < Number(filters.priceMin)) return false;
      if (filters.priceMax && item.price > Number(filters.priceMax)) return false;

      // Marka filtresi
      if (filters.brand && !item.brand?.toLowerCase().includes(filters.brand.toLowerCase())) {
        return false;
      }

      // Model filtresi
      if (filters.model && !item.model?.toLowerCase().includes(filters.model.toLowerCase())) {
        return false;
      }

      // Yıl filtresi
      if (filters.year && item.year !== filters.year) return false;

      // Durum filtresi
      if (filters.condition && !item.condition?.toLowerCase().includes(filters.condition.toLowerCase())) {
        return false;
      }

      // Kategori filtresi
      if (filters.category && !item.category?.toLowerCase().includes(filters.category.toLowerCase())) {
        return false;
      }

      // Konum filtresi
      if (filters.location && !item.location?.toLowerCase().includes(filters.location.toLowerCase())) {
        return false;
      }

      return true;
    });
  }, [filters]);

  return {
    filters,
    isFilterModalVisible,
    showFilterModal,
    hideFilterModal,
    applyFilters,
    resetFilters,
    filterItems,
  };
}; 