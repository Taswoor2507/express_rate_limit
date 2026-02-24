import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import { Product } from "./models/product.model.js";
/* ============================
   MongoDB Connection
============================ */
const MONGO_URI = "mongodb://127.0.0.1:27017/interns-db";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

/* ============================
   Product Schema + Model
============================ */


/* ============================
   Categories (20)
============================ */
const CATEGORIES = [
  "Electronics",
  "Mobiles",
  "Laptops",
  "Home Appliances",
  "Kitchen",
  "Furniture",
  "Fashion",
  "Men Clothing",
  "Women Clothing",
  "Shoes",
  "Watches",
  "Beauty",
  "Health",
  "Sports",
  "Fitness",
  "Books",
  "Gaming",
  "Toys",
  "Automobile",
  "Groceries",
];

/* ============================
   Date Range (2016 → 2026)
============================ */
const START_DATE = new Date("2016-01-01");
const END_DATE = new Date("2026-12-31");

/* ============================
   Generate Fake Products
============================ */
const generateProducts = (count = 100000) => {
  const products = [];

  for (let i = 0; i < count; i++) {
    const createdAt = faker.date.between({
      from: START_DATE,
      to: END_DATE,
    });

    const updatedAt = faker.date.between({
      from: createdAt,
      to: END_DATE,
    });

    products.push({
      name: faker.commerce.productName(),
      title: faker.commerce.productName(),
      description: faker.lorem.paragraphs(2),
      rating: faker.number.float({ min: 1, max: 5, precision: 0.1 }),
      price: faker.number.int({ min: 100, max: 5000 }),
      category: faker.helpers.arrayElement(CATEGORIES),
      createdAt,
      updatedAt,
    });
  }

  return products;
};

/* ============================
   Seed Database
============================ */
const seedProducts = async () => {
  try {
    await connectDB();

    await Product.deleteMany();
    console.log("Existing products deleted");

    const products = generateProducts(100000);
    await Product.insertMany(products);

    console.log("Products seeded successfully (2016–2026)");
    process.exit();
  } catch (error) {
    console.error("Seeding error:", error.message);
    process.exit(1);
  }
};

/* ============================
   Run Seeder
============================ */
seedProducts();