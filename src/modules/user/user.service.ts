import { prisma } from "../../lib/prisma";
import { UserRole } from "../../middalewared/auth";

const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true,
     },
    orderBy: {
      createdAt: 'desc',
    },
  });
  return users;
};

const updateUserStatus=async (
    userId:string, 
    payload: UserRole


    )=>{
    const result = await prisma.user.update({
        where:{
            id:userId
        },
        data:payload
    })
    return result
}
 
export const userService ={
    getAllUsers,
    updateUserStatus
}