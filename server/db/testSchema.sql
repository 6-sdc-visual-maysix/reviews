DROP DATABASE IF EXISTS testReviews;

CREATE DATABASE testReviews;

USE testReviews;

CREATE TABLE products (
  id INT NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE reviews (
  id INT NOT NULL,
  product_id INT,
  summmary VARCHAR(100),
  recommend BIT,
  response VARCHAR(100),
  body VARCHAR(300),
  date DATE,
  reviewer_name VARCHAR(35),
  helpfulness INT,
  reported INT,
  rating TINYINT,
  PRIMARY KEY (id)
);

CREATE TABLE photos (
  id INT,
  review_id INT,
  img_url VARCHAR(50),
  PRIMARY KEY (id),
  FOREIGN KEY (review_id) REFERENCES reviews (id)
);


CREATE TABLE characteristics (
  id INT NOT NULL,
  product_id INT,
  char_name VARCHAR(10),
  PRIMARY KEY (id),
  FOREIGN KEY (product_id) REFERENCES products (id)
);

CREATE TABLE review_characteristics (
  id INT NOT NULL,
  characteristic_id INT,
  review_id INT,
  value INT,
  PRIMARY KEY (id),
  FOREIGN KEY (characteristic_id) REFERENCES characteristics (id),
  FOREIGN KEY (review_id) REFERENCES reviews (id)
);

LOAD DATA LOCAL INFILE './../SDC_data/data/products.csv'
INTO TABLE products
LINES TERMINATED BY '\n'
IGNORE 1 ROWS (
  id
);

LOAD DATA LOCAL INFILE './../SDC_data/data/reviews_photos_cleaned.csv'
INTO TABLE photos FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS (
  id,
  review_id,
  img_url
);

LOAD DATA LOCAL INFILE './../SDC_data/data/reviews.csv'
INTO TABLE reviews FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS (
  id,
  product_id,
  summmary,
  recommend,
  response,
  body,
  @var1,
  reviewer_name,
  helpfulness,
  reported,
  rating
)
SET date=FROM_UNIXTIME(@var/1000);