import { NextFunction, Request, Response } from "express";
import { auth as betterAuth } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";

export enum UserRole {
  CUSTOMER = "USER",
  SELLER = "MODERATOR",
  ADMIN = "ADMIN",
}


declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        role: string;
        emailVerified: boolean;
      };
    }
  }
}

const auth = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("coikee",req.headers)
      const session = await betterAuth.api.getSession({
        headers: fromNodeHeaders(req.headers),
      });
console.log("selsion",session)
      if (!session || !session.user) {
        return res.status(401).json({
          success: false,
          message: "You are not authorized! ",
        });
      }

      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role ?? "USER",
        emailVerified: session.user.emailVerified ?? false,
      };

      if (roles.length > 0) {
        const userRole = req.user.role as UserRole;
        if (!roles.includes(userRole)) {
          return res.status(403).json({
            success: false,
            message:
              "Forbidden! You do not have permission to access this resource!",
          });
        }
      }

      next();
    } catch (err) {
      console.error("Auth Middleware Error:", err);
      return res.status(500).json({
        success: false,
        message: "Internal server error during authentication",
      });
    }
  };
};

export default auth;
