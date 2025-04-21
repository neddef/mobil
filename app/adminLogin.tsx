import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';

const AdminLoginScreen = () => {
  const [username, setUsername] = useState(''); // Yönetici için e-posta yerine kullanıcı adı olabilir
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleAdminLogin = () => {
    // TODO: Yönetici giriş mantığını buraya ekle
    console.log('Admin Username:', username);
    console.log('Admin Password:', password);
    // Başarılı giriş sonrası yönetici paneline yönlendirme (örnek)
    // router.replace('/admin/dashboard'); 
  };

  // İsteğe bağlı: Kullanıcı girişine geri dönme linki
  const navigateToUserLogin = () => {
    router.replace('/login'); 
  };

  return (
    <View style={styles.container}>
      {/* Farklı bir logo veya ikon kullanabilirsiniz */}
      <Image source={require('../assets/images/icon.png')} style={styles.logo} /> 
      <Text style={styles.title}>Yönetici Girişi</Text>
      
      <TextInput
        style={styles.input}
        placeholder="Kullanıcı Adı" // Veya E-posta
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      
      <TouchableOpacity style={styles.button} onPress={handleAdminLogin}>
        <Text style={styles.buttonText}>Giriş Yap</Text>
      </TouchableOpacity>

      {/* Opsiyonel: Kullanıcı girişine geri dönme linki */}
      {/* <TouchableOpacity onPress={navigateToUserLogin}>
        <Text style={styles.linkText}>Kullanıcı Girişi</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    marginTop: 20,
    color: '#007bff',
    fontSize: 16,
  },
});

export default AdminLoginScreen; 