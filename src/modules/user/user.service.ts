import { prisma } from '../../lib/prisma';
import { TUpdateUser } from './user.interface';
import { Role } from '../../generated/prisma/client';

const getAllUsersFromDB = async () => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};

const getSingleUserFromDB = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};

const getMyProfileFromDB = async (email: string) => {
  const result = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      image: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};

const updateProfileInDB = async (email: string, payload: TUpdateUser) => {
  const result = await prisma.user.update({
    where: { email },
    data: payload,
  });
  return result;
};

const updateUserRoleInDB = async (id: string, role: Role) => {
  const result = await prisma.user.update({
    where: { id },
    data: { role },
  });
  return result;
};

const deleteUserFromDB = async (id: string) => {
  const result = await prisma.user.delete({
    where: { id },
  });
  return result;
};

export const UserServices = {
  getAllUsersFromDB,
  getSingleUserFromDB,
  getMyProfileFromDB,
  updateProfileInDB,
  updateUserRoleInDB,
  deleteUserFromDB,
};
