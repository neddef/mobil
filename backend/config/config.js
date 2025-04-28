module.exports = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || 'mongodb://localhost:27017/otocarDB',
  JWT_SECRET: process.env.JWT_SECRET || 'otocars_secret_key_please_change_in_production'
}; 