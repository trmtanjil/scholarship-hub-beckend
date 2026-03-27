import auth, { UserRole } from "../../middalewared/auth";
import { userController } from "./user.controller";
 import express  from "express";
const router  = express.Router()
 

// /api/admin/users
router.get(
  "/users", 
  auth(UserRole.ADMIN), // অ্যাডমিন এক্সেস পাবে
  userController.getAllUsers
);

router.patch(
  "/:id", 
  auth(UserRole.ADMIN), // অ্যাডমিন এক্সেস পাবে
  userController.updateUserStatus
);
export const userRouter  = router