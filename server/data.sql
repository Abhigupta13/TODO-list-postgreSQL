CREATE DATABASE todolist;

CREATE TABLE todos (
    id VARCHAR(255) PRIMARY KEY,
    user_email VARCHAR(255),
    title VARCHAR(30),
    progress INT,
    date DATE
);
CREATE Table users (
    email VARCHAR(255) PRIMARY KEY,
    hashed_password VARCHAR(255)
);
INSERT INTO todos (id, user_email, title, progress, date)
VALUES ('1', 'user@example.com', 'Example Task', 0, '2023-11-04');