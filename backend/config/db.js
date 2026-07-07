const mongoose = require('mongoose');

const getConnectionString = () => process.env.MONGO_URI || process.env.DATABASE_URL;

const connectDB = async () => {
  const uri = getConnectionString();

  if (!uri) {
    console.error(
      'No database connection string found. Set MONGO_URI (or DATABASE_URL) in your .env file. ' +
        'See .env.example for the expected format.'
    );
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 10000, 
    });
    console.log(`MongoDB connected: ${conn.connection.host} (db: ${conn.connection.name})`);
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
    console.error(
      'If you are using MongoDB Atlas, double-check that: (1) the password in your connection ' +
        'string is correct and URL-encoded if it contains special characters, (2) your current IP ' +
        'is whitelisted under Atlas -> Network Access, and (3) the database user has read/write ' +
        'permissions on this cluster.'
    );
    process.exit(1);
  }
};

module.exports = connectDB;