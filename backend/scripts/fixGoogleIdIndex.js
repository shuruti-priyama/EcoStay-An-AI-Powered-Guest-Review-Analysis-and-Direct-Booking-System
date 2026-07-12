require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

const MONGO_URI = process.env.MONGO_URI || process.env.DATABASE_URL;

(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to database.');

    const result = await User.updateMany(
      { googleId: null },
      { $unset: { googleId: '' } }
    );
    console.log(`Removed a stale googleId:null from ${result.modifiedCount} user(s).`);

    const collection = mongoose.connection.collection('users');
    const indexes = await collection.indexes();
    const badIndex = indexes.find((i) => i.key && i.key.googleId === 1);

    if (badIndex) {
      await collection.dropIndex(badIndex.name);
      console.log(`Dropped old index "${badIndex.name}".`);
    }

    // Recreate it correctly now that no document has an explicit null.
    await collection.createIndex({ googleId: 1 }, { unique: true, sparse: true });
    console.log('Recreated googleId as a proper sparse unique index.');

    console.log('Done - registration should work normally now.');
    process.exit(0);
  } catch (err) {
    console.error('Migration failed:', err.message);
    process.exit(1);
  }
})();