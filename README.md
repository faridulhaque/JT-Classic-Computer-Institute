# Description

A simple Express.js server demonstrating Keycloak authentication, custom authentication, and role-based access control (RBAC).

# How to run


- Clone the repository:
    git clone https://github.com/faridulhaque/JT-Classic-Computer-Institute.git

- Create a .env file in the root directory. ***Add the environment variables provided in the .txt file sent to classiccomputerins@gmail.com from faridmurshed9@gmail.com.***

- example.env variables -

```env
    KEYCLOAK_ADMIN=
    KEYCLOAK_ADMIN_PASSWORD=

    POSTGRES_USER=
    POSTGRES_PASSWORD=
    POSTGRES_DB=

    KEYCLOAK_DB=
    KEYCLOAK_DB_USER=
    KEYCLOAK_DB_PASSWORD=

    KEYCLOAK_URL=
    KEYCLOAK_REALM=
    KEYCLOAK_CLIENT_ID=

    JWT_SECRET=



- Start the server:
    docker compose up --build

- The server will run on http://localhost:5000/

# How to test

# 1. Login

## Keycloak Authentication

- API: POST /api/keycloak/login

## Custom Authentication

- API: POST /api/custom-auth/login

- Use the following credentials:

Admin

{
  "username": "admin",
  "password": "admin123"
}

Reporter

{
  "username": "reporter",
  "password": "reporter123"
}

Public

{
  "username": "public",
  "password": "public123"
}

A token will be returned in the response.

Keycloak authentication generates the token using the Keycloak configuration.
Custom authentication generates the token using JWT.


# 2. Fetch Role-Based Data

## Keycloak

- API: GET /api/keycloak/data

## Custom Authentication

- API: GET /api/custom-auth/data

Copy the token returned from the login API and add it to the request headers:

Authorization: Bearer <token>

Important: The token must match the authentication type.

Keycloak login token → Keycloak data API
Custom auth token → Custom auth data API

A successful request returns a role-based message.

# 3. Access Check — 403 Implementation

- API: POST /api/custom-auth/access?role=<Role>

The role query parameter must be one of:

Admin
Reporter
Public

The role is case-sensitive.

If the query parameter matches the role inside the token, a success message is returned.

If they don't match, the API returns:

"Access Denied"

For example:

/api/custom-auth/access?role=Admin

with an Admin token → Success

with a Reporter token → Access Denied

