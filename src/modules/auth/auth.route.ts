import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './authValidation';
import { AuthController } from './auth.controller';

const router = express.Router();

router.post(
    '/register',
    validateRequest(AuthValidation.registerValidationSchema),
    AuthController.register
);

router.post(
    '/login',
    validateRequest(AuthValidation.loginValidationSchema),
    AuthController.login
);

router.post(
    '/refresh-token',
    validateRequest(AuthValidation.refreshTokenValidationSchema),
    AuthController.refreshToken
);

router.post(
    '/google-login',
    validateRequest(AuthValidation.googleLoginValidationSchema),
    AuthController.googleLogin
);

export const AuthRoutes = router;
