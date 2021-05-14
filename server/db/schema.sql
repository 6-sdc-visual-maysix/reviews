-- DROP DATABASE IF EXISTS reviews;

CREATE DATABASE IF NOT EXISTS reviews;

USE reviews;

-- DROP TABLE characteristics;
-- DROP TABLE reviews;
-- DROP TABLE review_characteristics;
-- DROP TABLE photos;
-- DROP TABLE products;

CREATE TABLE IF NOT EXISTS products (
  id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS reviews (
  id INT NOT NULL,
  product_id INT,
  rating TINYINT,
  date DATE,
  summmary VARCHAR(100),
  body VARCHAR(300),
  recommend BIT,
  reported INT,
  reviewer_name VARCHAR(35),
  reviewer_email VARCHAR(50),
  response VARCHAR(100),
  helpfulness INT,
  FOREIGN KEY (product_id) REFERENCES products (id),
  PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS photos (
  id INT,
  review_id INT,
  img_url VARCHAR(50),
  PRIMARY KEY (id),
  FOREIGN KEY (review_id) REFERENCES reviews (id)
);


CREATE TABLE IF NOT EXISTS characteristics (
  id INT NOT NULL,
  product_id INT,
  char_name VARCHAR(10),
  PRIMARY KEY (id),
  FOREIGN KEY (product_id) REFERENCES products (id)
);

CREATE TABLE IF NOT EXISTS review_characteristics (
  id INT NOT NULL,
  characteristic_id INT,
  review_id INT,
  value INT,
  PRIMARY KEY (id),
  FOREIGN KEY (characteristic_id) REFERENCES characteristics (id),
  FOREIGN KEY (review_id) REFERENCES reviews (id)
);

-- LOAD DATA LOCAL INFILE './../SDC_data/data/products.csv'
-- INTO TABLE products
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS (
--   id
-- );


-- LOAD DATA LOCAL INFILE './SDC_data/data/reviews/reviews_cleaned.csv'
-- INTO TABLE reviews FIELDS TERMINATED BY ','
-- OPTIONALLY ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS (
--   id,
--   product_id,
--   rating,
--   @var1,
--   summmary,
--   body,
--   recommend,
--   reported,
--   reviewer_name,
--   reviewer_email,
--   response,
--   helpfulness
-- )
-- SET date=FROM_UNIXTIME(@var/1000);


-- LOAD DATA LOCAL INFILE './SDC_data/data/photos/photos3.csv'
-- INTO TABLE photos FIELDS TERMINATED BY ','
-- OPTIONALLY ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS (
--   id,
--   review_id,
--   img_url
-- );

-- LOAD DATA LOCAL INFILE './SDC_data/data/characteristics/characteristics4.csv'
-- INTO TABLE characteristics FIELDS TERMINATED BY ','
-- OPTIONALLY ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS (
--   id,
--   product_id,
--   char_name
-- );

-- LOAD DATA LOCAL INFILE './SDC_data/data/characteristic_reviews/char_reviews1.csv'
-- INTO TABLE review_characteristics FIELDS TERMINATED BY ','
-- OPTIONALLY ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS (
--   id,
--   characteristic_id,
--   review_id,
--   value
-- );

-- LOAD DATA LOCAL INFILE './SDC_data/data/characteristic_reviews/char_reviews2.csv'
-- INTO TABLE review_characteristics FIELDS TERMINATED BY ','
-- OPTIONALLY ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS (
--   id,
--   characteristic_id,
--   review_id,
--   value
-- );

-- LOAD DATA LOCAL INFILE './SDC_data/data/characteristic_reviews/char_reviews3.csv'
-- INTO TABLE review_characteristics FIELDS TERMINATED BY ','
-- OPTIONALLY ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS (
--   id,
--   characteristic_id,
--   review_id,
--   value
-- );

-- LOAD DATA LOCAL INFILE './SDC_data/data/characteristic_reviews/char_reviews4.csv'
-- INTO TABLE review_characteristics FIELDS TERMINATED BY ','
-- OPTIONALLY ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS (
--   id,
--   characteristic_id,
--   review_id,
--   value
-- );

-- LOAD DATA LOCAL INFILE './SDC_data/data/characteristic_reviews/char_reviews5.csv'
-- INTO TABLE review_characteristics FIELDS TERMINATED BY ','
-- OPTIONALLY ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 ROWS (
--   id,
--   characteristic_id,
--   review_id,
--   value
-- );


-- CREATE UNIQUE INDEX review_id ON reviews (id);
-- CREATE UNIQUE INDEX product_id ON products (id);
-- CREATE UNIQUE INDEX photo_id ON photos (id);
-- CREATE UNIQUE INDEX characteristic_id ON characteristics (id);
-- CREATE UNIQUE INDEX review_char_id ON review_characteristics (id);
-- indexes on primary keys, foreign keys, and inner joins
-- create index __ on __
-- pg_tune to analyze query plan