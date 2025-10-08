import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("MongoDB connected successfully");
  });

  const defaultUri = "mongodb://127.0.0.1:27017/sumit";
  const mongoUri = process.env.MONGODB_URI ? `${process.env.MONGODB_URI}/sumit` : defaultUri;
  await mongoose.connect(mongoUri);
};

export default connectDB;
