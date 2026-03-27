import { Request, Response } from "express";
import { userService } from "./user.service";
 
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsers();

    res.status(200).json({
      success: true,
      message: "All users fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message || "Failed to fetch users",
    });
  }
};


const updateUserStatus = async(req:Request, res:Response)=>{
try{
    const { id } = req.params;
       const status  = req.body;
     const result = await userService.updateUserStatus(
      id as string,
      status,
      
      )

  res.status(201).json(result)

      
}catch (error: any) {
    res.status(400).json({
      success: false,
      message: error || "Failed user status update",
    });
  }
}

 


export const userController ={
    getAllUsers,
    updateUserStatus
}