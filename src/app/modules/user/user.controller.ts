import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';
import { UserServices } from './user.service';

// Controller for user registration
const registerUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await UserServices.registerUser(req.body);
  res.status(httpStatus.CREATED).json({
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    data: result,
  });
});

// Controller for user login
const loginUser: RequestHandler = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const result = await UserServices.loginUser(email, password);
  res.status(httpStatus.OK).json({
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    data: result,
  });
});

// // Controller for fetching user profile
// const getUserProfile: RequestHandler = catchAsync(async (req, res) => {
//   const userId = req.user.id; // Extract userId from the authenticated token
//   const result = await UserServices.getUserProfile(userId);
//   res.status(httpStatus.OK).json({
//     success: true,
//     statusCode: httpStatus.OK,
//     message: 'User profile retrieved successfully',
//     data: result,
//   });
// });

// Exporting user controllers
export const UserControllers = {
  registerUser,
  loginUser,
  //   getUserProfile,
};
