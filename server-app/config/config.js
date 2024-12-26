module.exports = {
  port: process.env.PORT || 3000,
  cors: {
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true
  }
};