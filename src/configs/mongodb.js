import mongoose from "mongoose";

const conectDB = async () => {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("MongoDB Connected");
};

export default conectDB;
