import User from './user.model';
import { TUser, TLoginResponse } from './user.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config';

// Register a new user
const registerUser = async (payload: TUser): Promise<TLoginResponse> => {
  const { email, password, name } = payload;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists with this email');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create a new user
  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  // Save the new user in the database
  await newUser.save();

  // Generate JWT access token
  const token = jwt.sign(
    { id: newUser._id, email: newUser.email }, // payload for the token
    config.jwt_acess_secret as string, // secret key
    {
      expiresIn: '1h', // token expiration time
    },
  );

  return {
    token, // Return the generated token
    user: newUser, // Return the newly registered user data
  };
};
// Login user
const loginUser = async (
  email: string,
  password: string,
): Promise<TLoginResponse> => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  // Compare password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  // Generate JWT token
  const token = jwt.sign(
    { id: user._id, email: user.email },
    config.jwt_secret as string,
    {
      expiresIn: '1h',
    },
  );

  return { token, user };
};

// Get user profile by ID
const getUserProfile = async (userId: string) => {
  const user = await User.findById(userId).select('-password'); // Exclude password from response
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

// Export all user services
export const UserServices = {
  registerUser,
  loginUser,
  getUserProfile,
};
