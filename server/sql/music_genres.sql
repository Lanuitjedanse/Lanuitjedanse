 DROP TABLE IF EXISTS music_genres;

 CREATE TABLE music_genres(
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) NOT NULL,
      genres VARCHAR NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );