import mongoose, { Schema } from "mongoose";
import User from "../interface/userInterface";


// User Schema
const userSchema = new Schema<User>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: false },  // Not required for OAuth users
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  profilePicture: { type: String, required: false },
  isEmailVerified: { type: Boolean, default: false },
  isOauth: {type: Boolean, default:false},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  lastLogin: { type: Date, required: false }
});

// Pre-save hook to update the `updatedAt` field
userSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

const User = mongoose.model<User>("User", userSchema);
export default User;