import { z } from 'zod';

// Validation schema for user registration
const registerUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

// Validation schema for user login
const loginUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

// Export the validation schemas
export const UserValidations = {
  registerUserSchema,
  loginUserSchema,
};
