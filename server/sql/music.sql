--  DROP TABLE IF EXISTS music_genres;

--  CREATE TABLE music_genres(
--       id SERIAL PRIMARY KEY,
--       user_id INT REFERENCES users(id) UNIQUE NOT NULL,
--       genres VARCHAR NOT NULL,
--       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
--       );


DROP TABLE IF EXISTS music;

 CREATE TABLE music(
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) UNIQUE NOT NULL,
      electronic BOOLEAN DEFAULT false,
      hiphop BOOLEAN DEFAULT false,
      jazz BOOLEAN DEFAULT false,
      disco BOOLEAN DEFAULT false,
      reggae BOOLEAN DEFAULT false,
      pop BOOLEAN DEFAULT false,
     rock BOOLEAN DEFAULT false,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

SELECT * FROM music WHERE user_id = $1; 

INSERT INTO music
UPDATE MUSIC SET $1 = true; 

INSERT INTO music
UPDATE MUSIC SET $1 = false; 