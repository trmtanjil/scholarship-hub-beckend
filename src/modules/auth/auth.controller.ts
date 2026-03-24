import { Request, Response } from 'express';
import { catchAsync } from '../../shared/catchAsync';
import { sendResponse } from '../../shared/sendResponse';
import httpStatus from 'http-status';
import { AuthService } from './auth.services';

const register = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.register(req.body);

    sendResponse(res, {
        httpStatusCode: httpStatus.CREATED,
        success: true,
        message: 'User registered successfully!',
        data: result,
    });
});

const login = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.login(req.body);

    res.cookie('refreshToken', result.refreshToken, {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
    });

    sendResponse(res, {
        httpStatusCode: httpStatus.OK,
        success: true,
        message: 'User logged in successfully!',
        data: {
            accessToken: result.accessToken,
        },
    });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
    const { refreshToken } = req.cookies;
    const result = await AuthService.refreshToken(refreshToken);

    sendResponse(res, {
        httpStatusCode: httpStatus.OK,
        success: true,
        message: 'Access token generated successfully!',
        data: result,
    });
});

const googleLogin = catchAsync(async (req: Request, res: Response) => {
    const result = await AuthService.googleLogin(req.body);

    res.cookie('refreshToken', result.refreshToken, {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
    });

    sendResponse(res, {
        httpStatusCode: httpStatus.OK,
        success: true,
        message: 'User logged in with Google successfully!',
        data: {
            accessToken: result.accessToken,
        },
    });
});

export const AuthController = {
    register,
    login,
    refreshToken,
    googleLogin,
};
