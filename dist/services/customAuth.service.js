import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";
export const login = async (username, password) => {
    console.log('Attempting login for username:', username);
    const result = await pool.query("SELECT id, username, password, role FROM users WHERE username = $1", [username]);
    const user = result.rows[0];
    console.log('User found:', user);
    if (!user) {
        throw new Error("Invalid credentials");
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error("Invalid credentials");
    }
    const token = jwt.sign({
        id: user.id,
        username: user.username,
        role: user.role,
    }, process.env.JWT_SECRET, {
        expiresIn: "1y",
    });
    return token;
};
export const getRoleMessage = (token) => {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
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
//# sourceMappingURL=customAuth.service.js.map