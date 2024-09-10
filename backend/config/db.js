import mongoose from "mongoose";
import { ENV_VARS } from "../config/envVars.js";

export const connectDB = async () => {
    
    
  try {
    const conn = await mongoose
      .connect(ENV_VARS.MONGO_URI)
      
        console.log(`Connected to MongoDB ${conn.connection.host}`);
     
  } catch (error){
    console.error("Error Connection to mongo db :" + error.message);
    process.exit(1);
  }
};
