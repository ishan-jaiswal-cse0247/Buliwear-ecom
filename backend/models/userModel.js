//User model for all of the details about the user

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
    collection: 'users',
  }
);

const User = mongoose.model('Users', userSchema);
export default User;
