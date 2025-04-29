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