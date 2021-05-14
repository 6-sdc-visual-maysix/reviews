const db = require('../index.js');
const util = require('util');
const helpers = require('../server_helpers.js');

module.exports = {
  getReviews: (product, limit, callback) => {
    const qs1 = `SELECT * FROM reviews WHERE product_id=${product} ORDER BY id DESC LIMIT ${limit}`;

    db.query(qs1, (error, results) => {
      if (error) {
        throw error;
      } else {
        results = results.map(result => {
          db.query(`SELECT * FROM photos WHERE review_id=${result.id}`, (error, vals) => {
            if (error) {
              throw error;
            } else {
              result.photos = vals;
            }
          })
          return result;
        });
        callback(null, results);
      }
    })
  },

  getReviewMeta: (product, callback) => {
    const char_qs = `SELECT id, char_name FROM characteristics WHERE product_id=${product}`;
    const reviewMeta = {
      product_id: product,
      ratings: {},
      recommended: {
        true: 0,
        false: 0
      },
      characteristics: {}
    }
    db.query(char_qs, (error, char_results) => {
      if (error) throw error;
      else {
        const review_char_qs = `SELECT characteristic_id, value FROM review_characteristics WHERE characteristic_id IN (SELECT id FROM characteristics WHERE product_id=${product})`
        const review_qs = `SELECT recommend, rating FROM reviews WHERE product_id=${product}`
        db.query(review_char_qs, (error, review_char_results) => {
          if (error) throw error;
          else {
            char_results.forEach(char => {
              reviewMeta.characteristics[char.char_name] = {};
              reviewMeta.characteristics[char.char_name].id = char.id
              reviewMeta.characteristics[char.char_name].value = [];
              review_char_results.forEach(review_char => {
                if (review_char.characteristic_id === reviewMeta.characteristics[char.char_name].id) {
                  reviewMeta.characteristics[char.char_name].value.push(review_char.value);
                }
              })
              reviewMeta.characteristics[char.char_name].value = helpers.average(reviewMeta.characteristics[char.char_name].value)
            });
          }
          db.query(review_qs, (error, review_results) => {
            review_results.forEach(review => {
              if (review.rating in reviewMeta.ratings) {
                reviewMeta.ratings[review.rating]++;
              } else {
                reviewMeta.ratings[review.rating] = review.rating
              }
              if (review.recommend) {
                reviewMeta.recommended.true++;
              } else {
                reviewMeta.recommended.false++;
              }
            })
            callback(null, reviewMeta);
          })
        });
      }
    })
  },

  postReview: (toPost, product, callback) => {
    const qs1 = `INSERT INTO reviews(id, product_id, summmary, recommend, response, body, date, reviewer_name, helpfulness, reported, rating)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const values = [
          toPost.id, product, toPost.summary, toPost.recommend, toPost.response,
          toPost.body, toPost.date, toPost.reviewer_name, toPost.helpfulness,
          toPost.reported, toPost.rating
      ]
      db.query(qs1, values, (error, results) => {
        if (error) {
          throw (error)
        } else {
          const char_qs = `INSERT INTO review_characteristics(id, characteristic_id, review_id, value)
          VALUES ?`;
          const char_vals = [];
          for (let char in toPost.characteristics) {
            char_vals.push([
              toPost.characteristics[char].id, toPost.characteristics[char].characteristic_id, toPost.id, toPost.characteristics[char].value

            ]);
          }

          db.query(char_qs, [char_vals], (error, char_results) => {
            if (error) throw error;
            else {
              if (toPost.photos.length) {
                const photo_qs = `INSERT INTO photos(id, review_id, img_url)
                VALUES ?`;
                const values = toPost.photos.map(photo => [photo.id, toPost.id, photo.url])
                console.log('values:', values)
                db.query(photo_qs, [values], (error, photo_results) => {
                  callback(null, [results, char_results, photo_results]);
                });
              } else {
                callback(null, [results, char_results]);
              }
            }
          })
        }
      })
  },

  reviewHelpful: (reviewID, callback) => {
    const qs = `UPDATE reviews SET helpfulness=helpfulness + 1 WHERE id=${reviewID}`;
    db.query(qs, (error, result) => {
      if (error) throw error;
      else {
        console.log(result);
        callback(null, result);
      }
    });
  },

  reviewReport: (reviewID, callback) => {
    const qs = `UPDATE reviews SET reported=1 WHERE id=${reviewID}`;
    db.query(qs, (error, result) => {
      if (error) throw error;
      else {
        console.log(result);
        callback(null, result);
      }
    });
  }
}