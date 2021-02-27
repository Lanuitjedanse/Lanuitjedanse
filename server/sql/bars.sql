 DROP TABLE IF EXISTS bars;

 CREATE TABLE bars(
      id SERIAL PRIMARY KEY,
      user_id INT REFERENCES users(id) NOT NULL,
      name VARCHAR(255) NOT NULL,
      description VARCHAR DEFAULT NULL,
      address VARCHAR DEFAULT NULL,
      img_bar VARCHAR DEFAULT NULL,
      music VARCHAR DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );




