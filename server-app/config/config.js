module.exports = {
  port: process.env.PORT || 3000,
  cors: {
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true
  },
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/fashion_ecommerce',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  }
};