<<<<<<< HEAD
# OtoCar API

Bu proje, otomobil kiralama ve yedek parça satış uygulaması için RESTful API sunmaktadır.

## Özellikler

- Kullanıcı yönetimi (kayıt, giriş, şifre sıfırlama)
- Araba katalog yönetimi
- Yedek parça katalog yönetimi
- Araç kiralama sistemi
- JWT kimlik doğrulama
- Rol tabanlı yetkilendirme
- Swagger API dokümantasyonu
- Dosya yükleme

## Kurulum

### Gereksinimler

- Node.js (>=14.x)
- MongoDB (>=4.4)

### Adımlar

1. Projeyi klonlayın:
   ```
   git clone <repo-url>
   cd otocar-api
   ```

2. Bağımlılıkları yükleyin:
   ```
   npm install
   ```

3. `.env` dosyasını oluşturun:
   ```
   PORT=5000
   NODE_ENV=development
   MONGO_URI=mongodb://localhost:27017/otocarDB
   JWT_SECRET=otocars_secret_key_2024
   JWT_EXPIRE=30d
   UPLOAD_PATH=./uploads
   ```

4. MongoDB'nin çalıştığından emin olun.

5. Sunucuyu başlatın:
   ```
   npm run dev
   ```

## API Kullanımı

### Swagger Dokümantasyonu

API dokümantasyonuna tarayıcıdan erişebilirsiniz: `http://localhost:5000/api-docs`

### Ana Endpointler

- `POST /api/auth/register` - Yeni kullanıcı kaydı
- `POST /api/auth/login` - Kullanıcı girişi
- `GET /api/cars` - Tüm arabaları listele
- `GET /api/parts` - Tüm yedek parçaları listele
- `POST /api/rentals` - Yeni kiralama kaydı oluştur

## Geliştirme

### Komutlar

- `npm run dev` - Geliştirme modunda başlat
- `npm run dev:alt` - Alternatif port (5001) ile başlat
- `npm start` - Prodüksiyon modunda başlat
- `npm run seed` - Örnek verileri yükle

### Klasör Yapısı

- `config/` - Yapılandırma dosyaları
- `controllers/` - Controller fonksiyonları
- `middleware/` - Express middleware'leri
- `models/` - Mongoose model şemaları
- `routes/` - API rotaları
- `utils/` - Yardımcı fonksiyonlar
- `uploads/` - Yüklenen dosyaların saklandığı klasör

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. 
=======
# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
>>>>>>> 14673fe7c6e5f58556f1a26499069b2844a765c3
