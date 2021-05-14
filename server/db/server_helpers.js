const helpers = {
  average: array => {
    return array.reduce((acc, el) => acc + el) / array.length;
  }
}

module.exports = helpers;