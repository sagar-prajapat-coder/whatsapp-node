import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGO_URL;

  if (!uri) {
    console.error("❌ MONGO_URL is undefined. Check your environment variables.");
    process.exit(1);
  }

  try {
    console.log("🔍 Connecting to MongoDB URI:", uri); // TEMPORARY debug
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ Database Connection Error:", error);
    process.exit(1);
  }
};

export default connectDB;
