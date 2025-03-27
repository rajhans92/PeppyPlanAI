import mongoose from "mongoose";

class DBConnect{

    private readonly connectionStr: string;

    constructor(){
        this.connectionStr = process.env.MONGO_URI || "mongodb://0.0.0.0:27017/peppyplanai";
        this.connect();
    }

    private async connect() {
        try {
          console.log("Database connection initiate");
          await mongoose.connect(this.connectionStr);
          console.log("Database connected successfully");
        } catch (error) {
          console.error("Database connection failed ");
        }
      }
}

export default DBConnect;