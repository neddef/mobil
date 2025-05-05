import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView, Switch, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useAuth } from '../context/AuthContext';
import { router } from 'expo-router';

// Örnek kullanıcı profil verisi
const USER_PROFILE = {
  name: 'Ahmet Yılmaz',
  email: 'ahmet.yilmaz@example.com',
  phoneNumber: '+90 555 123 4567',
  image: 'https://via.placeholder.com/150',
  memberSince: 'Mart 2023',
};

// Örnek kullanıcı aktiviteleri
const USER_ACTIVITIES = [
  { id: '1', type: 'favorite', count: 12, label: 'Favoriler' },
  { id: '2', type: 'history', count: 5, label: 'Geçmiş İlanlar' },
  { id: '3', type: 'cart', count: 3, label: 'Sepetim' },
];

// Menü öğesi bileşeni
const MenuItem = ({ icon, title, onPress, value, isToggle = false, showBadge = false, badgeValue = 0 }) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        <Ionicons name={icon} size={24} color="#555" style={styles.menuIcon} />
        <Text style={styles.menuTitle}>{title}</Text>
      </View>
      {isToggle ? (
        <Switch value={value} />
      ) : (
        <View style={styles.menuItemRight}>
          {showBadge && badgeValue > 0 && (
            <View style={styles.menuBadge}>
              <Text style={styles.menuBadgeText}>{badgeValue}</Text>
            </View>
          )}
          <Ionicons name="chevron-forward" size={20} color="#999" />
        </View>
      )}
    </TouchableOpacity>
  );
};

// Aktivite kart bileşeni
const ActivityCard = ({ activity }) => {
  const getIcon = (type) => {
    switch (type) {
      case 'favorite':
        return 'heart';
      case 'history':
        return 'time';
      case 'cart':
        return 'cart';
      default:
        return 'document';
    }
  };

  return (
    <TouchableOpacity style={styles.activityCard}>
      <View style={styles.activityIconContainer}>
        <Ionicons name={getIcon(activity.type)} size={22} color="#007bff" />
      </View>
      <Text style={styles.activityCount}>{activity.count}</Text>
      <Text style={styles.activityLabel}>{activity.label}</Text>
    </TouchableOpacity>
  );
};

export default function ProfileScreen() {
  const { user, logout, isAuthenticated } = useAuth();

  // Otomatik yönlendirmeyi kaldırdık
  console.log("Profil sayfası: Kimlik durumu =", isAuthenticated ? "Giriş yapılmış" : "Giriş yapılmamış");

  const handleLogout = async () => {
    await logout();
    router.replace('/auth/login'); // Bu kullanıcı istediğinde çalışacak
  };

  // Kullanıcı giriş yapmamışsa, giriş yapmaya davet eden bir ekran göster
  if (!user) {
    return (
      <View style={styles.container}>
        <View style={styles.notLoggedInContainer}>
          <Ionicons name="person-circle-outline" size={80} color="#ccc" />
          <Text style={styles.notLoggedInTitle}>Henüz Giriş Yapmadınız</Text>
          <Text style={styles.notLoggedInText}>
            Profilinizi görüntülemek ve tüm özellikleri kullanmak için giriş yapın.
          </Text>
          <TouchableOpacity 
            style={styles.loginButton} 
            onPress={() => router.push('/auth/login')}
          >
            <Text style={styles.loginButtonText}>Giriş Yap</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Test için USER_PROFILE'ı göstereceğiz - normalde user bilgisi kullanılır
  const displayUser = user || USER_PROFILE;

  /*
  if (!user) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }
  */

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profil</Text>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: displayUser.avatar || 'https://via.placeholder.com/150' }} 
              style={styles.avatar} 
            />
            <TouchableOpacity style={styles.editAvatarButton}>
              <Ionicons name="camera" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.userName}>{displayUser.name}</Text>
          <Text style={styles.userEmail}>{displayUser.email}</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>İlanlarım</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Favorilerim</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>0</Text>
              <Text style={styles.statLabel}>Kiralamalarım</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Hesap Bilgileri</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Ionicons name="person-outline" size={22} color="#007bff" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuLabel}>Kişisel Bilgiler</Text>
              <Ionicons name="chevron-forward" size={22} color="#ccc" />
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Ionicons name="car-outline" size={22} color="#007bff" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuLabel}>İlanlarım</Text>
              <Ionicons name="chevron-forward" size={22} color="#ccc" />
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Ionicons name="heart-outline" size={22} color="#007bff" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuLabel}>Favorilerim</Text>
              <Ionicons name="chevron-forward" size={22} color="#ccc" />
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Ionicons name="key-outline" size={22} color="#007bff" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuLabel}>Kiralamalarım</Text>
              <Ionicons name="chevron-forward" size={22} color="#ccc" />
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ayarlar</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Ionicons name="notifications-outline" size={22} color="#007bff" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuLabel}>Bildirimler</Text>
              <Ionicons name="chevron-forward" size={22} color="#ccc" />
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Ionicons name="lock-closed-outline" size={22} color="#007bff" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuLabel}>Güvenlik</Text>
              <Ionicons name="chevron-forward" size={22} color="#ccc" />
            </View>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuIcon}>
              <Ionicons name="help-circle-outline" size={22} color="#007bff" />
            </View>
            <View style={styles.menuContent}>
              <Text style={styles.menuLabel}>Yardım & Destek</Text>
              <Ionicons name="chevron-forward" size={22} color="#ccc" />
            </View>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color="#ff3b30" style={styles.logoutIcon} />
          <Text style={styles.logoutText}>Çıkış Yap</Text>
        </TouchableOpacity>
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
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  avatarContainer: {
    position: 'relative',
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  editAvatarButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#777',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#777',
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#f0f0f0',
  },
  section: {
    backgroundColor: '#fff',
    paddingTop: 15,
    paddingBottom: 5,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIcon: {
    marginRight: 12,
  },
  menuContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuLabel: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    marginTop: 5,
    marginBottom: 10,
  },
  logoutIcon: {
    marginRight: 6,
  },
  logoutText: {
    fontSize: 16,
    color: '#ff3b30',
    fontWeight: '500',
  },
  notLoggedInContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  notLoggedInTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  notLoggedInText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 5,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
}); 