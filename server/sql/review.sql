  DROP TABLE IF EXISTS reviews;
 
 CREATE TABLE reviews(
      id SERIAL PRIMARY KEY,
      reviewer_id INT REFERENCES users(id) NOT NULL,
      bar_id INT REFERENCES bars(id) DEFAULT NULL,
      club_id INT REFERENCES clubs(id) DEFAULT NULL,
      music VARCHAR DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );