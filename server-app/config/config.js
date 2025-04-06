module.exports = {
  port: process.env.PORT || 3001,
  cors: {
    origin: 'http://localhost:5173', // Update with your frontend URL
    credentials: true
  },
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb+srv://jpsharma9456:fe594d71-2cef-496a-9b78-5a091bf2c418@quickyy.cg7ct.mongodb.net/?retryWrites=true&w=majority&appName=quickyy',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  secret: process.env.SECRET || 'your-secret-key' // For JWT, replace with a strong secret 
};
