import { keycloakLogin, verifyKeycloakToken } from "../services/keycloak.service.js";
export const keycloakLoginController = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                message: "Username and password are required",
            });
        }
        const token = await keycloakLogin(username, password);
        return res.status(200).json(token);
    }
    catch (error) {
        return res.status(401).json({
            message: "Invalid credentials",
        });
    }
};
export const keycloakDataController = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Access token required",
            });
        }
        const token = authHeader.split(" ")[1];
        const payload = await verifyKeycloakToken(token);
        const roles = payload.realm_access?.roles;
        if (!roles || !Array.isArray(roles)) {
            return res.status(403).json({
                message: "No role found",
            });
        }
        let message;
        if (roles.includes("Admin")) {
            message = "Welcome Admin. Here is your admin-specific data.";
        }
        else if (roles.includes("Reporter")) {
            message = "Welcome Reporter. Here is your reporter-specific data.";
        }
        else if (roles.includes("Public")) {
            message = "Welcome Public user. Here is your public-specific data.";
        }
        else {
            return res.status(403).json({
                message: "Insufficient permissions",
            });
        }
        return res.status(200).json({
            role: roles.find((role) => ["Admin", "Reporter", "Public"].includes(role)),
            message,
        });
    }
    catch (error) {
        return res.status(401).json({
            message: "Invalid or expired access token",
        });
    }
};
//# sourceMappingURL=keycloak.controller.js.map