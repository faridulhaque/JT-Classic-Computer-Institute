import express from "express";
import { keycloakDataController, keycloakLoginController } from "./controllers/keycloak.controller.js";
const app = express();
app.use(express.json());
app.get("/health", (req, res) => {
    res.json({ message: "Server is working" });
});
app.post("/api/keycloak/login", keycloakLoginController);
app.get("/api/keycloak/data", keycloakDataController);
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
//# sourceMappingURL=index.js.map