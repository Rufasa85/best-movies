\c movies_db;

INSERT INTO movies
(movie_name)
VALUES
('Jurassic Park'),
('Jurassic Park: The Lost World'),
('Jurassic Park III'),
('Jurassic World'),
('Jurassic World: Fallen Kingdom'),
('Jurassic World: Dominion');

INSERT INTO reviews
(review,movie_id)
VALUES
('Dinosaurs are cool',1),
('Velociraptors are scary',1),
('Did that raptor srsly just say "Alan"',3),
('Chris Pratt should have ridden that raptor',4),
('Spoilers: the girl is a dinosaur? wtf',5),
('Why is this movie so much about locusts and GMOs',6);