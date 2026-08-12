import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";


export const login = async (
  username: string,
  password: string
) => {

  const result = await pool.query(
    "SELECT id, username, password, role FROM users WHERE username = $1",
    [username]
  );


  const user = result.rows[0];



  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1y",
    }
  );

  return token;
};

export const getRoleMessage = (token: string) => {
  const payload: any = jwt.verify(token, process.env.JWT_SECRET!);

  const role = payload.role;

  if (role === "Admin") {
    return "Welcome Admin. Here is your admin-specific data.";
  }

  if (role === "Reporter") {
    return "Welcome Reporter. Here is your reporter-specific data.";
  }

  if (role === "Public") {
    return "Welcome Public. Here is your public-specific data.";
  }

  throw new Error("Invalid role");
};


export const checkAccess = (token: string, role: string) => {
  const allowedRoles = ["Admin", "Reporter", "Public"];

  if (!allowedRoles.includes(role)) {
    throw new Error("Invalid parameter: role must be one of Admin, Reporter, or Public (in capital letters)");
  }

  const payload: any = jwt.verify(token, process.env.JWT_SECRET!);

  const tokenRole = payload.role;

  if (tokenRole !== role) {
    throw new Error("Access denied");
  }

  if (role === "Admin") {
    return "Admin-specific data";
  }

  if (role === "Reporter") {
    return "Reporter-specific data";
  }

  return "Public-specific data";
};