CREATE TABLE IF NOT EXISTS users (
    id        SERIAL PRIMARY KEY,
    username  VARCHAR(60)  NOT NULL UNIQUE,
    name      VARCHAR(120),
    password  VARCHAR(255) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_users_username ON users (username);
