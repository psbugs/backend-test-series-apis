const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URI || 'mongodb+srv://sunharep2240:Interview2025@cluster0.mpkhene.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
