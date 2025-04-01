import mongoose, { Document } from 'mongoose';

// Interface for the User document
interface User extends Document {
    email: string;
    password?: string;  // Optional because OAuth users will not have a password
    firstName: string;
    lastName: string;
    profilePicture?: string;  // Optional, especially for OAuth users like Google
    isEmailVerified: boolean;
    isOauth: boolean,
    createdAt: Date;
    updatedAt: Date;
    lastLogin?: Date;  // Optional for tracking last login
}

export default User;