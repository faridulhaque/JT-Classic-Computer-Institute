CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('Admin', 'Reporter', 'Public'))
);

INSERT INTO users (username, password, role)
VALUES
    ('admin', '$2a$12$ynMYi6S5XhbJGzEIUm6aM./ta7KHTNEIHWlQiqDqav2TXkPwF//qu', 'Admin'),
    ('reporter', '$2a$12$fmsxbZvaKenjhsEN5b7MjufF3ntcYrumuI5va7ovXzxRhgepzfCE2', 'Reporter'),
    ('public', '$2a$12$8WhkTCorqvrdQRNNcjsAMeYFq9mzM8J.DmWL3WNkvViEoQWS1dW7G', 'Public')
ON CONFLICT (username) DO NOTHING;