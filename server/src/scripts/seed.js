import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDatabase } from '../config/db.js';
import { User } from '../models/User.js';
import { Product } from '../models/Product.js';

const sampleProducts = [
  {
    title: 'Engineering Mathematics Textbook',
    description: 'Third semester syllabus, light pencil notes. Good for quick revision.',
    price: 350,
    category: 'Books',
    condition: 'Good',
    imageUrl: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
  },
  {
    title: 'USB-C Laptop Charger 65W',
    description: 'Works with most modern laptops. Selling because I upgraded.',
    price: 800,
    category: 'Electronics',
    condition: 'Like New',
    imageUrl: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400',
  },
  {
    title: 'Study Desk Lamp',
    description: 'Adjustable arm, warm white LED. Perfect for hostel desk.',
    price: 450,
    category: 'Furniture',
    condition: 'Good',
    imageUrl: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400',
  },
];

async function seed() {
  await connectDatabase();

  await Product.deleteMany({});
  await User.deleteMany({ email: 'demo.student@campusmart.test' });

  const demoUser = await User.create({
    name: 'Demo Student',
    email: 'demo.student@campusmart.test',
    password: 'demo123',
    college: 'Sample City College',
  });

  for (const item of sampleProducts) {
    await Product.create({
      ...item,
      seller: demoUser._id,
      contactEmail: demoUser.email,
    });
  }

  console.log('Seed complete. Demo login: demo.student@campusmart.test / demo123');
  await mongoose.connection.close();
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
