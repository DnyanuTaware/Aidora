import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://dnyanu:taware@cluster0.laml8.mongodb.net/",
      {
        dbName: "Aidora",
      }
    );
    console.log("mongoDB Connected");
  } catch (error) {
    console.log(error);
  }
};
