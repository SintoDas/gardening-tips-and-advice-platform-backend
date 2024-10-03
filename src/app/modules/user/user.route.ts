import express from 'express';
import { UserControllers } from './user.controller';
// import validateRequest from '../../middlewares/validateRequests';
import { UserValidations } from './user.validation';
import validateRequest from '../../middlewares/validateRequest';
// import authenticate from '../../middlewares/authenticate';

const router = express.Router();

// User registration route
router.post(
  '/register',
  validateRequest(UserValidations.registerUserSchema), // Validate registration request
  UserControllers.registerUser,
);

// User login route
router.post(
  '/login',
  validateRequest(UserValidations.loginUserSchema), // Validate login request
  UserControllers.loginUser,
);

// User profile route (protected)
// router.get('/profile', authenticate, UserControllers.getUserProfile);

// Export the user routes
export const UserRoutes = router;
