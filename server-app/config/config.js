module.exports = {
  port: process.env.PORT || 3001,
  cors: {
    origin: 'http://localhost:5173', // Update with your frontend URL
    credentials: true
  },
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb+srv://jpsharma9456:<db_password>@quickyy.cg7ct.mongodb.net/?retryWrites=true&w=majority&appName=quickyy',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
  },
  secret: process.env.SECRET || 'your-secret-key' // For JWT, replace with a strong secret
};
