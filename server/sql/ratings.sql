DROP TABLE IF EXISTS ratings;

 CREATE TABLE ratings(
      id SERIAL PRIMARY KEY,
      rate INT DEFAULT NULL, 
      user_id INT REFERENCES users(id) NOT NULL,
      bar_id INT REFERENCES bars(id) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );