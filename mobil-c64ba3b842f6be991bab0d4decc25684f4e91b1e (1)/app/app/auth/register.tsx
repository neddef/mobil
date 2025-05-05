import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator, ScrollView, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from '../context/AuthContext';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register } = useAuth();

  // Telefon numarasını formatlama fonksiyonu
  const formatPhoneNumber = (phoneNumber: string) => {
    // Sadece rakamları al
    const numericValue = phoneNumber.replace(/\D/g, '');
    
    // Eğer numara 10 haneden uzunsa başındaki 0'ı kaldır
    let formattedNumber = numericValue;
    if (numericValue.startsWith('0') && numericValue.length > 1) {
      formattedNumber = numericValue.substring(1);
    }
    
    // Formatlı telefon numarasını oluştur: +90 ile başlat
    if (formattedNumber) {
      return `+90${formattedNumber}`;
    }
    return '';
  };

  const handleRegister = async () => {
    // Basic validation
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Hata', 'Lütfen tüm zorunlu alanları doldurun');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Hata', 'Şifreler eşleşmiyor');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Hata', 'Şifre en az 6 karakter olmalıdır');
      return;
    }

    try {
      setIsSubmitting(true);
      // Telefon numarasını formatlayarak gönder
      const formattedPhone = phone ? formatPhoneNumber(phone) : '';
      
      await register({
        name,
        email,
        password,
        phone: formattedPhone,
      });
      router.replace('/(tabs)');
    } catch (error: any) {
      console.error('Registration error:', error);
      let errorMessage = 'Kayıt işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.';
      
      // Updated error handling for new backend format
      if (error.success === false) {
        errorMessage = error.message || (error.error || '');
      } else if (error.response && error.response.data) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      Alert.alert('Kayıt Başarısız', errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
      </View>
      
      <View style={styles.titleContainer}>
        <Image 
          source={require('../../assets/images/icon.png')} 
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Hesap Oluştur</Text>
        <Text style={styles.subtitle}>Araç dünyasına katılmak için kaydolun</Text>
      </View>
      
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Ionicons name="person-outline" size={22} color="#999" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Ad Soyad"
            value={name}
            onChangeText={setName}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={22} color="#999" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="E-posta Adresi"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Ionicons name="call-outline" size={22} color="#999" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Telefon Numarası (örn: 5xx xxx xx xx)"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
        </View>
        <Text style={styles.hint}>Telefon numarası +90 ile başlayacak şekilde formatlanacaktır</Text>
        
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={22} color="#999" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Şifre"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={22} color="#999" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Şifre Tekrar"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
        
        <TouchableOpacity 
          style={styles.registerButton}
          onPress={handleRegister}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.registerButtonText}>Kayıt Ol</Text>
          )}
        </TouchableOpacity>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>Zaten bir hesabınız var mı?</Text>
        <TouchableOpacity onPress={() => router.push('/auth/login')}>
          <Text style={styles.loginLink}>Giriş Yap</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    marginTop: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleContainer: {
    marginTop: 30,
    marginBottom: 40,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
  },
  formContainer: {
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 16,
    paddingHorizontal: 15,
    paddingVertical: 4,
  },
  hint: {
    fontSize: 12,
    color: '#666',
    marginTop: -12,
    marginBottom: 16,
    marginLeft: 5,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#333',
  },
  registerButton: {
    backgroundColor: '#007bff',
    borderRadius: 10,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#666',
    fontSize: 15,
  },
  loginLink: {
    color: '#007bff',
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 5,
  },
}); 