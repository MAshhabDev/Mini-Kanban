import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { config } from "../config";
import { prisma } from "../lib/prisma";
import type { UserRole } from "../../generated/prisma/enums";

export const auth = (...requiredRoles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      const token =
        req.cookies?.accessToken ||
        (authHeader?.startsWith("Bearer ")
          ? authHeader.split(" ")[1]
          : authHeader);

      // 2. Token Check (Return clean 401 instead of crashing)
      if (!token) {
        return res.status(401).json({
          success: false,
          statusCode: 401,
          message: "Unauthorized access: No token provided",
        });
      }

      let decoded: JwtPayload;
      try {
        decoded = jwt.verify(token, config.jwt_access_secret as string) as JwtPayload;
      } catch (err: any) {
        return res.status(401).json({
          success: false,
          statusCode: 401,
          message: "Unauthorized access: Invalid or expired token",
        });
      }

      const { id, name, email, role } = decoded;

      // 4. Role Authorization Check
      if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
        return res.status(403).json({
          success: false,
          statusCode: 403,
          message: "Forbidden: You do not have permission to access this resource",
        });
      }

      // 5. Database User Check (Safe check)
      const user = await prisma.user.findUnique({
        where: { id },
      });

      if (!user) {
        return res.status(404).json({
          success: false,
          statusCode: 404,
          message: "User account not found",
        });
      }

  
      req.user = {
        id,
        name,
        email,
        role,
      };

      next();
    } catch (error: any) {
      return res.status(500).json({
        success: false,
        statusCode: 500,
        message: error.message || "Authentication internal error",
      });
    }
  };
};