const fs = require('fs');
const csv = require('csv-parser');
// const csvWrtier = require('fast-csv');
const readline = require('readline');

// const reviewData = '.././SDC_data/data/mini_reviews.csv';
const reviewData = '.././SDC_data/data/reviews/reviews.csv';
const imgData = '.././SDC_data/data/photos/reviews_photos.csv';
const characteristicData = '.././SDC_data/data/characteristics/characteristics.csv';
const characteristicReviewData = '.././SDC_data/data/characteristic_reviews/characteristic_reviews.csv';

const reviewDataCleaned = '.././SDC_data/data/reviews/reviews_cleaned.csv';
const products = '.././SDC_data/data/products.csv'
const imgDataCleaned = '.././SDC_data/data/photos/reviews_photos_cleaned.csv';
const characteristicDataCleaned = '.././SDC_data/data/characteristics/characteristics_cleaned.csv';
const characteristicReviewDataCleaned = '.././SDC_data/data/characteristic_reviews/characteristic_reviews_cleaned.csv';

//headers for each csv file, that will define what parsing function to run
const reviewsHeaders = {
  0: 'id',
  1: 'product_id',
  2: 'rating',
  3: 'date',
  4: 'summary',
  5: 'body',
  6: 'recommend',
  7: 'reported',
  8: 'reviewer_name',
  9: 'reviewer_email',
  10: 'response',
  11: 'helpfulness',
};

const charactericReviewsHeaders = {
  0: 'id',
  1: 'product_id',
  2: 'review_id',
  3: 'characteristic_value',
}

const characteristicsHeaders = {
  0: 'id',
  1: 'product_id',
  2: 'name',
}

const imgHeaders = {
  0: 'id',
  1: 'review_id',
  2: 'url',
}

//parsing methods

const neededParsers = {
  date: (col) => {
    let dateInteger = parseInt(col);
    formattedDate = isNaN(col) ? new Date(col) : new Date(dateInteger);
    return formattedDate.toString() === 'Invalid Date' ? null : formattedDate;
  },
  rating: (col) => {
    return col > 5 ? null : col;
  },
  reviewer_email: (col) => {
    return !col.includes('@') && !col.includes('.') ? null : col;
  },
  reported: (col) => {
    return col === 'false' || col === 'true' ? col : null;
  },
  recommend: (col) => {
    return col === 'false' || col === 'true' ? col : null;
  },
  characteristic_value: (col) => {
    return col > 5 ? null : col;
  },
  url: (col) => {
    return col.includes('https://')
    && col.includes('.com') && !col.includes(null) && col !== undefined ?
    col : null;
  }
}

//parser func checks to see if the current row has any values that need to be parsed
//then it will run the appropriate parsing method on that value
const parser = (row, headers) => {
  const updatedRow = row.map((col, idx) => {
    const toParse = Object.keys(neededParsers)
    if (toParse.includes(headers[idx])) {
      const neededParserProp = headers[idx];
      const parserMethod = neededParsers[neededParserProp];
      return parserMethod(col);
    } else {
      return col;
    }
  })

  if (!updatedRow.includes(null) && !updatedRow.join(' ').includes('null')) {
    return updatedRow;
  } else {
    if (updatedRow[10] === null || updatedRow[10] === 'null') {
      return updatedRow
    } else {
      return null;
    }
  }
}

//write cleaned func takes in the file to be read, the file to wirte to and the headers for that file
//then it reads the file, runs each line through the parser function, and writes a file with the parsed contents
const writeCleaned = async (source, dest, headers) => {
  try {
    const instream = fs.createReadStream(source);
    const outstream = fs.createWriteStream(dest);

    // outstream.write(`${headers}\n`);

    let rl = readline.createInterface({
      input: instream,
      output: outstream,
      crlfDelay: 'infinity',
    })

    rl.on('line', line => {
      let row = line.split(',');
      row = parser(row, headers);
      if (row !== null) {
        // console.log(row[2])
        outstream.write(`${row}\n`);
      }
    })
  } catch (err) {
    throw err;
  }
}

//Delay is intended to avoid memory running out when parsing each of the csv files
//It calls setTimeout with a delay of 35 seconds in between each file being parsed
const delay = (func, source, dest, headers, wait) => {
  setTimeout(() => {
    console.log('yessir')
    func(source, dest, headers);
  }, wait)
}

//runCleaner passes each sourceFile, destinationFile, and the file's headers to the write function
const runCleaner = () => {
  const source = [reviewData, imgData, characteristicReviewData, characteristicData];
  const destination = [reviewDataCleaned, imgDataCleaned, characteristicReviewDataCleaned, characteristicDataCleaned];
  const headers = [reviewsHeaders, imgHeaders, charactericReviewsHeaders, characteristicsHeaders];
  let wait = 0;
  for (let i = 0; i < source.length; i++) {
    i === 0 ? wait = 0 : wait = 35000;
    delay(writeCleaned, source[i], destination[i], headers[i], wait);
  }
}

// runCleaner();

const writeProducts = async (source, dest) => {
  try {
    const instream = fs.createReadStream(source);
    const outstream = fs.createWriteStream(dest);

    // outstream.write(`product_id\n`);

    let rl = readline.createInterface({
      input: instream,
      output: outstream,
      crlfDelay: 'infinity',
    })

    rl.on('line', line => {
      let row = line.split(',');
      if (row !== null) {
        // console.log(row[2])
        outstream.write(`${row[1]}\n`);
      }
    })
  } catch (err) {
    throw err;
  }
}

// writeProducts(reviewDataCleaned, products);