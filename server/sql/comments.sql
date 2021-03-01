DROP TABLE IF EXISTS comments;

 CREATE TABLE comments(
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) NOT NULL,
      bar_id INT REFERENCES bars(id) NOT NULL,
      comment VARCHAR NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );