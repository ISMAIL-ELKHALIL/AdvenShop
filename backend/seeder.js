import {} from "mongoose";
import { config } from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "../backend/config/db.js";

//! This seeder file  is typically used to populate a MongoDB database with initial data for testing or development purposes.
//! It's commonly executed manually or as part of an automated process, like a script in a package.json file or a dedicated seeding script.

config();

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    console.log({ createdUsers: createdUsers });
    const adminUser = createdUsers[0]._id;

    console.log({ adminUser: adminUser });
    const sampleProducts = products.map((product) => {
      return {
        ...product,
        user: adminUser,
      };
    });

    await Product.insertMany(sampleProducts);
    console.log("Data Imported @".green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed !".yellow.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

switch (process.argv[2]) {
  case "-d":
    destroyData();
    break;
  case "-i":
    importData();
    break;
}
