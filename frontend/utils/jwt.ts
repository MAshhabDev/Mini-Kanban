/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";

export const jwtUtils = {
  verifyToken: (token: string, secret: string) => {
    try {
      const decoded = jwt.verify(token, secret);
      return { success: true, data: decoded };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
  decodeToken: (token: string) => {
    try {
      const decoded = jwt.decode(token);
      return { success: true, data: decoded };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  },
};