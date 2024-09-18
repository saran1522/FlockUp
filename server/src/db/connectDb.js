import mongoose from "mongoose";

async function connectDb() {
  try {
    const dbInstance = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected, host: ${dbInstance.connection.host}`);
  } catch (error) {
    console.log("MongoDB connection failed ", error);
    process.exit(1);
  }
}

export default connectDb;
