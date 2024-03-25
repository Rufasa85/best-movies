DROP DATABASE IF EXISTS movies_db;
CREATE DATABASE movies_db;

\c movies_db;

CREATE TABLE movies (
    id SERIAL PRIMARY KEY,
    movie_name VARCHAR(255) NOT NULL
);

CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    review TEXT NOT NULL,
    movie_id INTEGER,
    FOREIGN KEY (movie_id)
    REFERENCES movies(id)
    ON DELETE CASCADE
);