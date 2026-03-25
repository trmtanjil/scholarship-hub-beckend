import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { catchAsync } from '../shared/catchAsync';
import httpStatus from 'http-status';
import { prisma } from '../lib/prisma';

const auth = (...requiredRoles: string[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;




    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
    }

    const accessToken = token.split(' ')[1] || token;

    let decoded;
    try {
      decoded = jwt.verify(
        accessToken,
        config.jwt_access_secret as string
      ) as JwtPayload;
    } catch (err: any) {
      throw new AppError(httpStatus.UNAUTHORIZED, err.message || 'Unauthorized!');
    }

    const { role, email } = decoded;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is not found!');
    }

    if (requiredRoles.length && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.FORBIDDEN, 'You are not authorized!');
    }

    req.user = decoded;
    next();
  });
};

export default auth;
