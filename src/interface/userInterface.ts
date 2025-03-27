import mongoose from "mongoose";


interface User extends mongoose.Document {
  id: number;
  name: string;
  email: string;
  password: string;
}

export default User;