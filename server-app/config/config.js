module.exports = {
  port: process.env.PORT || 3001,
  cors: {
    origin: 'http://localhost:5173', // Update with your frontend URL
    credentials: true
  },
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb+srv://jpsharma9456:SPGYjc5qafGcUPn9@quickyy.cg7ct.mongodb.net/swiftdelivery?retryWrites=true&w=majority&appName=quickyy',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  secret: process.env.SECRET || 'jpharma9456forquickyy' // For JWT, replace with a strong secret
};
