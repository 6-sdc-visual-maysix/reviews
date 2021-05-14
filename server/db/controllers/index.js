const models = require('../models');
const helpers = require('../server_helpers.js')

module.exports = {
  getReviews: async (req, res) => {
    console.log('yessir')
    try {
      // const product = req.query.product_id;
      const product = req.params.product_id;
      const limit = req.query.limit || 5;
      models.getReviews(product, limit, (error, results) => {
        if (error) throw error;
        else {
          const reviews = {
            product,
            count: results.length,
            results
          };
          console.log(reviews);
          res.status(200).send(reviews)
        }
      })
    } catch (error) {
      res.status(400).send(error);
    }
  },

  getReviewMeta: async (req, res) => {
    try {
      const product_id = req.params.product_id;
      models.getReviewMeta(product_id, (error, results) => {
        if (error) throw error;
        else {
          res.status(200).send(results);
        }
      })

    } catch (error) {
      res.status(400).send(error);
    }
  },

  postReview: async (req, res) => {
    try {
      const toPost = req.body;
      const product = req.query.product_id;
      models.postReview(toPost, product, (error, posted) => {
        if (error) throw error;
        else {
          res.status(200).send(posted);
        }
      })
    } catch(error) {
      res.status(400).send(error)
    }
  },

  reviewHelpful: async (req, res) => {
    try {
      const reviewID = req.params.review_id;
      models.reviewHelpful(reviewID, (error, result) => {
        if (error) throw error;
        else {
          res.status(200).send(result);
        }
      })
    } catch (error) {
      res.status(400).send(error);
    }
  },

  reviewReport: async (req, res) => {
    try {
      const reviewID = req.params.review_id;
      models.reviewReport(reviewID, (error, result) => {
        if (error) throw error;
        else {
          res.status(200).send(result);
        }
      })
    } catch (error) {
      res.status(400).send(error);
    }
  }
}