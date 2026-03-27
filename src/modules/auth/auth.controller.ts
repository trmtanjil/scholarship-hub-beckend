import type { Request, Response as ExpressResponse } from "express";
import { auth } from "../../lib/auth";
import { fromNodeHeaders } from "better-auth/node";

const getMe = async (req: Request, res: ExpressResponse) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers as Record<string, string>),
    });

    if (!session) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized - No session found",
      });
    }

    return res.status(200).json({
      success: true,
      data: session,
    });
  } catch (error: any) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const logout = async (req: Request, res: ExpressResponse) => {
  try {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully!",
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
};

export const authController = {
  getMe,
  logout,
};
