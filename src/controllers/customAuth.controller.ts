import type { Request, Response } from "express";
import { checkAccess, getRoleMessage, login } from "../services/customAuth.service.js";


export const loginController = async (
  req: Request,
  res: Response
) => {
  try {

    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }
    const token = await login(username, password);

    if (token) return res.status(200).json({
      token,
    });
    else return res.status(401).json({
      message: "Invalid credentials",
    });
  } catch (error: any) {
    return res.status(error?.status || 500).json({
      message: error?.message || "Something went wrong! Failed to login.",
    });
  }
};

export const getDataController = (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Access token required",
      });
    }

    const token = authHeader.split(" ")[1];
    if (token) {

      const message = getRoleMessage(token as string);

      return res.status(200).json({ message });
    } else {
      return res.status(401).json({
        message: "Invalid or expired token",
      });
    }


  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

export const checkAccessController = (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    const role = req.query.role as string;

    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Access token required",
      });
    }

    const token = authHeader.split(" ")[1];

    const message = checkAccess(token as string, role);

    return res.status(200).json({ message });
  } catch (error: any) {
    if (error.message === "Access denied") {
      return res.status(403).json({
        message: "Access denied",
      });
    }

    return res.status(401).json({
      message: error.message || "Invalid token",
    });
  }
};