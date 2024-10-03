import { Document } from 'mongoose';

// Define the User interface
export interface TUser extends Document {
  name: string;
  email: string;
  password: string;
}

// Define the Login Response interface
export interface TLoginResponse {
  token: string;
  user: TUser;
}
