import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';
import { catchAsync } from '../shared/catchAsync';
import httpStatus from 'http-status';
import { prisma } from '../lib/prisma';
import { Role } from '../generated/prisma/enums';

const auth = (...requiredRoles: (keyof typeof Role)[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    console.log("token", token)

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
    console.log(role, email)

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    console.log(user)
    console.log('User Role from Token:', role);
    console.log('Required Roles:', requiredRoles);

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
