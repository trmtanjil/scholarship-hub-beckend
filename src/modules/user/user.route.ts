import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserControllers } from './user.controller';
import { UserValidation } from './userValidation';
import auth from '../../middlewares/auth';
import { Role } from '../../generated/prisma/enums';

const router = Router();

router.get(
  '/',
  auth(Role.Admin),
  UserControllers.getAllUsers
);

router.get(
  '/my-profile',
  auth(Role.Admin, Role.Moderator, Role.User),
  UserControllers.getMyProfile
);

router.get(
  '/:id',
  auth('Admin'),
  UserControllers.getSingleUser
);

router.patch(
  '/update-profile',
  auth('Admin', 'Moderator', 'User'),
  validateRequest(UserValidation.updateUserValidationSchema),
  UserControllers.updateProfile
);

router.patch(
  '/:id/role',
  auth('Admin'),
  validateRequest(UserValidation.changeUserRoleValidationSchema),
  UserControllers.changeUserRole
);

router.delete(
  '/:id',
  auth('Admin'),
  UserControllers.deleteUser
);

export const UserRoutes = router;
