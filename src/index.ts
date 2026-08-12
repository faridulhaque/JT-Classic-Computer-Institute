
import express from "express";

import { keycloakDataController, keycloakLoginController } from "./controllers/keycloak.controller.js";
import { getDataController, loginController } from "./controllers/customAuth.controller.js";

const app = express();
app.use(express.json());


app.get("/health", (req, res) => {
  res.json({ message: "Server is working" });
});

app.post("/api/keycloak/login", keycloakLoginController);
app.get("/api/keycloak/data", keycloakDataController);

app.post("/api/custom-auth/login", loginController);
app.get("/api/custom-auth/data", getDataController);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});