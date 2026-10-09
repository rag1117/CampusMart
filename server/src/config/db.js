import mongoose from 'mongoose';

/**
 * Connects to MongoDB using MONGODB_URI from environment variables.
 * @returns {Promise<void>}
 */
export async function connectDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error('MONGODB_URI is not set in environment variables');
  }

  await mongoose.connect(uri);
  console.log('MongoDB connected');
}
