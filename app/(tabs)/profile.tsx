import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView, Switch } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';

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
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profil</Text>
        <TouchableOpacity>
          <Ionicons name="settings-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <Image source={{ uri: USER_PROFILE.image }} style={styles.profileImage} />
          <Text style={styles.profileName}>{USER_PROFILE.name}</Text>
          <Text style={styles.profileMemberSince}>Üye Olma: {USER_PROFILE.memberSince}</Text>
          
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Profili Düzenle</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.activitiesContainer}>
          {USER_ACTIVITIES.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Hesap</Text>
          
          <MenuItem 
            icon="person-outline" 
            title="Kişisel Bilgiler" 
            onPress={() => {}} 
          />
          
          <MenuItem 
            icon="card-outline" 
            title="Ödeme Yöntemleri" 
            onPress={() => {}} 
          />
          
          <MenuItem 
            icon="location-outline" 
            title="Adreslerim" 
            onPress={() => {}} 
          />
          
          <MenuItem 
            icon="car-outline" 
            title="Araçlarım" 
            onPress={() => {}} 
          />
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Bildirimler</Text>
          
          <MenuItem 
            icon="notifications-outline" 
            title="Bildirim İzinleri" 
            isToggle={true}
            value={true}
            onPress={() => {}} 
          />
          
          <MenuItem 
            icon="mail-outline" 
            title="E-posta Bildirimleri" 
            isToggle={true}
            value={true}
            onPress={() => {}} 
          />
        </View>
        
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Diğer</Text>
          
          <MenuItem 
            icon="help-circle-outline" 
            title="Yardım & Destek" 
            onPress={() => {}} 
          />
          
          <MenuItem 
            icon="information-circle-outline" 
            title="Hakkında" 
            onPress={() => {}} 
          />
          
          <MenuItem 
            icon="shield-checkmark-outline" 
            title="Gizlilik Politikası" 
            onPress={() => {}} 
          />
          
          <MenuItem 
            icon="document-text-outline" 
            title="Kullanım Koşulları" 
            onPress={() => {}} 
          />
          
          <TouchableOpacity style={styles.logoutButton}>
            <Ionicons name="log-out-outline" size={20} color="#ff4757" />
            <Text style={styles.logoutText}>Çıkış Yap</Text>
          </TouchableOpacity>
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 20,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 12,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  profileMemberSince: {
    fontSize: 14,
    color: '#777',
    marginBottom: 15,
  },
  editProfileButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#007bff',
  },
  editProfileText: {
    fontSize: 14,
    color: '#007bff',
    fontWeight: '500',
  },
  activitiesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  activityCard: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    marginHorizontal: 5,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  activityIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 123, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityCount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  activityLabel: {
    fontSize: 12,
    color: '#777',
  },
  sectionContainer: {
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
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 12,
  },
  menuTitle: {
    fontSize: 16,
    color: '#333',
  },
  menuItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuBadge: {
    backgroundColor: '#ff4757',
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  menuBadgeText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    marginTop: 5,
    marginBottom: 10,
  },
  logoutText: {
    fontSize: 16,
    color: '#ff4757',
    fontWeight: '500',
    marginLeft: 6,
  },
}); 