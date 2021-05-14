const express = require('express');
const path = require('path');
const db = require('./index.js');
const controllers = require('./controllers');
const models = require('./models');

const app = express();
const port = 3000;

// app.use('/', express.static(path.join(__dirname, '../../client/dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/reviews/:product_id', controllers.getReviews);
app.get('/reviews/meta/:product_id', controllers.getReviewMeta);
app.post('/reviews', controllers.postReview);
app.put('/reviews/:review_id/helpful', controllers.reviewHelpful);
app.put('/reviews/:review_id/report', controllers.reviewReport);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
