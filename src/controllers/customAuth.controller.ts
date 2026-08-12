import type { Request, Response } from "express";
import { getRoleMessage, login } from "../services/customAuth.service.js";


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

    return res.status(200).json({
      token,
    });
  } catch (error) {
    return res.status(401).json({
      message: "Invalid credentials",
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

    const message = getRoleMessage(token as string);

    return res.status(200).json({ message });
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};