import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../shared/catchAsync';
import { sendResponse } from '../../shared/sendResponse';
import { UserServices } from './user.service';

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getAllUsersFromDB();
  sendResponse(res, {
    httpStatusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const result = await UserServices.getSingleUserFromDB(id);
  sendResponse(res, {
    httpStatusCode: httpStatus.OK,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  });
});

const getMyProfile = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.user as { email: string; role: string };
  const result = await UserServices.getMyProfileFromDB(email);
  sendResponse(res, {
    httpStatusCode: httpStatus.OK,
    success: true,
    message: 'Profile retrieved successfully',
    data: result,
  });
});

const updateProfile = catchAsync(async (req: Request, res: Response) => {
  const { email } = req.user as { email: string; role: string };
  const result = await UserServices.updateProfileInDB(email, req.body);
  sendResponse(res, {
    httpStatusCode: httpStatus.OK,
    success: true,
    message: 'Profile updated successfully',
    data: result,
  });
});

const changeUserRole = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const { role } = req.body;
  const result = await UserServices.updateUserRoleInDB(id, role);
  sendResponse(res, {
    httpStatusCode: httpStatus.OK,
    success: true,
    message: 'User role updated successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params as { id: string };
  const result = await UserServices.deleteUserFromDB(id);
  sendResponse(res, {
    httpStatusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully',
    data: result,
  });
});

export const UserControllers = {
  getAllUsers,
  getSingleUser,
  getMyProfile,
  updateProfile,
  changeUserRole,
  deleteUser,
};
