import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { prisma } from '../../lib/prisma';
import config from '../../config';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';

const register = async (payload: any) => {
    const { name, email, password, role, image } = payload;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        throw new AppError(httpStatus.CONFLICT, 'User already exists!');
    }

    const hashedPassword = await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));

    const result = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role: role || 'User',
            image,
        },
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            image: true,
            createdAt: true,
            updatedAt: true,
        }
    });

    return result;
};

const login = async (payload: any) => {
    const user = await prisma.user.findUnique({
        where: { email: payload.email },
    });

    if (!user || !user.password) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(payload.password, user.password);
    if (!isPasswordMatched) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid email or password');
    }

    const jwtPayload = { id: user.id, email: user.email, role: user.role };

    const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: config.jwt_access_expires_in as any });

    const refreshToken = jwt.sign(jwtPayload, config.jwt_refresh_secret as string, { expiresIn: config.jwt_refresh_expires_in as any });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await prisma.refreshToken.create({
        data: {
            userId: user.id,
            token: refreshToken,
            expiresAt: expiresAt,
        }
    });

    return { accessToken, refreshToken };
};

const refreshToken = async (token: string) => {
    let decoded;
    try {
        decoded = jwt.verify(token, config.jwt_refresh_secret as string) as any;
    } catch (err) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Invalid Refresh Token');
    }

    const storedToken = await prisma.refreshToken.findUnique({
        where: { token },
    });

    if (!storedToken) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Refresh Token not found or revoked');
    }

    if (new Date() > storedToken.expiresAt) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'Refresh Token expired');
    }

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'User not found');
    }

    const jwtPayload = { id: user.id, email: user.email, role: user.role };
    const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: config.jwt_access_expires_in as any });

    return { accessToken };
};

const googleLogin = async (payload: any) => {
    const { email, name, googleId, image } = payload;

    let user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
        user = await prisma.user.create({
            data: {
                email,
                name: name || '',
                googleId,
                image,
            }
        });
    }

    const jwtPayload = { id: user.id, email: user.email, role: user.role };

    const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, { expiresIn: config.jwt_access_expires_in as any });
    const refreshToken = jwt.sign(jwtPayload, config.jwt_refresh_secret as string, { expiresIn: config.jwt_refresh_expires_in as any });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);

    await prisma.refreshToken.create({
        data: {
            userId: user.id,
            token: refreshToken,
            expiresAt: expiresAt,
        }
    });

    return { accessToken, refreshToken };
};

export const AuthService = {
    register,
    login,
    refreshToken,
    googleLogin,
};
