CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    name VARCHAR(32) NOT NULL,
    description VARCHAR(255),
    priority INT NOT NULL,
    status BOOLEAN NOT NULL DEFAULT FALSE
);