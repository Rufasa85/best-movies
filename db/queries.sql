\c movies_db;

SELECT * FROM movies;
SELECT * FROM reviews;

SELECT movie_name, review 
FROM 
movies
JOIN
reviews
ON
movie_id = movies.id;