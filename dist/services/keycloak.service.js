import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import { createRemoteJWKSet, jwtVerify } from "jose";
const KEYCLOAK_URL = process.env.KEYCLOAK_URL;
const KEYCLOAK_REALM = process.env.KEYCLOAK_REALM;
const KEYCLOAK_CLIENT_ID = process.env.KEYCLOAK_CLIENT_ID;
const JWKS = createRemoteJWKSet(new URL(`${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/certs`));
export const keycloakLogin = async (username, password) => {
    const response = await axios.post(`${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}/protocol/openid-connect/token`, new URLSearchParams({
        client_id: KEYCLOAK_CLIENT_ID,
        username,
        password,
        grant_type: "password",
    }), {
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
    });
    return response.data;
};
export const verifyKeycloakToken = async (token) => {
    console.log('Verifying token:', token);
    const { payload } = await jwtVerify(token, JWKS, {
        issuer: `${KEYCLOAK_URL}/realms/${KEYCLOAK_REALM}`,
    });
    return payload;
};
//# sourceMappingURL=keycloak.service.js.map