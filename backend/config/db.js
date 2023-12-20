import { connect } from "mongoose";

const connectDB = async () => {
  try {
    const connected = await connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected : ${connected.connection.host}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;
